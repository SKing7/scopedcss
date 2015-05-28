Scopecss
========

 Scope the css by custom prefix(e.g.: component name)

 Useage
=======
```js
var scopecss = require('scopecss')
var cssResource = '.nearby-place-list-content { color: red}';
scopecss('my_component_prefix', cssResource);
//return: .my_component_prefix .nearby-place-list-content { color: red}
```

Install
=======

    npm install scopecss

