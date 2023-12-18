// Toggle the active class for sideNavs
const sideNavs = document.querySelectorAll('.side-nav_item');

sideNavs.forEach((nav) => {
  nav.addEventListener('click', () => {
    nav.classList.add('active');

    sideNavs.forEach((otherNav) => {
      if (otherNav !== nav) {
        otherNav.classList.remove('active');
      }
    });
  });
});

// JavaScript to toggle withdrawal methods
const withdrawalType = document.querySelector('.withdrawalTransactionType');

const transactionType = document.getElementById('transactionType');

if (transactionType) {
  transactionType.addEventListener('change', function (e) {
    const selectedType = e.target.value;

    if (selectedType === 'withdraw') {
      withdrawalType.style.display = 'block';
    } else if (selectedType === 'deposit') {
      withdrawalType.style.display = 'none';
    }
  });
}

// JavaScript for Forms

export function handlePosFormSubmit() {
  const transactionType = document.getElementById('transactionType');
  const withdrawalType = document.getElementById('withdrawalType');
  const amount = document.getElementById('posTransactionAmount');
  const fee = document.getElementById('posTransactionFee');

  let selectedTransactionType = transactionType.value;
  let selectedWithdrawalType = withdrawalType.value;
  let posTransactionAmount = Number(amount.value);
  let posTransactionFee = Number(fee.value);

  if (transactionType.value === 'deposit') {
    selectedWithdrawalType = '';
  }

  const formData = {
    selectedTransactionType,
    selectedWithdrawalType,
    posTransactionAmount,
    posTransactionFee,
  };

  // Retrieve existing data from localStorage
  const storedData = JSON.parse(localStorage.getItem('posFormData')) || [];

  // Combine current form data with existing data
  const allData = [...storedData, formData];

  // Store the updated form data in localStorage
  localStorage.setItem('posFormData', JSON.stringify(allData));

  console.log(formData);
  console.log(allData);
  return formData;
}

const posForm = document.querySelector('.pos-method-form');

if (posForm) {
  posForm.addEventListener('submit', function (e) {
    e.preventDefault();
    handlePosFormSubmit();
  });
}
