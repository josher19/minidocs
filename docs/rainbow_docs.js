(function (self) {
  if (typeof require !== "undefined") { minidocs = require('../minidocs'); }
  var docs = self.docs =
  {
  "_attr": "cross browser get attribute for an element",
  "_addClass": "adds a class to a given code block",
  "_hasClass": "checks if a block has a given class",
  "_getLanguageForBlock": "gets the language for this block of code",
  "_htmlEntities": "makes sure html entities are always used for tags",
  "_intersects": "determines if a new match intersects with an existing one",
  "_hasCompleteOverlap": "determines if two different matches have complete overlap with each other",
  "_matchIsInsideOtherMatch": "determines if the match passed in falls inside of an existing match this prevents a regex pattern from matching inside of a bigger pattern",
  "_wrapCodeInSpan": "takes a string of code and wraps it in a span tag based on the name",
  "_indexOfGroup": "finds out the position of group match for a regular expression",
  "_processPattern": "matches a regex pattern against a block of code finds all matches that should be processed and stores the positions of where they should be replaced within the string\nthis is where pretty much all the work is done but it should not be called directly",
  "processNext": "callback to process the next match of this pattern",
  "onMatchSuccess": "callback for when a match was successfully processed",
  "processGroup": "callback for processing a sub group",
  "_replaceAndContinue": "takes the code block matched at this group, replaces it with the highlighted block, and optionally wraps it with a span with a name",
  "_bypassDefaultPatterns": "should a language bypass the default patterns?\nif you call Rainbow.extend() and pass true as the third argument it will bypass the defaults",
  "_getPatternsForLanguage": "returns a list of regex patterns for this language",
  "_replaceAtPosition": "substring replace call to replace part of a string at a certain position",
  "keys": "sorts an object by index descending",
  "_processCodeWithPatterns": "processes a block of code using specified patterns",
  "_processReplacements": "process replacements in the string of code to actually update the markup",
  "_processReplacement": "processes a single replacement",
  "_highlightBlockForLanguage": "takes a string of code and highlights it according to the language specified",
  "_highlightCodeBlock": "highlight an individual code block",
  "_highlight": "start highlighting all the code blocks",
  "extend": "extends the language pattern matches",
  "onHighlight": "call back to let you do stuff in your app after a piece of code has been highlighted",
  "addClass": "method to set a global class that will be applied to all spans",
  "color": "starts the magic rainbow"
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
