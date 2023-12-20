function handleLogout() {
  // Set isLoggedIn to false
  localStorage.setItem('isLoggedIn', 'false');
  // Redirect to login page
  window.location.href = '/login';
}

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

document.addEventListener('DOMContentLoaded', function () {
  const withdrawalType = document.querySelector('.withdrawalTransactionType');
  const transactionType = document.getElementById('transactionType');

  if (transactionType) {
    transactionType.addEventListener('change', function (e) {
      const selectedType = e.target.value;

      if (selectedType === 'Withdraw') {
        withdrawalType.style.display = 'block';
      } else if (selectedType === 'Deposit') {
        withdrawalType.style.display = 'none';
      }
    });
  }
});

function resetWithdrawalTypeStyle() {
  const withdrawalType = document.querySelector('.withdrawalTransactionType');
  console.log('called');
  withdrawalType.style.display = 'block';
}

// JavaScript for POS Forms
const amount = document.getElementById('posTransactionAmount');
const fee = document.getElementById('posTransactionFee');
const posForm = document.querySelector('.pos-method-form');

if (posForm) {
  posForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const transactionType = document.getElementById('transactionType');
    const withdrawalType = document.getElementById('withdrawalType');

    handlePosFormSubmit(transactionType, withdrawalType, amount, fee);

    transactionType.value = 'Withdraw';
    withdrawalType.value = 'Card';
    withdrawalType.style.display = 'block';
    amount.value = '';
    fee.value = '';
    resetWithdrawalTypeStyle();
  });
}

function handlePosFormSubmit(transactionType, withdrawalType, amount, fee) {
  let selectedTransactionType = transactionType.value;
  let selectedWithdrawalType = withdrawalType.value;
  let posTransactionAmount = Number(amount.value);
  let posTransactionFee = Number(fee.value);
  let id = Math.random();

  //   if (transactionType.value === 'deposit') {
  //     selectedWithdrawalType = '-';
  //   }

  const posFormData = {
    selectedTransactionType,
    selectedWithdrawalType,
    posTransactionAmount,
    posTransactionFee,
    id,
  };

  const storedData = JSON.parse(localStorage.getItem('posFormData')) || [];

  const allData = [posFormData, ...storedData];

  localStorage.setItem('posFormData', JSON.stringify(allData));

  return posFormData;
}

// const posForm = document.querySelector('.pos-method-form');

// if (posForm) {
//   posForm.addEventListener('submit', function (e) {
//     e.preventDefault();

//     handlePosFormSubmit();

//     transactionType.value = 'Withdraw';
//     withdrawalType.value = 'Card';
//     withdrawalType.style.display = 'block';
//     amount.value = '';
//     fee.value = '';
//   });
// }
