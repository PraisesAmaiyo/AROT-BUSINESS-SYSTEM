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

/***/ "./JS/charging.js":
/*!************************!*\
  !*** ./JS/charging.js ***!
  \************************/
/***/ (() => {

eval("const deviceType = document.getElementById('deviceType');\nconst deviceOwnerName = document.getElementById('deviceOwnerName');\nconst deviceId = document.getElementById('deviceId');\nconst alternativeNumber = document.getElementById('alternativeNumber');\nconst deviceChargeFee = document.getElementById('deviceChargeFee');\nconst deviceStatus = document.getElementById('deviceStatus');\nconst chargingForm = document.querySelector('.charging-method-form');\nif (chargingForm) {\n  chargingForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    handleChargingFormSubmit();\n    deviceType.value = 'Phone';\n    deviceOwnerName.value = '';\n    deviceId.value = '';\n    alternativeNumber.value = '';\n    deviceChargeFee.value = '';\n    deviceStatus.value = 'Collected';\n  });\n}\nfunction handleChargingFormSubmit() {\n  let selectedDeviceType = deviceType.value;\n  let deviceOwnerNameInput = deviceOwnerName.value;\n  let deviceIdInput = deviceId.value;\n  let alternativeNumberInput = alternativeNumber.value;\n  let deviceChargeFeeInput = Number(deviceChargeFee.value);\n  let selectedDeviceStatus = deviceStatus.value;\n  let id = Math.random();\n  const chargeFormData = {\n    selectedDeviceType,\n    deviceOwnerNameInput,\n    deviceIdInput,\n    alternativeNumberInput,\n    deviceChargeFeeInput,\n    selectedDeviceStatus,\n    id\n  };\n  const storedData = JSON.parse(localStorage.getItem('chargeFormData')) || [];\n  const allData = [chargeFormData, ...storedData];\n  localStorage.setItem('chargeFormData', JSON.stringify(allData));\n  return chargingForm;\n}\n\n//# sourceURL=webpack://arot/./JS/charging.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./JS/charging.js"]();
/******/ 	
/******/ })()
;