var toc = function (nav, selector){
  nav = nav || document.querySelector('nav ul.toc');
  var i$, ref$, len$, span, txt, li, a, results$ = [];
  nav.innerHTML = '';
  for (i$ = 0, len$ = (ref$ = document.querySelectorAll(selector || 'code span.function.name,span.meta.function-call')).length; i$ < len$; ++i$) {
    span = ref$[i$];
    txt = span.textContent || span.innerHTML;
    txt = txt.replace(/\W/g, "");
    var spanid = txt + '-id';
    span.id = spanid;
    span.setAttribute && span.setAttribute('id', spanid);
    // nav.innerHTML += '<li><a href=#' + spanid + '>' + txt + '</a></li>'
    li = document.createElement('li');
    a = document.createElement('a');
    a.href = "#" + spanid;
    a.innerHTML = txt
    li.appendChild(a);
    nav.appendChild(li)
    results$.push(txt);
  }
  if ("undefined" !== typeof console) console.log(results$);
  return results$;
}

if (typeof Rainbow !== "undefined" && Rainbow.color) Rainbow.color(toc); 
// else 
// if (document.querySelector) setTimeout(function() { toc(document.querySelector('nav ul.toc')) }, 900);

