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

/***/ "./JS/staff.js":
/*!*********************!*\
  !*** ./JS/staff.js ***!
  \*********************/
/***/ (() => {

eval("// console.log('object');\n// JS for modal\nconst main = document.querySelector('.main');\nconst sidebar = document.querySelector('.sidebar');\nconst closeModalButton = document.querySelectorAll('.closeModal');\nconst closeImageModalBtn = document.querySelectorAll('.closeImageModal');\ncloseModalButton.forEach(closeButton => {\n  closeButton.addEventListener('click', function () {\n    closeModal();\n  });\n});\nfunction closeModal() {\n  const addUserContainer = document.querySelector('.addUser');\n  addUserContainer.classList.remove('active');\n  main.classList.remove('blur');\n  sidebar.classList.remove('blur');\n  main.classList.remove('no-scroll');\n}\n\n// JS for Modal\ndocument.addEventListener('DOMContentLoaded', function () {\n  const addButton = document.querySelector('.add-user');\n  const addUserContainer = document.querySelector('.addUser');\n  if (addButton) {\n    addButton.addEventListener('click', function () {\n      addUserContainer.classList.add('active');\n      main.classList.add('blur');\n      sidebar.classList.add('blur');\n      main.classList.add('no-scroll');\n    });\n  }\n});\n\n//# sourceURL=webpack://arot/./JS/staff.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./JS/staff.js"]();
/******/ 	
/******/ })()
;