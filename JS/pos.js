import {
  getPosTransactions,
  createPosTransaction,
} from './apiServices/pos-transactions';
import { showToast } from './script';

getPosTransactions();

// JavaScript to toggle withdrawal methods

document.addEventListener('DOMContentLoaded', function () {
  const withdrawalTypeDiv = document.querySelector(
    '.withdrawalTransactionType'
  );
  const transactionType = document.getElementById('transactionType');
  const withdrawalType = document.getElementById('withdrawalType');
  const posFeePaymentType = document.getElementById('posFeePaymentType');
  //   const posTransactionConfirmation = document.getElementById(
  //     'posTransactionConfirmation'
  //   );

  if (transactionType) {
    transactionType.addEventListener('change', function (e) {
      const selectedType = e.target.value;

      if (
        selectedType === 'withdrawal' ||
        selectedType === 'withdrawal/transfer' ||
        selectedType === 'bill-Payment'
      ) {
        withdrawalTypeDiv.style.display = 'block';
        //   posTransactionConfirmation.style.display = 'block';
      } else if (selectedType === 'deposit') {
        withdrawalType.value = 'cash';
        posFeePaymentType.value = 'cash';
        posFeePaymentType.style.display = 'block';
        withdrawalTypeDiv.style.display = 'none';
        //   posTransactionConfirmation.style.display = 'none';
      }

      //  if (selectedType === 'Deposit') {
      //   withdrawalType.value = 'Cash';

      //   const selectedOption =
      //     withdrawalType.querySelector(`option[value='Cash']`);
      //   if (selectedOption) {
      //     selectedOption.selected = true;
      //   }

      //   console.log('Withdrawal Type set to Cash');
      // }
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const posSuccessfulCheckbox = document.getElementById(
    'posSuccessfulCheckbox'
  );
  const posPendingCheckbox = document.getElementById('posPendingCheckbox');
  const posRemarksDiv = document.querySelector('.posRemarksDiv');
  const posTransactionRemark = document.getElementById('posTransactionRemark');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  function updateStatus() {
    if (posSuccessfulCheckbox.checked) {
      posRemarksDiv.style.display = 'none';
      posTransactionRemark.value = 'Successful';
      posTransactionRemark.disabled = true;
    } else {
      posRemarksDiv.style.display = 'block';
      posTransactionRemark.disabled = false;
    }
  }

  updateStatus();

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
          otherCheckbox.removeAttribute('required');
        }
      });

      if (checkbox === posSuccessfulCheckbox) {
        posPendingCheckbox.checked = !checkbox.checked;
      } else {
        posSuccessfulCheckbox.checked = !checkbox.checked;
        posTransactionRemark.value = '';
      }

      //Backup
      // if (checkbox === posSuccessfulCheckbox) {
      //   posSuccessfulCheckbox.checked = true;
      //   posRemarksDiv.style.display = 'none';
      //   posTransactionRemark.disabled = true;
      //   posTransactionRemark.value = 'Successful';
      // } else {
      //   posPendingCheckbox.checked = true;
      //   posRemarksDiv.style.display = 'flex';
      //   posTransactionRemark.disabled = false;
      //   posTransactionRemark.value = '';
      // }
      updateStatus();
    });
  });

  posTransactionRemark.addEventListener('input', function () {
    const inputValue = posTransactionRemark.value.trim();

    posPendingCheckbox.checked = inputValue !== '';
    posSuccessfulCheckbox.checked = !posPendingCheckbox.checked;
    posSuccessfulCheckbox.removeAttribute('required');

    //Backup
    //  if (inputValue !== '') {
    //    posPendingCheckbox.checked = true;
    //    posSuccessfulCheckbox.checked = false;
    //    posSuccessfulCheckbox.removeAttribute('required');
    //  } else {
    //    posPendingCheckbox.checked = false;
    //    return;
    //  }

    updateStatus();
  });
});

// JavaScript for POS Form
const amount = document.getElementById('posTransactionAmount');
const fee = document.getElementById('posTransactionFee');
const posFeePaymentType = document.getElementById('posFeePaymentType');
const posForm = document.querySelector('.pos-method-form');

