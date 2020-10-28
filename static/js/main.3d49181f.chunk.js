(this["webpackJsonpexp-ai"]=this["webpackJsonpexp-ai"]||[]).push([[0],{110:function(e,t,n){},111:function(e,t,n){},183:function(e,t,n){},186:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"SET_METRICS_ORDER",(function(){return C})),n.d(r,"getData",(function(){return q})),n.d(r,"setMetricsOrder",(function(){return E})),n.d(r,"default",(function(){return P})),n.d(r,"selector",(function(){return D}));var i={};n.r(i),n.d(i,"setCurrentStep",(function(){return w})),n.d(i,"setNumberOfSteps",(function(){return L})),n.d(i,"setMetricsOrderIsValidated",(function(){return V})),n.d(i,"default",(function(){return M})),n.d(i,"selector",(function(){return U}));var a=n(2),s=n(0),c=n.n(s),o=n(10),u=n.n(o),l=(n(86),n.p,n(87),n(11)),d=n(73),p=n(1),m=n(6),b=n(24),f=n(3),j=function(e,t,n){var r=e.replace("SET_","").toLowerCase().replace(/(_[a-z])/gi,(function(e,t){return t.substr(1).toUpperCase()}));return Object(p.a)(Object(p.a)({},n),{},Object(f.a)({},r,t))},O=n(15),v=n(76),h=n.n(v),g=n(194),_=(n(108),function(){return new Promise((function(e,t){h()("".concat("/exp-ai","/models-sample.csv")).then((function(t){var n=t.data;e(function(e){return e.map((function(e,t){return Object(p.a)(Object(p.a)({},e),{},{variables:e.nom_modele.split(" "),nom_modele:void 0,id:t})}))}(Object(g.a)(n)))})).catch(t)}))}),x=n(77),y=n.n(x),S="GET_DATA",C="SET_METRICS_ORDER",q=function(e){return{type:S,payload:e,promise:function(){return _()}}},E=function(e){return{type:C,payload:e}},N={models:[],metricsOrder:Object(O.a)(y.a)};var P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0,n=t.payload,r=t.result;switch(t.type){case"".concat(S):return e;case"".concat(S,"_SUCCESS"):return Object(p.a)(Object(p.a)({},e),{},{models:r});case"".concat(S,"_ERROR"):return e;case C:return j(t.type,n,e);default:return e}},D=Object(b.a)({models:function(e){return e.models},metricsOrder:function(e){return e.metricsOrder}}),I="SET_CURRENT_STEP",R="SET_NUMBER_OF_STEPS",T="SET_METRICS_ORDER_IS_VALIDATED",w=function(e){return{type:I,payload:e}},L=function(e){return{type:R,payload:e}},V=function(e){return{type:T,payload:e}},k={currentStep:0,numberOfSteps:5,metricsOrderIsValidated:!1};var M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0,n=t.payload;switch(t.type){case I:case R:case T:return j(t.type,n,e);case C:return Object(p.a)(Object(p.a)({},e),{},{metricsOrderIsValidated:!1});default:return e}},U=Object(b.a)({currentStep:function(e){return e.currentStep},numberOfSteps:function(e){return e.numberOfSteps},metricsOrderIsValidated:function(e){return e.metricsOrderIsValidated}}),A=n(5),z=n(8),F=n.n(z);n(110);var G=function(e){var t=e.currentStep,n=e.numberOfSteps,r=e.setCurrentStep,i=Object(s.useState)([]),c=Object(A.a)(i,2),o=c[0],u=c[1];return Object(s.useMemo)((function(){for(var e=new Array(n),t=0;t<e.length;t++)e[t]=t;u(e)}),[n]),Object(a.jsx)("nav",{className:"step-nav",children:Object(a.jsx)("ul",{className:"step-nav-items-container",children:o.map((function(e,n){return Object(a.jsx)("li",{className:F()("step-nav-item",{active:n===t}),onClick:function(){return r(n)}},n)}))})})},B=(n(111),n(12)),H=n(193),X={opacity:1,maxHeight:"calc(100vh - 4rem)",minHeight:"calc(100vh - 4rem)"},J={opacity:0,maxHeight:0,minHeight:0},W={entering:X,entered:X,exiting:J,exited:J};var K=function(e){var t=e.children,n=e.active,r=e.style,i=void 0===r?{}:r,s=Object(B.a)(e,["children","active","style"]);return Object(a.jsx)(H.a,{in:n,timeout:300,children:function(e){return Object(a.jsx)("div",Object(p.a)(Object(p.a)({className:"step-container"},s),{},{style:Object(p.a)(Object(p.a)({},i),W[e]),children:t}))}})},Q=n(20),Y=n.n(Q),Z=n(78),$=n.n(Z),ee=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"fr";if("fr"===t)return $.a[e]||e};var te=function(e){var t=e.onClick,n=e.disabled;return Object(a.jsx)("div",{className:"continue-button-container",children:Object(a.jsx)("button",{disabled:n,onClick:t,className:"continue-button",children:ee("next_step")})})};var ne=Object(l.b)((function(e,t){return Object(p.a)(Object(p.a)(Object(p.a)({},t),e),U(e.ui))}),(function(e){return Object(m.b)(Object(p.a)({},i),e)}))((function(e){var t=e.ui.currentStep,n=e.setCurrentStep;return Object(a.jsxs)("header",{className:"header",children:[Object(a.jsx)("h1",{children:ee("site_title")}),Object(a.jsx)(Y.a,{source:"Vous participez \xe0 une enqu\xeate dans le cadre de la conception d\u2019un outil de Machine Learning. Cette enqu\xeate est r\xe9alis\xe9e par l\u2019Institut Mines-T\xe9l\xe9com et Sciences Po dans le cadre d\u2019un travail de recherche.\n"}),Object(a.jsx)(te,{onClick:function(){return n(t+1)}})]})}));var re=Object(l.b)((function(e,t){return Object(p.a)(Object(p.a)(Object(p.a)({},t),e),U(e.ui))}),(function(e){return Object(m.b)(Object(p.a)({},i),e)}))((function(e){var t=e.ui.currentStep,n=e.setCurrentStep;return Object(a.jsxs)("section",{className:"step-1",children:[Object(a.jsx)("h1",{children:ee("step_1_title")}),Object(a.jsx)(Y.a,{source:"Supposez que vous \xeates un data scientist dans une banque et que l\u2019on vous demande de r\xe9aliser un\nalgorithme de ML pour la pr\xe9diction du risque de d\xe9faut de vos clients \xe0 partir d\u2019un historique de\ndonn\xe9es. Vous avez \xe0 disposition les donn\xe9es sur une interface et nous vous demandons de cr\xe9er le\nclassifieur de ML \xe0 l\u2019aide de l\u2019outil Dataiku.\n"}),Object(a.jsx)("h2",{children:"Todo form dataiku"}),Object(a.jsx)(te,{onClick:function(){return n(t+1)}})]})}));var ie=Object(l.b)((function(e,t){return Object(p.a)(Object(p.a)(Object(p.a)({},t),e),U(e.ui))}),(function(e){return Object(m.b)(Object(p.a)({},i),e)}))((function(e){var t=e.ui.currentStep,n=e.setCurrentStep;return Object(a.jsxs)("section",{className:"step-2",children:[Object(a.jsx)("h1",{children:ee("step_2_title")}),Object(a.jsx)(Y.a,{source:"Un mouvement actuel \u2013 qu\u2019on appelle g\xe9n\xe9ralement \xe9thique de l\u2019IA - compos\xe9 d\u2019organisations\ninternationales (OCDE, commission europ\xe9enne), publiques, d\u2019entreprises, universitaires,\nassociations, ont produit un certain nombre de critiques concernant l\u2019IA \xe0 travers des chartes\n\xe9thiques, des indicateurs, des principes, etc. Par exemple, la charte \xe9thique de la commission\neurop\xe9enne met en avant les principes suivants pour construire une IA digne de confiance :\n\n1. Capacit\xe9 d\u2019agir humaine (human agency)\n1. Robustesse technique et s\xe9curit\xe9\n1. Protection des donn\xe9es personnelles et gouvernance des donn\xe9es\n1. Transparence\n1. Diversit\xe9, non-discrimination et \xe9quit\xe9\n1. Bien-\xeatre soci\xe9tal et environnemental\n1. Responsabilit\xe9\n"}),Object(a.jsx)(te,{onClick:function(){return n(t+1)}})]})})),ae=n(40);var se=Object(l.b)((function(e,t){return Object(p.a)(Object(p.a)(Object(p.a)(Object(p.a)({},t),e),U(e.ui)),D(e.data))}),(function(e){return Object(m.b)(Object(p.a)(Object(p.a)({},i),r),e)}))((function(e){var t=e.ui,n=t.currentStep,r=t.numberOfSteps,i=t.metricsOrderIsValidated,s=e.data.metricsOrder,c=e.setCurrentStep,o=e.setMetricsOrder,u=e.setNumberOfSteps,l=e.setMetricsOrderIsValidated;return Object(a.jsxs)("section",{className:"sort-screen",children:[Object(a.jsx)("h1",{children:ee("sort_screen_title")}),Object(a.jsx)("p",{children:ee("sort_screen_prompt")}),Object(a.jsx)(ae.a,{onDragEnd:function(e){if(e.destination){var t=function(e,t,n){var r=Array.from(e),i=r.splice(t,1),a=Object(A.a)(i,1)[0];return r.splice(n,0,a),r}(s,e.source.index,e.destination.index);o(t)}},children:Object(a.jsx)(ae.c,{droppableId:"droppable",children:function(e,t){return Object(a.jsxs)("div",Object(p.a)(Object(p.a)({},e.droppableProps),{},{ref:e.innerRef,style:(n=t.isDraggingOver,{background:n?"lightblue":"lightgrey",padding:8,width:250}),children:[s.map((function(e,t){return Object(a.jsx)(ae.b,{draggableId:e.name,index:t,children:function(t,n){return Object(a.jsx)("div",Object(p.a)(Object(p.a)(Object(p.a)({ref:t.innerRef},t.draggableProps),t.dragHandleProps),{},{style:(r=n.isDragging,i=t.draggableProps.style,Object(p.a)({userSelect:"none",padding:16,margin:"0 0 ".concat(8,"px 0"),background:r?"lightgreen":"grey"},i)),children:Object(a.jsxs)("h3",{children:[e.name," "]})}));var r,i}},e.name)})),e.placeholder]}));var n}})}),Object(a.jsx)("button",{disabled:i,onClick:function(){l(!0),u(6)},children:"Valider"}),Object(a.jsx)(te,{disabled:!i||r<=5,onClick:function(){return c(n+1)}})]})}));var ce=Object(l.b)((function(e,t){return Object(p.a)(Object(p.a)(Object(p.a)({},t),e),U(e.ui))}),(function(e){return Object(m.b)(Object(p.a)({},i),e)}))((function(e){var t=e.ui.currentStep,n=e.setCurrentStep;return Object(a.jsxs)("section",{className:"step-2",children:[Object(a.jsx)("h1",{children:ee("step_3_title")}),Object(a.jsx)(Y.a,{source:"Pour toutes les combinaisons possibles de mod\xe8les sur l\u2019ensemble des 20 features, nous avons construit un classifieur \xe0 l\u2019aide d\u2019un mod\xe8le logistique. Cela fait en tout 2 097 130 classifieurs. Pour chacun de ces classifieurs, nous calculons les indicateurs suivants :\n\n- **Performance** : L'AUC mesure la performance de l'algorithme. Comme traditionnellement dans l\u2019industrie du Machine Learning, on supposera que le data scientist banquier est d\u2019abord incit\xe9 sur le crit\xe8re de la performance de son algorithme car l\u2019AUC est proportionnel au gain financier procur\xe9 par l\u2019algorithme\n- **Disparate impact sur le genre** : il s\u2019agit d\u2019un ratio entre le pourcentage d\u2019acceptation chez les femmes et le pourcentage d\u2019acceptation chez les hommes. Lorsque ce ratio est \xe9gal \xe0 1, on consid\xe9rera qu\u2019il n\u2019y pas d\u2019effet disparate entre les hommes et les femmes. Attention, un effet disparate tr\xe8s diff\xe9rent de 1 ne signifie pas qu\u2019il y a diff\xe9rence de traitement. Un effet disparate dit simplement que l\u2019on constate deux effets diff\xe9rents entre les hommes et les femmes sans s\u2019int\xe9resser aux causes de cet effet (le traitement). La diff\xe9rence de traitement peut se tester avec des analyses toute chose \xe9gale par ailleurs (testing de CV par exemple). Dans la litt\xe9rature, il y a deux mani\xe8res de prendre une d\xe9cision sur l\u2019indicateur du disparate impact :\n  - La r\xe8gle des 80% : la r\xe8gle des 80% est utilis\xe9e par le droit am\xe9ricain pour d\xe9tecter des effets discriminants. Si le ratio du disparate impact est en-dessous de 80% alors on dira qu'il y a effet disparate entre hommes et femme.\n  - Ne pas amplifier les biais \xe0 l\u2019int\xe9rieur des donn\xe9es d\u2019apprentissage : le Machine Learning peut amplifier le disparate impact d\xe9j\xe0 pr\xe9sent dans les donn\xe9es. Pour information, l'effet disparate dans nos donn\xe9es d\u2019apprentissage (historique de donn\xe9es issues de d\xe9cisions humaines pass\xe9es) est de 0,90. Si cet effet est plus grand dans l'algorithme, alors l'algorithme aura amplifi\xe9 les biais dans les donn\xe9es.\n- **Distribution des erreurs entre hommes et femmes** : Une autre mani\xe8re compl\xe9mentaire de s\u2019int\xe9resser aux discriminations algorithmiques est de de s\u2019int\xe9resser \xe0 la distribution des erreurs entre hommes et femmes. L\u2019erreur dans l\u2019allocation du droit au cr\xe9dit peut p\xe9naliser les individus dans leur capacit\xe9 d\u2019agir (acheter une maison, voiture, etc). Il est donc primordial que celle-ci soit distribu\xe9 de la m\xeame mani\xe8re entre les hommes et les femmes. L\u2019indicateur de la pr\xe9cision mesure le taux de pr\xe9dictions corrects (c\u2019est-\xe0-dire vrais positifs + vrais n\xe9gatifs). Une mani\xe8re de mesurer la diff\xe9rence entre ces taux est de faire la soustraction entre la pr\xe9cision chez les hommes et la pr\xe9cision entre les femmes.\n- **Privacy** : Selon les conventions des droits de l\u2019hommes, chaque individu a le droit de disposer de ses donn\xe9es personnelles. Selon la RGPD, il faut donc veiller \xe0 ce que ces donn\xe9es priv\xe9es soient r\xe9colt\xe9es de mani\xe8re parcimonieuse (principe de minimisation), pour des finalit\xe9s bien d\xe9termin\xe9es (principe de finalit\xe9), limiter les failles de s\xe9curit\xe9, les fuites possibles, etc, Nous prendrons l\u2019oppos\xe9 du nombre de variables personnelles comme proxy de la privacy. Les 11 variables personnelles sont present_emp_since, sex, personal.\\_status, present_res_since ,property, age, housing, job, people_under_maintenance, telephone, foreign_worker. Le nombre de variables priv\xe9es est \xe9galement un proxy de la vuln\xe9rabilit\xe9 aux failles de s\xe9curit\xe9 par attaques (s\xe9curit\xe9).\n- **Interpr\xe9tabilit\xe9** : Selon la l\xe9gislation (RGPD), les demandeurs ont le droit d'exiger une explication des d\xe9cisions. On consid\xe8rera que l\u2019oppos\xe9 du nombre total de variables dans le mod\xe8le comme un proxy de l\u2019interpr\xe9tabilit\xe9 des algorithmes. En effet, des explications avec 20 variables seront beaucoup plus difficiles \xe0 fournir qu\u2019une explication avec 5 variables.\n"}),Object(a.jsx)(te,{onClick:function(){return n(t+1)}})]})}));n(183);var oe=function(e){var t=e.metrics;return Object(a.jsx)("div",{className:"metrics-crossing-indicator",children:Object(a.jsx)("ul",{className:"crossing-indicator-items",children:t.map((function(e){return Object(a.jsx)("li",{className:F()("crossing-indicator-item",{active:e.active}),children:e.name},e.name)}))})})},ue=n(191),le=n(192),de=n(50);n(185);var pe=n(39),me=n.n(pe),be=de.a.createSliderWithTooltip(de.a.Range);function fe(e){var t=e.onChange,n=e.validate,r=e.value,i=Object(B.a)(e,["onChange","validate","value"]),c=Object(s.useState)(r),o=Object(A.a)(c,2),u=o[0],l=o[1];return Object(s.useEffect)((function(){l(r)}),[r]),Object(a.jsx)("input",Object(p.a)(Object(p.a)({},i),{},{onChange:function(e){l(e.target.value)},onBlur:function(){n(u)?t(u):l(r)},value:u}))}function je(e){var t=e.metric,n=e.values,r=e.min,i=e.max,s=e.onRangeChange,c=e.filteredVariables,o=e.onFilteredVariablesChange,u=c.reduce((function(e,t){return Object(p.a)(Object(p.a)({},e),{},Object(f.a)({},t,!0))}),{}),l=1e4;return Object(a.jsxs)("div",{className:"variable-inputs",children:[Object(a.jsxs)("h5",{children:["Choix pour ",Object(a.jsx)("code",{children:t.name})]}),"Privacy"===t.id?Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:"Choisir les variables relevant de la privacy"}),Object(a.jsx)("ul",{children:me.a.map((function(e){var t=e.id,n=e.name;return Object(a.jsxs)("li",{onClick:function(){var e;e=u[t]?c.filter((function(e){return t!==e})):[].concat(Object(O.a)(c),[t]),o(e)},children:[Object(a.jsx)("input",{checked:void 0!==u[t],value:t,readOnly:!0,type:"radio"}),Object(a.jsx)("label",{children:n})]},t)}))})]}):null,Object(a.jsxs)("p",{children:["Mod\xe8les entre"," ",Object(a.jsx)(fe,{validate:function(e){return!isNaN(e)&&e<n[1]},onChange:function(e){s([e,n[1]])},value:""+n[0]})," ","et"," ",Object(a.jsx)(fe,{validate:function(e){return!isNaN(e)&&e>n[0]},value:""+n[1],onChange:function(e){s([n[0],e])}})," ","(min: ",r,", max: ",i,")"]}),Object(a.jsx)(be,{allowCross:!1,tipFormatter:function(e){return e/l},onChange:function(e){var t=Object(A.a)(e,2),n=t[0],r=t[1];s([n/l,r/l])},step:"integer"===t.type?l:void 0,min:r*l,max:i*l,defaultValue:[r*l,i*l],value:[n[0]*l,n[1]*l],style:{width:"50vw"}})]})}var Oe=function(e){var t,n,r,i=e.metrics,c=e.models,o=e.onSubmit,u=e.filters,l=void 0===u?[]:u,d=Object(A.a)(i,2),p=d[0],m=d[1],b=Object(s.useState)(0),f=Object(A.a)(b,2),j=f[0],v=f[1],h=Object(s.useState)(0),g=Object(A.a)(h,2),_=g[0],x=g[1],y=Object(s.useState)(me.a.filter((function(e){return e.relates_to_privacy})).map((function(e){return e.id}))),S=Object(A.a)(y,2),C=S[0],q=S[1],E=Object(s.useState)(0),N=Object(A.a)(E,2),P=N[0],D=N[1],I=Object(s.useState)(0),R=Object(A.a)(I,2),T=R[0],w=R[1],L=Object(s.useState)(null),V=Object(A.a)(L,2),k=V[0],M=V[1],U=Object(s.useState)(null),z=Object(A.a)(U,2),F=z[0],G=z[1],B=Object(s.useState)(null),H=Object(A.a)(B,2),X=H[0],J=H[1],W=Object(s.useState)(null),K=Object(A.a)(W,2),Q=K[0],Y=K[1],Z=Object(s.useState)(c),$=Object(A.a)(Z,2),ee=$[0],te=$[1];return t=function(){var e=[].concat(Object(O.a)(l),[{variable:p.id,type:"range",range:[k,Q],variables:"Privacy"===p.id?C:void 0},{variable:m.id,type:"range",range:[X,F],variables:"Privacy"===m.id?C:void 0}]);te(function(e,t){return t.reduce((function(e,t){return e.filter((function(e){var n=t.variable,r=t.type,i=t.range,a=e[n];switch(t.variables&&(a=-e.variables.filter((function(e){return t.variables.includes(e)})).length),r){case"range":default:var s=Object(A.a)(i,2),c=s[0],o=s[1];return a>=c&&a<=o}}))}),e)}(c,e))},n=[k,Q,X,F],r=2e3,Object(s.useEffect)((function(){var e=setTimeout((function(){t()}),r);return function(){clearTimeout(e)}}),[r].concat(Object(O.a)(n))),Object(s.useEffect)((function(){var e,t,n,r;p=i[0],m=i[1],"Privacy"===p.id?(e=Object(ue.a)(c,(function(e){return e.variables.filter((function(e){return-C.includes(e)})).length})),t=Object(le.a)(c,(function(e){return e.variables.filter((function(e){return-C.includes(e)})).length}))):(e=Object(ue.a)(c,(function(e){return+e[p.id]})),t=Object(le.a)(c,(function(e){return+e[p.id]}))),"Privacy"===m.id?(n=Object(ue.a)(c,(function(e){return e.variables.filter((function(e){return-C.includes(e)})).length})),r=Object(le.a)(c,(function(e){return e.variables.filter((function(e){return-C.includes(e)})).length}))):(n=Object(ue.a)(c,(function(e){return+e[m.id]})),r=Object(le.a)(c,(function(e){return+e[m.id]}))),v(e),w(t),D(n),x(r),M(e),Y(t),J(n),G(r),q(me.a.filter((function(e){return e.relates_to_privacy})).map((function(e){return e.id})))}),[c,i]),Object(s.useEffect)((function(){if("Privacy"===p.id){var e=Object(ue.a)(c,(function(e){return e.variables.filter((function(e){return-C.includes(e)})).length})),t=Object(le.a)(c,(function(e){return e.variables.filter((function(e){return-C.includes(e)})).length}));v(e),w(t)}if("Privacy"===m.id){var n=Object(ue.a)(c,(function(e){return-e.variables.filter((function(e){return C.includes(e)})).length})),r=Object(le.a)(c,(function(e){return-e.variables.filter((function(e){return C.includes(e)})).length}));D(n),x(r)}}),[C]),Object(a.jsxs)("form",{className:"filter-form",onSubmit:function(e){e.preventDefault()},children:[Object(a.jsxs)("h4",{children:["Vous s\xe9lectionnez dans ",Object(a.jsx)("code",{children:p.name})," et"," ",Object(a.jsx)("code",{children:m.name})]}),Object(a.jsx)(je,{metric:p,values:[k,Q],min:j,max:T,filteredVariables:C,onRangeChange:function(e){var t=Object(A.a)(e,2),n=t[0],r=t[1];M(n),Y(r)},onFilteredVariablesChange:function(e){q(e)}}),Object(a.jsx)(je,{metric:m,values:[X,F],min:P,max:_,filteredVariables:C,onRangeChange:function(e){var t=Object(A.a)(e,2),n=t[0],r=t[1];J(n),G(r)},onFilteredVariablesChange:function(e){q(e)}}),Object(a.jsxs)("p",{children:[ee.length," mod\xe8les s\xe9lectionn\xe9s"]}),Object(a.jsx)("button",{onClick:function(e){e.preventDefault(),o([{variable:p.id,type:"range",range:[k,Q],variables:"Privacy"===p.id?C:void 0},{variable:m.id,type:"range",range:[X,F],variables:"Privacy"===m.id?C:void 0}])},type:"submit",children:"Valider"})]})};var ve=Object(l.b)((function(e,t){return Object(p.a)(Object(p.a)(Object(p.a)(Object(p.a)({},t),e),U(e.ui)),D(e.data))}),(function(e){return Object(m.b)(Object(p.a)(Object(p.a)({},i),r),e)}))((function(e){var t=e.ui,n=t.currentStep,r=t.numberOfSteps,i=(t.metricsOrderIsValidated,e.data),s=i.metricsOrder,c=i.models,o=e.setCurrentStep;return e.setMetricsOrder,e.setNumberOfSteps,e.setMetricsOrderIsValidated,Object(a.jsxs)("section",{className:"main-choice-screen",children:[Object(a.jsx)("h1",{children:ee("main_choice_screen_title")}),Object(a.jsx)("p",{children:ee("main_choice_screen_intro")}),Object(a.jsx)(oe,{metrics:s.map((function(e,t){return Object(p.a)(Object(p.a)({},e),{},{active:t<=1})}))}),Object(a.jsx)(Oe,{metrics:s.slice(0,2),models:c}),Object(a.jsx)(te,{disabled:r<=6,onClick:function(){return o(n+1)}})]})}));var he=Object(l.b)((function(e,t){return Object(p.a)(Object(p.a)(Object(p.a)(Object(p.a)({},t),e),U(e.ui)),D(e.data))}),(function(e){return Object(m.b)(Object(p.a)(Object(p.a)({},i),r),e)}))((function(e){var t=e.ui,n=t.currentStep,r=t.numberOfSteps,i=e.setCurrentStep,c=e.getData;Object(s.useEffect)((function(){c()}),[]);for(var o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;switch(e){case 0:return Object(a.jsx)(ne,{});case 1:return Object(a.jsx)(re,{});case 2:return Object(a.jsx)(ie,{});case 3:return Object(a.jsx)(ce,{});case 4:return Object(a.jsx)(se,{});case 5:return Object(a.jsx)(ve,{});default:return Object(a.jsxs)(a.Fragment,{children:["Step ",e]})}},u=new Array(r),l=0;l<u.length;l++)u[l]=l;return Object(a.jsxs)("div",{className:"container",children:[u.map((function(e,t){return Object(a.jsx)(K,{active:t===n,children:o(t)},t)})),Object(a.jsx)(G,Object(p.a)({},{currentStep:n,setCurrentStep:i,numberOfSteps:r}))]})})),ge=n(31),_e={};var xe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_e,t=arguments.length>1?arguments[1]:void 0;return t.payload,t.type,e},ye=(Object(b.a)({}),Object(ge.rememberReducer)(Object(m.c)({data:P,history:xe,ui:M}))),Se=function(){return function(e){var t=e.dispatch,n=e.getState;return function(e){return function(r){if("function"===typeof r)return r(t,n);var i=r.promise,a=r.type,s=Object(B.a)(r,["promise","type"]);if(!i)return e(r);if("function"!==typeof i||!Promise.resolve(i))return console.warn('passed an action with a "promise" prop which is not a promise function, action:',r),e(r);var c="".concat(a,"_PENDING"),o="".concat(a,"_SUCCESS"),u="".concat(a,"_FAIL"),l="".concat(a,"_RESET");return e(Object(p.a)(Object(p.a)({},s),{},{type:c})),i(t,n).then((function(t){return setTimeout((function(){return e(Object(p.a)(Object(p.a)({},s),{},{type:l}))}),1e3),e(Object(p.a)(Object(p.a)({},s),{},{result:t,type:o}))})).catch((function(t){return e(Object(p.a)(Object(p.a)({},s),{},{error:t,type:u}))}))}}}};var Ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(m.a)(Se()),n=window.__REDUX_DEVTOOLS_EXTENSION__?Object(m.d)(t,window.__REDUX_DEVTOOLS_EXTENSION__(),Object(ge.rememberEnhancer)(window.localStorage,["ui","data","history"]))(m.e):Object(m.d)(t,Object(ge.rememberEnhancer)(window.localStorage,["ui","data","history"]))(m.e),r=n(ye,e);return r}({});var qe=function(){return Object(a.jsxs)(l.a,{store:Ce,children:[Object(a.jsx)(d.a,{children:Object(a.jsx)("title",{children:ee("site_title")})}),Object(a.jsx)(he,{})]})},Ee=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,195)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),i(e),a(e),s(e)}))};u.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(qe,{})}),document.getElementById("root")),Ee()},39:function(e,t){e.exports=[{id:"age",name:"age",description:null,relates_to_privacy:!0},{id:"credit_history",name:"historique de cr\xe9dit",description:null,relates_to_privacy:!1},{id:"foreign_worker",name:"travailleur \xe9tranger",description:null,relates_to_privacy:!0},{id:"housing",name:"logement",description:null,relates_to_privacy:!1},{id:"installment_as_income_perc",name:"installment_as_income_perc",description:null,relates_to_privacy:!1},{id:"other_debtors",name:"other_debtors",description:null,relates_to_privacy:!1},{id:"personal._status",name:"statut personnel",description:null,relates_to_privacy:!0},{id:"present_emp_since",name:"emploi actuel depuis",description:null,relates_to_privacy:!1},{id:"property",name:"propri\xe9taire",description:null,relates_to_privacy:!1},{id:"telephone",name:"t\xe9l\xe9phone",description:null,relates_to_privacy:!0},{id:"account_check_status",name:"statut du compte",description:null,relates_to_privacy:!1},{id:"credits_this_bank",name:"cr\xe9dits pr\xe9c\xe9dents dans cette banque",description:null,relates_to_privacy:!1},{id:"other_installment_plans",name:"autres plans d'installation",description:null,relates_to_privacy:!1},{id:"sex",name:"sexe",description:null,relates_to_privacy:!0},{id:"credit_amount",name:"montant du cr\xe9dit",description:null,relates_to_privacy:!1},{id:"savings",name:"\xe9pargnes",description:null,relates_to_privacy:!1},{id:"people_under_maintenance",name:"personnes \xe0 charge",description:null,relates_to_privacy:!1},{id:"present_res_since",name:"r\xe9sidence actuelle depuis",description:null,relates_to_privacy:!1},{id:"job",name:"emploi",description:null,relates_to_privacy:!1},{id:"duration_in_month",name:"dur\xe9e en mois",description:null,relates_to_privacy:!1},{id:"purpose",name:"objectif",description:null,relates_to_privacy:!1}]},77:function(e,t){e.exports=[{name:"Performance",id:"Performance",short_description:"L'AUC mesure la performance de l'algorithme. Comme traditionnellement dans l\u2019industrie du Machine Learning, on supposera que le data scientist banquier est d\u2019abord incit\xe9 sur le crit\xe8re de la performance de son algorithme car l\u2019AUC est proportionnel au gain financier procur\xe9 par l\u2019algorithme."},{name:"Disparate impact sur le genre",id:"fairness_disparate_impact",short_description:"il s\u2019agit d\u2019un ratio entre le pourcentage d\u2019acceptation chez les femmes et le pourcentage d\u2019acceptation chez les hommes. Lorsque ce ratio est \xe9gal \xe0 1, on consid\xe9rera qu\u2019il n\u2019y pas d\u2019effet disparate entre les hommes et les femmes. Attention, un effet disparate tr\xe8s diff\xe9rent de 1 ne signifie pas qu\u2019il y a diff\xe9rence de traitement. Un effet disparate dit simplement que l\u2019on constate deux effets diff\xe9rents entre les hommes et les femmes sans s\u2019int\xe9resser aux causes de cet effet (le traitement). La diff\xe9rence de traitement peut se tester avec des analyses toute chose \xe9gale par ailleurs (testing de CV par exemple)."},{name:"Distribution des erreurs entre hommes et femmes",id:"fairness_accuracy",short_description:"Une autre mani\xe8re compl\xe9mentaire de s\u2019int\xe9resser aux discriminations algorithmiques est de de s\u2019int\xe9resser \xe0 la distribution des erreurs entre hommes et femmes. L\u2019erreur dans l\u2019allocation du droit au cr\xe9dit peut p\xe9naliser les individus dans leur capacit\xe9 d\u2019agir (acheter une maison, voiture, etc). Il est donc primordial que celle-ci soit distribu\xe9 de la m\xeame mani\xe8re entre les hommes et les femmes. L\u2019indicateur de la pr\xe9cision mesure le taux de pr\xe9dictions corrects (c\u2019est-\xe0-dire vrais positifs + vrais n\xe9gatifs). Une mani\xe8re de mesurer la diff\xe9rence entre ces taux est de faire la soustraction entre la pr\xe9cision chez les hommes et la pr\xe9cision entre les femmes."},{name:"Privacy",id:"Privacy",type:"integer",short_description:"Selon les conventions des droits de l\u2019hommes, chaque individu a le droit de disposer de ses donn\xe9es personnelles. Selon la RGPD, il faut donc veiller \xe0 ce que ces donn\xe9es priv\xe9es soient r\xe9colt\xe9es de mani\xe8re parcimonieuse (principe de minimisation), pour des finalit\xe9s bien d\xe9termin\xe9es (principe de finalit\xe9), limiter les failles de s\xe9curit\xe9, les fuites possibles, etc, Nous prendrons l\u2019oppos\xe9 du nombre de variables personnelles comme proxy de la privacy. Les 11 variables personnelles sont present_emp_since, sex, personal.\\_status, present_res_since ,property, age, housing, job, people_under_maintenance, telephone, foreign_worker. Le nombre de variables priv\xe9es est \xe9galement un proxy de la vuln\xe9rabilit\xe9 aux failles de s\xe9curit\xe9 par attaques (s\xe9curit\xe9)."},{name:"Interpr\xe9tabilit\xe9",id:"Interpretability",type:"integer",short_description:"Selon la l\xe9gislation (RGPD), les demandeurs ont le droit d'exiger une explication des d\xe9cisions. On consid\xe8rera que l\u2019oppos\xe9 du nombre total de variables dans le mod\xe8le comme un proxy de l\u2019interpr\xe9tabilit\xe9 des algorithmes. En effet, des explications avec 20 variables seront beaucoup plus difficiles \xe0 fournir qu\u2019une explication avec 5 variables."}]},78:function(e,t){e.exports={site_title:"Exp\xe9rimentation",step:"\xe9tape",next_step:"continuer",step_1_title:"\xc9tape 1",step_2_title:"\xc9tape 2",step_3_title:"\xc9tape 3",sort_screen_title:"Classer les m\xe9triques",sort_screen_prompt:"Veuillez classer les indicateurs dans l'ordre qui vous semble \xeatre celui du plus important au moins important",main_choice_screen_title:"S\xe9lectionner des mod\xe8les dans les deux dimensions les plus importants",main_choice_screen_intro:"Vous s\xe9lectionnez des mod\xe8les \xe0 partir des deux indicateurs que vous avez d\xe9finis comme les plus importants"}},86:function(e,t,n){},87:function(e,t,n){}},[[186,1,2]]]);
//# sourceMappingURL=main.3d49181f.chunk.js.map