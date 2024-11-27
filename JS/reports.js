// Thsi

import {
  deleteAllTransactions,
  getPosTransactions,
} from './apiServices/pos-transactions';
import { formatAmountWithCommas } from './script';

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

// JS to Render saved POS from Database
let allPosTransactions = [];

// Pagination control for load more
let currentPage = 1;
const pageSize = 25;
let totalPages = 1;

const loadMoreButton = document.getElementById('loadMoreButton');

loadMoreButton.addEventListener('click', () => {
  currentPage += 1;
  renderPosTable(currentPage, pageSize);
});

async function renderPosTable(page = 1, pageSize = 25) {
  const posTableBody = document.querySelector('.posTableDisplay tbody');
  const loadMoreButton = document.getElementById('loadMoreButton');

  if (!posTableBody) {
    console.error('Error: Table body not found');
    return;
  }

  try {
    // Show a loading indicator
    let loadingRow = document.querySelector('.loading-row');
    if (!loadingRow) {
      loadingRow = document.createElement('tr');
      loadingRow.className = 'loading-row';
      loadingRow.innerHTML = `<td colspan="6" class="table-loading-text">Loading transactions...</td>`;
      posTableBody.appendChild(loadingRow);
    }

    // Fetch data from the API
    const posTransactionData = await getPosTransactions(page, pageSize);
    const posTransactions = posTransactionData.data;
    totalPages = posTransactionData.meta.pagination.pageCount;

    // Append new transactions to the main array
    posTransactions.forEach((transaction) => {
      if (!allPosTransactions.some((t) => t.id === transaction.id)) {
        allPosTransactions.push(transaction);
      }
    });

    // Clear the table body and render all accumulated transactions
    posTableBody.innerHTML = '';
    allPosTransactions.forEach((posTransaction, index) => {
      const {
        fee_payment_type,
        transaction_amount,
        transaction_fee,
        machine_fee,
        transaction_remark,
        transaction_type,
        withdrawal_type,
      } = posTransaction;

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
         <td class="py-1 posMachineFeeReport">&#x20A6;${formatAmountWithCommas(
           machine_fee
         )}</td>
         <td class="py-1 posFeePaymentMethodReport">${feePaymentType}</td>
         <td class="py-1 posPaymentMethodReport">${withdrawalType}</td>
         <td class="py-1 posPaymentMethodRemark">${transaction_remark}</td>
       `;
      posTableBody.appendChild(row);
    });

    // Update total amounts
    //  updateTotalPosAmounts(allPosTransactions);

    // Handle Load More button visibility
    if (currentPage >= totalPages) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }
  } catch (error) {
    console.error('Error rendering transactions:', error);
    posTableBody.innerHTML =
      '<tr><td colspan="6" class="table-error-text">Error loading transactions.</td></tr>';
  }
}

// Backup RenderTable logic.
// async function renderPosTable(page = 1, pageSize = 25) {
//   const posTableBody = document.querySelector('.posTableDisplay tbody');
//   const loadMoreButton = document.getElementById('loadMoreButton');

//   if (!posTableBody) {
//     console.error('Error: Table body not found');
//     return;
//   }

//   if (!loadMoreButton) {
//     console.warn('Warning: Load More button not found');
//     return;
//   }

//   // Check if the loading row already exists
//   let loadingRow = document.querySelector('.loading-row');
//   if (!loadingRow) {
//     // Create and add the loading row only if it doesn't exist
//     loadingRow = document.createElement('tr');
//     loadingRow.className = 'loading-row';
//     loadingRow.innerHTML = `<td colspan="6" class="table-loading-text">Loading transactions...</td>`;
//     posTableBody.appendChild(loadingRow);
//   }

//   try {
//     const posTransactionData = await getPosTransactions(page, pageSize);
//     const posTransactions = posTransactionData.data;
//     totalPages = posTransactionData.meta.pagination.pageCount;

//     // Remove the loading row if it exists
//     if (posTableBody.contains(loadingRow)) {
//       posTableBody.removeChild(loadingRow);
//     }

//     if (posTransactions.length === 0 && allPosTransactions.length === 0) {
//       posTableBody.innerHTML =
//         '<tr><td colspan="6" class="table-error-text">No Transactions Available.</td></tr>';
//       loadMoreButton.style.display = 'none';
//       return;
//     }

//     // Check for duplicates by transaction ID if available (replace 'id' with your unique key)
//     posTransactions.forEach((transaction) => {
//       if (!allPosTransactions.some((t) => t.id === transaction.id)) {
//         allPosTransactions.push(transaction);
//       }
//     });

//     // Only clear and re-render table on the first page
//     if (page === 1) {
//       posTableBody.innerHTML = '';
//     } else {
//       // Remove the loading row after loading
//       if (loadingRow) loadingRow.remove();
//     }

//     // Calculate the starting serial number based on existing transactions
//     const startingSerialNumber =
//       allPosTransactions.length - posTransactions.length;

//     // Render only the new transactions
//     posTransactions.forEach((posTransaction, index) => {
//       const {
//         fee_payment_type,
//         transaction_amount,
//         transaction_fee,
//         machine_fee,
//         transaction_remark,
//         transaction_type,
//         withdrawal_type,
//       } = posTransaction;

//       function toTitleCase(value) {
//         return value.charAt(0).toUpperCase() + value.slice(1);
//       }

//       function formatTransactionType(value) {
//         switch (value.toLowerCase()) {
//           case 'withdraw':
//             return 'Withdraw';
//           case 'withdrawal/transfer':
//             return 'Withdrawal & Transfer';
//           case 'bill-payment':
//             return 'Bill Payment';
//           case 'deposit':
//             return 'Deposit';
//           default:
//             return value;
//         }
//       }

//       const feePaymentType = toTitleCase(fee_payment_type || 'N/A');
//       const transactionType = transaction_type?.type || 'N/A';
//       const withdrawalType = toTitleCase(withdrawal_type?.type || 'N/A');

//       const row = document.createElement('tr');
//       row.classList.add('table-body-row');

//       row.innerHTML = `
//         <td class="py-1">${startingSerialNumber + index + 1}.</td>
//         <td class="py-1 posTransTypeReport">${formatTransactionType(
//           transactionType
//         )}</td>
//         <td class="py-1 posAmountReport">&#x20A6;${formatAmountWithCommas(
//           transaction_amount
//         )}</td>
//         <td class="py-1 posFeeReport">&#x20A6;${formatAmountWithCommas(
//           transaction_fee
//         )}</td>
//         <td class="py-1 posMachineFeeReport">&#x20A6;${formatAmountWithCommas(
//           machine_fee
//         )}</td>
//         <td class="py-1 posFeePaymentMethodReport">${feePaymentType}</td>
//         <td class="py-1 posPaymentMethodReport">${withdrawalType}</td>
//         <td class="py-1 posPaymentMethodRemark">${transaction_remark}</td>
//        `;

//       posTableBody.appendChild(row);
//     });

//     // Update total amounts using the accumulated transactions
//     //  allPosTransactions = [...allPosTransactions, ...posTransactions];
//     updateTotalPosAmounts(allPosTransactions);
//   } catch (error) {
//     console.error('Error rendering transactions:', error);

//     // Show an error message in case of failure
//     posTableBody.innerHTML =
//       '<tr  class="loading-row"><td colspan="6" class="table-error-text">Error loading transactions.</td></tr>';
//   } finally {
//     // Ensure the loading row is removed after loading completes
//     //  if (posTableBody.contains(loadingRow)) {
//     //    posTableBody.removeChild(loadingRow);
//     //    console.log('hello Load More 2');
//     //  }
//     //  console.log('hello Load More');

//     const loadingRowToRemove = posTableBody.querySelector('.loading-row');
//     if (loadingRowToRemove) loadingRowToRemove.remove();

//     // Show or hide the Load More button
//     if (currentPage >= totalPages) {
//       loadMoreButton.style.display = 'none';
//     } else {
//       loadMoreButton.style.display = 'block';
//     }
//   }
// }

document.getElementById('loadMoreButton').addEventListener('click', () => {
  currentPage += 1;
  renderPosTable();
});

// Fetch all transactions in the background for totals calculation
async function fetchAllTransactionsForTotals() {
  try {
    let page = 1;
    let allTransactions = [];
    while (true) {
      const { data, meta } = await getPosTransactions(page, pageSize);
      allTransactions = allTransactions.concat(data);

      console.log(`Page ${page} data:`, data);

      if (page >= meta.pagination.pageCount) break;
      page++;
    }
    updateTotalPosAmounts(allTransactions);
  } catch (error) {
    console.error('Error fetching all transactions for totals:', error);
  }
}

fetchAllTransactionsForTotals();

// JS to give total POS Amount and Fees
function updateTotalPosAmounts(data) {
  const totalPosAmount = document.getElementById('totalPosAmount');
  const totalPosFee = document.getElementById('totalPosFee');
  const totalMachineFee = document.getElementById('totalMachineFee');

  if (!data || data.length === 0) {
    if (totalPosAmount) {
      totalPosAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;0</strong>`;
    }
    if (totalPosFee) {
      totalPosFee.innerHTML = `<strong>Total Fees = &nbsp;&#x20A6;0</strong>`;
    }
    if (totalMachineFee) {
      totalMachineFee.innerHTML = `<strong>Machine Fees = &nbsp;&#x20A6;0</strong>`;
    }
    return;
  }

  const totalAmount = data.reduce(
    (sum, item) => sum + item.transaction_amount,
    0
  );

  const totalFee = data.reduce((sum, item) => sum + item.transaction_fee, 0);

  const machineFee = data.reduce((sum, item) => sum + item.machine_fee, 0);

  console.log('machineFee', machineFee);

  if (totalPosAmount) {
    totalPosAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
      totalAmount
    )}</strong>`;
  }

  if (totalPosFee) {
    totalPosFee.innerHTML = `<strong>Total Fees = &nbsp;&#x20A6;${formatAmountWithCommas(
      totalFee
    )}</strong>`;
  }

  if (totalMachineFee) {
    totalMachineFee.innerHTML = `<strong>Total Machine Fee = &nbsp;&#x20A6;${formatAmountWithCommas(
      machineFee
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

