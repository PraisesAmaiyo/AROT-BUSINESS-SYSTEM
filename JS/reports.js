// function to format amounts with commas
function formatAmountWithCommas(amount) {
  const amountString = amount.toString();
  return amountString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// JS to Render saved POS form data
const storedPosData = JSON.parse(localStorage.getItem('posFormData')) || [];

function renderPosTable() {
  const posTableBody = document.querySelector('.posTableDisplay tbody');

  posTableBody.innerHTML = '';

  storedPosData.forEach((data, index) => {
    const row = document.createElement('tr');
    row.classList.add('table-body-row');

    row.innerHTML = `
    <td class="py-1">${index + 1}</td>
    <td class="py-1 posTransTypeReport">${data.selectedTransactionType}</td>
    <td class="py-1 posAmountReport">&#x20A6;${formatAmountWithCommas(
      data.posTransactionAmount
    )}</td>
    <td class="py-1 posFeeReport">&#x20A6;${formatAmountWithCommas(
      data.posTransactionFee
    )}</td>
    <td class="py-1 posPaymentMethodReport">${data.selectedWithdrawalType}</td>
      `;

    posTableBody.appendChild(row);
  });
  updateTotalPosAmounts(storedPosData);
}

// JS to give total POS Amount and Fees
function updateTotalPosAmounts(data) {
  const totalPosAmount = document.getElementById('totalPosAmount');
  const totalPosFee = document.getElementById('totalPosFee');

  const totalAmount = data.reduce(
    (sum, item) => sum + item.posTransactionAmount,
    0
  );
  const totalFee = data.reduce((sum, item) => sum + item.posTransactionFee, 0);

  totalPosAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
    totalAmount
  )}</strong>`;
  totalPosFee.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
    totalFee
  )}</strong>`;
}

renderPosTable();

// JS to Render Sold goodsfrom LocalStorage
const storedSoldGoods =
  JSON.parse(localStorage.getItem('sellProductFormData')) || [];

function renderGoodsTable() {
  const goodsTableBody = document.querySelector('.soldTableDisplay tbody');

  goodsTableBody.innerHTML = '';

  storedSoldGoods.forEach((data, index) => {
    const row = document.createElement('tr');
    row.classList.add('table-body-row');

    row.innerHTML = `
    <td class="py-1">${index + 1}</td>
    <td class="py-1 soldItemNameReport">${data.soldItemNameInput}</td>
    <td class="py-1 soldItemPriceReport">${data.soldProductPriceInput}</td>
    <td class="py-1 soldItemStatusReport">${data.checkboxStatus}</td>
    <td class="py-1 soldItemRemarkReport ">${data.soldProductRemarkInput}</td>
      `;
    goodsTableBody.appendChild(row);
  });
  updateTotalSoldAmounts(storedSoldGoods);
}

// JS to give total Sold Amount
function updateTotalSoldAmounts(data) {
  const totalSoldAmount = document.getElementById('totalSoldAmount');

  const totalAmount = data.reduce(
    (sum, item) => sum + item.soldProductPriceInput,
    0
  );

  totalSoldAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
    totalAmount
  )}</strong>`;
}

renderGoodsTable();
