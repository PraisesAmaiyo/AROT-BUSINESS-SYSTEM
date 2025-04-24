const dobInput = document.getElementById('dateOfBirth');

dobInput.addEventListener('focus', () => {
  if (dobInput.showPicker) {
    dobInput.showPicker(); // Chrome/Edge
  }
});
