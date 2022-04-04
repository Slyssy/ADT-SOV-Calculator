const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
const sovTable = document.querySelector('#sov-table');
const calcButton = document.querySelector('.calc-sov');
const inputTable = document.querySelectorAll('.input-table');
const jobName = document.querySelector('.input-job-name');
const jobNumber = document.querySelector('.input-job-number');
const contractAmount = document.querySelector('.input-contract-amount');
const margin = document.querySelector('.input-margin');
const subExpense = document.querySelector('.input-sub-expense');
const laborExpense = document.querySelector('.input-labor-expense');
const materialExpense = document.querySelector('.input-material-expense');
const mobilizationMultiplier = document.querySelector('.input-mobilization');
const prewireMultiplier = document.querySelector('.input-prewire');
const trimOutMultiplier = document.querySelector('.input-trim-out');
const programmingMultiplier = document.querySelector('.input-programming');
const trainingMultiplier = document.querySelector('.input-training');
const drawingsSOV = document.querySelector('#drawings-sov-value');
const materialSOV = document.querySelector('#material-sov-value');
const mobilizationSOV = document.querySelector('#mobilization-sov-value');
const prewireSOV = document.querySelector('#prewire-sov-value');
const trimOutSOV = document.querySelector('#trim-out-sov-value');
const programmingSOV = document.querySelector('#programming-sov-value');
const trainingSOV = document.querySelector('#training-sov-value');
const sovJobName = document.querySelector('.sov-job');
const sovJobNumber = document.querySelector('.sov-job-number');
const printButton = document.querySelector('#printButton');
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
//% Functions
const marginMultiplier = (margin) => 1 - margin / 100;
const weightedExpense = (expense, margin) => expense / marginMultiplier(margin);

function createPDF() {
  printJS({
    printable: 'sov-table',
    type: 'html',
    css: 'styles.css',
  });
}

//%Navbar toggle button event listener
toggleButton.addEventListener('click', (e) => {
  e.preventDefault();
  navbarLinks.classList.toggle('active');
});

//% Calculate Schedule of Value Event Listener
calcButton.addEventListener('click', (e) => {
  e.preventDefault();
  sovTable.classList.remove('inactive');
  printButton.classList.remove('inactive');
  for (const table of inputTable) {
    table.classList.add('inactive');
  }
  calcButton.classList.add('inactive');

  const weightedSubExpense = weightedExpense(+subExpense.value, +margin.value);
  const weightedLaborExpense = weightedExpense(
    +laborExpense.value,
    +margin.value
  );
  const weightedMaterialExpense = weightedExpense(
    +materialExpense.value,
    +margin.value
  );

  const roundingFixer =
    (contractAmount.value -
      (weightedSubExpense + weightedLaborExpense + weightedMaterialExpense)) /
    7;

  sovJobName.textContent = jobName.value;
  sovJobNumber.textContent = `Job #: ${jobNumber.value}`;
  drawingsSOV.textContent = `${formatter.format(
    weightedSubExpense + roundingFixer
  )}`;
  materialSOV.textContent = `${formatter.format(
    weightedMaterialExpense + roundingFixer
  )}`;
  mobilizationSOV.textContent = `${formatter.format(
    (weightedLaborExpense * +mobilizationMultiplier.value) / 100 + roundingFixer
  )}`;
  prewireSOV.textContent = `${formatter.format(
    weightedLaborExpense * (+prewireMultiplier.value / 100) + roundingFixer
  )}`;
  trimOutSOV.textContent = `${formatter.format(
    weightedLaborExpense * (+trimOutMultiplier.value / 100) + roundingFixer
  )}`;
  programmingSOV.textContent = `${formatter.format(
    weightedLaborExpense * (+programmingMultiplier.value / 100) + roundingFixer
  )}`;
  trainingSOV.textContent = `${formatter.format(
    weightedLaborExpense * (+trainingMultiplier.value / 100) + roundingFixer
  )}`;
});

// printButton.addEventListener('click', function () {
//   createPDF();
// });
