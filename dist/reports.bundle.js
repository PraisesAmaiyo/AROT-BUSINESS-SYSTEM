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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createPosTransaction: () => (/* binding */ createPosTransaction),\n/* harmony export */   getPosTransactions: () => (/* binding */ getPosTransactions)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config.js */ \"./config.js\");\n\nconst baseUrl = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseUrl;\nconst apiToken = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].token;\nasync function getPosTransactions() {\n  try {\n    //  console.log('Sending GET request...');\n    const response = await fetch(`${baseUrl}/api/pos-transactions?populate[transaction_type]=*&populate[withdrawal_type]=*`, {\n      method: 'GET',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      }\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('PosTransactions:', data);\n\n    return data;\n  } catch (error) {\n    //  console.error('Error fetching PosTransactions:', error);\n    return [];\n  }\n}\nasync function createPosTransaction(transactionDetail) {\n  try {\n    console.log('Sending POST request...');\n    const response = await fetch(`${baseUrl}/api/pos-transactions?populate[transaction_type]=*&populate[withdrawal_type]=*`, {\n      method: 'POST',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(transactionDetail)\n    });\n    console.log('Response received...');\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    console.log('Product added successfully:', data);\n    return data;\n  } catch (error) {\n    console.error('Error posting product:', error);\n  }\n}\n\n//# sourceURL=webpack://arot/./JS/apiServices/pos-transactions.js?");

/***/ }),

/***/ "./JS/apiServices/product.js":
/*!***********************************!*\
  !*** ./JS/apiServices/product.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProduct: () => (/* binding */ addProduct),\n/* harmony export */   getProducts: () => (/* binding */ getProducts)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config.js */ \"./config.js\");\n\nconst baseUrl = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseUrl;\nconst apiToken = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].token;\nasync function getProducts() {\n  try {\n    //  console.log('Sending GET request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'GET',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      }\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Products:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error fetching products:', error);\n    return [];\n  }\n}\nasync function addProduct(productData) {\n  try {\n    //  console.log('Sending POST request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'POST',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(productData)\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Product added successfully:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error posting product:', error);\n  }\n}\n\n//# sourceURL=webpack://arot/./JS/apiServices/product.js?");

/***/ }),

