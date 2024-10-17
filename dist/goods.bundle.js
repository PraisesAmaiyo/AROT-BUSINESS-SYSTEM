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

/***/ "./JS/apiServices/product.js":
/*!***********************************!*\
  !*** ./JS/apiServices/product.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProduct: () => (/* binding */ addProduct),\n/* harmony export */   getProducts: () => (/* binding */ getProducts)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config.js */ \"./config.js\");\n\nconst baseUrl = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseUrl;\nconst apiToken = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].token;\nasync function getProducts() {\n  try {\n    //  console.log('Sending GET request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'GET',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      }\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Products:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error fetching products:', error);\n    return [];\n  }\n}\ngetProducts();\nasync function addProduct(productData) {\n  try {\n    //  console.log('Sending POST request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'POST',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(productData)\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Product added successfully:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error posting product:', error);\n  }\n}\n\n//# sourceURL=webpack://arot/./JS/apiServices/product.js?");

/***/ }),

/***/ "./JS/goods.js":
/*!*********************!*\
  !*** ./JS/goods.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  addProduct,\n  getProducts\n} = __webpack_require__(/*! ./apiServices/product */ \"./JS/apiServices/product.js\");\nconst {\n  showToast\n} = __webpack_require__(/*! ./script */ \"./JS/script.js\");\nlet isSubmitting = true;\n\n// function to format amounts with commas\nfunction formatAmountWithCommas(amount) {\n  const amountString = amount.toString();\n  return amountString.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n}\n\n// JS for Adding Products\nconst addProductName = document.getElementById('addProductName');\nconst addProductBoughtPrice = document.getElementById('addProductBoughtPrice');\nconst addProductSellingPrice = document.getElementById('addProductSellingPrice');\nconst addProductQuantity = document.getElementById('addProductQuantity');\nasync function handleAddProductSubmit(e) {\n  isSubmitting = true;\n  e.preventDefault();\n  const addProductFormData = {\n    name: addProductName.value,\n    amount_bought: Number(addProductBoughtPrice.value),\n    amount_to_sell: Number(addProductSellingPrice.value),\n    quantity: Number(addProductQuantity.value)\n  };\n  try {\n    const response = await addProduct({\n      data: {\n        ...addProductFormData\n      }\n    });\n    if (response) {\n      isSubmitting = false;\n      console.log('Product added successfully:', response);\n      showToast('success', 'Product added successfully! ⭐');\n      appendProductToTable(response.data);\n    } else {\n      showToast('fail', 'Product not added. ❌');\n      isSubmitting = false;\n    }\n  } catch (error) {\n    console.error('Error adding product:', error);\n    showToast('fail', 'Product not added. ❌');\n  } finally {\n    addProductName.value = '';\n    addProductBoughtPrice.value = '';\n    addProductSellingPrice.value = '';\n    addProductQuantity.value = '';\n    closeModal();\n  }\n  return addProductFormData;\n}\nconst addProductForm = document.querySelector('.add-product-form');\nconst adProductModalBtn = document.querySelector('.adProductModalBtn');\nif (addProductForm) {\n  addProductForm.addEventListener('submit', function (e) {\n    handleAddProductSubmit(e);\n    console.log(isSubmitting);\n    isSubmitting =  true ? adProductModalBtn.innerHTML = 'Submitting...' : 0;\n  });\n}\n\n// Append new product to the table\nfunction appendProductToTable(product) {\n  const goodsTableBody = document.querySelector('.product-table tbody');\n  const row = document.createElement('tr');\n  row.classList.add('table-body-row');\n  row.innerHTML = `\n     <td class=\"py-1 productSerialNumber\">${goodsTableBody.children.length + 1}</td>\n     <td class=\"py-1 productName\">${product.name}</td>\n     <td class=\"py-1 productAmountBought\">&#x20A6;${product.amount_bought}</td>\n     <td class=\"py-1 productQuantity\">${product.quantity}</td>\n     <td class=\"py-1 productSellingPrice\">&#x20A6;${product.amount_to_sell}</td>\n     <td class=\"py-1\">\n       <button class=\"hero-btn-light updatePriceButton\" data-product-id=\"${product.id}\">UPDATE PRICE</button>\n     </td>\n   `;\n  goodsTableBody.appendChild(row);\n}\n\n// JS to render items from database\n\nasync function renderAddedGoods() {\n  const goodsTableBody = document.querySelector('.product-table tbody');\n  const loadingRow = document.querySelector('.loading-row');\n  if (!goodsTableBody || !loadingRow) {\n    console.error('Table or loading row not found');\n    return;\n  }\n  try {\n    loadingRow.style.display = 'table-row';\n    const productData = await getProducts();\n    const products = productData.data;\n    goodsTableBody.innerHTML = '';\n    if (products.length === 0) {\n      goodsTableBody.innerHTML = '<tr class=\"loading-row\"><td colspan=\"6\" class=\"table-error-text \">No Products Available.</td></tr>';\n    } else {\n      products.forEach((product, index) => {\n        const row = document.createElement('tr');\n        row.classList.add('table-body-row');\n        row.innerHTML = `\n        <td class=\"py-1 productSerialNumber\">${index + 1}</td>\n        <td class=\"py-1 productName\">${product.name}</td>\n        <td class=\"py-1 productAmountBought\">&#x20A6;${formatAmountWithCommas(product.amount_bought)}</td>\n         <td class=\"py-1 productQuantity\">${product.quantity}</td>\n         <td class=\"py-1 productSellingPrice\">&#x20A6;${formatAmountWithCommas(product.amount_to_sell)}</td>\n    <td class=\"py-1 \"><button class=\"hero-btn-light updatePriceButton\"  data-product-id=\"${product.id}\">UPDATE PRICE</button></td>\n   `;\n        goodsTableBody.appendChild(row);\n      });\n    }\n  } catch (error) {\n    console.error('Error rendering products:', error);\n    goodsTableBody.innerHTML = '<tr class=\"loading-row\"><td colspan=\"6\" class=\"table-error-text \">No Products Available.</td></tr>';\n  } finally {\n    loadingRow.style.display = 'none';\n  }\n}\nrenderAddedGoods();\n\n// JS to dispaly Item to be sold\nconst updatePriceButton = document.querySelectorAll('.updatePriceButton');\nconst updatePriceContainer = document.querySelector('.updatePrice');\nconst updatePriceNameInput = document.getElementById('updatePriceName');\nconst productBoughtPriceInput = document.getElementById('productBoughtPrice');\nconst previousItemPriceInput = document.getElementById('previousItemPrice');\nconst newItemPriceInput = document.getElementById('newItemPrice');\nconst saveProductButton = document.querySelector('.saveProductButton');\nif (updatePriceButton) {\n  updatePriceButton.forEach((button, index) => {\n    button.addEventListener('click', function (e) {\n      if (updatePriceContainer) {\n        updatePriceContainer.classList.add('active');\n        main.classList.add('blur');\n        sidebar.classList.add('blur');\n        main.classList.add('no-scroll');\n        const productId = this.dataset.productId;\n        const productData = storedGoodsData.find(product => product.id.toString() === productId);\n      }\n      if (productData) {\n        updatePriceNameInput.value = productData.addProductNameInput;\n        productBoughtPriceInput.value = productData.addProductBoughtPriceInput;\n        previousItemPriceInput.value = productData.addProductSellingPriceInput;\n        updatePriceContainer.classList.add('active');\n      } else {\n        console.error(`Product with id ${productId} not found in local storage.`);\n      }\n    });\n  });\n}\n\n// Handle form submission\n\nif (saveProductButton) {\n  saveProductButton.addEventListener('click', function (e) {\n    //   e.preventDefault();\n\n    const updatedProductName = updatePriceNameInput.value;\n    const updatedProductBoughtPrice = productBoughtPriceInput.value;\n    const updatedNewItemPrice = newItemPriceInput.value;\n    const storedData = JSON.parse(localStorage.getItem('addProductFormData')) || [];\n    const productIndex = storedData.findIndex(product => product.addProductNameInput === updatedProductName);\n    storedData[productIndex].addProductSellingPriceInput = updatedNewItemPrice;\n    localStorage.setItem('addProductFormData', JSON.stringify(storedData));\n    closeModal();\n  });\n}\n\n// JS for Selling Products and adding to localStorage\nconst soldProductPrice = document.getElementById('soldProductPrice');\nconst productBalancePrice = document.getElementById('productBalancePrice');\nconst soldProductRemark = document.getElementById('soldProductRemark');\nfunction handleSellProduct() {\n  //   let soldItemNameInput = soldItemName.innerText;\n  let soldProductPriceInput = Number(soldProductPrice.value);\n  let productBalancePriceInput = Number(productBalancePrice.value);\n  let soldProductRemarkInput = soldProductRemark.value;\n  let id = Math.random();\n  if (productBalancePriceInput === 0 || productBalancePriceInput === '') {\n    productBalancePriceInput = '-';\n  }\n  const soldProductFormData = {\n    soldProductPriceInput,\n    productBalancePriceInput,\n    soldProductRemarkInput,\n    checkboxStatus,\n    id\n  };\n  const storedData = JSON.parse(localStorage.getItem('soldProductFormData')) || [];\n  const allData = [soldProductFormData, ...storedData];\n  localStorage.setItem('soldProductFormData', JSON.stringify(allData));\n  return soldProductFormData;\n}\nconst sellProductForm = document.querySelector('.sell-product-form');\nif (sellProductForm) {\n  sellProductForm.addEventListener('submit', function (e) {\n    const balancePayment = document.querySelector('.balancePayment');\n    const balancePaymentInput = document.getElementById('productBalancePrice');\n    e.preventDefault();\n    handleSellProduct();\n    soldProductPrice.value = '';\n    productBalancePrice.value = '';\n    soldProductRemark.value = '';\n    completedCheckbox.checked = false;\n    balanceCheckbox.checked = false;\n    balancePayment.style.display = 'flex';\n    balancePaymentInput.disabled = false;\n    closeModal();\n  });\n}\n\n// JS for modal\nconst main = document.querySelector('.main');\nconst sidebar = document.querySelector('.sidebar');\nconst closeModalButton = document.querySelectorAll('.closeModal');\nconst closeImageModalBtn = document.querySelectorAll('.closeImageModal');\ncloseModalButton.forEach(closeButton => {\n  closeButton.addEventListener('click', function () {\n    closeModal();\n  });\n});\nfunction closeModal() {\n  const addProductContainer = document.querySelector('.addProduct');\n  updatePriceContainer.classList.remove('active');\n  addProductContainer.classList.remove('active');\n  main.classList.remove('blur');\n  sidebar.classList.remove('blur');\n  main.classList.remove('no-scroll');\n}\n\n// JS for Modal\ndocument.addEventListener('DOMContentLoaded', function () {\n  const addButton = document.querySelector('.addProductButton');\n  const addProductContainer = document.querySelector('.addProduct');\n  if (addButton) {\n    addButton.addEventListener('click', function () {\n      addProductContainer.classList.add('active');\n      main.classList.add('blur');\n      sidebar.classList.add('blur');\n      main.classList.add('no-scroll');\n    });\n  }\n});\n\n//# sourceURL=webpack://arot/./JS/goods.js?");

