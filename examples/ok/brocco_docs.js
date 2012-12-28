(function(my) {
var docs = 
{
  "generateDocumentation": "## Main Documentation Generation Functions  Generate the documentation for a source file by (optionally) reading it  in, splitting it up into comment/code sections, highlighting them for  the appropriate language, running the comment sections through Markdown  using [Showdown][], and merging them into an HTML template.     [Showdown]: http: attacklab.net/showdown/",
  "parse": "Given a string of source code, parse out each comment and the code that  follows it, and create an individual **section** for it.  Sections take the form:       {        docsText: ...        docsHtml: ...        codeText: ...        codeHtml: ...      }",
  "highlight": "Highlights parsed sections of code. If no syntax highlighter is present,  output the code in plain text.",
  "codeMirrorHighlighter": "This is a modified version of CodeMirror's [runmode][],  used to leverage CodeMirror's code editing modes for  syntax highlighting.   If CodeMirror isn't detected or support for the current  language isn't available, this function falls back to  no highlighting.     [runmode]: http: codemirror.net/demo/runmode.html",
  "nullHighlighter": "This null syntax highlighter doesn't do any syntax highlighting at  all; it just plops the plain-text source code in a `&lt;pre&gt;` element.",
  "defaultTemplate": "This default template produces an identical DOM to the  &lt;code&gt;[docco.jst][]&lt;/code&gt; template used by Docco for single-source  files. It's just easier to inline it than grab it via XHR because it  complicates the use and deployment of this browser-side script.     [docco.jst]: https: github.com/jashkenas/docco/blob/master/resources/docco.jst",
  "insertHtmlIntoBody": "This helper inserts the given HTML into the `&lt;body&gt;` element  of the page.",
  "scrollLocationHashIntoView": "This helper does a bit of hackery to ensure that  named anchors are automatically navigated to when a  page is first loaded.",
  "htmlEscape": "Leverage the DOM to do HTML escaping for us.",
  "getSourceFile": "Retrieve the given source file over XHR. If an error occurs  and we're on a `file:` URL, there's a good chance it's  due to browser security restrictions, so provide content  that provides advice.",
  "getLanguage": "Get the current language we're documenting, based on the extension.",
  "processLanguages": "Build out the appropriate matchers and delimiters for each language.",
  "addLanguages": "This helper makes it easy to add new languages."
}
if (typeof require !== "undefined") minidocs = require('../minidocs');
if (typeof exports === "object") { exports.minidocs = minidocs, exports.docs = docs; }

my.docs = docs;

Rainbow.onHighlight(function(code, language) { 
    minidocs(docs, code.querySelectorAll ? code.querySelectorAll('span.function.call,span.method') : '');
}); 

var tstart = new Date();
/*
// minidocs.last.redo(docs,'code span.function.call')
startDocs = my.startDocs = function() { 
    setTimeout(function () { 
        toc(); var dd=minidocs.last=minidocs(docs, 'code span.function.call'); console.log('starting', dd, docs, typeof toc, new Date() - tstart, arguments); 
    }, 550);
};
// minidocs(docs).hits || (Rainbow && Rainbow.color ? Rainbow.color(startDocs) : setTimeout(startDocs, 1000));
// minidocs(docs, toc).hits || (Rainbow && Rainbow.color ? Rainbow.color(startDocs) : setTimeout(startDocs, 1000));
*/

/**
 * adds event listener to start highlighting
    if (window.addEventListener) {
         window.addEventListener('load', startDocs, false);
    } else {
        window.attachEvent('onload', startDocs);
    }
 */

})(this)