//  Delete POS Transactiion Data

document
  .getElementById('deleteAllButton')
  .addEventListener('click', async () => {
    const confirmDelete = confirm(
      'Are you sure you want to delete all transactions for the day? This action cannot be undone.'
    );

    if (confirmDelete) {
      try {
        const response = await deleteAllTransactions();
        if (response.success) {
          alert('All transactions have been successfully deleted.');
          // Clear the table and update totals
          allPosTransactions = [];
          renderPosTable(); // Clear table display
          updateTotalPosAmounts([]); // Reset totals to zero
        } else {
          alert('Failed to delete transactions. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting transactions:', error);
        alert('An error occurred while trying to delete transactions.');
      }
    }
  });

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
  const addUserContainer = document.querySelector('.addUser');

  addUserContainer.classList.remove('active');

  main.classList.remove('blur');
  sidebar.classList.remove('blur');
  main.classList.remove('no-scroll');
}

// JS for Modal
document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.querySelector('.add-user');
  const addUserContainer = document.querySelector('.addUser');

  if (addButton) {
    addButton.addEventListener('click', function () {
      addUserContainer.classList.add('active');
      main.classList.add('blur');
      sidebar.classList.add('blur');
      main.classList.add('no-scroll');
    });
  }
});

// BACKUP POS FORM DATA, I DONT WANT TO DELETE IT>

