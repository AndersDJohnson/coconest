requirejs.config({
  baseUrl: 'file:///home/anders/Desktop/coconest/compiled/javascript'
  /*paths: {
  	'coconest': './coconest'
  }*/
});
requirejs(['coconest'], function(coconest){
  var contentPartial, templateFn, data, rendered;
  contentPartial = function($){
    return this.div('Welcome!');
  };
  coconest.addPartial('content', contentPartial);
  templateFn = function($){
    var _this = this;
    this.header(function(){
      return _this.h1({
        id: 'title'
      }, $.title);
    });
    return this.div({
      id: 'content'
    }, function(){
      return _this.$content($);
    });
  };
  data = {
    title: "Page Title",
    users: [
      {
        name: 'John'
      }, {
        name: 'Joe'
      }
    ]
  };
  rendered = coconest.render(templateFn, data);
  document.body.innerHTML = rendered;
  return document.title = data.title;
});
