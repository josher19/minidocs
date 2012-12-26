#!/usr/bin/env node

/**
 * Convert Javascript files into HTML pages with Rainbow Code and Tooltips
 */

(function() {
    var getdocs = require('./getdocs'),
        fs = require('fs'),
        path =require('path'),
        util = require('util'),
        args = process.argv.slice(2),
        htemplate = __dirname + "/examples/TEMPLATE.html",
        jstemplate = __dirname + "/docs/TEMPLATE_docs.js" ;
        
    // could use nopt for this
    while (args[0] && args[0].charAt(0) == "-") {
        option = args.shift();
        if (option == "-t" || option == "--template") {
            args.shift();
            htemplate = args.shift();
        }
        else if (option == "-j" || option == "--jstemplate") {
            args.shift();
            jstemplate = args.shift();
        }
        else if (option == "-u" || option == "--usage" || option == "--help" || option == "-h") {
            args.shift();
            console.log("Usage: " + process.argv[1] + " [-t template] [-j jstemplate] [--help] [--usage] files*.js");
            console.log("Extracts /** comments */ and inserts them into html files as tooltips. ");
            process.exit(0);
        } else {
            console.warn("Unknown option ignored: " + option);
        }
    }
    
    if (!args.length) args = fs.readdirSync('.').filter(function(it){
        return it.match(/\.js$/);
    });

    var docs = {}
    var done = args.length;

    /** Read docs from the comments in JS files */
    function getdocfile(item, n, docs, doDone) {
        return function docfile(err, file) {
            // docs[item] = file;
            --done;
            console.log("// #", n, item, done, err || file.length);
            getdocs(file, docs);
            if (done <= 0 && doDone) doDone(docs);
        }
    }
    
    /** make sure things like <script src="bad"></script> don't work */
    function showDocs(docs) {
        console.log(JSON.stringify(docs, null, 2));
    }

    var htmlFile = '<pre><code data-language="javascript">#{template.jscode}</code></pre>';
    var jsFile = 'var docs = #{template.docs}; minidocs(docs);';
    var loaded = false;
    
    ; [htemplate,jstemplate].forEach(function(item,n) {
        fs.readFile(item, 'utf8', function(err, file) {
            if (err) return console.warn(err);
            if (n==0) htmlFile = file;
            else if (n==1) { loaded = true; jsFile = file; }
            else console.warn("Error: " + n + " > 1");
        });
    });
    
    /** Generate a Javascript and HTML file from a template */
    function genfile(template) {
        if (!loaded) {
            setTimeout(function() { genfile(template); ++loaded;}, 250);
            console.warn("File not loaded yet, waiting 250ms");
            return;
        }
        // console.log(util.inspect(template, false, 1, true))
        var safename = template.safename = path.basename(template.filename).replace('.js', '').replace(/[^a-z0-9_]/ig, ""),
            html = htmlFile
                .replace(/\#\{template\.safename\}/g, template.safename)
                .replace('#{template.filename}', template.filename)
                .replace('#{template.jscode}', template.jscode),
            jscode = jsFile.replace('#{template.docs}', template.docs),
            htmlname = path.join(path.dirname(htemplate), safename + ".html"),
            jsname = path.join(path.dirname(jstemplate), safename + "_docs.js");
            
        // console.log(jsname, jscode);
        // console.log(htmlname, html);
        fs.writeFile(htmlname, html);
        fs.writeFile(jsname, jscode);
        console.log("Writing " + (jscode.length) + " bytes to file " + jsname);
    }
    
    /** Make safe for HTML */
    function safehtml(html) {
        return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    
    /** Return a callback to generate files from a template. See also: genfile */
    function readfile(filename,n) {
        var template = {
              jscode:''
            , filename: filename
            , docs: {}
        };
        return function(err, file) {
            console.log(filename,n);
            if (err) console.warn(err);
            template.docs = JSON.stringify(getdocs(file), null, 2);
            template.jscode = safehtml(file);
            genfile(template);
            console.log("//", "string" === typeof file, file.length);
        }
    }
    
    args.forEach(function(item,n) {
        // var docfile = getdocfile(item, n, docs, showDocs);
        fs.readFile(item, 'utf8', readfile(item,n));
    });
    

    // console.log(docs);
})();
