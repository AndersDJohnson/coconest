requirejs.config({
  baseUrl: 'file:///home/anders/Desktop/coconest/compiled/javascript'
  /*paths: {
  	'coconest': './coconest'
  }*/
});
requirejs(['coconest'], function(coconest){
  var addCount, addedTpl, contentPartial, templateFn, data, rendered;
  addCount = 0;
  addedTpl = function($){
    return this.div({
      'class': 'added'
    }, "[" + $.addCount + "] " + $.date);
  };
  window.doAdd = function(){
    var data, rend;
    console.log('add');
    data = {
      addCount: addCount++,
      date: new Date().toString()
    };
    rend = coconest.render(addedTpl, data);
    return document.getElementById('adds').innerHTML += rend;
  };
  contentPartial = function($){
    this.div({
      id: 'adds'
    });
    return this.a({
      href: '#',
      onclick: 'doAdd()'
    }, 'Add');
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
