/** Get documentation in comments from source file */

/**
 * Quickly strip HTML
 */
cleaner = (comment) -> 
    comment = comment.replace(/</gm, "&lt;").replace(/>/gm, "&gt;") if comment
    comment

/**
 * Change // slash comments into star comments 
 * First // becomes /**, last line adds end comment tag
 */
slashcomments = (file) ->
    slashToStar = /((\s*\/\/\s*.*\n)+)\s*(.*)function\s*([a-zA-Z_0-9]*)\(/gm;
    file.replace slashToStar, -> 
        m = arguments
        # m[2] == last comment, m[0] = full match
        m[0].replace(m[2], m[2] + "\n */\n").replace("//", "/**").replace(/ ?\/\//g, " ")

/**
  * Extract comments from a file 
  */
getdocs = (file, docs, cleanup=cleaner) ->
    docs = docs or {}
    # /((\s*\/\/\s*.*\n)+)\s*(.*)function\s*([^(]*)\(/m
    # /((\s*\/\/\s*.*\n)+)\s*(.*)function\s*([a-zA-Z_0-9]*)\(/gm
    file = file.replace(/\n\s*\*[^/]\s*/g, " "); # get rid of * inside comments
    # match /** comments */ function named(
    #regx = /\/\*\*+\s*(.*)\n*\s*\*\/\s*function\s+(.*)\(/m; 
    # ["/**", 1+, ws, 0+, anything, 0+, ws, 0+, "*/\n", 1, anything, 0+, newline, 0 or 1, ws, 0+, non-ws, 0+, ws, 0+, "=" or ":", 0 or 1, ws, 0+, "function", 1, ws, 0+, anything, 0+, "(" ]
    # regx = /\/\*\*+\s*(.*)\s*\*\/\n(.*\n?)\s*(\S*)\s*(=|:)?\s*function\s*(.*)\(/m;
    # /** $1 */\n $3 $4 $5 function $6(
    regx = /\/\*\*+\s*(.*)\s*\*\/\n((.*\n?)\s+(\S+)\s*(=|:))?\s*function\s*(\w*)\s*\(/m;
    res = file.match regx
    if not res
        file = slashcomments(file)
        res = file.match regx
    while res
        # docs[res[3] || res[5]] = res[1]
        docs[res[4] || res[6]] = cleanup(res[1])
        res = res.input.substring(res[0].length + res.index).match regx
    docs

test_getdocs_function = ->
    input = '/** comment */\n function kool_stuff (abc, def) { return   function () { body }}';
    docs = getdocs(input);
    console.assert(docs["kool_stuff"] == "comment ");
    docs

test_getdocs_anon = ->
    input = '/** comment */\n var anon = function (abc, def) { return   function () { body }}';
    docs = getdocs(input);
    console.assert(docs["anon"] is "comment ");
    docs

module.exports = getdocs if typeof module == "object"
