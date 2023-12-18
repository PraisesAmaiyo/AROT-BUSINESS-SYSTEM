const details = [
  {
    name: 'Infinix Charger',
    image:
      'https://www.deeliver.co.za/cdn/shop/files/red-bull-energy-drink-250ml-24-pack-6x-4-pack.jpg?v=1686930747&width=1000',
    id: 23,
    category: 'accessories',
    price: 405,
    quantity: '17 Packs',
    unit: 6,
    expiry: '20/09/25',
    threshold: '9 packs',
    availability: 'In-stock',
  },
];

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
