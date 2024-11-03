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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProduct: () => (/* binding */ addProduct),\n/* harmony export */   getProducts: () => (/* binding */ getProducts)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config.js */ \"./config.js\");\n\nconst baseUrl = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseUrl;\nconst apiToken = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].token;\nasync function getProducts() {\n  try {\n    //  console.log('Sending GET request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'GET',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      }\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Products:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error fetching products:', error);\n    return [];\n  }\n}\nasync function addProduct(productData) {\n  try {\n    //  console.log('Sending POST request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'POST',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(productData)\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Product added successfully:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error posting product:', error);\n  }\n}\n\n//# sourceURL=webpack://arot/./JS/apiServices/product.js?");

/***/ }),

/***/ "./JS/script.js":
/*!**********************!*\
  !*** ./JS/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatAmountWithCommas: () => (/* binding */ formatAmountWithCommas),\n/* harmony export */   showToast: () => (/* binding */ showToast)\n/* harmony export */ });\n/* harmony import */ var _apiServices_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiServices/product */ \"./JS/apiServices/product.js\");\n\n\n// Toggle the active class for sideNavs\nconst sideNavs = document.querySelectorAll('.side-nav_item');\nsideNavs.forEach(nav => {\n  nav.addEventListener('click', () => {\n    nav.classList.add('active');\n    sideNavs.forEach(otherNav => {\n      if (otherNav !== nav) {\n        otherNav.classList.remove('active');\n      }\n    });\n  });\n});\n\n// Toast notification\n\n// JavaScript to show toast\nfunction showToast(type, message) {\n  const toast = document.getElementById('toast');\n  toast.textContent = message;\n\n  // Reset class to clear previous toast type\n  toast.className = 'toast';\n\n  // Add the appropriate type (success or fail)\n  toast.classList.add(type);\n  toast.classList.add('show');\n  setTimeout(() => {\n    toast.classList.remove('show');\n  }, 3000);\n}\n\n// function to format amounts with commas\nfunction formatAmountWithCommas(amount) {\n  if (amount === null || amount === undefined) {\n    return amount; // return an empty string if amount is null or undefined\n  }\n  const amountString = amount.toString();\n  return amountString.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n}\n\n//# sourceURL=webpack://arot/./JS/script.js?");

/***/ }),

