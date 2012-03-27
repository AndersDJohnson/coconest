var define;
if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
define(function(){
  return {
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
      return this.html({
        'class': ['no-js'],
        lang: 'en'
      }, function(){
        _this.head(function(){
          _this.title($.title);
          _this.link({
            rel: 'stylesheet',
            type: 'text/css',
            href: ''
          });
          return _this.script({
            type: 'text/javascript',
            src: 'foo'
          });
        });
        return _this.body(function(){
          _this.header(function(){
            return _this.div({
              id: 'title'
            }, $.title);
          });
          _this.div("blah");
          _this.$users($.users);
          return _this.div(function(){
            return _this.span('Hello!');
          });
        });
      });
    }
  };
});
