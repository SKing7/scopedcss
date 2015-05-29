var scopedCss = require('../index');
var assert = require("assert")

var testModuleName = "i#am@a$hash#header"
var singleRules = [
    '.nearby-place-list-content .place-item:last-child > .place-name {\
        border-bottom: none;\
    }',
    '.navigation_search_suggestionBox li + li {\
        border-top: 1px solid #ccc;\
    }',
    '.nearby-place-list-content .place-item .sub-name {\
        font-size: 12px;\
        color: #9c9c9c;\
        padding-left: 5px;\
        padding-top: 2px;\
    }',
];
var mulitiRules = [
    '.nearby-place-list-content, .place-item {\
        font-size: 12px;\
        color: #9c9c9c;\
        padding-top: 2px;\
    }',
];
describe('scopedCss', function(){
    singleRules.forEach(function (v, k) {
        it('should return css code with prefix : ' + testModuleName, function(){
            assert.equal('.' + testModuleName + ' ' + v , scopedCss(testModuleName, v));
        })
    })
    mulitiRules.forEach(function (v, k) {
        it('should return css code with muliti prefix : ' + testModuleName, function(){
            assert.equal(parseMulti(v, testModuleName) , scopedCss(testModuleName, v));
        })
    })
    function parseMulti(code, prefix) {
        var matches = code.match(/(^.*)({.+)$/);
        var selector;
        var layers;  
        if (matches) {
            selector = matches[1];
            layers = selector.split(',');
            layers.forEach(function (v, k) {
                layers[k] = v.replace(/(^\s*)/, '$1' + '.' + prefix + ' '); 
            });
            return layers.join(',') + matches[2]
        }
    }
})