/***/ "./JS/sell.js":
/*!********************!*\
  !*** ./JS/sell.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _apiServices_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiServices/product */ \"./JS/apiServices/product.js\");\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script */ \"./JS/script.js\");\n\n\nconst phoneAccessories = [{\n  name: 'Phone Case',\n  price: '₦1000'\n}, {\n  name: 'Screen Protector',\n  price: '₦1500'\n}, {\n  name: 'Charging Cable',\n  price: '₦800'\n}, {\n  name: 'Power Bank',\n  price: '₦2000'\n}, {\n  name: 'Bluetooth Earphones',\n  price: '₦3000'\n}, {\n  name: 'Wireless Charger',\n  price: '₦1500'\n}, {\n  name: 'Car Phone Holder',\n  price: '₦1200'\n}, {\n  name: 'Selfie Stick',\n  price: '₦700'\n}, {\n  name: 'Headphones',\n  price: '₦2500'\n}, {\n  name: 'Phone Stand',\n  price: '₦600'\n}, {\n  name: 'USB Adapter',\n  price: '₦900'\n}, {\n  name: 'Phone Grip',\n  price: '₦300'\n}, {\n  name: 'Earbuds',\n  price: '₦1800'\n}, {\n  name: 'Mobile Lens Kit',\n  price: '₦2200'\n}, {\n  name: 'Smartwatch Band',\n  price: '₦1500'\n}, {\n  name: 'AirPods',\n  price: '₦1500'\n}, {\n  name: 'Bluetooth Earphones',\n  price: '₦800'\n}, {\n  name: 'Charging Cable',\n  price: '₦300'\n}, {\n  name: 'Durable Phone Case',\n  price: '₦1000'\n}, {\n  name: 'Earbuds',\n  price: '₦1800'\n}, {\n  name: 'Fingerprint Lock',\n  price: '₦2500'\n}, {\n  name: 'Gaming Controller',\n  price: '₦3500'\n}, {\n  name: 'Headphones',\n  price: '₦2500'\n}, {\n  name: 'iPhone Case',\n  price: '₦1000'\n}, {\n  name: 'JBL Speakers',\n  price: '₦5000'\n}, {\n  name: 'Keyboard Cover',\n  price: '₦800'\n}, {\n  name: 'LED Phone Case',\n  price: '₦2000'\n}, {\n  name: 'Mobile Lens Kit',\n  price: '₦2200'\n}, {\n  name: 'Noise Cancelling Earphones',\n  price: '₦3500'\n}, {\n  name: 'OnePlus Charger',\n  price: '₦1200'\n}, {\n  name: 'PopSocket',\n  price: '₦500'\n}, {\n  name: 'Quick Charge Adapter',\n  price: '₦1500'\n}, {\n  name: 'Ring Holder Stand',\n  price: '₦600'\n}, {\n  name: 'Selfie Stick',\n  price: '₦700'\n}, {\n  name: 'Smartwatch Band',\n  price: '₦1500'\n}, {\n  name: 'Screen Protector',\n  price: '₦1500'\n}, {\n  name: 'USB Adapter',\n  price: '₦900'\n}, {\n  name: 'Wireless Charger',\n  price: '₦1500'\n}, {\n  name: 'Xiaomi Power Bank',\n  price: '₦2500'\n}, {\n  name: 'Zoom Lens',\n  price: '₦3000'\n}, {\n  name: 'Zipper Earphones',\n  price: '₦1200'\n}, {\n  name: 'Zigzag Phone Stand',\n  price: '₦800'\n}, {\n  name: '360 Degree Phone Holder',\n  price: '₦1200'\n}, {\n  name: 'Anti-Blue Light Glasses',\n  price: '₦800'\n}, {\n  name: 'Foldable Bluetooth Keyboard',\n  price: '₦2500'\n}, {\n  name: 'Game Controller Grip',\n  price: '₦600'\n}, {\n  name: 'Holographic Phone Case',\n  price: '₦1800'\n}, {\n  name: 'In-Ear Gaming Earphones',\n  price: '₦2200'\n}, {\n  name: 'Jogging Arm Band',\n  price: '₦500'\n}, {\n  name: 'Kevlar Charging Cable',\n  price: '₦1200'\n}, {\n  name: 'Laptop Stand for Phones',\n  price: '₦1500'\n}, {\n  name: 'Magnetic Car Mount',\n  price: '₦700'\n}, {\n  name: 'NFC Tags for Phones',\n  price: '₦400'\n}, {\n  name: 'Outdoor Waterproof Speaker',\n  price: '₦3000'\n}, {\n  name: 'Portable UV Phone Sanitizer',\n  price: '₦3500'\n}, {\n  name: 'Quad Lock Bike Mount',\n  price: '₦2000'\n}, {\n  name: 'Retractable Charging Cable',\n  price: '₦1000'\n}, {\n  name: 'Solar Power Bank',\n  price: '₦4500'\n}, {\n  name: 'Telescopic Camera Lens',\n  price: '₦2800'\n}, {\n  name: 'Universal Phone Holder Clip',\n  price: '₦600'\n}, {\n  name: 'Virtual Reality Headset',\n  price: '₦3500'\n}, {\n  name: 'Waterproof Phone Pouch',\n  price: '₦800'\n}];\nconst productInput = document.getElementById('productInput');\nconst autocompleteList = document.getElementById('autocompleteList');\nconst priceInput = document.getElementById('itemSellingPrice');\nproductInput.addEventListener('input', () => {\n  if (productInput.value.length > 0) {\n    clearIcon.classList.add('show');\n  } else {\n    clearIcon.classList.remove('show');\n  }\n});\n\n// Clear the input field when the \"X\" icon is clicked\nclearIcon.addEventListener('click', () => {\n  productInput.value = '';\n  clearIcon.classList.remove('show'); // Hide the icon again\n  productInput.focus(); // Refocus the input field\n});\n\n// Initial display of all products\ndisplayAllProducts();\nasync function displayAllProducts() {\n  try {\n    const productData = await (0,_apiServices_product__WEBPACK_IMPORTED_MODULE_0__.getProducts)();\n    const products = productData.data;\n    autocompleteList.innerHTML = '';\n    products.forEach(product => {\n      const listItem = document.createElement('li');\n      listItem.textContent = product.name;\n      listItem.classList.add('autocomplete-list-item');\n      listItem.addEventListener('click', function () {\n        productInput.value = product.name;\n        priceInput.value = (0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(product.amount_to_sell);\n        autocompleteList.style.display = 'none';\n      });\n      autocompleteList.appendChild(listItem);\n    });\n\n    // Autocompelte filter\n    productInput.addEventListener('click', function () {\n      autocompleteList.style.display = 'block';\n    });\n    productInput.addEventListener('input', function () {\n      const inputValue = productInput.value.toLowerCase();\n      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(inputValue));\n      autocompleteList.innerHTML = '';\n\n      // Display filtered suggestions\n      if (filteredProducts.length === 0) {\n        const listItem = document.createElement('li');\n        listItem.textContent = 'Item Not Found';\n        listItem.classList.add('autocomplete-list-item');\n        autocompleteList.appendChild(listItem);\n      } else {\n        filteredProducts.forEach(product => {\n          const listItem = document.createElement('li');\n          listItem.textContent = product.name;\n          listItem.classList.add('autocomplete-list-item');\n          listItem.addEventListener('click', function () {\n            productInput.value = product.name;\n            priceInput.value = (0,_script__WEBPACK_IMPORTED_MODULE_1__.formatAmountWithCommas)(product.amount_to_sell);\n            autocompleteList.innerHTML = '';\n          });\n          autocompleteList.appendChild(listItem);\n        });\n      }\n    });\n  } catch (error) {\n    console.log(error);\n  }\n}\n\n// Close the suggestions list when clicking outside\ndocument.addEventListener('click', function (event) {\n  if (!event.target.matches('#productInput')) {\n    autocompleteList.style.display = 'none';\n  }\n});\n\n// JS for the checkboxes and selling of an item\nlet checkboxStatus;\nconst balancePaymentInput = document.getElementById('productBalancePrice');\ndocument.addEventListener('DOMContentLoaded', function () {\n  const completedCheckbox = document.getElementById('completedCheckbox');\n  const balanceCheckbox = document.getElementById('balanceCheckbox');\n  const balancePayment = document.querySelector('.balancePayment');\n  const balancePaymentInput = document.getElementById('productBalancePrice');\n  const checkboxes = document.querySelectorAll('input[type=\"checkbox\"]');\n  function updateStatus() {\n    if (completedCheckbox.checked) {\n      checkboxStatus = 'Completed';\n      balancePayment.style.display = 'none';\n      balancePaymentInput.value = '';\n      balancePaymentInput.disabled = true;\n    } else {\n      checkboxStatus = 'Balance';\n      balancePayment.style.display = 'block';\n      balancePaymentInput.disabled = false;\n    }\n  }\n  updateStatus();\n  checkboxes.forEach(checkbox => {\n    checkbox.addEventListener('change', function () {\n      checkboxes.forEach(otherCheckbox => {\n        if (otherCheckbox !== checkbox) {\n          otherCheckbox.checked = false;\n          otherCheckbox.removeAttribute('required');\n        }\n      });\n      if (checkbox === completedCheckbox) {\n        completedCheckbox.checked = true;\n        balancePayment.style.display = 'none';\n        balancePaymentInput.disabled = true;\n        balancePaymentInput.value = '';\n        checkboxStatus = 'Completed';\n      } else {\n        balanceCheckbox.checked = true;\n        balancePayment.style.display = 'block';\n        balancePaymentInput.disabled = false;\n        checkboxStatus = 'Balance';\n      }\n      updateStatus();\n    });\n  });\n  balancePaymentInput.addEventListener('input', function () {\n    const inputValue = balancePaymentInput.value.trim(); // Trim to remove leading/trailing spaces\n\n    if (inputValue === '-' || !isNaN(inputValue) && parseFloat(inputValue) >= 0) {\n      balanceCheckbox.checked = true;\n      completedCheckbox.checked = false;\n      completedCheckbox.removeAttribute('required');\n      checkboxStatus = 'Balance';\n    } else {\n      return;\n\n      // completedCheckbox.checked = true;\n      // balanceCheckbox.checked = false;\n      // checkboxStatus = 'Completed';\n      // balancePayment.style.display = 'none';\n      // balancePaymentInput.disabled = true;\n\n      balanceCheckbox.checked = false;\n      completedCheckbox.checked = false;\n      checkboxStatus = 'Invalid';\n    }\n    updateStatus();\n  });\n});\n\n// JS for Selling Products and adding to localStorage\nconst soldProductName = document.getElementById('productInput');\nconst soldProductPrice = document.getElementById('soldProductPrice');\nconst productBalancePrice = document.getElementById('productBalancePrice');\nconst soldProductRemark = document.getElementById('soldProductRemark');\nfunction handleSellProduct() {\n  let soldProductNameInput = soldProductName.value;\n  let soldProductPriceInput = Number(soldProductPrice.value);\n  let productBalancePriceInput = Number(productBalancePrice.value);\n  let soldProductRemarkInput = soldProductRemark.value;\n  let id = Math.random();\n  if (productBalancePriceInput === 0 || productBalancePriceInput === '') {\n    productBalancePriceInput = '-';\n  }\n  const soldProductFormData = {\n    soldProductNameInput,\n    soldProductPriceInput,\n    productBalancePriceInput,\n    soldProductRemarkInput,\n    checkboxStatus,\n    id\n  };\n  const storedData = JSON.parse(localStorage.getItem('soldProductFormData')) || [];\n  const allData = [soldProductFormData, ...storedData];\n  localStorage.setItem('soldProductFormData', JSON.stringify(allData));\n  return soldProductFormData;\n}\nconst sellProductForm = document.querySelector('.sell-product-form');\nif (sellProductForm) {\n  sellProductForm.addEventListener('submit', function (e) {\n    const balancePayment = document.querySelector('.balancePayment');\n    const balancePaymentInput = document.getElementById('productBalancePrice');\n    e.preventDefault();\n    handleSellProduct();\n    soldProductName.value = '';\n    priceInput.value = '';\n    soldProductPrice.value = '';\n    productBalancePrice.value = '';\n    soldProductRemark.value = '';\n    completedCheckbox.checked = false;\n    balanceCheckbox.checked = false;\n    balancePayment.style.display = 'block';\n    balancePaymentInput.disabled = false;\n  });\n}\n\n// // JS to dispaly Item to be sold\n// const sellButtons = document.querySelectorAll('.sellButton');\n// const modalProductName = document.querySelector('.SellingItemName');\n// const soldItemBoughtPrice = document.getElementById('soldItemBoughtPrice');\n\n// sellButtons.forEach((button, index) => {\n//   button.addEventListener('click', function (e) {\n//     sellProductContainer.classList.add('active');\n//     main.classList.add('blur');\n//     sidebar.classList.add('blur');\n//     main.classList.add('no-scroll');\n\n//     const tableRow = e.target.closest('.table-body-row');\n//     const selectedIndex = index;\n\n//     const selectedItem = storedGoodsData[selectedIndex];\n\n//     if (selectedItem) {\n//       const productName = selectedItem.addProductNameInput;\n//       const amountBought = formatAmountWithCommas(\n//         selectedItem.addProductBoughtPriceInput\n//       );\n\n//       modalProductName.textContent = productName;\n//       soldItemBoughtPrice.value = amountBought;\n//     }\n//   });\n// });\n\n//# sourceURL=webpack://arot/./JS/sell.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./JS/sell.js");
/******/ 	
/******/ })()
;