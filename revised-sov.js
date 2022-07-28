'use strict';
// $ Defining CSS Selector Variables
const contractAmount = document.querySelector('#contract-amount');
const estimatedCosts = document.querySelector('#estimated-costs');
const materialCost = document.querySelector('#material-cost');
const laborCost = document.querySelector('#labor-cost');
const cadCost = document.querySelector('#cad-cost');
const programmingCost = document.querySelector('#programming-cost');
const pmCost = document.querySelector('#pm-cost');
const totalCosts = document.querySelector('.total-costs');

const margins = document.querySelectorAll('.margin-results');
const materialBill = document.querySelector('#material-bill');
const laborBill = document.querySelector('#labor-bill');
const cadBill = document.querySelector('#cad-bill');
const programmingBill = document.querySelector('#programming-bill');
const pmBill = document.querySelector('#pm-bill');
const totalBillable = document.querySelector('.total-billable');

const calcBillable = document.querySelector('.calc-billable');

// $ Calculation Functions
const calcMargin = (revenue, costs) => {
  const grossMargin = 100 * ((revenue - costs) / revenue);
  const grossMarginRounded =
    Math.round((grossMargin + Number.EPSILON) * 100) / 100;
  return grossMargin;
};

const billable = (cost, margin) => {
  return cost / (1 - margin);
};

// $ Button Event Listeners
calcBillable.addEventListener('click', (event) => {
  event.preventDefault();

  const grossMargin = calcMargin(+contractAmount.value, +estimatedCosts.value);
  const materialBillable =
    Math.round(
      (billable(+materialCost.value, grossMargin / 100) + Number.EPSILON) * 100
    ) / 100;
  const laborBillable =
    Math.round(
      (billable(+laborCost.value, grossMargin / 100) + Number.EPSILON) * 100
    ) / 100;
  const cadBillable =
    Math.round(
      (billable(+cadCost.value, grossMargin / 100) + Number.EPSILON) * 100
    ) / 100;
  const programmingBillable =
    Math.round(
      (billable(+programmingCost.value, grossMargin / 100) + Number.EPSILON) *
        100
    ) / 100;

  const pmBillable =
    Math.round(
      (billable(+pmCost.value, grossMargin / 100) + Number.EPSILON) * 100
    ) / 100;
  margins.forEach((margin) => {
    margin.innerHTML = `${
      Math.round((grossMargin + Number.EPSILON) * 100) / 100
    }%`;
  });

  materialBill.innerHTML = `$${materialBillable}`;

  laborBill.innerHTML = `$${laborBillable}`;

  cadBill.innerHTML = `$${cadBillable}`;

  programmingBill.innerHTML = `$${programmingBillable}`;

  pmBill.innerHTML = `$${pmBillable}`;

  totalCosts.innerHTML = `$${(
    +materialCost.value +
    +laborCost.value +
    +cadCost.value +
    +programmingCost.value +
    +pmCost.value
  ).toFixed(2)}`;

  totalBillable.innerHTML = `$${(
    materialBillable +
    laborBillable +
    cadBillable +
    programmingBillable +
    pmBillable
  ).toFixed(2)}`;
});
