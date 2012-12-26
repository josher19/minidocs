#!/usr/bin/env node

(function() {
    var getdocs = require('./getdocs')
        , fs = require('fs')
        , args = process.argv.slice(2)

    console.log("// #", {args:args})

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

    args.forEach(function(item,n) {
        var docfile = getdocfile(item, n, docs, showDocs);
        fs.readFile(item, 'utf8', docfile);
    });

    // console.log(docs);
})();
