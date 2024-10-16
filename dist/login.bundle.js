/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./JS/login.js":
/*!*********************!*\
  !*** ./JS/login.js ***!
  \*********************/
/***/ (() => {

eval("// Dummy first login before full page\nlocalStorage.setItem('isLoggedIn', true);\nconst signUpButton = document.getElementById('signUp');\nconst signInButton = document.getElementById('signIn');\nconst container = document.getElementById('container');\nif (container) {\n  signUpButton.addEventListener('click', () => {\n    container.classList.add('right-panel-active');\n  });\n  signInButton.addEventListener('click', () => {\n    container.classList.remove('right-panel-active');\n  });\n}\nfunction redirectToIndex() {\n  window.location.href = 'index.html';\n}\n\n//# sourceURL=webpack://arot/./JS/login.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./JS/login.js"]();
/******/ 	
/******/ })()
;