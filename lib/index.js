(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * 以cjs和default两种方式导出Node.js平台相关API
 */

// 网络相关API
// export * from './network'; // cjs路由
// export { default } from './network'; // 默认路由

// commonjs语法导出
module.exports = {
    ...__webpack_require__(2), // 网络相关API
};

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ip": () => /* reexport safe */ _ip__WEBPACK_IMPORTED_MODULE_0__.default,
/* harmony export */   "fetchPublicIP": () => /* reexport safe */ _public_ip__WEBPACK_IMPORTED_MODULE_1__.default,
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _ip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _public_ip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



// cjs导出

// 默认导出
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ ip: _ip__WEBPACK_IMPORTED_MODULE_0__.default, fetchPublicIP: _public_ip__WEBPACK_IMPORTED_MODULE_1__.default, });

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_0__);


/**
 * 获取本地网卡的IPv4和IPv6地址，本地回环地址127和::1除外
 */
function ip() {
    let nis = os__WEBPACK_IMPORTED_MODULE_0___default().networkInterfaces();
    let ips = { ipv4: [], ipv6: [], };
    for (let name in nis) {
        let ni = nis[name];
        ni.forEach(it => {
            if (it.address.match(/^(::1|127\.0\..*)$/)) {
                // console.log(`本地环回地址：${it.address}`);
                return;
            }
            switch (it.family) {
                case 'IPv4': {
                    ips.ipv4.push(it.address);
                    break;
                }
                case 'IPv6': {
                    ips.ipv6.push(it.address);
                    break;
                }
            }
        })
    }
    return ips;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ip);

/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/**
 * 使用CloudFlare Worker API获取公共网络IP地址
 */
function fetchPublicIP() {
    return Promise.resolve('Unknown IP address');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchPublicIP);

/***/ }),
/* 6 */,
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node__WEBPACK_IMPORTED_MODULE_0__);



console.log('IP地址检测：');
console.log((0,_node__WEBPACK_IMPORTED_MODULE_0__.ip)().ipv4[0]);
console.log(_node__WEBPACK_IMPORTED_MODULE_0___default().ip().ipv6[0]);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(7);
/******/ })()
;
});