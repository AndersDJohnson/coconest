/*
 * Allow use as CommonJS module
 */
var define;
if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
/**
 * Define AMD module
 */
define(function(){
  var types;
  types = {
    'undefined': 'undefined',
    'number': 'number',
    'boolean': 'boolean',
    'string': 'string',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error'
  };
  /**
   * Returns the typeOf of a variable as a string.
   */
  return function(o){
    return types[typeof o] || types[Object.prototype.toString.call(o)] || (o ? 'object' : 'null');
  };
});
