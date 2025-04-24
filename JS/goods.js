const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('./apiServices/product');
const { showToast, formatAmountWithCommas } = require('./script');

let isSubmitting = false;
const deleteProductButton = document.querySelector('.deleteProductButton');

// JS for Adding Products
const addProductName = document.getElementById('addProductName');
const addProductBoughtPrice = document.getElementById('addProductBoughtPrice');
const addProductSellingPrice = document.getElementById(
  'addProductSellingPrice'
);
const addProductQuantity = document.getElementById('addProductQuantity');

async function handleAddProductSubmit(e) {
  e.preventDefault();
  isSubmitting = true;

  addProductModalBtn.innerHTML = 'Submitting...';

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

    console.log('Response from addProduct:', response);

    if (response) {
      isSubmitting = false;
      console.log('Product added successfully:', response);
      showToast('success', 'Product added successfully! ⭐');

      appendProductToTable(response.data);
    } else {
      showToast('fail', 'Product not added 1. ❎');
      isSubmitting = false;
    }
  } catch (error) {
    console.error('Error adding product:', error);
    showToast('fail', 'Product not added 2. ❎');
  } finally {
    addProductName.value = '';
    addProductBoughtPrice.value = '';
    addProductSellingPrice.value = '';
    addProductQuantity.value = '';
    isSubmitting = false;
    addProductModalBtn.innerHTML = isSubmitting ? 'Submitting...' : 'Save';

    closeModal();
  }

  return addProductFormData;
}

const addProductForm = document.querySelector('.add-product-form');
const addProductModalBtn = document.querySelector('.addProductModalBtn');

