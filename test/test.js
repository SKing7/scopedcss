var scopedCss = require('../index');
var assert = require("assert")

var testModuleName = "i#am@a$hash#header"
var cssToTest = [
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
describe('scopedCss', function(){
    cssToTest.forEach(function (v, k) {
        it('should return css code with prefix : ' + testModuleName, function(){
            assert.equal('.' + testModuleName + ' ' + v , scopedCss(testModuleName, v));
        })
    })
})

