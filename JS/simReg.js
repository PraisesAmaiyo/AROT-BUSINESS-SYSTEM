document.addEventListener('DOMContentLoaded', function () {
  const successfulCheckbox = document.getElementById('successfulCheckbox');
  const unSuccessfulCheckbox = document.getElementById('unSuccessfulCheckbox');

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
          otherCheckbox.removeAttribute('required');
        }
      });
    });
  });
});
