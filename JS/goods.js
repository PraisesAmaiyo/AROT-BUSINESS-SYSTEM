const {
  addProduct,
  getProducts,
  updateProduct,
} = require('./apiServices/product');
const { showToast, formatAmountWithCommas } = require('./script');

let isSubmitting = true;

// JS for Adding Products
const addProductName = document.getElementById('addProductName');
const addProductBoughtPrice = document.getElementById('addProductBoughtPrice');
const addProductSellingPrice = document.getElementById(
  'addProductSellingPrice'
);
const addProductQuantity = document.getElementById('addProductQuantity');

async function handleAddProductSubmit(e) {
  isSubmitting = true;
  e.preventDefault();

  const addProductFormData = {
    name: addProductName.value,
    amount_bought: Number(addProductBoughtPrice.value),
    amount_to_sell: Number(addProductSellingPrice.value),
    quantity: Number(addProductQuantity.value),
  };

  try {
    const response = await addProduct({
      data: {
        ...addProductFormData,
      },
    });

    if (response) {
      isSubmitting = false;
      // console.log('Product added successfully:', response);
      showToast('success', 'Product added successfully! ⭐');

      appendProductToTable(response.data);
    } else {
      showToast('fail', 'Product not added. ❎');
      isSubmitting = false;
    }
  } catch (error) {
    //  console.error('Error adding product:', error);
    showToast('fail', 'Product not added. ❎');
  } finally {
    addProductName.value = '';
    addProductBoughtPrice.value = '';
    addProductSellingPrice.value = '';
    addProductQuantity.value = '';
    closeModal();
  }

  return addProductFormData;
}

const addProductForm = document.querySelector('.add-product-form');
const addProductModalBtn = document.querySelector('.addProductModalBtn');

if (addProductForm) {
  addProductForm.addEventListener('submit', function (e) {
    handleAddProductSubmit(e);

    //  console.log(isSubmitting);

    addProductModalBtn.innerHTML = isSubmitting ? 'Submitting...' : 'Save';
  });
}

// Append new product to the table
function appendProductToTable(product) {
  const goodsTableBody = document.querySelector('.product-table tbody');
  const row = document.createElement('tr');
  row.setAttribute('data-document-id', product.documentId);
  row.classList.add('table-body-row');

  row.innerHTML = `
     <td class="py-1 productSerialNumber">${
       goodsTableBody.children.length + 1
     }</td>
     <td class="py-1 productName">${product.name}</td>
     <td class="py-1 productAmountBought">&#x20A6;${product.amount_bought}</td>
     <td class="py-1 productQuantity">${product.quantity}</td>
     <td class="py-1 productSellingPrice">&#x20A6;${product.amount_to_sell}</td>
     <td class="py-1">
       <button class="hero-btn-light updateProductButton" data-product-id="${
         product.id
       }">UPDATE</button>
     </td>
   `;

  goodsTableBody.appendChild(row);
}

// JS to render items from database

let currentPage = 1;
const pageSize = 25;
let totalPages = 1;

