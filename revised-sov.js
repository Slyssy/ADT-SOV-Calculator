'use strict';
// $ Defining CSS Selector Variables
// ? Job Revenue and Expense Table
const contractAmount = document.querySelector('#contract-amount');
const estimatedCosts = document.querySelector('#estimated-costs');
const materialCost = document.querySelector('#material-cost');
const laborCost = document.querySelector('#labor-cost');
const cadCost = document.querySelector('#cad-cost');
const programmingCost = document.querySelector('#programming-cost');
const pmCost = document.querySelector('#pm-cost');
const totalCosts = document.querySelector('.total-costs');
const margins = document.querySelectorAll('.margin-results');

// ?Billable Column
const materialBill = document.querySelector('#material-bill');
const laborBill = document.querySelector('#labor-bill');
const cadBill = document.querySelector('#cad-bill');
const programmingBill = document.querySelector('#programming-bill');
const pmBill = document.querySelector('#pm-bill');
const totalBillable = document.querySelector('.total-billable');

// ? Multipliers Table
const equipmentMultiplier = document.querySelector('#equipment-procurement');
const equipmentStorageMultiplier = document.querySelector('#equipment-storage');
const setupMultiplier = document.querySelector('#project-setup');
const mobilizationMultiplier = document.querySelector('#labor-mobilization');
const prewireMultiplier = document.querySelector('#prewire');
const installMultiplier = document.querySelector('#equipment-installation');
const programmingMultiplier = document.querySelector('#programming-testing');
const trainingMultiplier = document.querySelector('#commissioning-training');
const closeoutMultiplier = document.querySelector('#project-closeout');

// ? Buttons
const calcBillable = document.querySelector('.calc-billable');
const calcSOV = document.querySelector('.calc-sov');

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

const calcPercentage = (num1, num2) => {
  const result = num1 * (num2 / 100);
  console.log(Math.round((result + Number.EPSILON) * 100) / 100);
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

calcSOV.addEventListener('click', (event) => {
  event.preventDefault();

  const billableSetup = calcPercentage(
    +laborBill.innerHTML.slice(1),
    +setupMultiplier.value
  );

  // console.log(laborBill.innerHTML.slice(1), setupMultiplier.value);

  const billableDesign = calcPercentage(+cadBill.innerHTML.slice(1), 80);
  const billableSubmittals = calcPercentage(+cadBill.innerHTML.slice(1), 20);
  const billableProcurement = calcPercentage(
    +materialBill.innerHTML.slice(1),
    +equipmentMultiplier.value
  );
  const billableStorage = calcPercentage(
    +materialBill.innerHTML.slice(1),
    +equipmentStorageMultiplier.value
  );
  const billablePM = pmBill.innerHTML.slice(1);
  const billableMobilization = calcPercentage(
    +laborBill.innerHTML.slice(1),
    +mobilizationMultiplier.value
  );
  const billablePrewire = calcPercentage(
    +laborBill.innerHTML.slice(1),
    +prewireMultiplier.value
  );
  const billableInstallation = calcPercentage(
    +laborBill.innerHTML.slice(1),
    +installMultiplier.value
  );
  const billableProgramming = programmingBill.innerHTML.slice(1);
  const billableCommissioning = calcPercentage(
    +laborBill.innerHTML.slice(1),
    +trainingMultiplier.value
  );
  const billableCloseout = calcPercentage(
    +laborBill.innerHTML.slice(1),
    +closeoutMultiplier.value
  );
});
