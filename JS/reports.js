import { getPosTransactions } from './apiServices/pos-transactions';
import { formatAmountWithCommas } from './script';

// JS to Render saved POS from Database

async function renderPosTable() {
  const posTableBody = document.querySelector('.posTableDisplay tbody');
  const loadingRow = document.querySelector('.loading-row');

  if (!posTableBody || !loadingRow) {
    console.error('Table or loading row not found');
    return;
  }

  try {
    loadingRow.style.display = 'table-row';

    const posTransactionData = await getPosTransactions();
    const posTransactions = posTransactionData.data;

    posTableBody.innerHTML = '';

    if (posTransactions.length === 0) {
      posTableBody.innerHTML =
        '<tr class="loading-row"><td colspan="6" class="table-error-text ">No Products Available.</td></tr>';
    } else {
      posTransactions.forEach((posTransaction, index) => {
        const {
          fee_payment_type,
          transaction_amount,
          transaction_fee,
          transaction_remark,
          transaction_type,
          withdrawal_type,
        } = posTransaction;

        function toTitleCase(value) {
          return value.charAt(0).toUpperCase() + value.slice(1);
        }

        function formatTransactionType(value) {
          switch (value.toLowerCase()) {
            case 'withdraw':
              return 'Withdraw';
            case 'withdrawal/transfer':
              return 'Withdrawal & Transfer';
            case 'bill-payment':
              return 'Bill Payment';
            case 'deposit':
              return 'Deposit';
            default:
              return value;
          }
        }

        const feePaymentType = toTitleCase(fee_payment_type || 'N/A');
        const transactionType = transaction_type?.type || 'N/A';
        const withdrawalType = toTitleCase(withdrawal_type?.type || 'N/A');

        const row = document.createElement('tr');
        row.classList.add('table-body-row');

        row.innerHTML = `
         <td class="py-1">${index + 1}.</td>
         <td class="py-1 posTransTypeReport">${formatTransactionType(
           transactionType
         )}</td>
         <td class="py-1 posAmountReport">&#x20A6;${formatAmountWithCommas(
           transaction_amount
         )}</td>
           <td class="py-1 posFeeReport">&#x20A6;${formatAmountWithCommas(
             transaction_fee
           )}</td>
           <td class="py-1 posFeePaymentMethodReport">${feePaymentType}</td>
           <td class="py-1 posPaymentMethodReport">${withdrawalType}</td>
           <td class="py-1 posPaymentMethodRemark">${transaction_remark}</td>
              `;

        posTableBody.appendChild(row);
      });
    }

    updateTotalPosAmounts(posTransactions);
  } catch (error) {
    console.error('Error rendering products:', error);
    goodsTableBody.innerHTML =
      '<tr class="loading-row"><td colspan="6" class="table-error-text ">No Products Available.</td></tr>';
  } finally {
    loadingRow.style.display = 'none';
  }
}

// JS to give total POS Amount and Fees
function updateTotalPosAmounts(data) {
  const totalPosAmount = document.getElementById('totalPosAmount');
  const totalPosFee = document.getElementById('totalPosFee');

  if (!data || data.length === 0) {
    if (totalPosAmount) {
      totalPosAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;0</strong>`;
    }
    if (totalPosFee) {
      totalPosFee.innerHTML = `<strong>Total Fees = &nbsp;&#x20A6;0</strong>`;
    }
    return;
  }

  const totalAmount = data.reduce(
    (sum, item) => sum + item.transaction_amount,
    0
  );
  const totalFee = data.reduce((sum, item) => sum + item.transaction_fee, 0);

  if (totalPosAmount) {
    totalPosAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
      totalAmount
    )}</strong>`;
  }

  if (totalPosFee) {
    totalPosFee.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
      totalFee
    )}</strong>`;
  }
}

renderPosTable();

// JS to Render Sold goods from LocalStorage
const storedSoldGoods =
  JSON.parse(localStorage.getItem('soldProductFormData')) || [];

