const { addProduct, getProducts } = require('./apiServices/product');
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
const adProductModalBtn = document.querySelector('.adProductModalBtn');

if (addProductForm) {
  addProductForm.addEventListener('submit', function (e) {
    handleAddProductSubmit(e);

   //  console.log(isSubmitting);

    isSubmitting = true
      ? (adProductModalBtn.innerHTML = 'Submitting...')
      : 'Save';
  });
}

// Append new product to the table
function appendProductToTable(product) {
  const goodsTableBody = document.querySelector('.product-table tbody');
  const row = document.createElement('tr');
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
       <button class="hero-btn-light updatePriceButton" data-product-id="${
         product.id
       }">UPDATE PRICE</button>
     </td>
   `;

  goodsTableBody.appendChild(row);
}

// JS to render items from database

async function renderAddedGoods() {
  const goodsTableBody = document.querySelector('.product-table tbody');
  const loadingRow = document.querySelector('.loading-row');

  if (!goodsTableBody || !loadingRow) {
    console.error('Table or loading row not found');
    return;
  }

  try {
    loadingRow.style.display = 'table-row';

    const productData = await getProducts();
    const products = productData.data;

    goodsTableBody.innerHTML = '';

    if (products.length === 0) {
      goodsTableBody.innerHTML =
        '<tr class="loading-row"><td colspan="6" class="table-error-text ">No Products Available.</td></tr>';
    } else {
      products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.classList.add('table-body-row');

        row.innerHTML = `
        <td class="py-1 productSerialNumber">${index + 1}</td>
        <td class="py-1 productName">${product.name}</td>
        <td class="py-1 productAmountBought">&#x20A6;${formatAmountWithCommas(
          product.amount_bought
        )}</td>
         <td class="py-1 productQuantity">${product.quantity}</td>
         <td class="py-1 productSellingPrice">&#x20A6;${formatAmountWithCommas(
           product.amount_to_sell
         )}</td>
    <td class="py-1 "><button class="hero-btn-light updatePriceButton"  data-product-id="${
      product.id
    }">UPDATE PRICE</button></td>
   `;

        goodsTableBody.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Error rendering products:', error);
    goodsTableBody.innerHTML =
      '<tr class="loading-row"><td colspan="6" class="table-error-text ">No Products Available.</td></tr>';
  } finally {
    loadingRow.style.display = 'none';
  }
}

renderAddedGoods();

// JS to dispaly Item to be sold
const updatePriceButton = document.querySelectorAll('.updatePriceButton');
const updatePriceContainer = document.querySelector('.updatePrice');
const updatePriceNameInput = document.getElementById('updatePriceName');
const productBoughtPriceInput = document.getElementById('productBoughtPrice');
const previousItemPriceInput = document.getElementById('previousItemPrice');
const newItemPriceInput = document.getElementById('newItemPrice');
const saveProductButton = document.querySelector('.saveProductButton');

if (updatePriceButton) {
  updatePriceButton.forEach((button, index) => {
    button.addEventListener('click', function (e) {
      if (updatePriceContainer) {
        updatePriceContainer.classList.add('active');
        main.classList.add('blur');
        sidebar.classList.add('blur');
        main.classList.add('no-scroll');

        const productId = this.dataset.productId;
        const productData = storedGoodsData.find(
          (product) => product.id.toString() === productId
        );
      }

      if (productData) {
        updatePriceNameInput.value = productData.addProductNameInput;
        productBoughtPriceInput.value = productData.addProductBoughtPriceInput;
        previousItemPriceInput.value = productData.addProductSellingPriceInput;
        updatePriceContainer.classList.add('active');
      } else {
        console.error(
          `Product with id ${productId} not found in local storage.`
        );
      }
    });
  });
}

// Handle form submission - UPDATE

if (saveProductButton) {
  saveProductButton.addEventListener('click', function (e) {
    //   e.preventDefault();

    const updatedProductName = updatePriceNameInput.value;
    const updatedProductBoughtPrice = productBoughtPriceInput.value;
    const updatedNewItemPrice = newItemPriceInput.value;

    const storedData =
      JSON.parse(localStorage.getItem('addProductFormData')) || [];

    const productIndex = storedData.findIndex(
      (product) => product.addProductNameInput === updatedProductName
    );

    storedData[productIndex].addProductSellingPriceInput = updatedNewItemPrice;

    localStorage.setItem('addProductFormData', JSON.stringify(storedData));

    closeModal();
  });
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

  updatePriceContainer.classList.remove('active');
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
