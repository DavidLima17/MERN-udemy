(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{45:function(t,e,r){"use strict";var n=r(0),a=r.n(n);r(49);e.a=function(t){return a.a.createElement("div",{className:"card ".concat(t.className),style:t.style},t.children)}},49:function(t,e,r){},68:function(t,e,r){},71:function(t,e,r){"use strict";r.r(e);var n=r(43),a=r(52),o=r(11),i=r(0),c=r.n(i),u=(r(68),r(45)),l=r(55),s=r(44),p=r(46),f=r(59),h=r(53),d=r(56),v=r(12),m=r(16),y=r(47);function g(){g=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(S){u=function(t,e,r){return t[e]=r}}function l(t,e,r,a){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),c=new k(a||[]);return n(i,"_invoke",{value:E(t,r,c)}),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=l;var p={};function f(){}function h(){}function d(){}var v={};u(v,o,(function(){return this}));var m=Object.getPrototypeOf,y=m&&m(m(N([])));y&&y!==e&&r.call(y,o)&&(v=y);var w=d.prototype=f.prototype=Object.create(v);function b(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){var a;n(this,"_invoke",{value:function(n,o){function i(){return new e((function(a,i){!function n(a,o,i,c){var u=s(t[a],t,o);if("throw"!==u.type){var l=u.arg,p=l.value;return p&&"object"==typeof p&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(p).then((function(t){l.value=t,i(l)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}(n,o,a,i)}))}return a=a?a.then(i,i):i()}})}function E(t,e,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return P()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var c=O(i,r);if(c){if(c===p)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function O(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var a=s(n,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,p;var o=a.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function N(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:P}}function P(){return{value:void 0,done:!0}}return h.prototype=d,n(w,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:h,configurable:!0}),h.displayName=u(d,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,u(t,c,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(x.prototype),u(x.prototype,i,(function(){return this})),t.AsyncIterator=x,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new x(l(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},b(w),u(w,c,"Generator"),u(w,o,(function(){return this})),u(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=N,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;j(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:N(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},t}e.default=function(){var t=Object(i.useContext)(v.a),e=Object(i.useState)(!0),r=Object(o.a)(e,2),w=r[0],b=r[1],x=Object(y.a)(),E=x.isLoading,O=x.error,L=x.sendRequest,j=x.clearError,k=Object(d.a)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),N=Object(o.a)(k,3),P=N[0],S=N[1],_=N[2],I=function(){var e=Object(n.a)(g().mark((function e(r){var n,a,o;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),!w){e.next=14;break}return e.prev=2,e.next=5,L("".concat("https://darkmatr-mern.herokuapp.com/api","/users/login"),"POST",JSON.stringify({email:P.inputs.email.value,password:P.inputs.password.value}),{"Content-Type":"application/json"});case 5:n=e.sent,t.login(n.userId,n.token),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),console.log(e.t0);case 12:e.next=29;break;case 14:return e.prev=14,(a=new FormData).append("email",P.inputs.email.value),a.append("name",P.inputs.name.value),a.append("password",P.inputs.password.value),a.append("image",P.inputs.image.value),e.next=22,L("".concat("https://darkmatr-mern.herokuapp.com/api","/users/signup"),"POST",a);case 22:o=e.sent,t.login(o.userId,o.token),e.next=29;break;case 26:e.prev=26,e.t1=e.catch(14),console.log(e.t1);case 29:case"end":return e.stop()}}),e,null,[[2,9],[14,26]])})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement(i.Fragment,null,c.a.createElement(p.a,{error:O,onClear:function(){j()}}),c.a.createElement(u.a,{className:"authentication"},E&&c.a.createElement(m.a,{asOverlay:!0}),c.a.createElement("h2",null,"Login Required"),c.a.createElement("hr",null),c.a.createElement("form",{onSubmit:I},!w&&c.a.createElement(l.a,{element:"input",id:"name",type:"text",label:"Your Name",validators:[Object(h.c)()],errorText:"Please enter your name.",onInput:S}),!w&&c.a.createElement(f.a,{center:!0,id:"image",onInput:S,errorText:"Please provide and image."}),c.a.createElement(l.a,{element:"input",id:"email",type:"email",label:"Email",validators:[Object(h.a)()],errorText:"Please enter a valid email address",onInput:S}),c.a.createElement(l.a,{element:"input",id:"password",type:"password",label:"Password",validators:[Object(h.b)(6)],errorText:"Please enter a valid password of 6 character length",onInput:S}),c.a.createElement(s.a,{type:"submit",disabled:!P.isValid},w?"LOGIN":"SIGNUP")),c.a.createElement(s.a,{inverse:!0,onClick:function(){w?_(Object(a.a)(Object(a.a)({},P.inputs),{},{name:{value:"",isValid:!1},image:{value:null,isValid:!1}}),!1):(delete P.inputs.name,delete P.inputs.image,_(Object(a.a)({},P.inputs),P.inputs.email.isValid&&P.inputs.password.isValid)),b((function(t){return!t}))}},"SWITCH TO ",w?"SIGNUP":"LOGIN")))}}}]);
//# sourceMappingURL=7.1735a713.chunk.js.map