var utils = require('../src/utils');
console.log(utils.isFunction(function(){}));
console.log(utils.isFunction("dfdf"));
console.log(utils.isFunction("function(){}"));