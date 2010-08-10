var hljs=new function(){var q={};var a={};function o(c){return c.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function l(t,s){if(!t){return false}for(var c=0;c<t.length;c++){if(t[c]==s){return true}}return false}function e(t,s,c){var u="m"+(t.cI?"i":"")+(c?"g":"");return new RegExp(s,u)}function k(s){for(var c=0;c<s.childNodes.length;c++){node=s.childNodes[c];if(node.nodeName=="CODE"){return node}if(!(node.nodeType==3&&node.nodeValue.match(/\s+/))){return null}}}function i(t){var s="";for(var c=0;c<t.childNodes.length;c++){if(t.childNodes[c].nodeType==3){s+=t.childNodes[c].nodeValue}else{if(t.childNodes[c].nodeName=="BR"){s+="\n"}else{s+=i(t.childNodes[c])}}}return s}function b(u){var s=u.className.split(/\s+/);s=s.concat(u.parentNode.className.split(/\s+/));for(var c=0;c<s.length;c++){var t=s[c].replace(/^language-/,"");if(t=="no-highlight"){throw"No highlight"}if(q[t]){return t}}}function d(c){var s=[];(function(u,v){for(var t=0;t<u.childNodes.length;t++){if(u.childNodes[t].nodeType==3){v+=u.childNodes[t].nodeValue.length}else{if(u.childNodes[t].nodeName=="BR"){v+=1}else{s.push({event:"start",offset:v,node:u.childNodes[t]});v=arguments.callee(u.childNodes[t],v);s.push({event:"stop",offset:v,node:u.childNodes[t]})}}}return v})(c,0);return s}function n(A,B,z){var t=0;var y="";var v=[];function w(){if(A.length&&B.length){if(A[0].offset!=B[0].offset){return(A[0].offset<B[0].offset)?A:B}else{return(A[0].event=="start"&&B[0].event=="stop")?B:A}}else{return A.length?A:B}}function u(F){var G="<"+F.nodeName.toLowerCase();for(var D=0;D<F.attributes.length;D++){var E=F.attributes[D];G+=" "+E.nodeName.toLowerCase();if(E.nodeValue!=undefined){G+='="'+o(E.nodeValue)+'"'}}return G+">"}function C(D){return"</"+D.nodeName.toLowerCase()+">"}while(A.length||B.length){var x=w().splice(0,1)[0];y+=o(z.substr(t,x.offset-t));t=x.offset;if(x.event=="start"){y+=u(x.node);v.push(x.node)}else{if(x.event=="stop"){var s=v.length;do{s--;var c=v[s];y+=C(c)}while(c!=x.node);v.splice(s,1);while(s<v.length){y+=u(v[s]);s++}}}}y+=z.substr(t);return y}function h(K,E){function L(Q,P){Q.sm=[];for(var O=0;O<Q.c.length;O++){for(var N=0;N<P.m.length;N++){if(P.m[N].cN==Q.c[O]){Q.sm[Q.sm.length]=P.m[N]}}}}function A(N,P){if(!P.c){return null}if(!P.sm){L(P,I)}for(var O=0;O<P.sm.length;O++){if(P.sm[O].bR.test(N)){return P.sm[O]}}return null}function x(O,N){if(D[O].e&&D[O].eR.test(N)){return 1}if(D[O].eW){var P=x(O-1,N);return P?P+1:0}return 0}function y(N,O){return O.iR&&O.iR.test(N)}function B(T,R){var P=[];function S(U){if(!l(P,U)){P[P.length]=U}}if(T.c){for(var O=0;O<R.m.length;O++){if(l(T.c,R.m[O].cN)){S(R.m[O].b)}}}var N=D.length-1;do{if(D[N].e){S(D[N].e)}N--}while(D[N+1].eW);if(T.i){S(T.i)}var Q="("+P[0];for(var O=0;O<P.length;O++){Q+="|"+P[O]}Q+=")";return e(R,Q)}function t(P,O){var Q=D[D.length-1];if(!Q.t){Q.t=B(Q,I)}P=P.substr(O);var N=Q.t.exec(P);if(!N){return[P,"",true]}if(N.index==0){return["",N[0],false]}else{return[P.substr(0,N.index),N[0],false]}}function s(R,N){var O=I.cI?N[0].toLowerCase():N[0];for(var Q in R.keywordGroups){if(!R.keywordGroups.hasOwnProperty(Q)){continue}var P=R.keywordGroups[Q].hasOwnProperty(O);if(P){return[Q,P]}}return false}function G(Q,T){if(!T.k||!T.l){return o(Q)}if(!T.lR){var S="("+T.l[0];for(var P=1;P<T.l.length;P++){S+="|"+T.l[P]}S+=")";T.lR=e(I,S,true)}var R="";var U=0;T.lR.lastIndex=0;var O=T.lR.exec(Q);while(O){R+=o(Q.substr(U,O.index-U));var N=s(T,O);if(N){u+=N[1];R+='<span class="'+N[0]+'">'+o(O[0])+"</span>"}else{R+=o(O[0])}U=T.lR.lastIndex;O=T.lR.exec(Q)}R+=o(Q.substr(U,Q.length-U));return R}function M(N,P){if(P.subLanguage&&a[P.subLanguage]){var O=h(P.subLanguage,N);u+=O.keyword_count;C+=O.r;return O.value}else{return G(N,P)}}function J(P,N){var O=P.nM?"":'<span class="'+P.displayClassName+'">';if(P.rB){c+=O;P.buffer=""}else{if(P.eB){c+=o(N)+O;P.buffer=""}else{c+=O;P.buffer=N}}D[D.length]=P}function F(S,O,T){var U=D[D.length-1];if(T){c+=M(U.buffer+S,U);return false}var P=A(O,U);if(P){c+=M(U.buffer+S,U);J(P,O);C+=P.r;return P.rB}var N=x(D.length-1,O);if(N){var R=U.nM?"":"</span>";if(U.rE){c+=M(U.buffer+S,U)+R}else{if(U.eE){c+=M(U.buffer+S,U)+R+o(O)}else{c+=M(U.buffer+S+O,U)+R}}while(N>1){R=D[D.length-2].nM?"":"</span>";c+=R;N--;D.length--}D.length--;D[D.length-1].buffer="";if(U.starts){for(var Q=0;Q<I.m.length;Q++){if(I.m[Q].cN==U.starts){J(I.m[Q],"");break}}}return U.rE}if(y(O,U)){throw"Illegal"}}var I=q[K];var D=[I.dM];var C=0;var u=0;var c="";try{var w=0;I.dM.buffer="";do{var z=t(E,w);var v=F(z[0],z[1],z[2]);w+=z[0].length;if(!v){w+=z[1].length}}while(!z[2]);if(D.length>1){throw"Illegal"}return{r:C,keyword_count:u,value:c}}catch(H){if(H=="Illegal"){return{r:0,keyword_count:0,value:o(E)}}else{throw H}}}function j(){for(var s in q){if(!q.hasOwnProperty(s)){continue}var t=q[s];for(var c=0;c<t.m.length;c++){var u=t.m[c];if(u.b){u.bR=e(t,"^"+u.b)}if(u.e){u.eR=e(t,"^"+u.e)}if(u.i){u.iR=e(t,"^(?:"+u.i+")")}t.dM.iR=e(t,"^(?:"+t.dM.i+")");if(u.r==undefined){u.r=1}if(!u.displayClassName){u.displayClassName=u.cN}}}}function g(){function t(w){if(!w.keywordGroups){for(var v in w.k){if(!w.k.hasOwnProperty(v)){continue}if(w.k[v] instanceof Object){w.keywordGroups=w.k}else{w.keywordGroups={keyword:w.k}}break}}}for(var s in q){if(!q.hasOwnProperty(s)){continue}var u=q[s];t(u.dM);for(var c=0;c<u.m.length;c++){t(u.m[c])}}}function f(){if(f.called){return}f.called=true;j();g();a=q}function r(y,C){f();try{var F=i(y);var v=b(y)}catch(z){if(z=="No highlight"){return}}if(v){var B=h(v,F).value}else{var D=0;for(var E in a){if(!a.hasOwnProperty(E)){continue}var t=h(E,F);var c=t.keyword_count+t.r;if(c>D){D=c;var B=t.value;v=E}}}if(B){var x=y.className;if(!x.match(v)){x+=" "+v}var s=d(y);if(s.length){var u=document.createElement("pre");u.innerHTML=B;B=n(s,d(u),F)}if(C){B=B.replace(/^((<[^>]+>|\t)+)/gm,function(G,J,I,H){return J.replace(/\t/g,C)})}var A=document.createElement("div");A.innerHTML='<pre><code class="'+x+'">'+B+"</code></pre>";var w=y.parentNode.parentNode;w.replaceChild(A.firstChild,y.parentNode)}}function m(){if(m.called){return}m.called=true;f();if(arguments.length){for(var c=0;c<arguments.length;c++){if(q[arguments[c]]){a[arguments[c]]=q[arguments[c]]}}}var t=document.getElementsByTagName("pre");for(var c=0;c<t.length;c++){var s=k(t[c]);if(s){r(s,hljs.tabReplace)}}}function p(){var c=arguments;var s=function(){m.apply(null,c)};if(window.addEventListener){window.addEventListener("DOMContentLoaded",s,false);window.addEventListener("load",s,false)}else{if(window.attachEvent){window.attachEvent("onload",s)}else{window.onload=s}}}this.LANGUAGES=q;this.initHighlightingOnLoad=p;this.highlightBlock=r;this.initHighlighting=m;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:["escape"],r:0};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:["escape"],r:0};this.BE={cN:"escape",b:"\\\\.",e:"^",nM:true,r:0};this.CLCM={cN:"comment",b:"//",e:"$",r:0};this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"};this.HCM={cN:"comment",b:"#",e:"$"};this.CNM={cN:"number",b:this.CNR,e:"^",r:0}}();var initHighlightingOnLoad=hljs.initHighlightingOnLoad;hljs.LANGUAGES.bash=function(){var a={"true":1,"false":1};return{dM:{l:[hljs.IR],c:["string","shebang","comment","number","test_condition","string","variable"],k:{keyword:{"if":1,then:1,"else":1,fi:1,"for":1,"break":1,"continue":1,"while":1,"in":1,"do":1,done:1,echo:1,exit:1,"return":1,set:1,declare:1},literal:a}},cI:false,m:[{cN:"shebang",b:"(#!\\/bin\\/bash)|(#!\\/bin\\/sh)",e:"^",r:10},hljs.HCM,{cN:"test_condition",b:"\\[ ",e:" \\]",c:["string","variable","number"],l:[hljs.IR],k:{literal:a},r:0},{cN:"test_condition",b:"\\[\\[ ",e:" \\]\\]",c:["string","variable","number"],l:[hljs.IR],k:{literal:a}},{cN:"variable",b:"\\$([a-zA-Z0-9_]+)\\b",e:"^"},{cN:"variable",b:"\\$\\{(([^}])|(\\\\}))+\\}",e:"^",c:["number"]},{cN:"string",b:'"',e:'"',i:"\\n",c:["escape","variable"],r:0},{cN:"string",b:'"',e:'"',i:"\\n",c:["escape","variable"],r:0},hljs.BE,hljs.CNM,{cN:"comment",b:"\\/\\/",e:"$",i:"."}]}}();hljs.LANGUAGES.diff={cI:true,dM:{c:["chunk","header","addition","deletion","change"]},m:[{cN:"chunk",b:"^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$",e:"^",r:10},{cN:"chunk",b:"^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$",e:"^",r:10},{cN:"chunk",b:"^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$",e:"^",r:10},{cN:"header",b:"Index: ",e:"$"},{cN:"header",b:"=====",e:"=====$"},{cN:"header",b:"^\\-\\-\\-",e:"$"},{cN:"header",b:"^\\*{3} ",e:"$"},{cN:"header",b:"^\\+\\+\\+",e:"$"},{cN:"header",b:"\\*{5}",e:"\\*{5}$"},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",b:"^\\!",e:"$"}]};hljs.XML_COMMENT={cN:"comment",b:"<!--",e:"-->"};hljs.XML_ATTR={cN:"attribute",b:"\\s[A-Za-z0-9\\._:-]+=",e:"^",c:["value"]};hljs.XML_VALUE_QUOT={cN:"value",b:'"',e:'"'};hljs.XML_VALUE_APOS={cN:"value",b:"'",e:"'"};hljs.LANGUAGES.xml={dM:{c:["pi","comment","cdata","tag"]},cI:true,m:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},hljs.XML_COMMENT,{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>"},{cN:"tag",b:"</?",e:">",c:["title","tag_internal"],r:1.5},{cN:"title",b:"[A-Za-z0-9\\._:-]+",e:"^",r:0},{cN:"tag_internal",b:"^",eW:true,nM:true,c:["attribute"],r:0,i:"[\\+\\.]"},hljs.XML_ATTR,hljs.XML_VALUE_QUOT,hljs.XML_VALUE_APOS]};hljs.HTML_TAGS={code:1,kbd:1,font:1,noscript:1,style:1,img:1,title:1,menu:1,tt:1,tr:1,param:1,li:1,tfoot:1,th:1,input:1,td:1,dl:1,blockquote:1,fieldset:1,big:1,dd:1,abbr:1,optgroup:1,dt:1,button:1,isindex:1,p:1,small:1,div:1,dir:1,em:1,frame:1,meta:1,sub:1,bdo:1,label:1,acronym:1,sup:1,body:1,xml:1,basefont:1,base:1,br:1,address:1,strong:1,legend:1,ol:1,script:1,caption:1,s:1,col:1,h2:1,h3:1,h1:1,h6:1,h4:1,h5:1,table:1,select:1,noframes:1,span:1,area:1,dfn:1,strike:1,cite:1,thead:1,head:1,option:1,form:1,hr:1,"var":1,link:1,b:1,colgroup:1,ul:1,applet:1,del:1,iframe:1,pre:1,frameset:1,ins:1,tbody:1,html:1,samp:1,map:1,object:1,a:1,xmlns:1,center:1,textarea:1,i:1,q:1,u:1};hljs.HTML_DOCTYPE={cN:"doctype",b:"<!DOCTYPE",e:">",r:10};hljs.HTML_ATTR={cN:"attribute",b:"\\s[a-zA-Z\\:_-]+=",e:"^",c:["value"]};hljs.HTML_SHORT_ATTR={cN:"attribute",b:" [a-zA-Z]+",e:"^"};hljs.HTML_VALUE={cN:"value",b:"[a-zA-Z0-9]+",e:"^"};hljs.LANGUAGES.html={dM:{c:["tag","comment","doctype","vbscript"]},cI:true,m:[hljs.XML_COMMENT,hljs.HTML_DOCTYPE,{cN:"tag",l:[hljs.IR],k:hljs.HTML_TAGS,b:"<style",e:">",c:["attribute"],i:"[\\+\\.]",starts:"css"},{cN:"tag",l:[hljs.IR],k:hljs.HTML_TAGS,b:"<script",e:">",c:["attribute"],i:"[\\+\\.]",starts:"javascript"},{cN:"tag",l:[hljs.IR],k:hljs.HTML_TAGS,b:"<[A-Za-z/]",e:">",c:["attribute"],i:"[\\+\\.]"},{cN:"css",e:"</style>",rE:true,subLanguage:"css"},{cN:"javascript",e:"<\/script>",rE:true,subLanguage:"javascript"},hljs.HTML_ATTR,hljs.HTML_SHORT_ATTR,hljs.XML_VALUE_QUOT,hljs.XML_VALUE_APOS,hljs.HTML_VALUE,{cN:"vbscript",b:"<%",e:"%>",subLanguage:"vbscript"}]};hljs.LANGUAGES.javascript={dM:{l:[hljs.UIR],c:["string","comment","number","regexp_container","function"],k:{keyword:{"in":1,"if":1,"for":1,"while":1,"finally":1,"var":1,"new":1,"function":1,"do":1,"return":1,"void":1,"else":1,"break":1,"catch":1,"instanceof":1,"with":1,"throw":1,"case":1,"default":1,"try":1,"this":1,"switch":1,"continue":1,"typeof":1,"delete":1},literal:{"true":1,"false":1,"null":1}}},m:[hljs.CLCM,hljs.CBLCLM,hljs.CNM,hljs.ASM,hljs.QSM,hljs.BE,{cN:"regexp_container",b:"("+hljs.RSR+"|case|return|throw)\\s*",e:"^",nM:true,l:[hljs.IR],k:{"return":1,"throw":1,"case":1},c:["comment","regexp"],r:0},{cN:"regexp",b:"/.*?[^\\\\/]/[gim]*",e:"^"},{cN:"function",b:"\\bfunction\\b",e:"{",l:[hljs.UIR],k:{"function":1},c:["title","params"]},{cN:"title",b:"[A-Za-z$_][0-9A-Za-z$_]*",e:"^"},{cN:"params",b:"\\(",e:"\\)",c:["string","comment"]}]};hljs.LANGUAGES.css={dM:{c:["at_rule","id","class","attr_selector","pseudo","rules","comment"],k:hljs.HTML_TAGS,l:[hljs.IR],i:"="},cI:true,m:[{cN:"at_rule",b:"@",e:"[{;]",eE:true,l:[hljs.IR],k:{"import":1,page:1,media:1,charset:1,"font-face":1},c:["function","string","number","pseudo"]},{cN:"id",b:"\\#[A-Za-z0-9_-]+",e:"^"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",e:"^",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+",e:"^"},{cN:"rules",b:"{",e:"}",c:["rule","comment"],i:"[^\\s]"},{cN:"rule",b:"[A-Z\\_\\.\\-]+\\s*:",e:";",eW:true,l:["[A-Za-z-]+"],k:{"play-during":1,"counter-reset":1,"counter-increment":1,"min-height":1,quotes:1,"border-top":1,pitch:1,font:1,pause:1,"list-style-image":1,"border-width":1,cue:1,"outline-width":1,"border-left":1,elevation:1,richness:1,"speech-rate":1,"border-bottom":1,"border-spacing":1,background:1,"list-style-type":1,"text-align":1,"page-break-inside":1,orphans:1,"page-break-before":1,"text-transform":1,"line-height":1,"padding-left":1,"font-size":1,right:1,"word-spacing":1,"padding-top":1,"outline-style":1,bottom:1,content:1,"border-right-style":1,"padding-right":1,"border-left-style":1,"voice-family":1,"background-color":1,"border-bottom-color":1,"outline-color":1,"unicode-bidi":1,"max-width":1,"font-family":1,"caption-side":1,"border-right-width":1,"pause-before":1,"border-top-style":1,color:1,"border-collapse":1,"border-bottom-width":1,"float":1,height:1,"max-height":1,"margin-right":1,"border-top-width":1,speak:1,"speak-header":1,top:1,"cue-before":1,"min-width":1,width:1,"font-variant":1,"border-top-color":1,"background-position":1,"empty-cells":1,direction:1,"border-right":1,visibility:1,padding:1,"border-style":1,"background-attachment":1,overflow:1,"border-bottom-style":1,cursor:1,margin:1,display:1,"border-left-width":1,"letter-spacing":1,"vertical-align":1,clip:1,"border-color":1,"list-style":1,"padding-bottom":1,"pause-after":1,"speak-numeral":1,"margin-left":1,widows:1,border:1,"font-style":1,"border-left-color":1,"pitch-range":1,"background-repeat":1,"table-layout":1,"margin-bottom":1,"speak-punctuation":1,"font-weight":1,"border-right-color":1,"page-break-after":1,position:1,"white-space":1,"text-indent":1,"background-image":1,volume:1,stress:1,outline:1,clear:1,"z-index":1,"text-decoration":1,"margin-top":1,azimuth:1,"cue-after":1,left:1,"list-style-position":1},c:["value"]},hljs.CBLCLM,{cN:"value",b:"^",eW:true,eE:true,c:["function","number","hexcolor","string"]},{cN:"number",b:hljs.NR,e:"^"},{cN:"hexcolor",b:"\\#[0-9A-F]+",e:"^"},{cN:"function",b:hljs.IR+"\\(",e:"\\)",c:["params"]},{cN:"params",b:"^",eW:true,eE:true,c:["number","string"]},hljs.ASM,hljs.QSM]};hljs.LANGUAGES.python={dM:{l:[hljs.UIR],i:"(</|->)",c:["comment","string","function","class","number","decorator"],k:{keyword:{and:1,elif:1,is:1,global:1,as:1,"in":1,"if":1,from:1,raise:1,"for":1,except:1,"finally":1,print:1,"import":1,pass:1,"return":1,exec:1,"else":1,"break":1,not:1,"with":1,"class":1,assert:1,yield:1,"try":1,"while":1,"continue":1,del:1,or:1,def:1,lambda:1,nonlocal:10},built_in:{None:1,True:1,False:1,Ellipsis:1,NotImplemented:1}}},m:[{cN:"function",l:[hljs.UIR],b:"\\bdef ",e:":",i:"$",k:{def:1},c:["title","params"],r:10},{cN:"class",l:[hljs.UIR],b:"\\bclass ",e:":",i:"[${]",k:{"class":1},c:["title","params"],r:10},{cN:"title",b:hljs.UIR,e:"^"},{cN:"params",b:"\\(",e:"\\)",c:["string"]},hljs.HCM,hljs.CNM,{cN:"string",b:"u?r?'''",e:"'''",r:10},{cN:"string",b:'u?r?"""',e:'"""',r:10},hljs.ASM,hljs.QSM,hljs.BE,{cN:"string",b:"(u|r|ur)'",e:"'",c:["escape"],r:10},{cN:"string",b:'(u|r|ur)"',e:'"',c:["escape"],r:10},{cN:"decorator",b:"@",e:"$"}]};hljs.LANGUAGES.sql={cI:true,dM:{c:["operator","comment"],i:"[^\\s]"},m:[{cN:"operator",b:"(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma)\\b",e:";|$",c:["string","number","newline"],l:["[a-zA-Z][a-zA-Z0-9_\\.]*"],k:{keyword:{all:1,partial:1,global:1,month:1,current_timestamp:1,using:1,go:1,revoke:1,smallint:1,indicator:1,"end-exec":1,disconnect:1,zone:1,"with":1,character:1,assertion:1,to:1,add:1,current_user:1,usage:1,input:1,local:1,alter:1,match:1,collate:1,real:1,then:1,rollback:1,get:1,read:1,timestamp:1,session_user:1,not:1,integer:1,bit:1,unique:1,day:1,minute:1,desc:1,insert:1,execute:1,like:1,ilike:2,level:1,decimal:1,drop:1,"continue":1,isolation:1,found:1,where:1,constraints:1,domain:1,right:1,national:1,some:1,module:1,transaction:1,relative:1,second:1,connect:1,escape:1,close:1,system_user:1,"for":1,deferred:1,section:1,cast:1,current:1,sqlstate:1,allocate:1,intersect:1,deallocate:1,numeric:1,"public":1,preserve:1,full:1,"goto":1,initially:1,asc:1,no:1,key:1,output:1,collation:1,group:1,by:1,union:1,session:1,both:1,last:1,language:1,constraint:1,column:1,of:1,space:1,foreign:1,deferrable:1,prior:1,connection:1,unknown:1,action:1,commit:1,view:1,or:1,first:1,into:1,"float":1,year:1,primary:1,cascaded:1,except:1,restrict:1,set:1,references:1,names:1,table:1,outer:1,open:1,select:1,size:1,are:1,rows:1,from:1,prepare:1,distinct:1,leading:1,create:1,only:1,next:1,inner:1,authorization:1,schema:1,corresponding:1,option:1,declare:1,precision:1,immediate:1,"else":1,timezone_minute:1,external:1,varying:1,translation:1,"true":1,"case":1,exception:1,join:1,hour:1,"default":1,"double":1,scroll:1,value:1,cursor:1,descriptor:1,values:1,dec:1,fetch:1,procedure:1,"delete":1,and:1,"false":1,"int":1,is:1,describe:1,"char":1,as:1,at:1,"in":1,varchar:1,"null":1,trailing:1,any:1,absolute:1,current_time:1,end:1,grant:1,privileges:1,when:1,cross:1,check:1,write:1,current_date:1,pad:1,begin:1,temporary:1,exec:1,time:1,update:1,catalog:1,user:1,sql:1,date:1,on:1,identity:1,timezone_hour:1,natural:1,whenever:1,interval:1,work:1,order:1,cascade:1,diagnostics:1,nchar:1,having:1,left:1,call:1,"do":1,handler:1,load:1,replace:1,truncate:1,start:1,lock:1,show:1,pragma:1},aggregate:{count:1,sum:1,min:1,max:1,avg:1}}},{cN:"newline",b:"\\n",e:"^",nM:true},hljs.CNM,hljs.CBLCLM,{cN:"comment",b:"--",e:"$"},{cN:"string",b:"'",e:"'",c:["escape","squote"],r:0},{cN:"squote",b:"''",e:"^",nM:true},{cN:"string",b:'"',e:'"',c:["escape","dquote"],r:0},{cN:"dquote",b:'""',e:"^",nM:true},{cN:"string",b:"`",e:"`",c:["escape"]},hljs.BE]};hljs.LANGUAGES.django={dM:{c:["tag","comment","doctype","template_comment","template_tag","variable"]},cI:true,m:[hljs.XML_COMMENT,hljs.HTML_DOCTYPE,{cN:"tag",l:[hljs.IR],k:hljs.HTML_TAGS,b:"<[A-Za-z/]",e:">",c:["attribute","template_comment","template_tag","variable"]},hljs.HTML_ATTR,hljs.HTML_SHORT_ATTR,{cN:"value",b:'"',e:'"',c:["template_comment","template_tag","variable"]},hljs.HTML_VALUE,{cN:"template_comment",b:"\\{\\%\\s*comment\\s*\\%\\}",e:"\\{\\%\\s*endcomment\\s*\\%\\}"},{cN:"template_comment",b:"\\{#",e:"#\\}"},{cN:"template_tag",b:"\\{\\%",e:"\\%\\}",l:[hljs.IR],k:{comment:1,endcomment:1,load:1,templatetag:1,ifchanged:1,endifchanged:1,"if":1,endif:1,firstof:1,"for":1,endfor:1,"in":1,ifnotequal:1,endifnotequal:1,widthratio:1,"extends":1,include:1,spaceless:1,endspaceless:1,regroup:1,by:1,as:1,ifequal:1,endifequal:1,ssi:1,now:1,"with":1,cycle:1,url:1,filter:1,endfilter:1,debug:1,block:1,endblock:1,"else":1},c:["filter"]},{cN:"variable",b:"\\{\\{",e:"\\}\\}",c:["filter"]},{cN:"filter",b:"\\|[A-Za-z]+\\:?",e:"^",eE:true,l:[hljs.IR],k:{truncatewords:1,removetags:1,linebreaksbr:1,yesno:1,get_digit:1,timesince:1,random:1,striptags:1,filesizeformat:1,escape:1,linebreaks:1,length_is:1,ljust:1,rjust:1,cut:1,urlize:1,fix_ampersands:1,title:1,floatformat:1,capfirst:1,pprint:1,divisibleby:1,add:1,make_list:1,unordered_list:1,urlencode:1,timeuntil:1,urlizetrunc:1,wordcount:1,stringformat:1,linenumbers:1,slice:1,date:1,dictsort:1,dictsortreversed:1,default_if_none:1,pluralize:1,lower:1,join:1,center:1,"default":1,truncatewords_html:1,upper:1,length:1,phone2numeric:1,wordwrap:1,time:1,addslashes:1,slugify:1,first:1},c:["argument"]},{cN:"argument",b:'"',e:'"'}]};