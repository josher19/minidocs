/** Get documentation in comments from source file */
(function(){
  /**
   * Quickly strip HTML
   */
  var cleaner, slashcomments, getdocs, test_getdocs_function, test_getdocs_anon;
  cleaner = function(comment){
    if (comment) {
      comment = comment.replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    }
    return comment;
  };
  /**
   * Change // slash comments into star comments 
   * First // becomes /**, last line adds end comment tag
   */
  slashcomments = function(file){
    var slashToStar;
    slashToStar = /((\s*\/\/\s*.*\n)+)\s*(.*)function\s*([a-zA-Z_0-9]*)\(/gm;
    return file.replace(slashToStar, function(){
      var m;
      m = arguments;
      return m[0].replace(m[2], m[2] + "\n */\n").replace("//", "/**").replace(/\s*\/\//g, " ");
    });
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
    if (!res) {
      file = slashcomments(file);
      res = file.match(regx);
    }
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
