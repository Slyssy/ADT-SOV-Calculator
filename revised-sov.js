'use strict';
// $ Defining CSS Selector Variables
const title = document.querySelector('h1');
const main = document.querySelector('main');
// ? Job Revenue and Expense Table
const jobName = document.querySelector('#job-name');
const jobAddress = document.querySelector('#job-address');
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
const equipPercentageInputs = document.querySelectorAll('.equip-percentage');
const laborPercentageInputs = document.querySelectorAll('.labor-percentage');
const materialPercentTotal = document.querySelector('.material-perc-total');
const laborPercentTotal = document.querySelector('.labor-perc-total');

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
  return Math.round((result + Number.EPSILON) * 100) / 100;
};

const calcPercentageOf = (num1, num2) => {
  const result = (num1 / num2) * 100;
  return (Math.round((result + Number.EPSILON) * 100) / 100).toLocaleString();
};

const calcPercentageTotal = (nodeList) => {
  let array = Array.from(nodeList).map((el) => +el.value);
  const percentTotal = array.reduce((acc, cur) => cur + acc);
  return percentTotal;
};
materialPercentTotal.innerHTML = calcPercentageTotal(equipPercentageInputs);
laborPercentTotal.innerHTML = calcPercentageTotal(laborPercentageInputs);

// $ Button Event Listeners
let totalBillableValue;
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

  totalBillableValue = (
    materialBillable +
    laborBillable +
    cadBillable +
    programmingBillable +
    pmBillable
  ).toFixed(2);

  totalBillable.innerHTML = `$${totalBillableValue}`;
});

// # Looping throught the equipment percentage multiplier values and calling the calcPercentageTotal to automatically update the Material % Total Field.
equipPercentageInputs.forEach((input) => {
  input.addEventListener('input', (event) => {
    materialPercentTotal.innerHTML = calcPercentageTotal(equipPercentageInputs);
    if (materialPercentTotal.innerHTML === '100') {
      materialPercentTotal.setAttribute('style', 'color:green');
    } else materialPercentTotal.setAttribute('style', 'color:red');
  });
});

// # Looping throught the equipment percentage multiplier values and calling the calcPercentageTotal to automatically update the Material % Total Field.
laborPercentageInputs.forEach((input) => {
  input.addEventListener('input', (event) => {
    laborPercentTotal.innerHTML = calcPercentageTotal(laborPercentageInputs);
    if (laborPercentTotal.innerHTML === '100') {
      laborPercentTotal.setAttribute('style', 'color:green');
    } else laborPercentTotal.setAttribute('style', 'color:red');
  });
});

// #SOV Table Variables
const sovSetup = document.querySelector('.sov-setup');
const sovSetupPerc = document.querySelector('.sov-setup-perc');
const sovEngineering = document.querySelector('.sov-engineering');
const sovEngineeringPerc = document.querySelector('.sov-engineering-perc');
const sovSubmittals = document.querySelector('.sov-submittals');
const sovSubmittalsPerc = document.querySelector('.sov-submittals-perc');
const sovProcurement = document.querySelector('.sov-procurement');
const sovProcurementPerc = document.querySelector('.sov-procurement-perc');
const sovStorage = document.querySelector('.sov-storage');
const sovStoragePerc = document.querySelector('.sov-storage-perc');
const sovPM = document.querySelector('.sov-pm');
const sovPMPerc = document.querySelector('.sov-pm-perc');
const sovMobilization = document.querySelector('.sov-mobilization');
const sovMobilizationPerc = document.querySelector('.sov-mobilization-perc');
const sovPrewire = document.querySelector('.sov-prewire');
const sovPrewirePerc = document.querySelector('.sov-prewire-perc');
const sovInstallation = document.querySelector('.sov-installation');
const sovInstallationPerc = document.querySelector('.sov-installation-perc');
const sovProgramming = document.querySelector('.sov-programming');
const sovProgrammingPerc = document.querySelector('.sov-programming-perc');
const sovCommissioning = document.querySelector('.sov-commissioning');
const sovCommissioningPerc = document.querySelector('.sov-commissioning-perc');
const sovCloseout = document.querySelector('.sov-closeout');
const sovCloseoutPerc = document.querySelector('.sov-closeout-perc');
const sovTotal = document.querySelector('.sov-total');
const sovTotalPerc = document.querySelector('.sov-total-perc');

