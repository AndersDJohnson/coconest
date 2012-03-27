var requirejs, Seq;
requirejs = require('requirejs');
Seq = require('seq');
requirejs.config({
  baseUrl: __dirname,
  nodeRequire: require
});
requirejs(['util', 'optparse', 'fs', './typeOf', './coconest'], function(util, optparse, fs, typeOf, coconest){
  var switches, options, parser, msg;
  switches = [['-f', '--file FILENAME', 'Template file'], ['-d', '--data FILENAME', 'Data file (JSON)'], ['-o', '--out FILENAME', 'Output file'], ['-h', '--help', "Shows this help section"]];
  options = {
    filename: null
  };
  parser = new optparse.OptionParser(switches);
  parser.on('help', function(){
    util.puts(parser.toString());
    return process.exit(0);
  });
  parser.on('file', function(name, filename){
    return options.tplFile = filename;
  });
  parser.on('data', function(name, filename){
    return options.dataFile = filename;
  });
  parser.on('out', function(name, filename){
    return options.outFile = filename;
  });
  parser.parse(process.argv);
  if (options.tplFile == null) {
    msg = "ERROR: Specify a template file module.\n";
    process.stderr.write(msg);
    process.exit(1);
  }
  if (options.dataFile == null) {
    msg = "ERROR: Specify a data file.\n";
    process.stderr.write(msg);
    process.exit(1);
  }
  return Seq().par(function(){
    return fs.realpath(options.tplFile, this);
  })['catch'](function(err){
    process.stderr.write("ERROR: Reading template file: " + err + "\n");
    return process.exit(1);
  }).par(function(){
    return fs.readFile(options.dataFile, 'utf8', this);
  })['catch'](function(err){
    process.stderr.write("ERROR: Reading data file: " + err + "\n");
    return process.exit(1);
  }).seq(function(tplFile, dataFile){
    var data, tplDef, fn, name, rendered, _ref;
    try {
      data = JSON.parse(dataFile);
    } catch (err) {
      process.stderr.write("ERROR: Parsing data file as JSON: " + err + "\n");
      process.exit(1);
    }
    tplDef = require(tplFile);
    if (typeOf(tplDef) === 'function') {
      fn = tplDef;
    } else if (typeOf(tplDef === 'object')) {
      for (name in _ref = tplDef.partials) {
        fn = _ref[name];
        coconest.addPartial(name, fn);
      }
      if (typeOf(tplDef.fn) !== 'function') {
        process.stderr.write("ERROR: Template file malformed.\n");
        process.exit(1);
      } else {
        fn = tplDef.fn;
      }
    } else {
      process.stderr.write("ERROR: Template file malformed.\n");
      process.exit(1);
    }
    rendered = coconest.render(fn, data);
    if (options.outFile != null) {
      return fs.writeFile(options.outFile, rendered, 'utf8', function(err){
        if (err) {
          process.stderr.write("ERROR: Failed to write rendered output.\n");
          return process.exit(1);
        }
      });
    } else {
      return process.stdout.write(rendered);
    }
  });
});
