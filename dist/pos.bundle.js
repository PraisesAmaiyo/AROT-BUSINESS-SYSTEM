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

/***/ "./JS/apiServices/pos-transactions.js":
/*!********************************************!*\
  !*** ./JS/apiServices/pos-transactions.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createPosTransaction: () => (/* binding */ createPosTransaction),\n/* harmony export */   getPosTransactions: () => (/* binding */ getPosTransactions)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config.js */ \"./config.js\");\n\nconst baseUrl = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseUrl;\nconst apiToken = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].token;\nasync function getPosTransactions() {\n  try {\n    //  console.log('Sending GET request...');\n    const response = await fetch(`${baseUrl}/api/pos-transactions?populate[transaction_type]=*&populate[withdrawal_type]=*`, {\n      method: 'GET',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      }\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('PosTransactions:', data);\n\n    return data;\n  } catch (error) {\n    //  console.error('Error fetching PosTransactions:', error);\n    return [];\n  }\n}\nasync function createPosTransaction(transactionDetail) {\n  try {\n    //  console.log('Sending POST request...');\n    const response = await fetch(`${baseUrl}/api/pos-transactions?populate[transaction_type]=*&populate[withdrawal_type]=*`, {\n      method: 'POST',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(transactionDetail)\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Product added successfully:', data);\n    return data;\n  } catch (error) {\n    console.error('Error posting product:', error);\n  }\n}\n\n//# sourceURL=webpack://arot/./JS/apiServices/pos-transactions.js?");

/***/ }),

/***/ "./JS/apiServices/product.js":
/*!***********************************!*\
  !*** ./JS/apiServices/product.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProduct: () => (/* binding */ addProduct),\n/* harmony export */   getProducts: () => (/* binding */ getProducts)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config.js */ \"./config.js\");\n\nconst baseUrl = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseUrl;\nconst apiToken = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].token;\nasync function getProducts() {\n  try {\n    //  console.log('Sending GET request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'GET',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      }\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Products:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error fetching products:', error);\n    return [];\n  }\n}\nasync function addProduct(productData) {\n  try {\n    //  console.log('Sending POST request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'POST',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(productData)\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Product added successfully:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error posting product:', error);\n  }\n}\n\n//# sourceURL=webpack://arot/./JS/apiServices/product.js?");

/***/ }),