// # Calculate SOV Event Listener
calcSOV.addEventListener('click', (event) => {
  event.preventDefault();

  main.classList.add('hide');
  calcBillable.classList.add('hide');
  calcSOV.classList.add('hide');
  title.classList.add('hide');
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

  const sovModal = document.querySelector('#sov-modal');
  sovModal.innerHTML = '';
  sovModal.insertAdjacentHTML(
    'afterbegin',
    `
    <table class="tg">
    <thead>
      <tr>
        <th class="tg-0lax" colspan="3">${jobName.value}</th>
      </tr>
      <tr>
        <th class="tg-0lax" colspan="3">${jobAddress.value}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="tg-ov5x">Cost Category</td>
        <td class="tg-ov5x">Assigned Value</td>
        <td class="tg-ov5x">% of Total</td>
      </tr>
      <tr>
        <td class="tg-1wig">Project Setup/Administration</td>
        <td class="tg-0lax sov-setup assigned-value">$${billableSetup}</td>
        <td class="tg-0lax sov-setup-perc percentage">${calcPercentageOf(
          billableSetup,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Engineering &amp; Design</td>
        <td class="tg-0lax sov-engineering assigned-value">$${billableDesign}</td>
        <td class="tg-0lax sov-engineering-perc percentage">${calcPercentageOf(
          billableDesign,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Submittals</td>
        <td class="tg-0lax sov-submittals assigned-value">$${billableSubmittals}</td>
        <td class="tg-0lax sov-submittals-perc percentage">${calcPercentageOf(
          billableSubmittals,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Equipment Procurement</td>
        <td class="tg-0lax sov-procurement assigned-value">$${billableProcurement}</td>
        <td class="tg-0lax sov-procurement-perc percentage">${calcPercentageOf(
          billableProcurement,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Equipment Receipt &amp; Storage</td>
        <td class="tg-0lax sov-storage assigned-value">$${billableStorage}</td>
        <td class="tg-0lax sov-storage-perc percentage">${calcPercentageOf(
          billableStorage,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Project Management</td>
        <td class="tg-0lax sov-pm assigned-value">$${billablePM}</td>
        <td class="tg-0lax sov-pm-perc percentage">${calcPercentageOf(
          billablePM,
          totalBillableValue
        )} %</td>
      </tr>
      <tr>
        <td class="tg-1wig">Labor Mobilization</td>
        <td class="tg-0lax sov-mobilization assigned-value">$${billableMobilization}</td>
        <td class="tg-0lax sov-mobilization-perc percentage">${calcPercentageOf(
          billableMobilization,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Prewire</td>
        <td class="tg-0lax sov-prewire assigned-value">$${billablePrewire}</td>
        <td class="tg-0lax sov-prewire-perc percentage">${calcPercentageOf(
          billablePrewire,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Equipment Installation</td>
        <td class="tg-0lax sov-installation assigned-value">$${billableInstallation}</td>
        <td class="tg-0lax sov-installation-perc percentage">${calcPercentageOf(
          billableInstallation,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Programming &amp; Testing</td>
        <td class="tg-0lax sov-programming assigned-value">$${billableProgramming}</td>
        <td class="tg-0lax sov-programming-perc percentage">${calcPercentageOf(
          billableProgramming,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Commissioning &amp; Training</td>
        <td class="tg-0lax sov-commissioning assigned-value">$${billableCommissioning}</td>
        <td class="tg-0lax sov-commissioning-perc percentage">${calcPercentageOf(
          billableCommissioning,
          totalBillableValue
        )}%</td>
      </tr>
      <tr>
        <td class="tg-1wig">Project Closeout</td>
        <td class="tg-0lax sov-closeout assigned-value">$${billableCloseout}</td>
        <td class="tg-0lax sov-closeout-perc percentage">${calcPercentageOf(
          billableCloseout,
          totalBillableValue
        )}%</td>
      </tr>
      </tbody>
      </table>
  `
  );
  const assignedValues = document.getElementsByClassName('assigned-value');
  const assignedValueTotal = [...assignedValues]
    .map((el) => +el.textContent.slice(1))
    .reduce((acc, cur) => acc + cur);

  const percentages = document.getElementsByClassName('percentage');
  const percentageTotal = [...percentages]
    .map((el) => +el.textContent.slice(0, -1))
    .reduce((acc, cur) => acc + cur);

  sovModal.insertAdjacentHTML(
    'beforeend',
    `
    <table class="tg">
  <tr>
        <td class="tg-1wig sov-total-row">Total to be Billed</td>
        <td class="tg-0lax sov-total sov-total-row">$${assignedValueTotal}</td>
        <td class="tg-0lax sov-total-perc sov-total-row">${
          Math.round((percentageTotal + Number.EPSILON) * 100) / 100
        }%</td>
      </tr>
    </tbody>
    </table>
  `
  );
});