if (posForm) {
  posForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const transactionType = document.getElementById('transactionType');
    const withdrawalType = document.getElementById('withdrawalType');
    const posSuccessfulCheckbox = document.getElementById(
      'posSuccessfulCheckbox'
    );
    const posPendingCheckbox = document.getElementById('posPendingCheckbox');
    const posRemarksDiv = document.querySelector('.posRemarksDiv');
    const withdrawalTypeDiv = document.querySelector(
      '.withdrawalTransactionType'
    );
    const posTransactionRemark = document.getElementById(
      'posTransactionRemark'
    );

    handlePosFormSubmit(
      e,
      transactionType,
      withdrawalType,
      amount,
      fee,
      posFeePaymentType,
      posTransactionRemark
    );

    transactionType.value = 'withdrawal';
    withdrawalType.value = 'card';
    posFeePaymentType.value = 'card';
    amount.value = '';
    fee.value = '';
    posTransactionRemark.value = '';
    posSuccessfulCheckbox.checked = false;
    posPendingCheckbox.checked = false;
    withdrawalTypeDiv.style.display = 'block';
    posRemarksDiv.style.display = 'block';
  });
}

// Form submission

// API relations DocumentId

const transactionTypeMapping = {
  withdrawal: 'iyn4ozpya7u37nxt99dx684p',
  deposit: 'nvf6nuxgasnpb7hse0ajo2xl',
  transfer: 'juz52es36vmqy0kgbv9b4jk0',
  'withdrawal/transfer': 'wzkt73kahydem84mcuepjl28',
  'bill-payment': 'vt40t2xafrborbp66yn5iydj',
};

const withdrawalTypeMapping = {
  card: 'ql3rrcihgg6ca41unh4prikw',
  transfer: 'as3m1r8b7zfmy4uqhgopquo6',
  cash: 'w4p4y4j2mm3ji6gu3sbj5057',
};

let isSubmitting = true;

async function handlePosFormSubmit(
  e,
  transactionType,
  withdrawalType,
  amount,
  fee,
  posFeePaymentType,
  posTransactionRemark
) {
  isSubmitting = true;
  e.preventDefault();

  const transactionTypeValue = transactionType.value.trim().toLowerCase();

  const transactionTypeId = transactionTypeMapping[transactionTypeValue];
  const withdrawalTypeId =
    withdrawalTypeMapping[withdrawalType.value.toLowerCase()];

  // Check if the mapping returned a valid ID
  if (!transactionTypeId) {
    console.error('Invalid transaction type:', transactionTypeValue);
    showToast('fail', 'Invalid transaction type selected. ❎');
    return; // Stop execution if invalid transaction type
  }

  // Create the form data with documentIds
  const posFormData = {
    transaction_type: transactionTypeId,
    withdrawal_type: withdrawalTypeId,
    transaction_amount: Number(amount.value),
    transaction_fee: Number(fee.value),
    fee_payment_type: posFeePaymentType.value.toLowerCase(),
    transaction_remark: posTransactionRemark.value,
  };

  try {
    const response = await createPosTransaction({
      data: {
        ...posFormData,
      },
    });

    if (response) {
      isSubmitting = false;
      console.log('POS transaction sent successfully:', response);
      showToast('success', 'POS transaction sent  successfully! ⭐');
    } else {
      showToast('fail', 'Failed to send POS transaction. ❎');
      isSubmitting = false;
    }
  } catch (error) {
    console.error('Error sending POS transaction:', error);
    showToast('fail', 'POS transaction not sent. ❎');
  } finally {
    //  addProductName.value = '';
    //  addProductBoughtPrice.value = '';
    //  addProductSellingPrice.value = '';
    //  addProductQuantity.value = '';
    //  closeModal();
  }

  console.log(posFormData);

  const storedData = JSON.parse(localStorage.getItem('posFormData')) || [];

  const allData = [posFormData, ...storedData];

  localStorage.setItem('posFormData', JSON.stringify(allData));

  return posFormData;
}
