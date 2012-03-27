var define;
if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(){
  var ret;
  ret = {
    'partials': {
      'users': function(users){
        var _this = this;
        return this.ul({
          'class': 'users'
        }, function(){
          var user, _i, _ref, _len, _results = [];
          for (_i = 0, _len = (_ref = users).length; _i < _len; ++_i) {
            user = _ref[_i];
            _results.push(_this.li({
              'class': 'user'
            }, _fn));
          }
          return _results;
          function _fn(){
            return _this.span({
              'class': 'name'
            }, user.name);
          }
        });
      }
    },
    'fn': function($){
      var _this = this;
      this.doctype($.doctype);
      return this.html(function(){
        _this.head(function(){
          _this.title($.title);
          _this.$styles($.styles);
          return _this.$scripts($.scripts);
        });
        return _this.body(function(){
          return _this.noscript('Please enable Javascript.');
        });
      });
    }
  };
  return ret.fn;
});
