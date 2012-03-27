/*
coco_kup
*/
/*
 * Allow use as CommonJS module
 */
var define, __slice = [].slice;
if (typeof define !== 'function') {
  define = require('amdefine')(module);
}
/**
 * Define AMD module
 */
define(['./typeOf', './indexOf'], function(typeOf){
  var doctypes, tags, addTag, addPartial, Template, render, load;
  doctypes = {
    html5: '<!doctype html>',
    xhtml10strict: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
    xhtml10trans: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
    xhtml11: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
    html4strict: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
    html4trans: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
    html4frameset: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">'
  };
  tags = {
    newline: ['html', 'body'],
    'void': ['area', 'base', 'basefont', 'br', 'col', 'command', 'embed', 'frame', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
    html5: ['article', 'aside', 'audio', 'bdi', 'canvas', 'command', 'datalist', 'details', 'embed', 'fieldset', 'figure', 'footer', 'header', 'hgroup', 'keygen', 'mark', 'meter', 'nav', 'output', 'progress', 'rp', 's', 'section', 'source', 'summary', 'time', 'track', 'video', 'wbr'],
    html4: ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'fieldset', 'font', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'isindex', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'menu', 'meta', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 's', 'samp', 'script', 'select', 'small', 'span', 'strike', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'tt', 'u', 'ul', 'var']
  };
  tags['normal'] = tags.html4.concat(tags.html5);
  addTag = function(name){
    return this.prototype[name] = function(){
      return this.tag.apply(this, [name].concat(__slice.call(arguments)));
    };
  };
  addPartial = function(name, tplFn, options){
    options = {
      override: false
    };
    if (typeOf(name) !== 'string' || typeOf(tplFn) !== 'function') {
      throw new Error("Partial must have name string and function.");
    }
    if (!__of(name, Template.prototype.partialNames) || options.override) {
      Template.prototype.partialNames.push(name);
      return Template.prototype['$' + name] = tplFn;
    }
  };
  /**
   * Template class
   *  contains settings, public methods, partials, utilities, etc.
   */
  Template = (function(){
    Template.displayName = 'Template';
    var tagName, _i, _ref, _len, prototype = Template.prototype, constructor = Template;
    function Template(){
      this.o = '';
      this.compress = false;
      this.indentLevel = 0;
      this.parentLevel = 0;
    }
    prototype.partialNames = [];
    prototype.doctypes = doctypes;
    prototype.tags = tags;
    prototype.id = function(){
      if (!this.compress) {
        return this.o += __repeatString("\t", this.indentLevel);
      }
    };
    prototype.nl = function(){
      if (!this.compress) {
        return this.o += "\n";
      }
    };
    prototype.doctype = function(t){
      this.o += this.doctypes[t] || '';
      if (!this.compress) {
        return this.o += "\n";
      }
    };
    prototype.tag = function(){
      var name, newline, hollow, nested, dontindent, t1, t2, attrs, i, inner, attr, value, _ref, _this = this;
      name = arguments[0].toLowerCase();
      newline = this.tags.newline.indexOf(name) >= 0 && !this.compress;
      hollow = t1 !== 'undefined';
      nested = t1 === 'function';
      dontindent = false;
      t1 = typeOf(arguments[1]);
      t2 = typeOf(arguments[2]);
      attrs = '';
      if (t2 === 'function') {
        i = arguments[2];
        inner = function(){
          _this.parentLevel = ++_this.indentLevel;
          _this.nl();
          i();
          return _this.indentLevel--;
        };
      } else if (t2 === 'string') {
        i = arguments[2];
        inner = function(){
          return _this.o += i;
        };
      } else {
        inner = function(){
          return this.indentLevel = this.parentLevel;
        };
      }
      if (t1 === 'function') {
        i = arguments[1];
        inner = function(){
          _this.parentLevel = ++_this.indentLevel;
          _this.nl();
          i();
          return _this.indentLevel--;
        };
      } else if (t1 === 'string') {
        i = arguments[1];
        dontindent = true;
        inner = function(){
          return _this.o += i;
        };
      } else if (t1 === 'object') {
        for (attr in _ref = arguments[1]) {
          value = _ref[attr];
          if (value !== false) {
            if (typeOf(value) === 'boolean') {
              value = attr;
            } else if (typeOf(value) === 'array') {
              value = value.join(' ');
            } else if (typeOf(value) === 'object') {
              value = JSON.stringify(value);
              value = value.replace(/\"/g, '&#034;');
            }
            attrs += ' ' + attr + '="' + value + '"';
          }
        }
      }
      this.id();
      if (this.tags['void'].indexOf(name) >= 0) {
        this.o += "<" + name + attrs + " />";
      } else {
        this.o += "<" + name + attrs + ">";
        inner();
        if (!(this.indentLevel === this.parentLevel || dontindent)) {
          this.id();
        }
        this.o += "</" + name + ">";
      }
      return this.nl();
    };
    for (_i = 0, _len = (_ref = Template.prototype.tags.normal).length; _i < _len; ++_i) {
      tagName = _ref[_i];
      (_fn.call(Template, tagName, tagName));
    }
    return Template;
    function _fn(t, tagName){
      addTag.call(this, t);
    }
  }());
  /* 
   * end class Template
   */
  /* 
   * Add default partials
   */
  addPartial('raw', function(content){
    return this.o += content;
  });
  addPartial('scripts', function(scripts){
    var script, content, _i, _len, _results = [];
    if (scripts == null) {
      return;
    }
    for (_i = 0, _len = scripts.length; _i < _len; ++_i) {
      script = scripts[_i];
      script.type == null && (script.type = 'text/javascript');
      if (script.content != null) {
        content = script.content;
        delete script.content;
        _results.push(this.script(script, content));
      } else {
        _results.push(this.script(script));
      }
    }
    return _results;
  });
  addPartial('styles', function(styles){
    var style, content, _i, _len, _results = [];
    if (styles == null) {
      return;
    }
    for (_i = 0, _len = styles.length; _i < _len; ++_i) {
      style = styles[_i];
      style.type == null && (style.type = 'text/css');
      if (style.content != null) {
        content = style.content;
        delete style.content;
        _results.push(this.style(style, content));
      } else {
        _results.push(this.link(style));
      }
    }
    return _results;
  });
  render = function(tplFn, data){
    var tpl;
    tpl = new Template();
    tplFn.call(tpl, data);
    return tpl.o;
  };
  load = function(path){
    var tpl, name, fn, _ref;
    tpl = require(path);
    for (name in _ref = tpl.partials) {
      fn = _ref[name];
      addPartial(name, fn);
    }
    return tpl;
  };
  /**
   * return visible AMD module
   */
  return function(){
    return {
      render: render,
      addPartial: addPartial,
      load: load
    };
  }();
});
function __of(x, arr){
  var i = 0, l = arr.length >>> 0;
  while (i < l) if (x === arr[i++]) return true;
  return false;
}
function __repeatString(str, n){
  for (var r = ''; n > 0; (n >>= 1) && (str += str)) if (n & 1) r += str;
  return r;
}