// async function renderPosTable() {
//   const posTableBody = document.querySelector('.posTableDisplay tbody');
//   const loadingRow = document.querySelector('.loading-row');
//   const loadMoreButton = document.querySelector('#loadMoreButton');

//   if (!posTableBody || !loadingRow) {
//     console.error('Table or loading row not found');
//     return;
//   }

//   try {
//     loadingRow.style.display = 'table-row';

//     const posTransactionData = await getPosTransactions(currentPage, pageSize);
//     const posTransactions = posTransactionData.data;

//     const pagination = posTransactionData.meta.pagination;

//     loadingRow.style.display = 'none';

//     if (posTransactions.length === 0 && currentPage === 1) {
//       posTableBody.innerHTML =
//         '<tr class="loading-row"><td colspan="7" class="table-error-text ">No Transactions Available.</td></tr>';
//       return;
//     }

//     posTransactions.forEach((posTransaction, index) => {
//       const {
//         fee_payment_type,
//         transaction_amount,
//         transaction_fee,
//         transaction_remark,
//         transaction_type,
//         withdrawal_type,
//       } = posTransaction;

//       function toTitleCase(value) {
//         return value.charAt(0).toUpperCase() + value.slice(1);
//       }

//       function formatTransactionType(value) {
//         switch (value.toLowerCase()) {
//           case 'withdraw':
//             return 'Withdraw';
//           case 'withdrawal/transfer':
//             return 'Withdrawal & Transfer';
//           case 'bill-payment':
//             return 'Bill Payment';
//           case 'deposit':
//             return 'Deposit';
//           default:
//             return value;
//         }
//       }