/***/ }),

/***/ "./JS/script.js":
/*!**********************!*\
  !*** ./JS/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showToast: () => (/* binding */ showToast)\n/* harmony export */ });\n/* harmony import */ var _apiServices_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiServices/product */ \"./JS/apiServices/product.js\");\n\n\n// Toggle the active class for sideNavs\nconst sideNavs = document.querySelectorAll('.side-nav_item');\nsideNavs.forEach(nav => {\n  nav.addEventListener('click', () => {\n    nav.classList.add('active');\n    sideNavs.forEach(otherNav => {\n      if (otherNav !== nav) {\n        otherNav.classList.remove('active');\n      }\n    });\n  });\n});\n\n// Toast notification\n\n// JavaScript to show toast\nfunction showToast(type, message) {\n  const toast = document.getElementById('toast');\n  toast.textContent = message;\n\n  // Reset class to clear previous toast type\n  toast.className = 'toast';\n\n  // Add the appropriate type (success or fail)\n  toast.classList.add(type);\n  toast.classList.add('show');\n  setTimeout(() => {\n    toast.classList.remove('show');\n  }, 3000);\n}\n\n//# sourceURL=webpack://arot/./JS/script.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\n  baseUrl: 'http://94.176.182.247:1337',\n  token: '360fa9138e5a29484a7ce15ada23744306a3b7cfc9bec2023b51aedb4e3e5662b47a371fb820efef98b7d1889dd9f98061a539c357293ecf99fdde84943a1947cd406a2cc37997fd5b9363b7f3fd9104728aa526d37c3cfc928f617bc4b8606761a6a57265c7049591d9018a996797bda1c112f03788d128fd33c9b8f81ddfee'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://arot/./config.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./JS/goods.js");
/******/ 	
/******/ })()
;