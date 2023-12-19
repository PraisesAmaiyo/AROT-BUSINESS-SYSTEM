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
        productBalancePrice.disabled = true;
      } else {
        balancePayment.style.display = 'flex';
        productBalancePrice.disabled = false;
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
const sellButtons = document.querySelectorAll('.sellButton');

sellButtons.forEach((button, index) => {
  button.addEventListener('click', function (e) {
    sellProductContainer.classList.add('active');
    main.classList.add('blur');
    sidebar.classList.add('blur');
    main.classList.add('no-scroll');

    const target = e.target;
    console.log(index);
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

  const allData = [...storedData, addProductFormData];

  localStorage.setItem('addProductFormData', JSON.stringify(allData));

  return addProductFormData;
}

const addProductForm = document.querySelector('.add-product-form');

if (addProductForm) {
  addProductForm.addEventListener('submit', function (e) {
    e.preventDefault();
    handleAddProductSubmit();

    addProductName.value = '';
    addProductBoughtPrice.value = '';
    addProductSellingPrice.value = '';
    addProductQuantity.value = '';
    closeModal();
  });
}

const storedGoodsData = JSON.parse(localStorage.getItem('posFormData')) || [];

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
