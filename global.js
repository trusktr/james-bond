var jamesBond=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=new WeakMap;function o(e,t,n){for(const o of t){let t=r.get(e);!t&&r.set(e,t=new Map);let c=t.get(o);c?c.includes(n)||c.push(n):(t.set(o,c=[]),c.push(n),u(e,o))}}function c(e,t,n){const o=r.get(e);if(o){if("function"==typeof t&&(n=t,t=Array.from(r.get(e).keys())),!n)throw new TypeError("callback not supplied");for(const e of t){const t=o.get(e);t.includes(n)&&t.splice(t.indexOf(n),1)}}else console.warn("the object is not observed:",e)}function u(e,t){const n=Object.getOwnPropertyDescriptor(e,t)||{};let o,c;if(n.get||n.set){const t=n.get,r=n.set;o=(()=>t.call(e)),c=(t=>r.call(e,t))}else{let e=n.value;delete n.value,delete n.writable,o=(()=>e),c=(t=>e=t)}Object.defineProperty(e,t,{...n,get:o,set(n){c(n),function(e,t,n){const o=r.get(e).get(t);for(const e of o)e(t,n)}(e,t,o())}})}function i(e,t,n){var r=arguments[3];if(!(e instanceof Object))throw new Error("Cannot observe a non-object.");for(var o in void 0===r&&(r=""),Object.observe(e,function(e){var o=[];e.forEach(function(e){o.push(r.length?r+"."+e.name:e.name)}),void 0!==n?t.apply([{paths:o}].concat(Array.splice.call(arguments,2))):t({paths:o})}),e)e[o]instanceof Object&&i(e[o],t,n,r.length?r+"."+o:o)}n.d(t,"deeplyObserve",function(){return i}),n.d(t,"version",function(){return f}),n.d(t,"observe",function(){return o}),n.d(t,"unobserve",function(){return c});const f="0.3.0"}]);
//# sourceMappingURL=global.js.map