/***/ "./JS/pos.js":
/*!*******************!*\
  !*** ./JS/pos.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _apiServices_pos_transactions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiServices/pos-transactions */ \"./JS/apiServices/pos-transactions.js\");\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script */ \"./JS/script.js\");\n\n\n(0,_apiServices_pos_transactions__WEBPACK_IMPORTED_MODULE_0__.getPosTransactions)();\n\n// JavaScript to toggle withdrawal methods\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  const withdrawalTypeDiv = document.querySelector('.withdrawalTransactionType');\n  const transactionType = document.getElementById('transactionType');\n  const withdrawalType = document.getElementById('withdrawalType');\n  const posFeePaymentType = document.getElementById('posFeePaymentType');\n  //   const posTransactionConfirmation = document.getElementById(\n  //     'posTransactionConfirmation'\n  //   );\n\n  if (transactionType) {\n    transactionType.addEventListener('change', function (e) {\n      const selectedType = e.target.value;\n      if (selectedType === 'withdrawal' || selectedType === 'withdrawal/transfer' || selectedType === 'bill-Payment') {\n        withdrawalTypeDiv.style.display = 'block';\n        //   posTransactionConfirmation.style.display = 'block';\n      } else if (selectedType === 'deposit') {\n        withdrawalType.value = 'cash';\n        posFeePaymentType.value = 'cash';\n        posFeePaymentType.style.display = 'block';\n        withdrawalTypeDiv.style.display = 'none';\n        //   posTransactionConfirmation.style.display = 'none';\n      }\n\n      //  if (selectedType === 'Deposit') {\n      //   withdrawalType.value = 'Cash';\n\n      //   const selectedOption =\n      //     withdrawalType.querySelector(`option[value='Cash']`);\n      //   if (selectedOption) {\n      //     selectedOption.selected = true;\n      //   }\n\n      //   console.log('Withdrawal Type set to Cash');\n      // }\n    });\n  }\n});\ndocument.addEventListener('DOMContentLoaded', function () {\n  const posSuccessfulCheckbox = document.getElementById('posSuccessfulCheckbox');\n  const posPendingCheckbox = document.getElementById('posPendingCheckbox');\n  const posRemarksDiv = document.querySelector('.posRemarksDiv');\n  const posTransactionRemark = document.getElementById('posTransactionRemark');\n  const checkboxes = document.querySelectorAll('input[type=\"checkbox\"]');\n  function updateStatus() {\n    if (posSuccessfulCheckbox.checked) {\n      posRemarksDiv.style.display = 'none';\n      posTransactionRemark.value = 'Successful';\n      posTransactionRemark.disabled = true;\n    } else {\n      posRemarksDiv.style.display = 'block';\n      posTransactionRemark.disabled = false;\n    }\n  }\n  updateStatus();\n  checkboxes.forEach(checkbox => {\n    checkbox.addEventListener('change', function () {\n      checkboxes.forEach(otherCheckbox => {\n        if (otherCheckbox !== checkbox) {\n          otherCheckbox.checked = false;\n          otherCheckbox.removeAttribute('required');\n        }\n      });\n      if (checkbox === posSuccessfulCheckbox) {\n        posPendingCheckbox.checked = !checkbox.checked;\n      } else {\n        posSuccessfulCheckbox.checked = !checkbox.checked;\n        posTransactionRemark.value = '';\n      }\n\n      //Backup\n      // if (checkbox === posSuccessfulCheckbox) {\n      //   posSuccessfulCheckbox.checked = true;\n      //   posRemarksDiv.style.display = 'none';\n      //   posTransactionRemark.disabled = true;\n      //   posTransactionRemark.value = 'Successful';\n      // } else {\n      //   posPendingCheckbox.checked = true;\n      //   posRemarksDiv.style.display = 'flex';\n      //   posTransactionRemark.disabled = false;\n      //   posTransactionRemark.value = '';\n      // }\n      updateStatus();\n    });\n  });\n  posTransactionRemark.addEventListener('input', function () {\n    const inputValue = posTransactionRemark.value.trim();\n    posPendingCheckbox.checked = inputValue !== '';\n    posSuccessfulCheckbox.checked = !posPendingCheckbox.checked;\n    posSuccessfulCheckbox.removeAttribute('required');\n\n    //Backup\n    //  if (inputValue !== '') {\n    //    posPendingCheckbox.checked = true;\n    //    posSuccessfulCheckbox.checked = false;\n    //    posSuccessfulCheckbox.removeAttribute('required');\n    //  } else {\n    //    posPendingCheckbox.checked = false;\n    //    return;\n    //  }\n\n    updateStatus();\n  });\n});\n\n// JavaScript for POS Form\nconst amount = document.getElementById('posTransactionAmount');\nconst fee = document.getElementById('posTransactionFee');\nconst posFeePaymentType = document.getElementById('posFeePaymentType');\nconst posForm = document.querySelector('.pos-method-form');\nif (posForm) {\n  posForm.addEventListener('submit', function (e) {\n    e.preventDefault();\n    const transactionType = document.getElementById('transactionType');\n    const withdrawalType = document.getElementById('withdrawalType');\n    const posSuccessfulCheckbox = document.getElementById('posSuccessfulCheckbox');\n    const posPendingCheckbox = document.getElementById('posPendingCheckbox');\n    const posRemarksDiv = document.querySelector('.posRemarksDiv');\n    const withdrawalTypeDiv = document.querySelector('.withdrawalTransactionType');\n    const posTransactionRemark = document.getElementById('posTransactionRemark');\n    handlePosFormSubmit(e, transactionType, withdrawalType, amount, fee, posFeePaymentType, posTransactionRemark);\n    transactionType.value = 'withdrawal';\n    withdrawalType.value = 'card';\n    posFeePaymentType.value = 'card';\n    amount.value = '';\n    fee.value = '';\n    posTransactionRemark.value = '';\n    posSuccessfulCheckbox.checked = false;\n    posPendingCheckbox.checked = false;\n    withdrawalTypeDiv.style.display = 'block';\n    posRemarksDiv.style.display = 'block';\n  });\n}\n\n// Form submission\n\n// API relations DocumentId\n\nconst transactionTypeMapping = {\n  withdrawal: 'iyn4ozpya7u37nxt99dx684p',\n  deposit: 'nvf6nuxgasnpb7hse0ajo2xl',\n  transfer: 'juz52es36vmqy0kgbv9b4jk0',\n  'withdrawal/transfer': 'wzkt73kahydem84mcuepjl28',\n  'bill-payment': 'vt40t2xafrborbp66yn5iydj'\n};\nconst withdrawalTypeMapping = {\n  card: 'ql3rrcihgg6ca41unh4prikw',\n  transfer: 'as3m1r8b7zfmy4uqhgopquo6',\n  cash: 'w4p4y4j2mm3ji6gu3sbj5057'\n};\nlet isSubmitting = true;\nasync function handlePosFormSubmit(e, transactionType, withdrawalType, amount, fee, posFeePaymentType, posTransactionRemark) {\n  isSubmitting = true;\n  e.preventDefault();\n  const transactionTypeValue = transactionType.value.trim().toLowerCase();\n  const transactionTypeId = transactionTypeMapping[transactionTypeValue];\n  const withdrawalTypeId = withdrawalTypeMapping[withdrawalType.value.toLowerCase()];\n\n  // Check if the mapping returned a valid ID\n  if (!transactionTypeId) {\n    console.error('Invalid transaction type:', transactionTypeValue);\n    (0,_script__WEBPACK_IMPORTED_MODULE_1__.showToast)('fail', 'Invalid transaction type selected. ❎');\n    return; // Stop execution if invalid transaction type\n  }\n\n  // Create the form data with documentIds\n  const posFormData = {\n    transaction_type: transactionTypeId,\n    withdrawal_type: withdrawalTypeId,\n    transaction_amount: Number(amount.value),\n    transaction_fee: Number(fee.value),\n    fee_payment_type: posFeePaymentType.value.toLowerCase(),\n    transaction_remark: posTransactionRemark.value\n  };\n  try {\n    const response = await (0,_apiServices_pos_transactions__WEBPACK_IMPORTED_MODULE_0__.createPosTransaction)({\n      data: {\n        ...posFormData\n      }\n    });\n    if (response) {\n      isSubmitting = false;\n      // console.log('POS transaction sent successfully:', response);\n      (0,_script__WEBPACK_IMPORTED_MODULE_1__.showToast)('success', 'POS transaction sent  successfully! ⭐');\n    } else {\n      (0,_script__WEBPACK_IMPORTED_MODULE_1__.showToast)('fail', 'Failed to send POS transaction. ❎');\n      isSubmitting = false;\n    }\n  } catch (error) {\n    //  console.error('Error sending POS transaction:', error);\n    (0,_script__WEBPACK_IMPORTED_MODULE_1__.showToast)('fail', 'POS transaction not sent. ❎');\n  } finally {\n    //  addProductName.value = '';\n    //  addProductBoughtPrice.value = '';\n    //  addProductSellingPrice.value = '';\n    //  addProductQuantity.value = '';\n    //  closeModal();\n  }\n\n  //   console.log(posFormData);\n\n  const storedData = JSON.parse(localStorage.getItem('posFormData')) || [];\n  const allData = [posFormData, ...storedData];\n  localStorage.setItem('posFormData', JSON.stringify(allData));\n  return posFormData;\n}\n\n//# sourceURL=webpack://arot/./JS/pos.js?");