//       const feePaymentType = toTitleCase(fee_payment_type || 'N/A');
//       const transactionType = transaction_type?.type || 'N/A';
//       const withdrawalType = toTitleCase(withdrawal_type?.type || 'N/A');

//       const row = document.createElement('tr');
//       row.classList.add('table-body-row');

//       row.innerHTML = `
//        <td class="py-1">${index + 1 + (currentPage - 1) * pageSize}.</td>
//        <td class="py-1 posTransTypeReport">${formatTransactionType(
//          transactionType
//        )}</td>
//        <td class="py-1 posAmountReport">&#x20A6;${formatAmountWithCommas(
//          transaction_amount
//        )}</td>
//        <td class="py-1 posFeeReport">&#x20A6;${formatAmountWithCommas(
//          transaction_fee
//        )}</td>
//        <td class="py-1 posFeePaymentMethodReport">${feePaymentType}</td>
//        <td class="py-1 posPaymentMethodReport">${withdrawalType}</td>
//        <td class="py-1 posPaymentMethodRemark">${transaction_remark}</td>
//      `;

//       posTableBody.appendChild(row);
//     });

//     updateTotalPosAmounts(posTransactions);

//     // Show or hide the "Load More" button based on whether there are more pages
//     if (currentPage < pagination.pageCount) {
//       loadMoreButton.style.display = 'block';
//     } else {
//       loadMoreButton.style.display = 'none';
//     }
//   } catch (error) {
//     console.error('Error rendering POS transactions:', error);
//     posTableBody.innerHTML =
//       '<tr class="loading-row"><td colspan="7" class="table-error-text ">Error Loading Transactions.</td></tr>';
//   }

//   //   try {
//   //     loadingRow.style.display = 'table-row';

//   //     const posTransactionData = await getPosTransactions(currentPage, pageSize);
//   //     const posTransactions = posTransactionData.data;
//   //     const pagination = posTransactionData.meta.pagination;

//   //     posTableBody.innerHTML = '';

//   //     if (posTransactions.length === 0) {
//   //       posTableBody.innerHTML =
//   //         '<tr class="loading-row"><td colspan="6" class="table-error-text ">No Products Available.</td></tr>';
//   //     } else {
//   //       posTransactions.forEach((posTransaction, index) => {
//   //         const {
//   //           fee_payment_type,
//   //           transaction_amount,
//   //           transaction_fee,
//   //           transaction_remark,
//   //           transaction_type,
//   //           withdrawal_type,
//   //         } = posTransaction;

//   //         function toTitleCase(value) {
//   //           return value.charAt(0).toUpperCase() + value.slice(1);
//   //         }

//   //         function formatTransactionType(value) {
//   //           switch (value.toLowerCase()) {
//   //             case 'withdraw':
//   //               return 'Withdraw';
//   //             case 'withdrawal/transfer':
//   //               return 'Withdrawal & Transfer';
//   //             case 'bill-payment':
//   //               return 'Bill Payment';
//   //             case 'deposit':
//   //               return 'Deposit';
//   //             default:
//   //               return value;
//   //           }
//   //         }

//   //         const feePaymentType = toTitleCase(fee_payment_type || 'N/A');
//   //         const transactionType = transaction_type?.type || 'N/A';
//   //         const withdrawalType = toTitleCase(withdrawal_type?.type || 'N/A');

//   //         const row = document.createElement('tr');
//   //         row.classList.add('table-body-row');

//   //         row.innerHTML = `
//   //          <td class="py-1">${index + 1}.</td>
//   //          <td class="py-1 posTransTypeReport">${formatTransactionType(
//   //            transactionType
//   //          )}</td>
//   //          <td class="py-1 posAmountReport">&#x20A6;${formatAmountWithCommas(
//   //            transaction_amount
//   //          )}</td>
//   //            <td class="py-1 posFeeReport">&#x20A6;${formatAmountWithCommas(
//   //              transaction_fee
//   //            )}</td>
//   //            <td class="py-1 posFeePaymentMethodReport">${feePaymentType}</td>
//   //            <td class="py-1 posPaymentMethodReport">${withdrawalType}</td>
//   //            <td class="py-1 posPaymentMethodRemark">${transaction_remark}</td>
//   //               `;