async function renderAddedGoods(page = 1) {
  const goodsTableBody = document.querySelector('.product-table tbody');
  const loadMoreButton = document.getElementById('loadMoreButton');

  // Check if goodsTableBody and loadMoreButton exist
  if (!goodsTableBody) {
    console.error('Error: Table body not found');
    return;
  }

  if (!loadMoreButton) {
    console.warn('Warning: Load More button not found');
    return;
  }

  // Add a loading row dynamically at the start of each call

  let existingLoadingRow = goodsTableBody.querySelector('.loading-row');
  if (!existingLoadingRow) {
    let loadingRow = document.createElement('tr');
    loadingRow.classList.add('loading-row');
    loadingRow.innerHTML = `<td colspan="6" class="table-error-text">Loading Javascript page...</td>`;
    goodsTableBody.appendChild(loadingRow);
  }

  try {
    const productData = await getProducts(page, pageSize);
    const products = productData.data;
    totalPages = productData.meta.pagination.pageCount;

    // Clear table only on the first page load
    if (page === 1) {
      goodsTableBody.innerHTML = ''; // Clear only if it's the first page
    } else {
      // Remove the loading row after loading
      if (existingLoadingRow) existingLoadingRow.remove();
    }

    if (products.length === 0 && page === 1) {
      goodsTableBody.innerHTML =
        '<tr class="loading-row"><td colspan="6" class="table-error-text">No Products Available.</td></tr>';
    } else {
      products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-document-id', product.documentId);
        row.classList.add('table-body-row');

        //   console.log(product);

        row.innerHTML = `
          <td class="py-1 productSerialNumber">${
            (page - 1) * pageSize + index + 1
          }</td>
          <td class="py-1 productName">${product.name}</td>
          <td class="py-1 productAmountBought">&#x20A6;${formatAmountWithCommas(
            product.amount_bought
          )}</td>
          <td class="py-1 productQuantity">${product.quantity}</td>
          <td class="py-1 productSellingPrice">&#x20A6;${formatAmountWithCommas(
            product.amount_to_sell
          )}</td>
          <td class="py-1"><button class="hero-btn-light updateProductButton" data-product-id="${
            product.id
          }">UPDATE</button></td>
        `;
        goodsTableBody.appendChild(row);
      });

      // Attach event listeners after rendering the rows
      const updateProductButtons = document.querySelectorAll(
        '.updateProductButton'
      );
      updateProductButtons.forEach((button) => {
        button.addEventListener('click', handleUpdateBtnClick);
      });
    }
  } catch (error) {
    console.error('Error rendering products:', error);
    goodsTableBody.innerHTML =
      '<tr class="loading-row"><td colspan="6" class="table-error-text">No Products Available.</td></tr>';
  } finally {
    //  loadingRow.remove(); // Ensure the loading row is always removed

    const loadingRowToRemove = goodsTableBody.querySelector('.loading-row');
    if (loadingRowToRemove) loadingRowToRemove.remove();

    // Show or hide the Load More button
    if (currentPage >= totalPages) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }
  }
}

document.getElementById('loadMoreButton').addEventListener('click', () => {
  currentPage++;
  renderAddedGoods(currentPage);
});

// Initial load of the first page of products
renderAddedGoods(currentPage);

// JS to dispaly Item to be Updated
const updateProductButton = document.querySelectorAll('.updateProductButton');
const updateProductContainer = document.querySelector('.updateProduct');
const updateProductNameInput = document.getElementById('updateProductName');
const productBoughtPriceInput = document.getElementById('productBoughtPrice');
const previousItemPriceInput = document.getElementById('previousItemPrice');

const newItemNameInput = document.getElementById('newItemName');
const newItemPriceInput = document.getElementById('newItemSellingPrice');
const saveProductButton = document.querySelector('.saveProductButton');

async function handleUpdateBtnClick(event) {
  const button = event.target;
  const productId = button.dataset.productId;

  const productData = await getProducts(currentPage, pageSize);

  const product = productData.data.find(
    (product) => product.id.toString() === productId
  );

  if (product) {
    updateProductContainer.dataset.documentId = product.documentId;
    updateProductContainer.dataset.productId = product.id;

    updateProductContainer.classList.add('active');
    main.classList.add('blur');
    sidebar.classList.add('blur');
    main.classList.add('no-scroll');

    updateProductNameInput.value = product.name;
    productBoughtPriceInput.value = product.amount_bought;
    previousItemPriceInput.value = product.amount_to_sell;
    //  updateProductQuantityInput.value = product.quantity;
  } else {
    console.error(`Product with id ${productId} not found in Store.`);
  }
}

// Call the function to render products
renderAddedGoods();

// Handle form submission - UPDATE

