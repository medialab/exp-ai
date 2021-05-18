!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/exp-ai/",r(r.s=7)}([function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(2);function i(t,e){if(t){if("string"===typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},,function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},function(t,e,r){t.exports=r(6)},function(t,e){t.exports=[{name:"Performance",id:"performance",color:"#0096D1",short_description:"L'AUC est un nombre entre 0 et 1 mesurant la performance de l'algorithme. Un algorithme performant poss\xe8de un AUC proche de 1. Comme traditionnellement dans l\u2019industrie du Machine Learning, on supposera que le data scientist banquier est d\u2019abord incit\xe9 sur le crit\xe8re de la performance de son algorithme car l\u2019AUC est proportionnel au gain financier procur\xe9 par l\u2019algorithme.",iteration:0},{name:"Disparate impact (femmes/hommes)",id:"fairness_disparate_impact",color:"#984F0E",short_description:"il s\u2019agit du ratio du pourcentage d\u2019acceptation du cr\xe9dit chez les femmes sur le pourcentage d\u2019acceptation chez les hommes. Lorsque ce ratio est \xe9gal \xe0 1, on consid\xe9rera qu\u2019il n\u2019y pas d\u2019effet disparate entre les hommes et les femmes. La r\xe8gle des 80% est utilis\xe9e par le droit am\xe9ricain pour d\xe9tecter des effets discriminants : si le ratio du disparate impact est en-dessous de 80% alors on dira qu'il y a effet disparate entre hommes et femmes.",iteration:0},{name:"Interpr\xe9tabilit\xe9",id:"interpretability",color:"#ECC0A5",type:"integer",short_description:"Selon la l\xe9gislation (RGPD), les demandeurs ont le droit d'exiger une explication des d\xe9cisions. On consid\xe8rera que l\u2019oppos\xe9 du nombre total de variables dans le mod\xe8le comme un proxy de l\u2019interpr\xe9tabilit\xe9 des algorithmes. En effet, des explications avec 20 variables seront beaucoup plus difficiles \xe0 fournir qu\u2019une explication avec 5 variables.",iteration:0},{name:"Privacy",id:"privacy",color:"#8D5F5B",type:"integer",short_description:"Selon les conventions des droits de l\u2019hommes, chaque individu a le droit de disposer de ses donn\xe9es personnelles. Selon la RGPD, il faut donc veiller \xe0 ce que ces donn\xe9es priv\xe9es soient r\xe9colt\xe9es de mani\xe8re parcimonieuse (principe de minimisation), pour des finalit\xe9s bien d\xe9termin\xe9es (principe de finalit\xe9), limiter les failles de s\xe9curit\xe9, les fuites possibles, etc. Nous prendrons l\u2019oppos\xe9 du nombre de variables personnelles comme proxy de la privacy. Le nombre de variables priv\xe9es est \xe9galement un proxy de la vuln\xe9rabilit\xe9 aux failles de s\xe9curit\xe9 par attaques (s\xe9curit\xe9).",iteration:1},{name:"Disparate impact (travailleur \xe9tranger)",id:"disparate_impact_foreign",color:"#8D5F5B",short_description:"il s\u2019agit du ratio du pourcentage d\u2019acceptation du cr\xe9dit chez les travailleurs \xe9trangers sur le pourcentage d\u2019acceptation chez les hommes. Lorsque ce ratio est \xe9gal \xe0 1, on consid\xe9rera qu\u2019il n\u2019y pas d\u2019effet disparate entre les hommes et les femmes. La r\xe8gle des 80% est utilis\xe9e par le droit am\xe9ricain pour d\xe9tecter des effets discriminants : si le ratio du disparate impact est en-dessous de 80% alors on dira qu'il y a effet disparate entre hommes et femmes.",iteration:1}]},,function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(P){c=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var i=e&&e.prototype instanceof m?e:m,o=Object.create(i.prototype),a=new L(n||[]);return o._invoke=function(t,e,r){var n=f;return function(i,o){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===i)throw o;return A()}for(r.method=i,r.arg=o;;){var a=r.delegate;if(a){var u=j(a,r);if(u){if(u===g)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?p:h,c.arg===g)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}(t,r,a),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(P){return{type:"throw",arg:P}}}t.wrap=s;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",g={};function m(){}function y(){}function v(){}var b={};b[o]=function(){return this};var w=Object.getPrototypeOf,M=w&&w(w(S([])));M&&M!==r&&n.call(M,o)&&(b=M);var x=v.prototype=m.prototype=Object.create(b);function N(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function r(i,o,a,u){var c=l(t[i],t,o);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return r("throw",t,a,u)}))}u(c.arg)}var i;this._invoke=function(t,n){function o(){return new e((function(e,i){r(t,n,e,i)}))}return i=i?i.then(o,o):o()}}function j(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,j(t,r),"throw"===r.method))return g;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var i=l(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var o=i.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function S(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function r(){for(;++i<t.length;)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:A}}function A(){return{value:e,done:!0}}return y.prototype=x.constructor=v,v.constructor=y,y.displayName=c(v,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,c(t,u,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},N(k.prototype),k.prototype[a]=function(){return this},t.AsyncIterator=k,t.async=function(e,r,n,i,o){void 0===o&&(o=Promise);var a=new k(s(e,r,n,i),o);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},N(x),c(x,u,"Generator"),x[o]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return u.type="throw",u.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],u=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;E(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=n}catch(i){Function("r","regeneratorRuntime = r")(n)}},function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}r.r(e),r.d(e,"getVisibleModels",(function(){return Tt}));var a=r(0);function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,i=!1,o=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(c){i=!0,o=c}finally{try{n||null==u.return||u.return()}finally{if(i)throw o}}return r}}(t,e)||Object(a.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){var r;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=Object(a.a)(t))||e&&t&&"number"===typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,c=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return u=t.done,t},e:function(t){c=!0,o=t},f:function(){try{u||null==r.return||r.return()}finally{if(c)throw o}}}}var s=Math.sqrt(50),l=Math.sqrt(10),f=Math.sqrt(2);function h(t,e,r){var n=(e-t)/Math.max(0,r),i=Math.floor(Math.log(n)/Math.LN10),o=n/Math.pow(10,i);return i>=0?(o>=s?10:o>=l?5:o>=f?2:1)*Math.pow(10,i):-Math.pow(10,-i)/(o>=s?10:o>=l?5:o>=f?2:1)}var d=function(t,e){return t<e?-1:t>e?1:t>=e?0:NaN},p=function(t){var e=t,r=t;function n(t,e,n,i){for(null==n&&(n=0),null==i&&(i=t.length);n<i;){var o=n+i>>>1;r(t[o],e)<0?n=o+1:i=o}return n}return 1===t.length&&(e=function(e,r){return t(e)-r},r=function(t){return function(e,r){return d(t(e),r)}}(t)),{left:n,center:function(t,r,i,o){null==i&&(i=0),null==o&&(o=t.length);var a=n(t,r,i,o-1);return a>i&&e(t[a-1],r)>-e(t[a],r)?a-1:a},right:function(t,e,n,i){for(null==n&&(n=0),null==i&&(i=t.length);n<i;){var o=n+i>>>1;r(t[o],e)>0?i=o:n=o+1}return n}}};r(3);var g=p(d),m=g.right,y=(g.left,p((function(t){return null===t?NaN:+t})).center,m),v=function(t,e,r){t.prototype=e.prototype=r,r.constructor=t};function b(t,e){var r=Object.create(t.prototype);for(var n in e)r[n]=e[n];return r}function w(){}var M=.7,x=1/M,N="\\s*([+-]?\\d+)\\s*",k="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",j="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",O=/^#([0-9a-f]{3,8})$/,E=new RegExp("^rgb\\("+[N,N,N]+"\\)$"),L=new RegExp("^rgb\\("+[j,j,j]+"\\)$"),S=new RegExp("^rgba\\("+[N,N,N,k]+"\\)$"),A=new RegExp("^rgba\\("+[j,j,j,k]+"\\)$"),P=new RegExp("^hsl\\("+[k,j,j]+"\\)$"),_=new RegExp("^hsla\\("+[k,j,j,k]+"\\)$"),q={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function R(){return this.rgb().formatHex()}function C(){return this.rgb().formatRgb()}function D(t){var e,r;return t=(t+"").trim().toLowerCase(),(e=O.exec(t))?(r=e[1].length,e=parseInt(e[1],16),6===r?F(e):3===r?new G(e>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):8===r?I(e>>24&255,e>>16&255,e>>8&255,(255&e)/255):4===r?I(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|240&e,((15&e)<<4|15&e)/255):null):(e=E.exec(t))?new G(e[1],e[2],e[3],1):(e=L.exec(t))?new G(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=S.exec(t))?I(e[1],e[2],e[3],e[4]):(e=A.exec(t))?I(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=P.exec(t))?B(e[1],e[2]/100,e[3]/100,1):(e=_.exec(t))?B(e[1],e[2]/100,e[3]/100,e[4]):q.hasOwnProperty(t)?F(q[t]):"transparent"===t?new G(NaN,NaN,NaN,0):null}function F(t){return new G(t>>16&255,t>>8&255,255&t,1)}function I(t,e,r,n){return n<=0&&(t=e=r=NaN),new G(t,e,r,n)}function $(t){return t instanceof w||(t=D(t)),t?new G((t=t.rgb()).r,t.g,t.b,t.opacity):new G}function z(t,e,r,n){return 1===arguments.length?$(t):new G(t,e,r,null==n?1:n)}function G(t,e,r,n){this.r=+t,this.g=+e,this.b=+r,this.opacity=+n}function T(){return"#"+U(this.r)+U(this.g)+U(this.b)}function H(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}function U(t){return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16)}function B(t,e,r,n){return n<=0?t=e=r=NaN:r<=0||r>=1?t=e=NaN:e<=0&&(t=NaN),new Y(t,e,r,n)}function V(t){if(t instanceof Y)return new Y(t.h,t.s,t.l,t.opacity);if(t instanceof w||(t=D(t)),!t)return new Y;if(t instanceof Y)return t;var e=(t=t.rgb()).r/255,r=t.g/255,n=t.b/255,i=Math.min(e,r,n),o=Math.max(e,r,n),a=NaN,u=o-i,c=(o+i)/2;return u?(a=e===o?(r-n)/u+6*(r<n):r===o?(n-e)/u+2:(e-r)/u+4,u/=c<.5?o+i:2-o-i,a*=60):u=c>0&&c<1?0:a,new Y(a,u,c,t.opacity)}function Y(t,e,r,n){this.h=+t,this.s=+e,this.l=+r,this.opacity=+n}function X(t,e,r){return 255*(t<60?e+(r-e)*t/60:t<180?r:t<240?e+(r-e)*(240-t)/60:e)}function Z(t,e,r,n,i){var o=t*t,a=o*t;return((1-3*t+3*o-a)*e+(4-6*o+3*a)*r+(1+3*t+3*o-3*a)*n+a*i)/6}v(w,D,{copy:function(t){return Object.assign(new this.constructor,this,t)},displayable:function(){return this.rgb().displayable()},hex:R,formatHex:R,formatHsl:function(){return V(this).formatHsl()},formatRgb:C,toString:C}),v(G,z,b(w,{brighter:function(t){return t=null==t?x:Math.pow(x,t),new G(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?M:Math.pow(M,t),new G(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:T,formatHex:T,formatRgb:H,toString:H})),v(Y,(function(t,e,r,n){return 1===arguments.length?V(t):new Y(t,e,r,null==n?1:n)}),b(w,{brighter:function(t){return t=null==t?x:Math.pow(x,t),new Y(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?M:Math.pow(M,t),new Y(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),e=isNaN(t)||isNaN(this.s)?0:this.s,r=this.l,n=r+(r<.5?r:1-r)*e,i=2*r-n;return new G(X(t>=240?t-240:t+120,i,n),X(t,i,n),X(t<120?t+240:t-120,i,n),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===t?")":", "+t+")")}}));var J=function(t){return function(){return t}};function K(t,e){return function(r){return t+r*e}}function Q(t){return 1===(t=+t)?W:function(e,r){return r-e?function(t,e,r){return t=Math.pow(t,r),e=Math.pow(e,r)-t,r=1/r,function(n){return Math.pow(t+n*e,r)}}(e,r,t):J(isNaN(e)?r:e)}}function W(t,e){var r=e-t;return r?K(t,r):J(isNaN(t)?e:t)}var tt=function t(e){var r=Q(e);function n(t,e){var n=r((t=z(t)).r,(e=z(e)).r),i=r(t.g,e.g),o=r(t.b,e.b),a=W(t.opacity,e.opacity);return function(e){return t.r=n(e),t.g=i(e),t.b=o(e),t.opacity=a(e),t+""}}return n.gamma=t,n}(1);function et(t){return function(e){var r,n,i=e.length,o=new Array(i),a=new Array(i),u=new Array(i);for(r=0;r<i;++r)n=z(e[r]),o[r]=n.r||0,a[r]=n.g||0,u[r]=n.b||0;return o=t(o),a=t(a),u=t(u),n.opacity=1,function(t){return n.r=o(t),n.g=a(t),n.b=u(t),n+""}}}et((function(t){var e=t.length-1;return function(r){var n=r<=0?r=0:r>=1?(r=1,e-1):Math.floor(r*e),i=t[n],o=t[n+1],a=n>0?t[n-1]:2*i-o,u=n<e-1?t[n+2]:2*o-i;return Z((r-n/e)*e,a,i,o,u)}})),et((function(t){var e=t.length;return function(r){var n=Math.floor(((r%=1)<0?++r:r)*e),i=t[(n+e-1)%e],o=t[n%e],a=t[(n+1)%e],u=t[(n+2)%e];return Z((r-n/e)*e,i,o,a,u)}}));var rt=function(t,e){e||(e=[]);var r,n=t?Math.min(e.length,t.length):0,i=e.slice();return function(o){for(r=0;r<n;++r)i[r]=t[r]*(1-o)+e[r]*o;return i}};function nt(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function it(t,e){var r,n=e?e.length:0,i=t?Math.min(n,t.length):0,o=new Array(i),a=new Array(n);for(r=0;r<i;++r)o[r]=ft(t[r],e[r]);for(;r<n;++r)a[r]=e[r];return function(t){for(r=0;r<i;++r)a[r]=o[r](t);return a}}var ot=function(t,e){var r=new Date;return t=+t,e=+e,function(n){return r.setTime(t*(1-n)+e*n),r}},at=function(t,e){return t=+t,e=+e,function(r){return t*(1-r)+e*r}},ut=function(t,e){var r,n={},i={};for(r in null!==t&&"object"===typeof t||(t={}),null!==e&&"object"===typeof e||(e={}),e)r in t?n[r]=ft(t[r],e[r]):i[r]=e[r];return function(t){for(r in n)i[r]=n[r](t);return i}},ct=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,st=new RegExp(ct.source,"g");var lt=function(t,e){var r,n,i,o=ct.lastIndex=st.lastIndex=0,a=-1,u=[],c=[];for(t+="",e+="";(r=ct.exec(t))&&(n=st.exec(e));)(i=n.index)>o&&(i=e.slice(o,i),u[a]?u[a]+=i:u[++a]=i),(r=r[0])===(n=n[0])?u[a]?u[a]+=n:u[++a]=n:(u[++a]=null,c.push({i:a,x:at(r,n)})),o=st.lastIndex;return o<e.length&&(i=e.slice(o),u[a]?u[a]+=i:u[++a]=i),u.length<2?c[0]?function(t){return function(e){return t(e)+""}}(c[0].x):function(t){return function(){return t}}(e):(e=c.length,function(t){for(var r,n=0;n<e;++n)u[(r=c[n]).i]=r.x(t);return u.join("")})},ft=function(t,e){var r,n=typeof e;return null==e||"boolean"===n?J(e):("number"===n?at:"string"===n?(r=D(e))?(e=r,tt):lt:e instanceof D?tt:e instanceof Date?ot:nt(e)?rt:Array.isArray(e)?it:"function"!==typeof e.valueOf&&"function"!==typeof e.toString||isNaN(e)?ut:at)(t,e)},ht=function(t,e){return t=+t,e=+e,function(r){return Math.round(t*(1-r)+e*r)}};function dt(t){return+t}var pt=[0,1];function gt(t){return t}function mt(t,e){return(e-=t=+t)?function(r){return(r-t)/e}:(r=isNaN(e)?NaN:.5,function(){return r});var r}function yt(t,e,r){var n=t[0],i=t[1],o=e[0],a=e[1];return i<n?(n=mt(i,n),o=r(a,o)):(n=mt(n,i),o=r(o,a)),function(t){return o(n(t))}}function vt(t,e,r){var n=Math.min(t.length,e.length)-1,i=new Array(n),o=new Array(n),a=-1;for(t[n]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++a<n;)i[a]=mt(t[a],t[a+1]),o[a]=r(e[a],e[a+1]);return function(e){var r=y(t,e,1,n)-1;return o[r](i[r](e))}}function bt(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function wt(){var t,e,r,n,i,o,a=pt,u=pt,c=ft,s=gt;function l(){var t=Math.min(a.length,u.length);return s!==gt&&(s=function(t,e){var r;return t>e&&(r=t,t=e,e=r),function(r){return Math.max(t,Math.min(e,r))}}(a[0],a[t-1])),n=t>2?vt:yt,i=o=null,f}function f(e){return isNaN(e=+e)?r:(i||(i=n(a.map(t),u,c)))(t(s(e)))}return f.invert=function(r){return s(e((o||(o=n(u,a.map(t),at)))(r)))},f.domain=function(t){return arguments.length?(a=Array.from(t,dt),l()):a.slice()},f.range=function(t){return arguments.length?(u=Array.from(t),l()):u.slice()},f.rangeRound=function(t){return u=Array.from(t),c=ht,l()},f.clamp=function(t){return arguments.length?(s=!!t||gt,l()):s!==gt},f.interpolate=function(t){return arguments.length?(c=t,l()):c},f.unknown=function(t){return arguments.length?(r=t,f):r},function(r,n){return t=r,e=n,l()}}function Mt(){return wt()(gt,gt)}function xt(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t)}return this}var Nt=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function kt(t){if(!(e=Nt.exec(t)))throw new Error("invalid format: "+t);var e;return new jt({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}function jt(t){this.fill=void 0===t.fill?" ":t.fill+"",this.align=void 0===t.align?">":t.align+"",this.sign=void 0===t.sign?"-":t.sign+"",this.symbol=void 0===t.symbol?"":t.symbol+"",this.zero=!!t.zero,this.width=void 0===t.width?void 0:+t.width,this.comma=!!t.comma,this.precision=void 0===t.precision?void 0:+t.precision,this.trim=!!t.trim,this.type=void 0===t.type?"":t.type+""}kt.prototype=jt.prototype,jt.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(void 0===this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(void 0===this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};function Ot(t,e){if((r=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var r,n=t.slice(0,r);return[n.length>1?n[0]+n.slice(2):n,+t.slice(r+1)]}var Et,Lt,St,At,Pt=function(t){return(t=Ot(Math.abs(t)))?t[1]:NaN},_t=function(t,e){var r=Ot(t,e);if(!r)return t+"";var n=r[0],i=r[1];return i<0?"0."+new Array(-i).join("0")+n:n.length>i+1?n.slice(0,i+1)+"."+n.slice(i+1):n+new Array(i-n.length+2).join("0")},qt={"%":function(t,e){return(100*t).toFixed(e)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)},e:function(t,e){return t.toExponential(e)},f:function(t,e){return t.toFixed(e)},g:function(t,e){return t.toPrecision(e)},o:function(t){return Math.round(t).toString(8)},p:function(t,e){return _t(100*t,e)},r:_t,s:function(t,e){var r=Ot(t,e);if(!r)return t+"";var n=r[0],i=r[1],o=i-(Et=3*Math.max(-8,Math.min(8,Math.floor(i/3))))+1,a=n.length;return o===a?n:o>a?n+new Array(o-a+1).join("0"):o>0?n.slice(0,o)+"."+n.slice(o):"0."+new Array(1-o).join("0")+Ot(t,Math.max(0,e+o-1))[0]},X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}},Rt=function(t){return t},Ct=Array.prototype.map,Dt=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"];Lt=function(t){var e,r,n=void 0===t.grouping||void 0===t.thousands?Rt:(e=Ct.call(t.grouping,Number),r=t.thousands+"",function(t,n){for(var i=t.length,o=[],a=0,u=e[0],c=0;i>0&&u>0&&(c+u+1>n&&(u=Math.max(1,n-c)),o.push(t.substring(i-=u,i+u)),!((c+=u+1)>n));)u=e[a=(a+1)%e.length];return o.reverse().join(r)}),i=void 0===t.currency?"":t.currency[0]+"",o=void 0===t.currency?"":t.currency[1]+"",a=void 0===t.decimal?".":t.decimal+"",u=void 0===t.numerals?Rt:function(t){return function(e){return e.replace(/[0-9]/g,(function(e){return t[+e]}))}}(Ct.call(t.numerals,String)),c=void 0===t.percent?"%":t.percent+"",s=void 0===t.minus?"\u2212":t.minus+"",l=void 0===t.nan?"NaN":t.nan+"";function f(t){var e=(t=kt(t)).fill,r=t.align,f=t.sign,h=t.symbol,d=t.zero,p=t.width,g=t.comma,m=t.precision,y=t.trim,v=t.type;"n"===v?(g=!0,v="g"):qt[v]||(void 0===m&&(m=12),y=!0,v="g"),(d||"0"===e&&"="===r)&&(d=!0,e="0",r="=");var b="$"===h?i:"#"===h&&/[boxX]/.test(v)?"0"+v.toLowerCase():"",w="$"===h?o:/[%p]/.test(v)?c:"",M=qt[v],x=/[defgprs%]/.test(v);function N(t){var i,o,c,h=b,N=w;if("c"===v)N=M(t)+N,t="";else{var k=(t=+t)<0||1/t<0;if(t=isNaN(t)?l:M(Math.abs(t),m),y&&(t=function(t){t:for(var e,r=t.length,n=1,i=-1;n<r;++n)switch(t[n]){case".":i=e=n;break;case"0":0===i&&(i=n),e=n;break;default:if(!+t[n])break t;i>0&&(i=0)}return i>0?t.slice(0,i)+t.slice(e+1):t}(t)),k&&0===+t&&"+"!==f&&(k=!1),h=(k?"("===f?f:s:"-"===f||"("===f?"":f)+h,N=("s"===v?Dt[8+Et/3]:"")+N+(k&&"("===f?")":""),x)for(i=-1,o=t.length;++i<o;)if(48>(c=t.charCodeAt(i))||c>57){N=(46===c?a+t.slice(i+1):t.slice(i))+N,t=t.slice(0,i);break}}g&&!d&&(t=n(t,1/0));var j=h.length+t.length+N.length,O=j<p?new Array(p-j+1).join(e):"";switch(g&&d&&(t=n(O+t,O.length?p-N.length:1/0),O=""),r){case"<":t=h+t+N+O;break;case"=":t=h+O+t+N;break;case"^":t=O.slice(0,j=O.length>>1)+h+t+N+O.slice(j);break;default:t=O+h+t+N}return u(t)}return m=void 0===m?6:/[gprs]/.test(v)?Math.max(1,Math.min(21,m)):Math.max(0,Math.min(20,m)),N.toString=function(){return t+""},N}return{format:f,formatPrefix:function(t,e){var r=f(((t=kt(t)).type="f",t)),n=3*Math.max(-8,Math.min(8,Math.floor(Pt(e)/3))),i=Math.pow(10,-n),o=Dt[8+n/3];return function(t){return r(i*t)+o}}}}({thousands:",",grouping:[3],currency:["$",""]}),St=Lt.format,At=Lt.formatPrefix;function Ft(t,e,r,n){var i,o=function(t,e,r){var n=Math.abs(e-t)/Math.max(0,r),i=Math.pow(10,Math.floor(Math.log(n)/Math.LN10)),o=n/i;return o>=s?i*=10:o>=l?i*=5:o>=f&&(i*=2),e<t?-i:i}(t,e,r);switch((n=kt(null==n?",f":n)).type){case"s":var a=Math.max(Math.abs(t),Math.abs(e));return null!=n.precision||isNaN(i=function(t,e){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(Pt(e)/3)))-Pt(Math.abs(t)))}(o,a))||(n.precision=i),At(n,a);case"":case"e":case"g":case"p":case"r":null!=n.precision||isNaN(i=function(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,Pt(e)-Pt(t))+1}(o,Math.max(Math.abs(t),Math.abs(e))))||(n.precision=i-("e"===n.type));break;case"f":case"%":null!=n.precision||isNaN(i=function(t){return Math.max(0,-Pt(Math.abs(t)))}(o))||(n.precision=i-2*("%"===n.type))}return St(n)}function It(t){var e=t.domain;return t.ticks=function(t){var r=e();return function(t,e,r){var n,i,o,a,u=-1;if(r=+r,(t=+t)===(e=+e)&&r>0)return[t];if((n=e<t)&&(i=t,t=e,e=i),0===(a=h(t,e,r))||!isFinite(a))return[];if(a>0)for(t=Math.ceil(t/a),e=Math.floor(e/a),o=new Array(i=Math.ceil(e-t+1));++u<i;)o[u]=(t+u)*a;else for(a=-a,t=Math.ceil(t*a),e=Math.floor(e*a),o=new Array(i=Math.ceil(e-t+1));++u<i;)o[u]=(t+u)/a;return n&&o.reverse(),o}(r[0],r[r.length-1],null==t?10:t)},t.tickFormat=function(t,r){var n=e();return Ft(n[0],n[n.length-1],null==t?10:t,r)},t.nice=function(r){null==r&&(r=10);var n,i,o=e(),a=0,u=o.length-1,c=o[a],s=o[u],l=10;for(s<c&&(i=c,c=s,s=i,i=a,a=u,u=i);l-- >0;){if((i=h(c,s,r))===n)return o[a]=c,o[u]=s,e(o);if(i>0)c=Math.floor(c/i)*i,s=Math.ceil(s/i)*i;else{if(!(i<0))break;c=Math.ceil(c*i)/i,s=Math.floor(s*i)/i}n=i}return t},t}function $t(){var t=Mt();return t.copy=function(){return bt(t,$t())},xt.apply(t,arguments),It(t)}var zt=r(4),Gt=r.n(zt),Tt=function(t){var e,r=t.models,i=t.filters,a=t.sortMode,s=t.metricsOrder,l=function(t,e){return e.reduce((function(t,e){return t.filter((function(t){var r=e.variable,n=e.type,i=e.range,o=t[r];switch(e.variables&&(o=-t.variables.filter((function(t){return e.variables.includes(t)})).length),n){case"range":default:var a=u(i.sort((function(t,e){return t>e?1:-1})),2),c=a[0],s=a[1];return o>=c&&o<=s}}))}),t)}(r,Object.entries(i).map((function(t){var e=u(t,2);e[0];return e[1]}))),f=Gt.a.reduce((function(t,e){var r=e.id,i=function(t,e){var r,n;if(void 0===e){var i,o=c(t);try{for(o.s();!(i=o.n()).done;){var a=i.value;null!=a&&(void 0===r?a>=a&&(r=n=a):(r>a&&(r=a),n<a&&(n=a)))}}catch(h){o.e(h)}finally{o.f()}}else{var u,s=-1,l=c(t);try{for(l.s();!(u=l.n()).done;){var f=u.value;null!=(f=e(f,++s,t))&&(void 0===r?f>=f&&(r=n=f):(r>f&&(r=f),n<f&&(n=f)))}}catch(h){l.e(h)}finally{l.f()}}return[r,n]}(l,(function(t){return+t[r]})),a=$t().domain(i).range([0,1]);return o(o({},t),{},n({},r,a))}),{});return e="similarity"===a?function(t,e){return function(t,e,r,n){var i=r.map((function(e){return n[e](+t[e])})),o=r.map((function(t){return n[t](+e[t])})),a=r.reduce((function(t,e,r){return t+(o[r]-i[r])}),0);return a>0?1:a<0?-1:0}(t,e,s.map((function(t){return t.id})),f)}:function(t,e){return+t[a]>+e[a]?-1:+t[a]<+e[a]?1:0},l=l.sort(e)};addEventListener("message",(function(t){var r,n=t.data,i=n.type,o=n.method,a=n.id,u=n.params;"RPC"===i&&o&&((r=e[o])?Promise.resolve().then((function(){return r.apply(e,u)})):Promise.reject("No such method")).then((function(t){postMessage({type:"RPC",id:a,result:t})})).catch((function(t){var e={message:t};t.stack&&(e.message=t.message,e.stack=t.stack,e.name=t.name),postMessage({type:"RPC",id:a,error:e})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=dfa43dd701d72fce06cc.worker.js.map