const deviceType = document.getElementById('deviceType');
const deviceOwnerName = document.getElementById('deviceOwnerName');
const deviceId = document.getElementById('deviceId');
const alternativeNumber = document.getElementById('alternativeNumber');
const deviceChargeFee = document.getElementById('deviceChargeFee');
const deviceStatus = document.getElementById('deviceStatus');

const chargingForm = document.querySelector('.charging-method-form');

if (chargingForm) {
  chargingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    handleChargingFormSubmit();
  });
}

function handleChargingFormSubmit() {
  let selectedDeviceType = deviceType.value;
  let deviceOwnerNameInput = deviceOwnerName.value;
  let deviceIdInput = deviceId.value;
  let alternativeNumberInput = alternativeNumber.value;
  let deviceChargeFeeInput = deviceChargeFee.value;
  let selectedDeviceStatus = deviceStatus.value;
  let id = Math.random();

  const chargingForm = {
    selectedDeviceType,
    deviceOwnerNameInput,
    deviceIdInput,
    alternativeNumberInput,
    deviceChargeFeeInput,
    selectedDeviceStatus,
    id,
  };

  const storedData = JSON.parse(localStorage.getItem('chargeFormData')) || [];

  const allData = [chargingForm, ...storedData];

  localStorage.setItem('chargingForm', JSON.stringify(allData));

  return chargingForm;
}