function renderGoodsTable() {
  const goodsTableBody = document.querySelector('.soldTableDisplay tbody');

  if (goodsTableBody) {
    goodsTableBody.innerHTML = '';

    storedSoldGoods.forEach((data, index) => {
      const row = document.createElement('tr');
      row.classList.add('table-body-row');

      row.innerHTML = `
    <td class="py-1">${index + 1}.</td>
    <td class="py-1 soldItemNameReport">${data.soldProductNameInput}</td>
    <td class="py-1 soldItemPriceReport">${`&#x20A6; ${formatAmountWithCommas(
      data.soldProductPriceInput
    )}`}</td>
    <td class="py-1 soldItemStatusReport">${data.checkboxStatus}</td>
    <td class="py-1 soldItemBalanceReport">${
      data.productBalancePriceInput === '-'
        ? '-'
        : `&#x20A6; ${formatAmountWithCommas(data.productBalancePriceInput)}`
    }</td>
    <td class="py-1 soldItemRemarkReport ">${data.soldProductRemarkInput}</td>
      `;
      goodsTableBody.appendChild(row);
    });
  }

  updateTotalSoldAmounts(storedSoldGoods);
}

// JS to give total Sold Amount
function updateTotalSoldAmounts(data) {
  const totalSoldAmount = document.getElementById('totalSoldAmount');

  const totalAmount = data.reduce(
    (sum, item) => sum + item.soldProductPriceInput,
    0
  );

  if (totalSoldAmount) {
    totalSoldAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
      totalAmount
    )}</strong>`;
  }
}

renderGoodsTable();

// JS to Render saved Charged form data
const storedChargedData =
  JSON.parse(localStorage.getItem('chargeFormData')) || [];

function renderChargingTable() {
  const chargingTableBody = document.querySelector(
    '.chargingTableDisplay tbody'
  );

  if (chargingTableBody) {
    chargingTableBody.innerHTML = '';

    storedChargedData.forEach((data, index) => {
      const row = document.createElement('tr');
      row.classList.add('table-body-row');

      row.innerHTML = `
    <td class="py-1">${index + 1}.</td>
    <td class="py-1 chargedItemNameReport">${data.selectedDeviceType}</td>
    <td class="py-1 chargedItemPriceReport">&#x20A6; ${
      data.deviceChargeFeeInput
    }</td>
    <td class="py-1 chargedItemOwnerReport ">${data.deviceOwnerNameInput}</td>
    <td class="py-1 chargedItemIdReport ">${data.deviceIdInput}</td>
    <td class="py-1 chargedItemAltNumberReport ">${
      data.alternativeNumberInput
    }</td>
    <td class="py-1 chargedItemStatusReport ">${data.selectedDeviceStatus}</td>
      `;

      chargingTableBody.appendChild(row);
    });
  }

  updateTotalChargedAmounts(storedChargedData);
}

// JS to give total Charged Amount
function updateTotalChargedAmounts(data) {
  const totalChargedAmount = document.getElementById('totalChargedAmount');

  const totalAmount = data.reduce(
    (sum, item) => sum + item.deviceChargeFeeInput,
    0
  );

  if (totalChargedAmount) {
    totalChargedAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
      totalAmount
    )}</strong>`;
  }
}
renderChargingTable();

// JS to Render saved Sim Registration form data
const storedSimRegData =
  JSON.parse(localStorage.getItem('simRegFormData')) || [];

function renderSimRegTable() {
  const SimRegTableBody = document.querySelector('.simRegTableDisplay tbody');
  if (SimRegTableBody) {
    SimRegTableBody.innerHTML = '';

    storedSimRegData.forEach((data, index) => {
      const row = document.createElement('tr');
      row.classList.add('table-body-row');

      row.innerHTML = `
    <td class="py-1">${index + 1}.</td>
    <td class="py-1 simNameReport">${data.selectedSimName}</td>
    <td class="py-1 simPriceReport">&#x20A6; ${data.simRegAmountInput}</td>
    <td class="py-1 PhoneNumberReport">${data.phoneNumberInput}</td>
    <td class="py-1 simStatusReport ">${data.checkboxStatus}</td>
      `;

      SimRegTableBody.appendChild(row);
    });
  }

  updateTotalSimRegAmounts(storedSimRegData);
}

// JS to give total SIM Reg Amount
function updateTotalSimRegAmounts(data) {
  const totalSimRegAmount = document.getElementById('totalSimRegAmount');

  const totalAmount = data.reduce(
    (sum, item) => sum + item.simRegAmountInput,
    0
  );

  if (totalSimRegAmount) {
    totalSimRegAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
      totalAmount
    )}</strong>`;
  }
}

renderSimRegTable();
