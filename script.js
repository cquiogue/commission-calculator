document.addEventListener('DOMContentLoaded', function () {
  const commissionRows = document.getElementsByClassName('commission-row');
  const submitButton = document.getElementById('submit-button');
  const clearButton = document.getElementById('clear-button');
  const commissionSummary = document.querySelector('.commission-summary');
  const totalCommissionDisplay = document.getElementById('total-commission');
  let totalCommission = 0;

  Array.from(commissionRows).forEach(function (row) {
    const incrementButton = row.getElementsByClassName('increment')[0];
    const decrementButton = row.getElementsByClassName('decrement')[0];
    const countDisplay = row.getElementsByClassName('count-value')[0];
    const commissionItem = row.getElementsByClassName('commission-item')[0];
    const commissionPrice = parseFloat(
      row.getElementsByClassName('commission-price')[0].innerText.slice(1)
    );

    incrementButton.addEventListener('click', function () {
      let count = parseInt(countDisplay.innerText);
      count++;
      countDisplay.innerText = count;
      calculateTotalCommission();
      updateCommissionSummary();
    });

    decrementButton.addEventListener('click', function () {
      let count = parseInt(countDisplay.innerText);
      if (count > 0) {
        count--;
        countDisplay.innerText = count;
        calculateTotalCommission();
        updateCommissionSummary();
      }
    });
  });

  submitButton.addEventListener('click', function () {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
    totalCommissionDisplay.innerText = 'Total: $' + totalCommission.toFixed(2);
  });

  clearButton.addEventListener('click', function () {
    Array.from(commissionRows).forEach(function (row) {
      const countDisplay = row.getElementsByClassName('count-value')[0];
      countDisplay.innerText = '0';
    });
    totalCommission = 0;
    totalCommissionDisplay.innerText = '';
    commissionSummary.innerHTML = '';
  });

  function calculateTotalCommission() {
    totalCommission = 0;
    Array.from(commissionRows).forEach(function (row) {
      const countDisplay = row.getElementsByClassName('count-value')[0];
      const count = parseInt(countDisplay.innerText);
      const commissionPrice = parseFloat(
        row.getElementsByClassName('commission-price')[0].innerText.slice(1)
      );
      totalCommission += commissionPrice * count;
    });
  }

  function updateCommissionSummary() {
    commissionSummary.innerHTML = '';
    Array.from(commissionRows).forEach(function (row) {
      const countDisplay = row.getElementsByClassName('count-value')[0];
      const count = parseInt(countDisplay.innerText);
      const commissionItem =
        row.getElementsByClassName('commission-item')[0].innerText;
      const commissionPrice = parseFloat(
        row.getElementsByClassName('commission-price')[0].innerText.slice(1)
      );

      if (count > 0) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('summary-row');

        const countElement = document.createElement('div');
        countElement.classList.add('summary-count');
        countElement.innerText = count;

        const itemElement = document.createElement('div');
        itemElement.classList.add('summary-item');
        itemElement.innerText = commissionItem;

        const totalElement = document.createElement('div');
        totalElement.classList.add('summary-total');
        totalElement.innerText = '$' + (commissionPrice * count).toFixed(2);

        rowElement.appendChild(countElement);
        rowElement.appendChild(itemElement);
        rowElement.appendChild(totalElement);

        commissionSummary.appendChild(rowElement);
      }
    });
  }
});
