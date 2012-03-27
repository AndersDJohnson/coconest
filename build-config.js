({
	appDir: './compiled',
	baseUrl: './compiled',
	dir: './build',
	/*
	Options:
	//- "uglify": (default) uses UglifyJS to minify the code.
	//- "closure": uses Google's Closure Compiler in simple optimization
	// mode to minify the code. Only available if running the optimizer using Java.
	//- "closure.keepLines": Same as closure option, but keeps line returns
	// in the minified files.
	//- "none": no minification will be done.
	*/
	optimize: 'uglify',
	//See https://github.com/mishoo/UglifyJS for the possible values.
	uglify: {},

	//Allow CSS optimizations. Allowed values:
	//- "standard": @import inlining, comment removal and line returns.
	//Removing line returns may have problems in IE, depending on the type
	//of CSS.
	//- "standard.keepLines": like "standard" but keeps line returns.
	//- "none": skip CSS optimizations.
	optimizeCss: "none",
	//If optimizeCss is in use, a list of of files to ignore for the @import
	//inlining. The value of this option should be a comma separated list
	//of CSS file names to ignore. The file names should match whatever
	//strings are used in the @import calls.
	cssImportIgnore: null,
	//cssIn is typically used as a command line option. It can be used
	//along with out to optimize a single CSS file.
	//cssIn: "path/to/main.css",
	//out: "path/to/css-optimized.css",
	
	//Inlines the text for any text! dependencies, to avoid the separate
    //async XMLHttpRequest calls to load those dependencies.
    inlineText: true,
    
    //Allow "use strict"; be included in the RequireJS files.
    //Default is false because there are not many browsers that can properly
    //process and give errors on code for ES5 strict mode,
    //and there is a lot of legacy code that will not work in strict mode.
    useStrict: false,
    
	//Allows namespacing requirejs, require and define calls to a new name.
	//This allows stronger assurances of getting a module space that will
	//not interfere with others using a define/require AMD-based module
	//system. The example below will rename define() calls to foo.define().
	//See http://requirejs.org/docs/faq-advanced.html#rename for a more
	//complete example.
	namespace: 'app',
    
    
})