if (addProductForm) {
  addProductForm.addEventListener('submit', function (e) {
    handleAddProductSubmit(e);
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
  
     <td class="py-1 action-buttons">
     <button class="hero-btn-outline updateProductButton" data-product-id="${
       product.id
     }">
        <i class="fa-solid fa-pen-to-square" data-product-id="${
          product.id
        }"></i>
        </button>

     <button class="hero-btn-outline deleteProductModalButtons" data-product-id="${
       product.id
     }"><i class="fa-solid fa-trash-can" data-product-id="${product.id}"></i>
        </button>
  </td>
   `;

  goodsTableBody.appendChild(row);

  // Attach event listeners after rendering the rows
  const updateProductButtons = document.querySelectorAll(
    '.updateProductButton'
  );

  updateProductButtons.forEach((button) => {
    button.addEventListener('click', handleUpdateBtnClick);
  });

  // Attach delete button modal trigger event listeners
  const deleteProductModalButtons = document.querySelectorAll(
    '.deleteProductModalButtons'
  );

  deleteProductModalButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const productId = button.dataset.productId; // Get product ID
      const productName = button
        .closest('tr')
        .querySelector('.productName').textContent;

      deleteProductButton.dataset.productId = productId; // Pass the product ID to the delete button
      const confirmationText = document.querySelector('.confirmation-text');
      confirmationText.textContent = `Are you sure you want to delete "${productName}"?`;

      // Show modal
      confirmation.classList.add('active');
      main.classList.add('blur');
      sidebar.classList.add('blur');
      main.classList.add('no-scroll');

      // Dont delete
      //  const documentId = button.dataset.documentId; // Get the documentId
      //  deleteProductButton.dataset.productId = button.dataset.productId; // Pass it to the modal delete button
      //  confirmation.classList.add('active'); // Show modal
      //  main.classList.add('blur');
      //  sidebar.classList.add('blur');
      //  main.classList.add('no-scroll');
    });
  });

  // Handle actual delete in the modal
  deleteProductButton.addEventListener('click', async function () {
    confirmation.classList.remove('active'); // Hide modal
    main.classList.remove('blur');
    sidebar.classList.remove('blur');
    main.classList.remove('no-scroll');
    await handleDeleteBtnClick({ target: deleteProductButton }); // Pass button as event target
    renderAddedGoods();
  });
}

// JS to render items from database

let currentPage = 1;
const pageSize = 25;
let totalPages = 1;

async function renderAddedGoods(page = 1) {
  const goodsTableBody = document.querySelector('.product-table tbody');
  const loadMoreButton = document.getElementById('loadMoreButton');

  const deleteProductButton = document.querySelector('.deleteProductButton');

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
    loadingRow.innerHTML = `<td colspan="6" class="table-error-text">Loading Products...</td>`;
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
     

            <td class="py-1 action-buttons">
               <button class="hero-btn-outline updateProductButton" data-product-id="${
                 product.id
               }">
                  <i class="fa-solid fa-pen-to-square" data-product-id="${
                    product.id
                  }"></i>
                  </button>

               <button class="hero-btn-outline deleteProductModalButtons" data-product-id="${
                 product.id
               }"><i class="fa-solid fa-trash-can" data-product-id="${
          product.id
        }"></i>
                  </button>
            </td>
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

      // Attach delete button modal trigger event listeners
      const deleteProductModalButtons = document.querySelectorAll(
        '.deleteProductModalButtons'
      );

      deleteProductModalButtons.forEach((button) => {
        button.addEventListener('click', function () {
          const productId = button.dataset.productId; // Get product ID
          const productName = button
            .closest('tr')
            .querySelector('.productName').textContent;

          deleteProductButton.dataset.productId = productId; // Pass the product ID to the delete button
          const confirmationText = document.querySelector('.confirmation-text');
          confirmationText.textContent = `Are you sure you want to delete "${productName}"?`;

          // Show modal
          confirmation.classList.add('active');
          main.classList.add('blur');
          sidebar.classList.add('blur');
          main.classList.add('no-scroll');

          // Dont delete
          //  const documentId = button.dataset.documentId; // Get the documentId
          //  deleteProductButton.dataset.productId = button.dataset.productId; // Pass it to the modal delete button
          //  confirmation.classList.add('active'); // Show modal
          //  main.classList.add('blur');
          //  sidebar.classList.add('blur');
          //  main.classList.add('no-scroll');
        });
      });

      // Handle actual delete in the modal
      deleteProductButton.addEventListener('click', async function () {
        confirmation.classList.remove('active'); // Hide modal
        main.classList.remove('blur');
        sidebar.classList.remove('blur');
        main.classList.remove('no-scroll');
        await handleDeleteBtnClick({ target: deleteProductButton }); // Pass button as event target
        renderAddedGoods();
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

async function handleDeleteBtnClick(event) {
  const button = event.target;
  const productId = button.dataset.productId;

  // Get products from the current page
  const productData = await getProducts(currentPage, pageSize);

  // Find the product by productId
  const product = productData.data.find(
    (product) => product.id.toString() === productId.toString()
  );

  // Check if product was found before attempting to delete

  //   if (!product) {
  //     showToast('fail', 'Product not found. ❎');
  //     return;
  //   }

  if (product) {
    const documentId = product.documentId; // Get the documentId

    try {
      // Call the deleteProduct function with documentId
      const deletionSuccess = await deleteProduct(documentId);

      // If deletion is successful, show success message
      if (deletionSuccess) {
        showToast('success', 'Product deleted successfully! ⭐');
        // renderAddedGoods(currentPage); // Reloadig the product list
      } else {
        // If deletion fails, show error message
        showToast('fail', 'Product not deleted. ❎');
      }
    } catch (error) {
      showToast('fail', 'Product not deleted. ❎');
    }
  }
}

// async function handleDeleteBtnClick(event) {
//   const button = event.target;
//   const productId = button.dataset.productId;

//   // Get products from the current page
//   const productData = await getProducts(currentPage, pageSize);

//   // Find the product by productId
//   const product = productData.data.find(
//     (product) => product.id.toString() === productId.toString()
//   );

//   //   // If the product was not found, show the failure toast and return
//   //   if (!product) {
//   //     showToast('fail', 'Product not found. ❎');
//   //     return;
//   //   }

//   if (product) {
//     const documentId = product.documentId; // Get the documentId
//   }

//   try {
//     // Call the deleteProduct function with documentId
//     const deletionSuccess = await deleteProduct(documentId);

//     // If deletion is successful, show success message
//     if (deletionSuccess) {
//       showToast('success', 'Product deleted successfully! ⭐');

//       // Directly remove the product from the UI
//       removeProductFromUI(productId);

//       // Optionally, refetch the product list if necessary
//       // renderAddedGoods(currentPage); // Reloading the product list if necessary
//     } else {
//       // If deletion fails, show error message
//       showToast('fail', 'Product not deleted. ❎');
//     }
//   } catch (error) {
//     showToast('fail', 'Product not deleted. ❎');
//   }
// }

// Function to remove product from the UI directly
function removeProductFromUI(productId) {
  const productRow = document.querySelector(`[data-product-id="${productId}"]`);
  if (productRow) {
    productRow.remove(); // Removes the product element from the DOM
  }
}

renderAddedGoods();

// Handle form submission - UPDATE

async function handleUpdateProductSubmit(e) {
  e.preventDefault();
  isSubmitting = true;

  saveProductButton.innerHTML = 'UPDATING...';

  const documentId = updateProductContainer.dataset.documentId;

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
    saveProductButton.innerHTML = isSubmitting ? 'UPDATING...' : 'UPDATE';

    closeModal();
  }
}

if (saveProductButton) {
  saveProductButton.addEventListener('click', function (e) {
    handleUpdateProductSubmit(e);

    isSubmitting = true
      ? (saveProductButton.innerHTML = 'UPDATING...')
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
 
       
            <td class="py-1 action-buttons">
               <button class="hero-btn-outline updateProductButton" data-product-id="${
                 product.id
               }">
                  <i class="fa-solid fa-pen-to-square" data-product-id="${
                    product.id
                  }"></i>
                  </button>

               <button class="hero-btn-outline deleteProductModalButtons" data-product-id="${
                 product.id
               }"><i class="fa-solid fa-trash-can" data-product-id="${
      product.id
    }"></i>
                  </button>
            </td>
     `;

    const updateProductButtons = document.querySelectorAll(
      '.updateProductButton'
    );

    updateProductButtons.forEach((button) => {
      button.addEventListener('click', handleUpdateBtnClick);
    });

    // Attach delete button modal trigger event listeners
    const deleteProductModalButtons = document.querySelectorAll(
      '.deleteProductModalButtons'
    );

    deleteProductModalButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const productId = button.dataset.productId; // Get product ID
        const productName = button
          .closest('tr')
          .querySelector('.productName').textContent;

        deleteProductButton.dataset.productId = productId; // Pass the product ID to the delete button
        const confirmationText = document.querySelector('.confirmation-text');
        confirmationText.textContent = `Are you sure you want to delete "${productName}"?`;

        // Show modal
        confirmation.classList.add('active');
        main.classList.add('blur');
        sidebar.classList.add('blur');
        main.classList.add('no-scroll');

        // Dont delete
        //  const documentId = button.dataset.documentId; // Get the documentId
        //  deleteProductButton.dataset.productId = button.dataset.productId; // Pass it to the modal delete button
        //  confirmation.classList.add('active'); // Show modal
        //  main.classList.add('blur');
        //  sidebar.classList.add('blur');
        //  main.classList.add('no-scroll');
      });
    });

    // Handle actual delete in the modal
    deleteProductButton.addEventListener('click', async function () {
      confirmation.classList.remove('active'); // Hide modal
      main.classList.remove('blur');
      sidebar.classList.remove('blur');
      main.classList.remove('no-scroll');
      await handleDeleteBtnClick({ target: deleteProductButton }); // Pass button as event target
      renderAddedGoods();
    });
  }
}

