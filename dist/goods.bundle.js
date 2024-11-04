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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProduct: () => (/* binding */ addProduct),\n/* harmony export */   getProducts: () => (/* binding */ getProducts),\n/* harmony export */   updateProduct: () => (/* binding */ updateProduct)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config.js */ \"./config.js\");\n\nconst baseUrl = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseUrl;\nconst apiToken = _config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].token;\n\n// export async function getProducts() {\n//   try {\n//     //  console.log('Sending GET request...');\n//     const response = await fetch(`${baseUrl}/api/products`, {\n//       method: 'GET',\n//       headers: {\n//         Authorization: `Bearer ${apiToken}`,\n//         'Content-Type': 'application/json',\n//       },\n//     });\n\n//     //  console.log('Response received...');\n\n//     if (!response.ok) {\n//       throw new Error(`HTTP error! status: ${response.status}`);\n//     }\n\n//     const data = await response.json();\n//     //  console.log('Products:', data);\n//     return data;\n//   } catch (error) {\n//     //  console.error('Error fetching products:', error);\n//     return [];\n//   }\n// }\n\nasync function getProducts(page = 1, pageSize = 25) {\n  try {\n    const response = await fetch(`${baseUrl}/api/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true`, {\n      method: 'GET',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      }\n    });\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    return data; // Returns both product data and pagination meta\n  } catch (error) {\n    console.error('Error fetching products:', error);\n    return {\n      data: [],\n      meta: {\n        pagination: {\n          pageCount: 1\n        }\n      }\n    };\n  }\n}\nasync function addProduct(productData) {\n  try {\n    //  console.log('Sending POST request...');\n    const response = await fetch(`${baseUrl}/api/products`, {\n      method: 'POST',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(productData)\n    });\n\n    //  console.log('Response received...');\n\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Product added successfully:', data);\n    return data;\n  } catch (error) {\n    //  console.error('Error posting product:', error);\n  }\n}\nasync function updateProduct(documentId, productData) {\n  try {\n    //  console.log('Sending PUT request...');\n    const response = await fetch(`${baseUrl}/api/products/${documentId}`, {\n      method: 'PUT',\n      headers: {\n        Authorization: `Bearer ${apiToken}`,\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(productData)\n    });\n    //  console.log('Response received...');\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    //  console.log('Product updated successfully:', data);\n    return data;\n  } catch (error) {\n    console.error('Error updating product:', error);\n  }\n}\n\n//# sourceURL=webpack://arot/./JS/apiServices/product.js?");

/***/ }),

