document.addEventListener('DOMContentLoaded', function () {
  const commissionButtons =
    document.getElementsByClassName('commission-button');
  const totalCommissionDisplay = document.getElementById('total-commission');
  const detailedCommissionDisplay = document.getElementById(
    'detailed-commission'
  );
  const submitButton = document.getElementById('submit-button');
  let totalCommission = 0;
  let detailedCommission = '';

  Array.from(commissionButtons).forEach(function (button) {
    const incrementButton = button.getElementsByClassName('increment')[0];
    const decrementButton = button.getElementsByClassName('decrement')[0];
    const countDisplay = button.getElementsByClassName('commission-count')[0];
    const commissionItem = button.getElementsByClassName('commission-item')[0];
    const commissionValue = parseFloat(
      commissionItem.innerText.match(/\$\d+(\.\d+)?/)[0].slice(1)
    );

    incrementButton.addEventListener('click', function () {
      let count = parseInt(countDisplay.innerText);
      count++;
      countDisplay.innerText = count;
      calculateTotalCommission();
      updateDetailedCommission();
    });

    decrementButton.addEventListener('click', function () {
      let count = parseInt(countDisplay.innerText);
      if (count > 0) {
        count--;
        countDisplay.innerText = count;
        calculateTotalCommission();
        updateDetailedCommission();
      }
    });
  });

  submitButton.addEventListener('click', function () {
    totalCommissionDisplay.innerText =
      'Total Commission: $' + totalCommission.toFixed(2);
  });

  function calculateTotalCommission() {
    totalCommission = 0;
    Array.from(commissionButtons).forEach(function (button) {
      const countDisplay = button.getElementsByClassName('commission-count')[0];
      const count = parseInt(countDisplay.innerText);
      const commissionItem =
        button.getElementsByClassName('commission-item')[0];
      const commissionValue = parseFloat(
        commissionItem.innerText.match(/\$\d+(\.\d+)?/)[0].slice(1)
      );
      totalCommission += commissionValue * count;
    });
  }

  function updateDetailedCommission() {
    detailedCommission = '';
    Array.from(commissionButtons).forEach(function (button) {
      const countDisplay = button.getElementsByClassName('commission-count')[0];
      const count = parseInt(countDisplay.innerText);
      const commissionItem =
        button.getElementsByClassName('commission-item')[0].innerText;
      if (count > 0) {
        const itemText = `${count} ${commissionItem}`;
        detailedCommission += `${itemText}\n`;
      }
    });
    detailedCommissionDisplay.innerText = detailedCommission;
  }
});