/***/ }),

/***/ "./JS/script.js":
/*!**********************!*\
  !*** ./JS/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatAmountWithCommas: () => (/* binding */ formatAmountWithCommas),\n/* harmony export */   showToast: () => (/* binding */ showToast)\n/* harmony export */ });\n/* harmony import */ var _apiServices_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiServices/product */ \"./JS/apiServices/product.js\");\n\n\n// Toggle the active class for sideNavs\nconst sideNavs = document.querySelectorAll('.side-nav_item');\nsideNavs.forEach(nav => {\n  nav.addEventListener('click', () => {\n    nav.classList.add('active');\n    sideNavs.forEach(otherNav => {\n      if (otherNav !== nav) {\n        otherNav.classList.remove('active');\n      }\n    });\n  });\n});\n\n// Toast notification\n\n// JavaScript to show toast\nfunction showToast(type, message) {\n  const toast = document.getElementById('toast');\n  toast.textContent = message;\n\n  // Reset class to clear previous toast type\n  toast.className = 'toast';\n\n  // Add the appropriate type (success or fail)\n  toast.classList.add(type);\n  toast.classList.add('show');\n  setTimeout(() => {\n    toast.classList.remove('show');\n  }, 3000);\n}\n\n// function to format amounts with commas\nfunction formatAmountWithCommas(amount) {\n  if (amount === null || amount === undefined) {\n    return amount; // return an empty string if amount is null or undefined\n  }\n  const amountString = amount.toString();\n  return amountString.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n}\n\n//# sourceURL=webpack://arot/./JS/script.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\n  //   baseUrl: 'http://94.176.182.247:1337',\n  baseUrl: 'https://posbok.com',\n  token: '360fa9138e5a29484a7ce15ada23744306a3b7cfc9bec2023b51aedb4e3e5662b47a371fb820efef98b7d1889dd9f98061a539c357293ecf99fdde84943a1947cd406a2cc37997fd5b9363b7f3fd9104728aa526d37c3cfc928f617bc4b8606761a6a57265c7049591d9018a996797bda1c112f03788d128fd33c9b8f81ddfee'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://arot/./config.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./JS/pos.js");
/******/ 	
/******/ })()
;