(function (self) {
  if (typeof require !== "undefined") { minidocs = require('../minidocs'); }
  var docs = self.docs =
  {
  "setTooltip": "Set data-tooltip or title (if useTitles is truthy) of element `el` to string `text`.",
  "minidocs": "Mini documentation using titles on code spans created with rainbowco.de or similar.  Args: docs object {functionName:documentation_string,...}, optional domElements collection or selector string, optional boolean useTitles to use titles instead of tooltips, optional callback cb. Uses: document.querySelectorAll defined in HTML5. Need a shim for obsolete browsers, or pass in domElements found using other selector such as jQuery sizzle or Zepto.",
  "uniq": "Remove duplicates if ra.filter and ra.sort are defined. Args: array ra",
  "clearTitles": "Erase all titles on for elements in docs. See also: minidocs. Args: object docs, optional domEls collection or selector string",
  "asString": "Convenience function to display returned results as a String. See: minidocs."
}
  if (self.Rainbow) {
    self.Rainbow.onHighlight(function (code, language) {
      minidocs(docs, code.querySelectorAll ? code.querySelectorAll('span.function.call,span.method') : '');
      if ("function" == typeof self.Rainbow.done) {
          self.Rainbow.done(code, language);
      }
    });
  }
  if (typeof exports === "object") { exports.minidocs = minidocs; exports.docs = docs; }
})(this);
