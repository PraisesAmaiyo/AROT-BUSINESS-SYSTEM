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

eval("let checkboxStatus;\ndocument.addEventListener('DOMContentLoaded', function () {\n  const successfulCheckbox = document.getElementById('successfulCheckbox');\n  const unSuccessfulCheckbox = document.getElementById('unSuccessfulCheckbox');\n  const checkboxes = document.querySelectorAll('input[type=\"checkbox\"]');\n  function updateStatus() {\n    if (successfulCheckbox.checked) {\n      checkboxStatus = 'Successful';\n    } else {\n      checkboxStatus = 'Unsuccessful';\n    }\n    console.log(checkboxStatus);\n  }\n  updateStatus();\n  checkboxes.forEach(checkbox => {\n    checkbox.addEventListener('change', function () {\n      checkboxes.forEach(otherCheckbox => {\n        if (otherCheckbox !== checkbox) {\n          otherCheckbox.checked = false;\n          otherCheckbox.removeAttribute('required');\n        }\n      });\n      if (checkbox === successfulCheckbox) {\n        successfulCheckbox.checked = true;\n        checkboxStatus = 'Successful';\n      } else {\n        unSuccessfulCheckbox.checked = true;\n        checkboxStatus = 'UnSuccessful';\n      }\n      updateStatus();\n    });\n  });\n});\n\n// JS for Selling Products and adding to localStorage\nconst simType = document.getElementById('simType');\nconst phoneNumber = document.getElementById('phoneNumber');\nconst serialNumber = document.getElementById('serialNumber');\nconst successfulCheckbox = document.getElementById('successfulCheckbox');\nconst unSuccessfulCheckbox = document.getElementById('unSuccessfulCheckbox');\nconst simRegAmount = document.getElementById('simRegAmount');\nfunction handleSellProduct() {\n  let selectedSimName = simType.value;\n  let phoneNumberInput = phoneNumber.value;\n  let serialNumberInput = serialNumber.value;\n  let simRegAmountInput = Number(simRegAmount.value);\n  let id = Math.random();\n  const simRegFormData = {\n    selectedSimName,\n    phoneNumberInput,\n    serialNumberInput,\n    simRegAmountInput,\n    checkboxStatus,\n    id\n  };\n  console.log(simRegFormData);\n  const storedData = JSON.parse(localStorage.getItem('simRegFormData')) || [];\n  const allData = [simRegFormData, ...storedData];\n  localStorage.setItem('simRegFormData', JSON.stringify(allData));\n  return simRegFormData;\n}\nconst simRegistrationForm = document.querySelector('.simReg-method-form');\nif (simRegistrationForm) {\n  simRegistrationForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    handleSellProduct();\n    simType.value = '';\n    phoneNumber.value = '';\n    serialNumber.value = '';\n    simRegAmount.value = '';\n    successfulCheckbox.checked = false;\n    unSuccessfulCheckbox.checked = false;\n  });\n}\n\n//# sourceURL=webpack://arot/./JS/simReg.js?");

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