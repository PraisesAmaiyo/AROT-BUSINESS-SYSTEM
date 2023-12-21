// function to format amounts with commas
function formatAmountWithCommas(amount) {
  const amountString = amount.toString();
  return amountString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

document.addEventListener('DOMContentLoaded', function () {
  const completedCheckbox = document.getElementById('completedCheckbox');
  const pendingCheckbox = document.getElementById('pendingCheckbox');
  const balancePayment = document.querySelector('.balancePayment');
  const balancePaymentInput = document.getElementById('productBalancePrice');

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
          otherCheckbox.removeAttribute('required');
        }
      });

      if (checkbox === completedCheckbox) {
        balancePayment.style.display = 'none';
        balancePaymentInput.disabled = true;
      } else {
        console.log('b');
        balancePayment.style.display = 'flex';
        balancePaymentInput.disabled = false;
      }
    });
  });

  balancePaymentInput.addEventListener('input', function () {
    if (parseFloat(balancePaymentInput.value) > 0) {
      console.log(balancePaymentInput.value);
      pendingCheckbox.checked = true;
    } else {
      pendingCheckbox.checked = false;
    }
  });
});

// JS for Adding Products
const addProductName = document.getElementById('addProductName');
const addProductBoughtPrice = document.getElementById('addProductBoughtPrice');
const addProductSellingPrice = document.getElementById(
  'addProductSellingPrice'
);
const addProductQuantity = document.getElementById('addProductQuantity');

function handleAddProductSubmit() {
  let addProductNameInput = addProductName.value;
  let addProductBoughtPriceInput = Number(addProductBoughtPrice.value);
  let addProductSellingPriceInput = Number(addProductSellingPrice.value);
  let addProductQuantityInput = Number(addProductQuantity.value);
  let id = Math.random();

  const addProductFormData = {
    addProductNameInput,
    addProductBoughtPriceInput,
    addProductSellingPriceInput,
    addProductQuantityInput,
    id,
  };

  const storedData =
    JSON.parse(localStorage.getItem('addProductFormData')) || [];

  const allData = [addProductFormData, ...storedData];

  localStorage.setItem('addProductFormData', JSON.stringify(allData));

  return addProductFormData;
}

const addProductForm = document.querySelector('.add-product-form');

if (addProductForm) {
  addProductForm.addEventListener('submit', function (e) {
    //  e.preventDefault();
    handleAddProductSubmit();

    addProductName.value = '';
    addProductBoughtPrice.value = '';
    addProductSellingPrice.value = '';
    addProductQuantity.value = '';
    closeModal();
  });
}

// JS to render items from LocalStorage
const storedGoodsData =
  JSON.parse(localStorage.getItem('addProductFormData')) || [];

function renderAddedGoods() {
  const goodsTableBody = document.querySelector('.product-table tbody');

  goodsTableBody.innerHTML = '';

  storedGoodsData.forEach((data, index) => {
    const row = document.createElement('tr');
    row.classList.add('table-body-row');

    row.innerHTML = `
    <td class="py-1 productSerialNumber">${index + 1}</td>
    <td class="py-1 productName">${data.addProductNameInput}</td>
    <td class="py-1 productAmountBought">&#x20A6;${formatAmountWithCommas(
      data.addProductBoughtPriceInput
    )}</td>
    <td class="py-1 productQuantity">${data.addProductQuantityInput}</td>
    <td class="py-1 productSellingPrice">&#x20A6;${formatAmountWithCommas(
      data.addProductSellingPriceInput
    )}</td>
    <td class="py-1 "><button class="hero-btn-light sellButton">Sell</button></td>
   `;

    goodsTableBody.appendChild(row);
  });
}

renderAddedGoods();

// JS to dispaly Item to be sold
const sellButtons = document.querySelectorAll('.sellButton');
const modalProductName = document.querySelector('.SellingItemName');
const soldItemBoughtPrice = document.getElementById('soldItemBoughtPrice');

sellButtons.forEach((button, index) => {
  button.addEventListener('click', function (e) {
    sellProductContainer.classList.add('active');
    main.classList.add('blur');
    sidebar.classList.add('blur');
    main.classList.add('no-scroll');

    const tableRow = e.target.closest('.table-body-row');
    const selectedIndex = index;

    const selectedItem = storedGoodsData[selectedIndex];

    if (selectedItem) {
      const productName = selectedItem.addProductNameInput;
      const amountBought = formatAmountWithCommas(
        selectedItem.addProductBoughtPriceInput
      );

      modalProductName.textContent = productName;
      soldItemBoughtPrice.value = amountBought;
    }
  });
});

// JS for Selling Products and adding to localStorage
// const SellingItemName = document.getElementById('SellingItemName');
// const soldProductPrice = document.getElementById('soldProductPrice');
// const addProductSellingPrice = document.getElementById(
//   'addProductSellingPrice'
// );
// const addProductQuantity = document.getElementById('addProductQuantity');

// function handleAddProductSubmit() {
//   let addProductNameInput = addProductName.value;
//   let addProductBoughtPriceInput = Number(addProductBoughtPrice.value);
//   let addProductSellingPriceInput = Number(addProductSellingPrice.value);
//   let addProductQuantityInput = Number(addProductQuantity.value);
//   let id = Math.random();

//   const addProductFormData = {
//     addProductNameInput,
//     addProductBoughtPriceInput,
//     addProductSellingPriceInput,
//     addProductQuantityInput,
//     id,
//   };

//   const storedData =
//     JSON.parse(localStorage.getItem('addProductFormData')) || [];

//   const allData = [addProductFormData, ...storedData];

//   localStorage.setItem('addProductFormData', JSON.stringify(allData));

//   return addProductFormData;
// }

// const addProductForm = document.querySelector('.add-product-form');

// if (addProductForm) {
//   addProductForm.addEventListener('submit', function (e) {
//     //  e.preventDefault();
//     handleAddProductSubmit();

//     addProductName.value = '';
//     addProductBoughtPrice.value = '';
//     addProductSellingPrice.value = '';
//     addProductQuantity.value = '';
//     closeModal();
//   });
// }

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
  sellProductContainer.classList.remove('active');
  addProductContainer.classList.remove('active');

  main.classList.remove('blur');
  sidebar.classList.remove('blur');
  main.classList.remove('no-scroll');
}

// JS for Modal

const addButton = document.querySelector('.addProductButton');
const addProductContainer = document.querySelector('.addProduct');

addButton.addEventListener('click', function () {
  console.log('object');
  addProductContainer.classList.add('active');
  main.classList.add('blur');
  sidebar.classList.add('blur');
  main.classList.add('no-scroll');
});

const sellProductContainer = document.querySelector('.sellProduct');
