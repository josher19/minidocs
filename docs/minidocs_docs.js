(function() {
var docs = 
{
  "setTooltip": "Set data-tooltip or title (if useTitles is truthy) of element `el` to string `text`. ",
  "minidocs": "Mini documentation using titles on code spans created with rainbowco.de or similiar.  Args: docs object {functionName:documentation_string,...}, optional domElements collection or selector string, optional boolean useTitles to use titles instead of tooltips. Uses: document.querySelectorAll defined in HTML5. Need a shim for obsolete browsers, or pass in domElements found using other selector such as jQuery sizzle or Zepto.",
  "uniq": "Remove duplicates if ra.filter and ra.sort are defined. Args: array ra ",
  "clearTitles": "Erase all titles on for elements in docs. See also: minidocs. Args: object docs, optional domEls collection or selector string ",
  "asString": "Convenience function to display returned results as a String. See: minidocs. "
}
if (typeof require !== "undefined") minidocs = require('../minidocs');
if (typeof exports === "object") { exports.minidocs = minidocs, exports.docs = docs }
minidocs(docs).hits || setTimeout( function() { minidocs(docs); }, 500 );
})()