/***/ "./JS/goods.js":
/*!*********************!*\
  !*** ./JS/goods.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  addProduct,\n  getProducts,\n  updateProduct\n} = __webpack_require__(/*! ./apiServices/product */ \"./JS/apiServices/product.js\");\nconst {\n  showToast,\n  formatAmountWithCommas\n} = __webpack_require__(/*! ./script */ \"./JS/script.js\");\nlet isSubmitting = true;\n\n// JS for Adding Products\nconst addProductName = document.getElementById('addProductName');\nconst addProductBoughtPrice = document.getElementById('addProductBoughtPrice');\nconst addProductSellingPrice = document.getElementById('addProductSellingPrice');\nconst addProductQuantity = document.getElementById('addProductQuantity');\nasync function handleAddProductSubmit(e) {\n  isSubmitting = true;\n  e.preventDefault();\n  const addProductFormData = {\n    name: addProductName.value,\n    amount_bought: Number(addProductBoughtPrice.value),\n    amount_to_sell: Number(addProductSellingPrice.value),\n    quantity: Number(addProductQuantity.value)\n  };\n  try {\n    const response = await addProduct({\n      data: {\n        ...addProductFormData\n      }\n    });\n    if (response) {\n      isSubmitting = false;\n      // console.log('Product added successfully:', response);\n      showToast('success', 'Product added successfully! ⭐');\n      appendProductToTable(response.data);\n    } else {\n      showToast('fail', 'Product not added. ❎');\n      isSubmitting = false;\n    }\n  } catch (error) {\n    //  console.error('Error adding product:', error);\n    showToast('fail', 'Product not added. ❎');\n  } finally {\n    addProductName.value = '';\n    addProductBoughtPrice.value = '';\n    addProductSellingPrice.value = '';\n    addProductQuantity.value = '';\n    closeModal();\n  }\n  return addProductFormData;\n}\nconst addProductForm = document.querySelector('.add-product-form');\nconst addProductModalBtn = document.querySelector('.addProductModalBtn');\nif (addProductForm) {\n  addProductForm.addEventListener('submit', function (e) {\n    handleAddProductSubmit(e);\n\n    //  console.log(isSubmitting);\n\n    addProductModalBtn.innerHTML = isSubmitting ? 'Submitting...' : 'Save';\n  });\n}\n\n// Append new product to the table\nfunction appendProductToTable(product) {\n  const goodsTableBody = document.querySelector('.product-table tbody');\n  const row = document.createElement('tr');\n  row.setAttribute('data-document-id', product.documentId);\n  row.classList.add('table-body-row');\n  row.innerHTML = `\n     <td class=\"py-1 productSerialNumber\">${goodsTableBody.children.length + 1}</td>\n     <td class=\"py-1 productName\">${product.name}</td>\n     <td class=\"py-1 productAmountBought\">&#x20A6;${product.amount_bought}</td>\n     <td class=\"py-1 productQuantity\">${product.quantity}</td>\n     <td class=\"py-1 productSellingPrice\">&#x20A6;${product.amount_to_sell}</td>\n     <td class=\"py-1\">\n       <button class=\"hero-btn-light updateProductButton\" data-product-id=\"${product.id}\">UPDATE</button>\n     </td>\n   `;\n  goodsTableBody.appendChild(row);\n}\n\n// JS to render items from database\n\nlet currentPage = 1;\nconst pageSize = 25;\nlet totalPages = 1;\nasync function renderAddedGoods(page = 1) {\n  const goodsTableBody = document.querySelector('.product-table tbody');\n  const loadMoreButton = document.getElementById('loadMoreButton');\n\n  // Check if goodsTableBody and loadMoreButton exist\n  if (!goodsTableBody) {\n    console.error('Error: Table body not found');\n    return;\n  }\n  if (!loadMoreButton) {\n    console.warn('Warning: Load More button not found');\n    return;\n  }\n\n  // Add a loading row dynamically at the start of each call\n\n  let existingLoadingRow = goodsTableBody.querySelector('.loading-row');\n  if (!existingLoadingRow) {\n    let loadingRow = document.createElement('tr');\n    loadingRow.classList.add('loading-row');\n    loadingRow.innerHTML = `<td colspan=\"6\" class=\"table-error-text\">Loading Javascript page...</td>`;\n    goodsTableBody.appendChild(loadingRow);\n  }\n  try {\n    const productData = await getProducts(page, pageSize);\n    const products = productData.data;\n    totalPages = productData.meta.pagination.pageCount;\n\n    // Clear table only on the first page load\n    if (page === 1) {\n      goodsTableBody.innerHTML = ''; // Clear only if it's the first page\n    } else {\n      // Remove the loading row after loading\n      if (existingLoadingRow) existingLoadingRow.remove();\n    }\n    if (products.length === 0 && page === 1) {\n      goodsTableBody.innerHTML = '<tr class=\"loading-row\"><td colspan=\"6\" class=\"table-error-text\">No Products Available.</td></tr>';\n    } else {\n      products.forEach((product, index) => {\n        const row = document.createElement('tr');\n        row.setAttribute('data-document-id', product.documentId);\n        row.classList.add('table-body-row');\n\n        //   console.log(product);\n\n        row.innerHTML = `\n          <td class=\"py-1 productSerialNumber\">${(page - 1) * pageSize + index + 1}</td>\n          <td class=\"py-1 productName\">${product.name}</td>\n          <td class=\"py-1 productAmountBought\">&#x20A6;${formatAmountWithCommas(product.amount_bought)}</td>\n          <td class=\"py-1 productQuantity\">${product.quantity}</td>\n          <td class=\"py-1 productSellingPrice\">&#x20A6;${formatAmountWithCommas(product.amount_to_sell)}</td>\n          <td class=\"py-1\"><button class=\"hero-btn-light updateProductButton\" data-product-id=\"${product.id}\">UPDATE</button></td>\n        `;\n        goodsTableBody.appendChild(row);\n      });\n\n      // Attach event listeners after rendering the rows\n      const updateProductButtons = document.querySelectorAll('.updateProductButton');\n      updateProductButtons.forEach(button => {\n        button.addEventListener('click', handleUpdateBtnClick);\n      });\n    }\n  } catch (error) {\n    console.error('Error rendering products:', error);\n    goodsTableBody.innerHTML = '<tr class=\"loading-row\"><td colspan=\"6\" class=\"table-error-text\">No Products Available.</td></tr>';\n  } finally {\n    //  loadingRow.remove(); // Ensure the loading row is always removed\n\n    const loadingRowToRemove = goodsTableBody.querySelector('.loading-row');\n    if (loadingRowToRemove) loadingRowToRemove.remove();\n\n    // Show or hide the Load More button\n    if (currentPage >= totalPages) {\n      loadMoreButton.style.display = 'none';\n    } else {\n      loadMoreButton.style.display = 'block';\n    }\n  }\n}\ndocument.getElementById('loadMoreButton').addEventListener('click', () => {\n  currentPage++;\n  renderAddedGoods(currentPage);\n});\n\n// Initial load of the first page of products\nrenderAddedGoods(currentPage);\n\n// JS to dispaly Item to be Updated\nconst updateProductButton = document.querySelectorAll('.updateProductButton');\nconst updateProductContainer = document.querySelector('.updateProduct');\nconst updateProductNameInput = document.getElementById('updateProductName');\nconst productBoughtPriceInput = document.getElementById('productBoughtPrice');\nconst previousItemPriceInput = document.getElementById('previousItemPrice');\nconst newItemNameInput = document.getElementById('newItemName');\nconst newItemPriceInput = document.getElementById('newItemSellingPrice');\nconst saveProductButton = document.querySelector('.saveProductButton');\nasync function handleUpdateBtnClick(event) {\n  const button = event.target;\n  const productId = button.dataset.productId;\n  const productData = await getProducts(currentPage, pageSize);\n  const product = productData.data.find(product => product.id.toString() === productId);\n  if (product) {\n    updateProductContainer.dataset.documentId = product.documentId;\n    updateProductContainer.dataset.productId = product.id;\n    updateProductContainer.classList.add('active');\n    main.classList.add('blur');\n    sidebar.classList.add('blur');\n    main.classList.add('no-scroll');\n    updateProductNameInput.value = product.name;\n    productBoughtPriceInput.value = product.amount_bought;\n    previousItemPriceInput.value = product.amount_to_sell;\n    //  updateProductQuantityInput.value = product.quantity;\n  } else {\n    console.error(`Product with id ${productId} not found in Store.`);\n  }\n}\n\n// Call the function to render products\nrenderAddedGoods();\n\n// Handle form submission - UPDATE\n\nasync function handleUpdateProductSubmit(e) {\n  isSubmitting = true;\n  e.preventDefault();\n  const documentId = updateProductContainer.dataset.documentId;\n  //   console.log('Document ID:', documentId);\n\n  const productData = await getProducts(currentPage, pageSize);\n  const existingProduct = productData.data.find(product => product.documentId === documentId);\n\n  // Prepare the update data, maintaining existing values if new ones are empty\n  const updateProductFormData = {\n    name: newItemNameInput.value.trim() || existingProduct.name,\n    amount_to_sell: newItemPriceInput.value ? Number(newItemPriceInput.value) : existingProduct.amount_to_sell\n  };\n\n  // Only proceed if there are changes to be made\n  const hasChanges = updateProductFormData.name !== existingProduct.name || updateProductFormData.amount_to_sell !== existingProduct.amount_to_sell;\n  if (!hasChanges) {\n    showToast('info', 'No changes detected. Please update fields to modify.');\n    isSubmitting = false;\n    return;\n  }\n  try {\n    const response = await updateProduct(documentId, {\n      data: {\n        ...updateProductFormData\n      }\n    });\n    if (response) {\n      isSubmitting = false;\n      // console.log('Product updated successfully:', response);\n      showToast('success', 'Product updated successfully! ⭐');\n      updateProductInTable(response.data);\n    } else {\n      showToast('fail', 'Product not updated. ❎');\n      isSubmitting = false;\n    }\n  } catch (error) {\n    console.error('Error adding product:', error);\n    showToast('fail', 'Product not updated. ❎');\n  } finally {\n    newItemNameInput.value = '';\n    newItemPriceInput.value = '';\n    isSubmitting = false;\n    closeModal();\n  }\n}\nif (saveProductButton) {\n  saveProductButton.addEventListener('click', function (e) {\n    handleUpdateProductSubmit(e);\n    isSubmitting =  true ? addProductModalBtn.innerHTML = 'Submitting...' : 0;\n  });\n}\n\n// Update existing product in the table\nfunction updateProductInTable(product) {\n  const goodsTableBody = document.querySelector('.product-table tbody');\n  const existingRow = goodsTableBody.querySelector(`tr[data-document-id=\"${product.documentId}\"]`);\n  if (existingRow) {\n    // Update the existing row with new product data\n    existingRow.innerHTML = `\n       <td class=\"py-1 productSerialNumber\">${Array.from(goodsTableBody.children).indexOf(existingRow) + 1}</td>\n       <td class=\"py-1 productName\">${product.name}</td>\n       <td class=\"py-1 productAmountBought\">&#x20A6;${formatAmountWithCommas(product.amount_bought)}</td>\n       <td class=\"py-1 productQuantity\">${product.quantity}</td>\n       <td class=\"py-1 productSellingPrice\">&#x20A6;${formatAmountWithCommas(product.amount_to_sell)}</td>\n       <td class=\"py-1\">\n         <button class=\"hero-btn-light updateProductButton\" data-product-id=\"${product.id}\">UPDATE</button>\n       </td>\n     `;\n    const updateProductButtons = document.querySelectorAll('.updateProductButton');\n    updateProductButtons.forEach(button => {\n      button.addEventListener('click', handleUpdateBtnClick);\n    });\n  }\n}\n\n// JS for modal\nconst main = document.querySelector('.main');\nconst sidebar = document.querySelector('.sidebar');\nconst closeModalButton = document.querySelectorAll('.closeModal');\nconst closeImageModalBtn = document.querySelectorAll('.closeImageModal');\ncloseModalButton.forEach(closeButton => {\n  closeButton.addEventListener('click', function () {\n    closeModal();\n  });\n});\nfunction closeModal() {\n  const addProductContainer = document.querySelector('.addProduct');\n  updateProductContainer.classList.remove('active');\n  addProductContainer.classList.remove('active');\n  main.classList.remove('blur');\n  sidebar.classList.remove('blur');\n  main.classList.remove('no-scroll');\n}\n\n// JS for Modal\ndocument.addEventListener('DOMContentLoaded', function () {\n  const addButton = document.querySelector('.addProductButton');\n  const addProductContainer = document.querySelector('.addProduct');\n  if (addButton) {\n    addButton.addEventListener('click', function () {\n      addProductContainer.classList.add('active');\n      main.classList.add('blur');\n      sidebar.classList.add('blur');\n      main.classList.add('no-scroll');\n    });\n  }\n});\n\n//# sourceURL=webpack://arot/./JS/goods.js?");