/***/ "./JS/reports.js":
/*!***********************!*\
  !*** ./JS/reports.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _apiServices_pos_transactions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiServices/pos-transactions */ \"./JS/apiServices/pos-transactions.js\");\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script */ \"./JS/script.js\");\n\n\n\n// JS to Render saved POS from Database\n\nasync function renderPosTable() {\n  const posTableBody = document.querySelector('.posTableDisplay tbody');\n  const loadingRow = document.querySelector('.loading-row');\n  if (!posTableBody || !loadingRow) {\n    console.error('Table or loading row not found');\n    return;\n  }\n  try {\n    loadingRow.style.display = 'table-row';\n    const posTransactionData = await (0,_apiServices_pos_transactions__WEBPACK_IMPORTED_MODULE_0__.getPosTransactions)();\n    const posTransactions = posTransactionData.data;\n    posTableBody.innerHTML = '';\n    if (posTransactions.length === 0) {\n      posTableBody.innerHTML = '<tr class=\"loading-row\"><td colspan=\"6\" class=\"table-error-text \">No Products Available.</td></tr>';\n    } else {\n      posTransactions.forEach((posTransaction, index) => {\n        const {\n          fee_payment_type,\n          transaction_amount,\n          transaction_fee,\n          transaction_remark,\n          transaction_type,\n          withdrawal_type\n        } = posTransaction;\n        function toTitleCase(value) {\n          return value.charAt(0).toUpperCase() + value.slice(1);\n        }\n        function formatTransactionType(value) {\n          switch (value.toLowerCase()) {\n            case 'withdraw':\n              return 'Withdraw';\n            case 'withdrawal/transfer':\n              return 'Withdrawal & Transfer';\n            case 'bill-payment':\n              return 'Bill Payment';\n            case 'deposit':\n              return 'Deposit';\n            default:\n              return value;\n          }\n        }\n        const feePaymentType = toTitleCase(fee_payment_type || 'N/A');\n        const transactionType = transaction_type?.type || 'N/A';\n        const withdrawalType = toTitleCase(withdrawal_type?.type || 'N/A');\n        const row = document.createElement('tr');\n        row.classList.add('table-body-row');\n        row.innerHTML = `\n         <td class=\"py-1\">${index + 1}.</td>\n         <td class=\"py-1 posTransTypeReport\">${formatTransactionType(transactionType)}</td>\n         <td class=\"py-1 posAmountReport\">&#x20A6;${(0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(transaction_amount)}</td>\n           <td class=\"py-1 posFeeReport\">&#x20A6;${(0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(transaction_fee)}</td>\n           <td class=\"py-1 posFeePaymentMethodReport\">${feePaymentType}</td>\n           <td class=\"py-1 posPaymentMethodReport\">${withdrawalType}</td>\n           <td class=\"py-1 posPaymentMethodRemark\">${transaction_remark}</td>\n              `;\n        posTableBody.appendChild(row);\n      });\n    }\n    updateTotalPosAmounts(posTransactions);\n  } catch (error) {\n    console.error('Error rendering products:', error);\n    goodsTableBody.innerHTML = '<tr class=\"loading-row\"><td colspan=\"6\" class=\"table-error-text \">No Products Available.</td></tr>';\n  } finally {\n    loadingRow.style.display = 'none';\n  }\n}\n\n// JS to give total POS Amount and Fees\nfunction updateTotalPosAmounts(data) {\n  const totalPosAmount = document.getElementById('totalPosAmount');\n  const totalPosFee = document.getElementById('totalPosFee');\n  if (!data || data.length === 0) {\n    if (totalPosAmount) {\n      totalPosAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;0</strong>`;\n    }\n    if (totalPosFee) {\n      totalPosFee.innerHTML = `<strong>Total Fees = &nbsp;&#x20A6;0</strong>`;\n    }\n    return;\n  }\n  const totalAmount = data.reduce((sum, item) => sum + item.transaction_amount, 0);\n  const totalFee = data.reduce((sum, item) => sum + item.transaction_fee, 0);\n  if (totalPosAmount) {\n    totalPosAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${(0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(totalAmount)}</strong>`;\n  }\n  if (totalPosFee) {\n    totalPosFee.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${(0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(totalFee)}</strong>`;\n  }\n}\nrenderPosTable();\n\n// JS to Render Sold goods from LocalStorage\nconst storedSoldGoods = JSON.parse(localStorage.getItem('soldProductFormData')) || [];\nfunction renderGoodsTable() {\n  const goodsTableBody = document.querySelector('.soldTableDisplay tbody');\n  if (goodsTableBody) {\n    goodsTableBody.innerHTML = '';\n    storedSoldGoods.forEach((data, index) => {\n      const row = document.createElement('tr');\n      row.classList.add('table-body-row');\n      row.innerHTML = `\n    <td class=\"py-1\">${index + 1}.</td>\n    <td class=\"py-1 soldItemNameReport\">${data.soldProductNameInput}</td>\n    <td class=\"py-1 soldItemPriceReport\">${`&#x20A6; ${(0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(data.soldProductPriceInput)}`}</td>\n    <td class=\"py-1 soldItemStatusReport\">${data.checkboxStatus}</td>\n    <td class=\"py-1 soldItemBalanceReport\">${data.productBalancePriceInput === '-' ? '-' : `&#x20A6; ${(0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(data.productBalancePriceInput)}`}</td>\n    <td class=\"py-1 soldItemRemarkReport \">${data.soldProductRemarkInput}</td>\n      `;\n      goodsTableBody.appendChild(row);\n    });\n  }\n  updateTotalSoldAmounts(storedSoldGoods);\n}\n\n// JS to give total Sold Amount\nfunction updateTotalSoldAmounts(data) {\n  const totalSoldAmount = document.getElementById('totalSoldAmount');\n  const totalAmount = data.reduce((sum, item) => sum + item.soldProductPriceInput, 0);\n  if (totalSoldAmount) {\n    totalSoldAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${(0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(totalAmount)}</strong>`;\n  }\n}\nrenderGoodsTable();\n\n// JS to Render saved Charged form data\nconst storedChargedData = JSON.parse(localStorage.getItem('chargeFormData')) || [];\nfunction renderChargingTable() {\n  const chargingTableBody = document.querySelector('.chargingTableDisplay tbody');\n  if (chargingTableBody) {\n    chargingTableBody.innerHTML = '';\n    storedChargedData.forEach((data, index) => {\n      const row = document.createElement('tr');\n      row.classList.add('table-body-row');\n      row.innerHTML = `\n    <td class=\"py-1\">${index + 1}.</td>\n    <td class=\"py-1 chargedItemNameReport\">${data.selectedDeviceType}</td>\n    <td class=\"py-1 chargedItemPriceReport\">&#x20A6; ${data.deviceChargeFeeInput}</td>\n    <td class=\"py-1 chargedItemOwnerReport \">${data.deviceOwnerNameInput}</td>\n    <td class=\"py-1 chargedItemIdReport \">${data.deviceIdInput}</td>\n    <td class=\"py-1 chargedItemAltNumberReport \">${data.alternativeNumberInput}</td>\n    <td class=\"py-1 chargedItemStatusReport \">${data.selectedDeviceStatus}</td>\n      `;\n      chargingTableBody.appendChild(row);\n    });\n  }\n  updateTotalChargedAmounts(storedChargedData);\n}\n\n// JS to give total Charged Amount\nfunction updateTotalChargedAmounts(data) {\n  const totalChargedAmount = document.getElementById('totalChargedAmount');\n  const totalAmount = data.reduce((sum, item) => sum + item.deviceChargeFeeInput, 0);\n  if (totalChargedAmount) {\n    totalChargedAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${(0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(totalAmount)}</strong>`;\n  }\n}\nrenderChargingTable();\n\n// JS to Render saved Sim Registration form data\nconst storedSimRegData = JSON.parse(localStorage.getItem('simRegFormData')) || [];\nfunction renderSimRegTable() {\n  const SimRegTableBody = document.querySelector('.simRegTableDisplay tbody');\n  if (SimRegTableBody) {\n    SimRegTableBody.innerHTML = '';\n    storedSimRegData.forEach((data, index) => {\n      const row = document.createElement('tr');\n      row.classList.add('table-body-row');\n      row.innerHTML = `\n    <td class=\"py-1\">${index + 1}.</td>\n    <td class=\"py-1 simNameReport\">${data.selectedSimName}</td>\n    <td class=\"py-1 simPriceReport\">&#x20A6; ${data.simRegAmountInput}</td>\n    <td class=\"py-1 PhoneNumberReport\">${data.phoneNumberInput}</td>\n    <td class=\"py-1 simStatusReport \">${data.checkboxStatus}</td>\n      `;\n      SimRegTableBody.appendChild(row);\n    });\n  }\n  updateTotalSimRegAmounts(storedSimRegData);\n}\n\n// JS to give total SIM Reg Amount\nfunction updateTotalSimRegAmounts(data) {\n  const totalSimRegAmount = document.getElementById('totalSimRegAmount');\n  const totalAmount = data.reduce((sum, item) => sum + item.simRegAmountInput, 0);\n  if (totalSimRegAmount) {\n    totalSimRegAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${(0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(totalAmount)}</strong>`;\n  }\n}\nrenderSimRegTable();\n\n//# sourceURL=webpack://arot/./JS/reports.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./JS/reports.js");
/******/ 	
/******/ })()
;