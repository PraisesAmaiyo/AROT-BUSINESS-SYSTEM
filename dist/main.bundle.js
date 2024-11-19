/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./JS/apiServices/product.js":
/*!***********************************!*\
  !*** ./JS/apiServices/product.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProduct: () => (/* binding */ addProduct),\n/* harmony export */   getProducts: () => (/* binding */ getProducts),\n/* harmony export */   updateProduct: () => (/* binding */ updateProduct)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config.js */ \"./config.js\");\n\nconst baseUrl = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseUrl;\nconst apiToken = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].token;\n\n// export async function getProducts() {\n//   try {\n//     //  console.log('Sending GET request...');\n//     const response = await fetch(`${baseUrl}/api/products`, {\n//       method: 'GET',\n//       headers: {\n//         Authorization: `Bearer ${apiToken}`,\n//         'Content-Type': 'application/json',\n//       },\n//     });\n\n//     //  console.log('Response received...');\n\n//     if (!response.ok) {\n//       throw new Error(`HTTP error! status: ${response.status}`);\n//     }\n\n//     const data = await response.json();\n//     //  console.log('Products:', data);\n//     return data;\n//   } catch (error) {\n//     //  console.error('Error fetching products:', error);\n//     return [];\n//   }\n// }\n\nasync function getProducts(page = 1, pageSize = 25) {\n  try {\n    const response = await fetch(`${baseUrl}/api/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true`, {\n      method: 'GET',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      }\n    });\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    return data; // Returns both product data and pagination meta\n  } catch (error) {\n    console.error('Error fetching products:', error);\n    return {\n      data: [],\n      meta: {\n        pagination: {\n          pageCount: 1\n        }\n      }\n    };\n  }\n}\nasync function addProduct(productData) {\n  try {\n    //  console.log('Sending POST request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'POST',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(productData)\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Product added successfully:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error posting product:', error);\n  }\n}\nasync function updateProduct(documentId, productData) {\n  try {\n    //  console.log('Sending PUT request...');\n    const response = await fetch(`${baseUrl}/api/products/${documentId}`, {\n      method: 'PUT',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(productData)\n    });\n    //  console.log('Response received...');\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Product updated successfully:', data);\n    return data;\n  } catch (error) {\n    console.error('Error updating product:', error);\n  }\n}\n\n//# sourceURL=webpack://arot/./JS/apiServices/product.js?");

/***/ }),

/***/ "./JS/script.js":
/*!**********************!*\
  !*** ./JS/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatAmountWithCommas: () => (/* binding */ formatAmountWithCommas),\n/* harmony export */   showToast: () => (/* binding */ showToast)\n/* harmony export */ });\n/* harmony import */ var _apiServices_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiServices/product */ \"./JS/apiServices/product.js\");\n\n\n// Toggle the active class for sideNavs\nconst sideNavs = document.querySelectorAll('.side-nav_item');\nsideNavs.forEach(nav => {\n  nav.addEventListener('click', () => {\n    nav.classList.add('active');\n    sideNavs.forEach(otherNav => {\n      if (otherNav !== nav) {\n        otherNav.classList.remove('active');\n      }\n    });\n  });\n});\n\n// Toast notification\n\n// JavaScript to show toast\nfunction showToast(type, message) {\n  const toast = document.getElementById('toast');\n  toast.textContent = message;\n\n  // Reset class to clear previous toast type\n  toast.className = 'toast';\n\n  // Add the appropriate type (success or fail)\n  toast.classList.add(type);\n  toast.classList.add('show');\n  setTimeout(() => {\n    toast.classList.remove('show');\n  }, 3000);\n}\n\n// function to format amounts with commas\nfunction formatAmountWithCommas(amount) {\n  if (amount === null || amount === undefined) {\n    return amount; // return an empty string if amount is null or undefined\n  }\n  const amountString = amount.toString();\n  return amountString.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n}\n\n// JS For Modal\n\nconst main = document.querySelector('.main');\n// const sidebar = document.querySelector('.sidebar');\nconst closeModalButton = document.querySelectorAll('.closeModal');\ncloseModalButton.forEach(closeButton => {\n  closeButton.addEventListener('click', function () {\n    closeModal();\n  });\n});\nfunction closeModal() {\n  const depositPosCapitalContainer = document.querySelector('.depositPosCapital');\n  if (depositPosCapitalContainer) {\n    depositPosCapitalContainer.classList.remove('active');\n  }\n  main.classList.remove('blur');\n  //   sidebar.classList.remove('blur');\n  main.classList.remove('no-scroll');\n}\n\n// JS for Modal\ndocument.addEventListener('DOMContentLoaded', function () {\n  const depositButton = document.querySelector('.deposit-btn');\n  const depositPosCapitalContainer = document.querySelector('.depositPosCapital');\n  if (depositButton && depositPosCapitalContainer) {\n    depositButton.addEventListener('click', function () {\n      depositPosCapitalContainer.classList.add('active');\n      main.classList.add('blur');\n      // sidebar.classList.add('blur');\n      main.classList.add('no-scroll');\n    });\n  }\n});\n\n//# sourceURL=webpack://arot/./JS/script.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\n  //   baseUrl: 'http://94.176.182.247:1337',\n  baseUrl: 'https://posbok.com',\n  token: 'ee9584517562aa105b558a27d23af8d50de3056bd717a2d11bb6d35aafadf6e2d81a6ec22892c6033c16e6e3e85d679095a50ea3875289f7ea94ba504a3d69b393a80816f132d54e24e7325b301f5290654264ac84190df0c36e486abb7a57d1a38efb0bfb120473b87bdcaf40af999064cc01ea7110094544d8fcbafbe9d82b'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://arot/./config.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./JS/script.js");
/******/ 	
/******/ })()
;