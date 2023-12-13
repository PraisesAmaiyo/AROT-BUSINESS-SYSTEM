export { updateDateTime };

const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.navigation-header');

// window.addEventListener('load', function () {
//   const headerEl = document.querySelector('.navigation-header');
//   const sidebarEl = document.querySelector('.sidebar');
//   const mainEl = document.querySelector('.main');

//   // Sticky nav bar
//   const obs = new IntersectionObserver(
//     function (entries) {
//       const ent = entries[0];

//       if (ent.isIntersecting === false) {
//         document.body.classList.add('sticky');
//       }

//       if (ent.isIntersecting === true) {
//         document.body.classList.remove('sticky');
//       }
//     },
//     {
//       root: null,
//       threshold: 0,
//       rootMargin: '-1000px',
//     }
//   );

//   obs.observe(headerEl);
// });

// Mobile nav

// const bodyEl = document.body;
// btnNavEl.addEventListener('click', function () {
//   const main = document.querySelector('.main');
//   headerEl.classList.toggle('nav-open');

//   bodyEl.classList.toggle('no-scroll');
//   main.classList.remove('blur');
// });

document.addEventListener('click', function (event) {
  if (
    headerEl.classList.contains('nav-open') && // Check if the mobile menu is open
    event.target !== btnNavEl && // Exclude the mobile navigation button from the check
    !headerEl.contains(event.target) // Check if the click is outside of the mobile menu
  ) {
    headerEl.classList.remove('nav-open');
    bodyEl.classList.remove('no-scroll');
  }
});

function updateDateTime() {
  const currentDate = new Date();

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const dayOfWeek = dayNames[currentDate.getDay()];

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get the month, day, year, hour, and minute components
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  // Format the day with the appropriate suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
  const daySuffix = getDaySuffix(day);

  // Format the time as AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // Adjust the hour to 12-hour format
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

  // Create the formatted date and time strings
  const formattedDate = `${dayOfWeek}, ${month} ${day}${daySuffix}, ${year}`;
  const formattedTime = `${formattedHour}:${
    (minute < 10 ? '0' : '') + minute
  } ${amPm}`;

  // Update the HTML elements with the formatted date and time
  document.querySelector('.main-date').textContent = formattedDate;
  document.querySelector('.main-time').textContent = formattedTime;

  return `${formattedDate} ${formattedTime}`;
}

// Call the updateDateTime function initially to set the initial values
updateDateTime();

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Function to get the day suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
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
