(function (self) {
  if (typeof require !== "undefined") { minidocs = require('../minidocs'); }
  var docs = self.docs =
  #{template.docs}
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
