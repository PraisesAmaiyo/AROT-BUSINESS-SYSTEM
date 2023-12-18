// import { handlePosFormSubmit } from './script.js';

// const handleSubmit = () => {
//   const formData = handlePosFormSubmit();
//   console.log(formData);

//   // Now you can use formData to update your report or table.
// };

// const posForm = document.querySelector('.pos-method-form');

// if (posForm) {
//   posForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     handlePosFormSubmit();
//   });
// }

// reports.js

import { handlePosFormSubmit } from './script.js';

function updateReportsTable(formData) {
  // Assuming you have a reference to the table body
  const tableBody = document.querySelector('.reports-table tbody');

  // Create a new table row
  const newRow = document.createElement('tr');

  // Populate the row with data from the form
  newRow.innerHTML = `
    <td class="py-1">4.</td>
    <td class="py-1">${formData.selectedTransactionType}</td>
    <td class="py-1">&#x20A6;${formData.posTransactionAmount}</td>
    <td class="py-1">&#x20A6;${formData.posTransactionFee}</td>
    <td class="py-1">${formData.selectedWithdrawalType}</td>
  `;

  // Append the new row to the table
  tableBody.appendChild(newRow);
}

const posForm = document.querySelector('.pos-method-form');

if (posForm) {
  posForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = handlePosFormSubmit();
    updateReportsTable(formData);
  });
}
