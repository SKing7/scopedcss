var gonzales = require('gonzales');

function ScopeIt(componentName, src) {
    var output;
        ast = gonzales.srcToCSSP(src);

    console.log(JSON.stringify(ast));
    transformAst(ast, filterAadComponentName);
    output = gonzales.csspToSrc(ast);
    return output;

    function transformAst(node, transformer) {  
        for (var i = 1; i < node.length; ++i) {
            if (Array.isArray(node[i])) {
                node[i] = transformAst(node[i], transformer);
            }
        }
        return transformer(node);
    }
    /**
     * [styleSheet, [
     *      ruleset, [
     *          selector, [
     *             simplieselector, [
     *                  clazz: '.....'
     *             ]
     *          ]
     *      ]
     * ]]
     */
    function filterAadComponentName(node) {  
        if (node[0] === 'ruleset') {
            var url;
            if (node[1][0] === 'selector') {
                // One which is surrounded by quotes
                node[1].forEach(function (v) {
                    var findClazz = false;
                    if (Array.isArray(v)) {
                        if (v[0] === 'simpleselector') {
                            v.forEach(function (v1, k1) {
                                if (!findClazz && Array.isArray(v1)) {
                                    if (v1[0] === 'clazz') {
                                        addScope(v, componentName, k1);
                                        findClazz = true;
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
        return node;

        function addScope(node, name, index) {
            node.splice(index, 0, ['clazz', ['ident', name]]); 
            node.splice(index + 1, 0, ['s', ' ']); 
        }
    }
}

module.exports = ScopeIt
