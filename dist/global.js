(()=>{var __webpack_modules__={764:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";var _utils_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(773),__WEBPACK_DEFAULT_EXPORT__=null,supportsSpread=isSyntaxSupported("Object(...[{}])"),supportsClass=isSyntaxSupported("class Test {}"),supportsNewTarget=isSyntaxSupported("new.target"),TRUE_CONSTRUCTOR=Symbol?Symbol("trueConstructor"):"__newlessTrueConstructor__",setPrototype=Object.setPrototypeOf||function(e,t){e.__proto__=t},construct=Reflect&&Reflect.construct||function(){if(supportsClass)return Function("constructor, args, target",`\n                'use strict';\n\n                if (arguments.length === 3 && typeof target !== 'function')\n                    throw new TypeError(target + ' is not a constructor');\n\n                target = target || constructor;\n\n                // extend target so the right prototype is constructed (or nearly the\n                // right one; ideally we'd do instantiator.prototype = target.prototype,\n                // but a class's prototype property is not writable)\n                class instantiator extends target {};\n                // but ensure the *logic* is 'constructor' for ES2015-compliant engines\n                Object.setPrototypeOf(instantiator, constructor);\n                // ...and for Safari 9\n                instantiator.prototype.constructor = constructor;\n\n                // The spread operator is *dramatically faster, so use it if we can:\n                // http://jsperf.com/new-via-spread-vs-dynamic-function/4\n                ${supportsSpread?"\n\n                    var value = new instantiator(...([].slice.call(args)));\n\n                ":"\n\n                    // otherwise, create a dynamic function in order to use 'new'\n                    // Note using 'function.bind' would be simpler, but is much slower:\n                    // http://jsperf.com/new-operator-with-dynamic-function-vs-bind\n                    var argList = '';\n                    for (var i = 0, len = args.length; i < len; i++) {\n                    if (i > 0) argList += ',';\n                    argList += 'args[' + i + ']';\n                    }\n                    var constructCall = Function('constructor, args',\n                    'return new constructor( ' + argList + ' );'\n                    );\n                    var value = constructCall(constructor, args);\n\n                    args = Array.prototype.slice.call(args);\n                    args = [null].concat(args);\n                    var value = new constructor.bind.apply(constructor, args);\n\n                "}\n\n                // fix up the prototype so it matches the intended one, not one who's\n                // prototype is the intended one :P\n                Object.setPrototypeOf(value, target.prototype);\n                return value;\n            `);var e=function(){};return function(t,r,o){if(3===arguments.length&&"function"!=typeof o)throw new TypeError(o+" is not a constructor");e.prototype=(o||t).prototype;var n=new e,s=t.apply(n,r);return"object"==typeof s&&s?(s.__proto__=(o||t).prototype,s):n}}(),SKIP_PROPERTIES=null;function copyProperties(e,t){if(Object.getOwnPropertyNames&&Object.defineProperty){var r=Object.getOwnPropertyNames(e);Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e)));for(var o=r.length-1;o>=0;o--)-1===SKIP_PROPERTIES.indexOf(r[o])&&Object.defineProperty(t,r[o],Object.getOwnPropertyDescriptor(e,r[o]))}else for(var n in e)t[n]=e[n]}function newless(constructor){var name=constructor.name,usesClassSyntax="class"===constructor.toString().substr(0,5),requiresNew=!!usesClassSyntax||null,newlessConstructor=(()=>function(){if(!requiresNew&&this instanceof newlessConstructor){if(!1===requiresNew){const e=constructor.apply(this,arguments);return"object"==typeof e&&e||this}try{requiresNew=!1;const e=constructor.apply(this,arguments);return"object"==typeof e&&e||this}catch(e){if(!(e instanceof TypeError&&(/class constructor/i.test(e.message)||/use the 'new' operator/i.test(e.message))))throw e instanceof Error&&/Illegal constructor/i.test(e.message)&&Object.create(constructor.prototype)instanceof Node&&console.error(`The following error can happen if a Custom Element is called\nwith 'new' before being defined. The constructor was ${constructor.name}: `,constructor),e;requiresNew=!0}}var newTarget,hasNewTarget=!1;supportsNewTarget&&(eval("newTarget = new.target"),newTarget&&(hasNewTarget=!0)),supportsNewTarget&&hasNewTarget||(newTarget=this instanceof newlessConstructor?this.constructor:constructor);const returnValue=construct(constructor,arguments,newTarget);return this instanceof newlessConstructor&&setPrototype(this,returnValue),returnValue})();if(name){const e=getFunctionBody(newlessConstructor);newlessConstructor=Function("constructor, construct, setPrototype, requiresNew, supportsNewTarget",`\n      var newlessConstructor = function ${name}() { ${e} };\n      return newlessConstructor\n    `)(constructor,construct,setPrototype,requiresNew,supportsNewTarget)}return constructor.length&&setDescriptor(newlessConstructor,"length",{value:constructor.length}),newlessConstructor.prototype=Object.create(constructor.prototype),newlessConstructor.prototype.constructor=newlessConstructor,constructor.prototype.constructor=constructor,newlessConstructor[TRUE_CONSTRUCTOR]=constructor,copyProperties(constructor,newlessConstructor),setPrototype(newlessConstructor,constructor),newlessConstructor}function isSyntaxSupported(e,t=!0){try{return!!Function("",(t?"'use strict';":"")+e)}catch(e){return!1}}},773:(e,t,r)=>{"use strict";r.d(t,{Gm:()=>f,Ie:()=>o,Md:()=>b,Sh:()=>n,U8:()=>w,ld:()=>p,nk:()=>_,q$:()=>c,uh:()=>u,yA:()=>l});class o{constructor(){this.m=new WeakMap}set(e,t){this.m.set(e,t),this.m.set(t,e)}get(e){return this.m.get(e)}has(e){return this.m.has(e)}}function n(e){const t=e.toString().split("\n");return t.shift(),t.pop(),t.join("\n")}const s={enumerable:!0,configurable:!0};function c(e,t,r,o=!1){r=i(o?p(e,t):Object.getOwnPropertyDescriptor(e,t),r),Object.defineProperty(e,t,r)}function a(e,t){let r,o;const n=Object.getOwnPropertyDescriptors(e);for(const e in t)r=t[e],o=n[e],t[e]=i(o,r);Object.defineProperties(e,t)}function i(e,t){if(("get"in t||"set"in t)&&("value"in t||"writable"in t))throw new TypeError("cannot specify both accessors and a value or writable attribute");return e&&("get"in t||"set"in t?(delete e.value,delete e.writable):("value"in t||"writable"in t)&&(delete e.get,delete e.set)),{...s,...e,...t}}function u(e,t,r=!0){let o,n=!1;return o=1===arguments.length?e:r?p(e,t):Object.getOwnPropertyDescriptor(e,t),o&&(o.get||o.set)&&(n=!0),n}function p(e,t){let r,o=e;for(;o;){if(r=Object.getOwnPropertyDescriptor(o,t),r)return r.owner=o,r;o=o.__proto__}}function l(e){let t=e,r=[];for(;t;)r=r.concat(Object.getOwnPropertyNames(t)),t=t.__proto__;return r=Array.from(new Set(r)),r}function _(e,t){let r=e.__proto__;do{if(t===r)return!0;r=r.__proto__}while(r);return!1}function f(e,t,r){const o=Object.getOwnPropertyNames(e);let n=o.length;for(;n--;){const s=o[n],c=Object.getOwnPropertyDescriptor(e,s);r&&r(c),Object.defineProperty(t,s,c)}}function b(e,{defaultClassDescriptor:{writable:t,enumerable:r,configurable:o}}){const n=Object.getOwnPropertyDescriptors(e);let s;for(const e in n)s=n[e],("value"in s||"writable"in s)&&(s.writable=t),s.enumerable=r,s.configurable=o;a(e,n)}function w(e,{defaultClassDescriptor:{writable:t,enumerable:r,configurable:o}},n){const s=Object.getOwnPropertyDescriptors(e);let c;for(const e in s)n&&n.includes(e)?delete s[e]:(c=s[e],("value"in c||"writable"in c)&&(c.writable=t),c.enumerable=r,c.configurable=o);a(e,s)}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__={};(()=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{deeplyObserve:()=>N,observe:()=>k,unobserve:()=>C,version:()=>A});var e=__webpack_require__(773);const t=["subclass","extends",...Object.getOwnPropertyNames(new Function)],r=new WeakMap,o=new WeakMap,n=new e.Ie,s=new WeakMap,c=new WeakMap,a=new WeakMap,i=new WeakMap,u=new WeakMap,p={mode:"es5",nativeNaming:!1,prototypeWritable:!1,defaultClassDescriptor:{writable:!0,enumerable:!1,configurable:!0},setClassDescriptors:!0};class l extends Error{}class _ extends Error{}function f(e,t){let r=e.cachedPublicAccesses.get(t);return r||(v(e,t)?e.cachedPublicAccesses.set(t,r=w(t).publicToPrivate.get(t)):P(e,t)?e.cachedPublicAccesses.set(t,r=n.get(t)):e.cachedPublicAccesses.set(t,r=t),r)}function b(e,t){let r=e.cachedProtectedAccesses.get(t);if(r)return r;if(h(e,t))e.cachedProtectedAccesses.set(t,r=n.get(t)||d(t));else if(v(e,t)){const o=w(t).publicToPrivate.get(t);e.cachedProtectedAccesses.set(t,r=n.get(o)||d(o))}else P(e,t)&&e.cachedProtectedAccesses.set(t,r=t);if(!r)throw new _("invalid access of protected member");return r}function w(e){return s.get(e)}function d(e){const t=function(e){let t=null,o=e.__proto__;for(;o;){if(t=r.get(o),t)return t;o=o.__proto__}return t}(e),o=Object.create(t);return n.set(e,o),o}function y(e,t){let r=e.cachedPrivateAccesses.get(t);if(r)return r;if(h(e,t))e.cachedPrivateAccesses.set(t,r=e.publicToPrivate.get(t)||g(e,t));else if(P(e,t)){const o=n.get(t);e.cachedPrivateAccesses.set(t,r=e.publicToPrivate.get(o)||g(e,o))}else v(e,t)&&e.cachedPrivateAccesses.set(t,r=t);if(!r)throw new _("invalid access of private member");return r}function g(e,t){const r=Object.create(e.privatePrototype);return e.publicToPrivate.set(t,r),s.set(r,e),r}function h(t,r,o=!0){if(!o)return(0,e.nk)(r,t.publicPrototype);for(const o of Array.from(c.get(t.classBrand)))if((0,e.nk)(r,o))return!0;return!1}function P(t,r,o=!0){if(!o)return(0,e.nk)(r,t.protectedPrototype);for(const o of Array.from(a.get(t.classBrand)))if((0,e.nk)(r,o))return!0;return!1}function v(t,r,o=!0){if(!o)return(0,e.nk)(r,t.privatePrototype);for(const o of Array.from(i.get(t.classBrand)))if((0,e.nk)(r,o))return!0;return!1}function O(e,t,r){const{parentPublicPrototype:o,parentProtectedPrototype:n,parentPrivatePrototype:s}=t;if(h(t,r,!1))return m(r,o,e);if(P(t,r,!1))return m(r,n,e);if(v(t,r,!1))return m(r,s,e);throw new l("invalid super access")}function m(t,r,o){let n=o.get(t);if(!n){o.set(t,n=Object.create(r));const s=(0,e.yA)(r);let c=s.length;for(;c--;){const o=s[c];(0,e.q$)(n,o,{get:function(){let n;const s=(0,e.ld)(r,o);if(s&&(0,e.uh)(s)){const e=s.get;e&&(n=e.call(t))}else n=r[o];return n&&n.call&&"function"==typeof n&&(n=n.bind(t)),n},set:function(n){const s=(0,e.ld)(r,o);if(s&&(0,e.uh)(s)){const e=s.set;e&&(n=e.call(t,n))}else t[o]=n}},!0)}}return n}var T;!function(n){(n=n?{...p,...n}:p).defaultClassDescriptor={...p.defaultClassDescriptor,...n.defaultClassDescriptor};const{mode:s,prototypeWritable:l,setClassDescriptors:_,nativeNaming:w}=n;function d(...e){let t=!1;if("function"==typeof this&&(t=!0),e.length<=3){let r="",o=null,n=null;"string"==typeof e[0]?r=e[0]:"function"!=typeof e[0]&&"object"!=typeof e[0]||(o=e[0],n=e[1]),"function"!=typeof e[1]&&"object"!=typeof e[1]||(o=e[1],n=e[2]);const s=t?g.call(this,r,o,n):g(r,o,n);return s.extends=function(e,t,s){return t=t||o,s=s||n,g.call(e,r,t,s)},s}throw new TypeError("invalid args")}return d;function g(p,g,h){let P=this;if("string"!=typeof p)throw new TypeError("\n                You must specify a string for the 'className' argument.\n            ");let v=null;if(g&&"object"==typeof g)v=g;else if(!P&&(!g||"function"!=typeof g&&"object"!=typeof g)){let t;return w&&p?t=new Function(`return function ${p}() {}`)():(t=function(){},p&&(0,e.q$)(t,"name",{value:p})),t.prototype={__proto__:Object.prototype,constructor:t},(0,e.q$)(t,"subclass",{value:d,writable:!0,enumerable:!1,configurable:!1}),t}const m=h?void 0:new e.Ie;h&&(u.get(h)||u.set(h,new e.Ie));const T={className:p,get publicToPrivate(){return m||u.get(h)},classBrand:h=h||{brand:"lexical"},cachedPublicAccesses:new WeakMap,cachedProtectedAccesses:new WeakMap,cachedPrivateAccesses:new WeakMap},j=new WeakMap,k=O.bind(null,j,T),C=f.bind(null,T),S=b.bind(null,T),E=y.bind(null,T);if(C.prototype={},S.prototype={},E.prototype={},C.Public=C,C.Protected=S,C.Private=E,C.Super=k,S.Public=C,S.Protected=S,S.Private=E,S.Super=k,v=v||g&&g(C,S,E,k),v&&"object"!=typeof v&&"function"!=typeof v)throw new TypeError("\n                The return value of a class definer function, if any, should be\n                an object, or a class constructor.\n            ");let N,A=null;"function"==typeof v&&(A=v,v=v.prototype,P=A.prototype.__proto__.constructor),v&&(N=v.static,delete v.static,"function"==typeof v.public&&(v.public=v.public(S,E)),"function"==typeof v.protected&&(v.protected=v.protected(C,E)),"function"==typeof v.private&&(v.private=v.private(C,S))),P=P||Object;const x=P.prototype,R=v&&v.public||v||Object.create(x);R.__proto__!==x&&(R.__proto__=x);const q=function(e){let t,o=e;for(;o&&!t;)t=r.get(o),o=o.__proto__;return t||{}}(x),M=v&&v.protected||Object.create(q);M.__proto__!==q&&(M.__proto__=q),r.set(R,M);const D=function(e){let t,r=e;for(;r&&!t;)t=o.get(r),r=r.__proto__;return t||{}}(x),I=v&&v.private||Object.create(D);if(I.__proto__!==D&&(I.__proto__=D),o.set(R,I),c.get(h)||c.set(h,new Set),a.get(h)||a.set(h,new Set),i.get(h)||i.set(h,new Set),c.get(h).add(R),a.get(h).add(M),i.get(h).add(I),T.publicPrototype=R,T.privatePrototype=I,T.protectedPrototype=M,T.parentPublicPrototype=x,T.parentProtectedPrototype=q,T.parentPrivatePrototype=D,(0,e.Gm)(C.prototype,R),(0,e.Gm)(S.prototype,M),(0,e.Gm)(E.prototype,I),v&&(delete v.public,delete v.protected,delete v.private,v!==R&&(0,e.Gm)(v,R)),A)return N&&(0,e.Gm)(N,A),A;const W=R.hasOwnProperty("constructor")?R.constructor:null;let $,F=null;if("es5"!==s)throw new TypeError("\n                The lowclass \"mode\" option can only be 'es5' for now.\n            ");if($=function(){let e=null,t=null;return t=W||P,t!==Object&&(e=t.apply(this,arguments)),!e||"object"!=typeof e&&"function"!=typeof e?this:e},F=R,p)if(w){const t=(0,e.Sh)($),r=$.prototype;$=new Function(" userConstructor, ParentClass ",`\n                    return function ${p}() { ${t} }\n                `)(W,P),$.prototype=r}else(0,e.q$)($,"name",{value:p});return W&&W.length&&(0,e.q$)($,"length",{value:W.length}),$.__proto__=P,N&&(0,e.Gm)(N,$),(0,e.q$)($,"subclass",{value:d,writable:!0,enumerable:!1,configurable:!1}),$.prototype=F,$.prototype.constructor=$,_&&((0,e.U8)($,n,t),(0,e.q$)($,"prototype",{writable:l}),(0,e.Md)($.prototype,n),(0,e.Md)(M,n),(0,e.Md)(I,n)),T.constructor=$,$}}(),function(e){e.PROXIES_ON_INSTANCE_AND_PROTOTYPE="PROXIES_ON_INSTANCE_AND_PROTOTYPE",e.PROXIES_ON_PROTOTYPE="PROXIES_ON_PROTOTYPE",e.PROXY_AFTER_INSTANCE_AND_PROTOTYPE="PROXY_AFTER_INSTANCE_AND_PROTOTYPE"}(T||(T={})),T.PROXIES_ON_INSTANCE_AND_PROTOTYPE;new WeakMap;__webpack_require__(764);const j=new WeakMap;function k(e,t,r,o={}){o.async=o.async||!1,o.inherited=o.inherited||!1;for(const n of t){let t=j.get(e);!t&&j.set(e,t=new Map);let s=t.get(n);s?s.includes(r)||s.push(r):(t.set(n,s=[]),s.push(r),E(e,n,o))}}function C(e,t,r){const o=j.get(e);if(o){if("function"==typeof t&&(r=t,t=Array.from(o.keys())),!r)throw new TypeError("callback not supplied");for(const e of t){const t=o.get(e);t.includes(r)&&(t.splice(t.indexOf(r),1),t.length||o.delete(e))}}else console.warn("the object is not observed, no need to unobserve:",e)}const S=new WeakMap;function E(t,r,o){let n;const s=o.inherited;if(!s)if(n=S.get(t),n){if(n.has(r))return}else S.set(t,n=new Set);const c=(0,e.ld)(t,r)||{value:void 0,writable:!0,configurable:!0,enumerable:!0},a=o.inherited&&c.owner||t;if(s)if(n=S.get(a),n){if(n.has(r))return}else S.set(a,n=new Set);let i,u;if(c.get||c.set){const e=c.get,r=c.set;i=e?()=>e.call(t):void 0,u=r?e=>r.call(t,e):void 0}else{let e=c.value;if(!c.writable)throw console.error(`Can not observe readonly property "${r}" with descriptor`,c,"of object:",t),new Error(`Can not observe readonly property "${r}" of object: ${t} (see above)`);delete c.value,delete c.writable,i=()=>e,u=t=>e=t}if(!u)throw new Error("Can not observe read-only property.");if(!i)throw new Error("Can not observe write-only property.");Object.defineProperty(a,r,{...c,get:i,set(e){u(e),function(e,t,r){const o=j.get(e).get(t);if(o)for(const e of o)e(t,r)}(t,r,i())}}),n.add(r)}function N(e,t,r=[],o=""){if("object"!=typeof e||!e)throw new Error("Cannot observe a non-object.");for(var n in Object.observe(e,(function(e){var n=[];e.forEach((function(e){n.push(o.length?o+"."+e.name:e.name)})),t({paths:n},...r)})),e){const s=e[n];s&&"object"==typeof s&&N(s,t,r,o.length?o+"."+n:n)}}const A="0.5.1"})();var __webpack_export_target__=jamesBond="undefined"==typeof jamesBond?{}:jamesBond;for(var i in __webpack_exports__)__webpack_export_target__[i]=__webpack_exports__[i];__webpack_exports__.__esModule&&Object.defineProperty(__webpack_export_target__,"__esModule",{value:!0})})();
//# sourceMappingURL=global.js.map