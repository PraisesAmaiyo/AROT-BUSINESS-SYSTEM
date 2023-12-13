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

const completedCheckbox = document.getElementById('completedCheckbox');
const balancePayment = document.querySelector('.balancePayment');

document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
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
});

// document.addEventListener('DOMContentLoaded', function () {
//   const checkboxes = document.querySelectorAll('input[type="checkbox"]');

//   checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener('change', function () {
//       checkboxes.forEach((otherCheckbox) => {
//         if (otherCheckbox !== checkbox) {
//           otherCheckbox.checked = false;
//         }
//       });
//     });
//   });
// });
