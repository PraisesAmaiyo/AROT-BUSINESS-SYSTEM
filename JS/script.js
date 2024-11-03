import './apiServices/product';

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

// Toast notification

// JavaScript to show toast
export function showToast(type, message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;

  // Reset class to clear previous toast type
  toast.className = 'toast';

  // Add the appropriate type (success or fail)
  toast.classList.add(type);
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// function to format amounts with commas
export function formatAmountWithCommas(amount) {
  if (amount === null || amount === undefined) {
    return amount; // return an empty string if amount is null or undefined
  }

  const amountString = amount.toString();
  return amountString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