// JS for modal
const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');

const confirmation = document.querySelector('.confirmation');

const closeModalButton = document.querySelectorAll('.closeModal');
const closeImageModalBtn = document.querySelectorAll('.closeImageModal');

const cancelDelete = document.querySelector('.cancel-delete');

cancelDelete.addEventListener('click', function () {
  closeModal();
});

closeModalButton.forEach((closeButton) => {
  closeButton.addEventListener('click', function () {
    closeModal();
  });
});

function closeModal() {
  const addProductContainer = document.querySelector('.addProduct');

  updateProductContainer.classList.remove('active');
  addProductContainer.classList.remove('active');
  confirmation.classList.remove('active');

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

function generateReceipt() {
  let saleData = {
    customer: 'John Doe',
    date: new Date().toLocaleString(),
    items: [
      { name: 'Laptop', qty: 1, price: 250000 },
      { name: 'Mouse', qty: 2, price: 5000 },
    ],
  };

  document.getElementById('rCustomer').textContent = saleData.customer;
  document.getElementById('rDate').textContent = saleData.date;

  let tbody = document.getElementById('receiptItems');
  tbody.innerHTML = '';
  let grandTotal = 0;

  saleData.items.forEach((item) => {
    let total = item.qty * item.price;
    grandTotal += total;

    let row = `<tr>
           <td>${item.name}</td>
           <td>${item.qty}</td>
           <td>₦${item.price}</td>
           <td>₦${total}</td>
       </tr>`;
    tbody.innerHTML += row;
  });

  document.getElementById('rGrandTotal').textContent = grandTotal;

  // Make receipt visible
  document.getElementById('receipt').style.display = 'block';
}

// Function to print only the receipt
function printReceipt() {
  let receiptContent = document.getElementById('receipt').innerHTML;

  let printWindow = window.open('', '', 'width=600,height=600');
  printWindow.document.write(`
       <html>
       <head>
           <title>Print Receipt</title>
           <link rel="stylesheet" href="styles.css">
       </head>
       <body>
           <h3>Store Name</h3>
           ${receiptContent}
       </body>
       </html>
   `);
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
}
