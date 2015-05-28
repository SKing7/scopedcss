var gonzales = require('gonzales');

function ScopeIt(componentName, src) {
    var output;
        ast = gonzales.srcToCSSP(src);

    transformAst(ast, filterAadComponentName);
    return gonzales.csspToSrc(ast);

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
            // There are 2 types of strings in URI nodes
            if (node[1][0] === 'selector') {
                // One which is surrounded by quotes
                if (node[1][1][0] === 'simpleselector') {
                    node[1][1].splice(1, 0, ['clazz', ['ident', componentName]]); 
                    node[1][1].splice(2, 0, ['s', ' ']); 
                }
            }
        }
        return node;
    }
}

module.exports = ScopeIt
