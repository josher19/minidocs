(function() {
var docs = 
#{template.docs}
if (typeof require !== "undefined") minidocs = require('../minidocs');
if (typeof exports === "object") { exports.minidocs = minidocs, exports.docs = docs }
minidocs(docs).hits || setTimeout( function() { minidocs(docs); }, 500 );
})()
