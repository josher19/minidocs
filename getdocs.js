/** Get documentation in comments from source file */
(function(){
  /**
   * Quickly strip HTML
   */
  var cleaner, getdocs, test_getdocs_function, test_getdocs_anon;
  cleaner = function(comment){
    if (comment) {
      comment = comment.replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    }
    return comment;
  };
  /**
    * Extract comments from a file 
    */
  getdocs = function(file, docs, cleanup){
    var regx, res;
    cleanup == null && (cleanup = cleaner);
    docs = docs || {};
    file = file.replace(/\n\s*\*[^/]\s*/g, " ");
    regx = /\/\*\*+\s*(.*)\s*\*\/\n((.*\n?)\s+(\S+)\s*(=|:))?\s*function\s*(\w*)\s*\(/m;
    res = file.match(regx);
    while (res) {
      docs[res[4] || res[6]] = cleanup(res[1]);
      res = res.input.substring(res[0].length + res.index).match(regx);
    }
    return docs;
  };
  test_getdocs_function = function(){
    var input, docs;
    input = '/** comment */\n function kool_stuff (abc, def) { return   function () { body }}';
    docs = getdocs(input);
    console.assert(docs["kool_stuff"] === "comment ");
    return docs;
  };
  test_getdocs_anon = function(){
    var input, docs;
    input = '/** comment */\n var anon = function (abc, def) { return   function () { body }}';
    docs = getdocs(input);
    console.assert(docs["anon"] === "comment ");
    return docs;
  };
  if (typeof module === "object") {
    module.exports = getdocs;
  }
}).call(this);