//   //         posTableBody.appendChild(row);
//   //       });
//   //     }

//   //     updateTotalPosAmounts(posTransactions);
//   //   } catch (error) {
//   //     console.error('Error rendering products:', error);
//   //     goodsTableBody.innerHTML =
//   //       '<tr class="loading-row"><td colspan="6" class="table-error-text ">No Products Available.</td></tr>';
//   //   } finally {
//   //     loadingRow.style.display = 'none';
//   //   }
// }

// JavaScript to Load More

//  Disabled Sim Registration and Charging features
// // JS to Render saved Charged form data
// const storedChargedData =
//   JSON.parse(localStorage.getItem('chargeFormData')) || [];

// function renderChargingTable() {
//   const chargingTableBody = document.querySelector(
//     '.chargingTableDisplay tbody'
//   );

//   if (chargingTableBody) {
//     chargingTableBody.innerHTML = '';

//     storedChargedData.forEach((data, index) => {
//       const row = document.createElement('tr');
//       row.classList.add('table-body-row');

//       row.innerHTML = `
//     <td class="py-1">${index + 1}.</td>
//     <td class="py-1 chargedItemNameReport">${data.selectedDeviceType}</td>
//     <td class="py-1 chargedItemPriceReport">&#x20A6; ${
//       data.deviceChargeFeeInput
//     }</td>
//     <td class="py-1 chargedItemOwnerReport ">${data.deviceOwnerNameInput}</td>
//     <td class="py-1 chargedItemIdReport ">${data.deviceIdInput}</td>
//     <td class="py-1 chargedItemAltNumberReport ">${
//       data.alternativeNumberInput
//     }</td>
//     <td class="py-1 chargedItemStatusReport ">${data.selectedDeviceStatus}</td>
//       `;

//       chargingTableBody.appendChild(row);
//     });
//   }

//   updateTotalChargedAmounts(storedChargedData);
// }

// // JS to give total Charged Amount
// function updateTotalChargedAmounts(data) {
//   const totalChargedAmount = document.getElementById('totalChargedAmount');

//   const totalAmount = data.reduce(
//     (sum, item) => sum + item.deviceChargeFeeInput,
//     0
//   );

//   if (totalChargedAmount) {
//     totalChargedAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
//       totalAmount
//     )}</strong>`;
//   }
// }
// renderChargingTable();

// // JS to Render saved Sim Registration form data
// const storedSimRegData =
//   JSON.parse(localStorage.getItem('simRegFormData')) || [];

// function renderSimRegTable() {
//   const SimRegTableBody = document.querySelector('.simRegTableDisplay tbody');
//   if (SimRegTableBody) {
//     SimRegTableBody.innerHTML = '';

//     storedSimRegData.forEach((data, index) => {
//       const row = document.createElement('tr');
//       row.classList.add('table-body-row');

//       row.innerHTML = `
//     <td class="py-1">${index + 1}.</td>
//     <td class="py-1 simNameReport">${data.selectedSimName}</td>
//     <td class="py-1 simPriceReport">&#x20A6; ${data.simRegAmountInput}</td>
//     <td class="py-1 PhoneNumberReport">${data.phoneNumberInput}</td>
//     <td class="py-1 simStatusReport ">${data.checkboxStatus}</td>
//       `;

//       SimRegTableBody.appendChild(row);
//     });
//   }

//   updateTotalSimRegAmounts(storedSimRegData);
// }

// // JS to give total SIM Reg Amount
// function updateTotalSimRegAmounts(data) {
//   const totalSimRegAmount = document.getElementById('totalSimRegAmount');

//   const totalAmount = data.reduce(
//     (sum, item) => sum + item.simRegAmountInput,
//     0
//   );

//   if (totalSimRegAmount) {
//     totalSimRegAmount.innerHTML = `<strong>Total Amount = &nbsp;&#x20A6;${formatAmountWithCommas(
//       totalAmount
//     )}</strong>`;
//   }
// }

// renderSimRegTable();