async function handleUpdateProductSubmit(e) {
  isSubmitting = true;
  e.preventDefault();

  const documentId = updateProductContainer.dataset.documentId;
  //   console.log('Document ID:', documentId);

  const productData = await getProducts(currentPage, pageSize);
  const existingProduct = productData.data.find(
    (product) => product.documentId === documentId
  );

  // Prepare the update data, maintaining existing values if new ones are empty
  const updateProductFormData = {
    name: newItemNameInput.value.trim() || existingProduct.name,
    amount_to_sell: newItemPriceInput.value
      ? Number(newItemPriceInput.value)
      : existingProduct.amount_to_sell,
  };

  // Only proceed if there are changes to be made
  const hasChanges =
    updateProductFormData.name !== existingProduct.name ||
    updateProductFormData.amount_to_sell !== existingProduct.amount_to_sell;

  if (!hasChanges) {
    showToast('info', 'No changes detected. Please update fields to modify.');
    isSubmitting = false;
    return;
  }

  try {
    const response = await updateProduct(documentId, {
      data: { ...updateProductFormData },
    });

    if (response) {
      isSubmitting = false;
      // console.log('Product updated successfully:', response);
      showToast('success', 'Product updated successfully! ⭐');

      updateProductInTable(response.data);
    } else {
      showToast('fail', 'Product not updated. ❎');
      isSubmitting = false;
    }
  } catch (error) {
    console.error('Error adding product:', error);
    showToast('fail', 'Product not updated. ❎');
  } finally {
    newItemNameInput.value = '';
    newItemPriceInput.value = '';
    isSubmitting = false;
    closeModal();
  }
}

if (saveProductButton) {
  saveProductButton.addEventListener('click', function (e) {
    handleUpdateProductSubmit(e);

    isSubmitting = true
      ? (addProductModalBtn.innerHTML = 'Submitting...')
      : 'Save';
  });
}

// Update existing product in the table
function updateProductInTable(product) {
  const goodsTableBody = document.querySelector('.product-table tbody');
  const existingRow = goodsTableBody.querySelector(
    `tr[data-document-id="${product.documentId}"]`
  );

  if (existingRow) {
    // Update the existing row with new product data
    existingRow.innerHTML = `
       <td class="py-1 productSerialNumber">${
         Array.from(goodsTableBody.children).indexOf(existingRow) + 1
       }</td>
       <td class="py-1 productName">${product.name}</td>
       <td class="py-1 productAmountBought">&#x20A6;${formatAmountWithCommas(
         product.amount_bought
       )}</td>
       <td class="py-1 productQuantity">${product.quantity}</td>
       <td class="py-1 productSellingPrice">&#x20A6;${formatAmountWithCommas(
         product.amount_to_sell
       )}</td>
       <td class="py-1">
         <button class="hero-btn-light updateProductButton" data-product-id="${
           product.id
         }">UPDATE</button>
       </td>
     `;

    const updateProductButtons = document.querySelectorAll(
      '.updateProductButton'
    );
    updateProductButtons.forEach((button) => {
      button.addEventListener('click', handleUpdateBtnClick);
    });
  }
}

// JS for modal
const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');

const closeModalButton = document.querySelectorAll('.closeModal');
const closeImageModalBtn = document.querySelectorAll('.closeImageModal');

closeModalButton.forEach((closeButton) => {
  closeButton.addEventListener('click', function () {
    closeModal();
  });
});

function closeModal() {
  const addProductContainer = document.querySelector('.addProduct');

  updateProductContainer.classList.remove('active');
  addProductContainer.classList.remove('active');

  main.classList.remove('blur');
  sidebar.classList.remove('blur');
  main.classList.remove('no-scroll');
}

// JS for Modal
document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.querySelector('.addProductButton');
  const addProductContainer = document.querySelector('.addProduct');

  if (addButton) {
    addButton.addEventListener('click', function () {
      addProductContainer.classList.add('active');
      main.classList.add('blur');
      sidebar.classList.add('blur');
      main.classList.add('no-scroll');
    });
  }
});