/***/ }),

/***/ "./JS/script.js":
/*!**********************!*\
  !*** ./JS/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatAmountWithCommas: () => (/* binding */ formatAmountWithCommas),\n/* harmony export */   showToast: () => (/* binding */ showToast)\n/* harmony export */ });\n/* harmony import */ var _apiServices_product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiServices/product */ \"./JS/apiServices/product.js\");\n\n\n// Toggle the active class for sideNavs\nconst sideNavs = document.querySelectorAll('.side-nav_item');\nsideNavs.forEach(nav => {\n  nav.addEventListener('click', () => {\n    nav.classList.add('active');\n    sideNavs.forEach(otherNav => {\n      if (otherNav !== nav) {\n        otherNav.classList.remove('active');\n      }\n    });\n  });\n});\n\n// Toast notification\n\n// JavaScript to show toast\nfunction showToast(type, message) {\n  const toast = document.getElementById('toast');\n  toast.textContent = message;\n\n  // Reset class to clear previous toast type\n  toast.className = 'toast';\n\n  // Add the appropriate type (success or fail)\n  toast.classList.add(type);\n  toast.classList.add('show');\n  setTimeout(() => {\n    toast.classList.remove('show');\n  }, 3000);\n}\n\n// function to format amounts with commas\nfunction formatAmountWithCommas(amount) {\n  if (amount === null || amount === undefined) {\n    return amount; // return an empty string if amount is null or undefined\n  }\n  const amountString = amount.toString();\n  return amountString.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n}\n\n//# sourceURL=webpack://arot/./JS/script.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/******/ 	var __webpack_exports__ = __webpack_require__("./JS/goods.js");
/******/ 	
/******/ })()
;