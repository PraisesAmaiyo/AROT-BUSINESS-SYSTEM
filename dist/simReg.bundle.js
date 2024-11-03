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

/***/ "./JS/simReg.js":
/*!**********************!*\
  !*** ./JS/simReg.js ***!
  \**********************/
/***/ (() => {

eval("// let checkboxStatus;\n\n// document.addEventListener('DOMContentLoaded', function () {\n//   const successfulCheckbox = document.getElementById('successfulCheckbox');\n//   const unSuccessfulCheckbox = document.getElementById('unSuccessfulCheckbox');\n//   const checkboxes = document.querySelectorAll('input[type=\"checkbox\"]');\n\n//   function updateStatus() {\n//     if (successfulCheckbox.checked) {\n//       checkboxStatus = 'Successful';\n//     } else {\n//       checkboxStatus = 'Unsuccessful';\n//     }\n//     console.log(checkboxStatus);\n//   }\n\n//   updateStatus();\n\n//   checkboxes.forEach((checkbox) => {\n//     checkbox.addEventListener('change', function () {\n//       checkboxes.forEach((otherCheckbox) => {\n//         if (otherCheckbox !== checkbox) {\n//           otherCheckbox.checked = false;\n//           otherCheckbox.removeAttribute('required');\n//         }\n//       });\n\n//       if (checkbox === successfulCheckbox) {\n//         successfulCheckbox.checked = true;\n//         checkboxStatus = 'Successful';\n//       } else {\n//         unSuccessfulCheckbox.checked = true;\n//         checkboxStatus = 'UnSuccessful';\n//       }\n//       updateStatus();\n//     });\n//   });\n// });\n\n// // JS for Selling Products and adding to localStorage\n// const simType = document.getElementById('simType');\n// const phoneNumber = document.getElementById('phoneNumber');\n// const serialNumber = document.getElementById('serialNumber');\n// const successfulCheckbox = document.getElementById('successfulCheckbox');\n// const unSuccessfulCheckbox = document.getElementById('unSuccessfulCheckbox');\n// const simRegAmount = document.getElementById('simRegAmount');\n\n// function handleSellProduct() {\n//   let selectedSimName = simType.value;\n//   let phoneNumberInput = phoneNumber.value;\n//   let serialNumberInput = serialNumber.value;\n//   let simRegAmountInput = Number(simRegAmount.value);\n//   let id = Math.random();\n\n//   const simRegFormData = {\n//     selectedSimName,\n//     phoneNumberInput,\n//     serialNumberInput,\n//     simRegAmountInput,\n//     checkboxStatus,\n//     id,\n//   };\n\n//   console.log(simRegFormData);\n\n//   const storedData = JSON.parse(localStorage.getItem('simRegFormData')) || [];\n\n//   const allData = [simRegFormData, ...storedData];\n\n//   localStorage.setItem('simRegFormData', JSON.stringify(allData));\n\n//   return simRegFormData;\n// }\n\n// const simRegistrationForm = document.querySelector('.simReg-method-form');\n\n// if (simRegistrationForm) {\n//   simRegistrationForm.addEventListener('submit', function (e) {\n//     e.preventDefault();\n//     handleSellProduct();\n\n//     simType.value = '';\n//     phoneNumber.value = '';\n//     serialNumber.value = '';\n//     simRegAmount.value = '';\n//     successfulCheckbox.checked = false;\n//     unSuccessfulCheckbox.checked = false;\n//   });\n// }\n\n//# sourceURL=webpack://arot/./JS/simReg.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./JS/simReg.js"]();
/******/ 	
/******/ })()
;