Scopecss
========

 Scope the css by custom prefix  `(e.g.: component name)`

 Useage
=======
```js
var scopecss = require('scopecss')
var cssResource = '.nearby-place-list-content { color: red}';
var prefix = 'my_component_prefix';

scopecss(prefix, cssResource);
//return: .my_component_prefix .nearby-place-list-content { color: red}
```

Install
=======

    npm install scopecss

Test
=======

    npm test
