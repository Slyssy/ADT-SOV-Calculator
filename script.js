const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');
const sovTable = document.querySelector('#sov-table');
const calcButton = document.querySelector('.calc-sov');
const inputTables = document.querySelectorAll('.input-table');

//% Functions

//%Navbar toggle button event listener
toggleButton.addEventListener('click', (e) => {
  e.preventDefault();
  navbarLinks.classList.toggle('active');
});

//% Calculate Schedule of Value Event Listener
calcButton.addEventListener('click', (e) => {
  e.preventDefault();
  sovTable.classList.remove('inactive');
  for (const table of inputTables) {
    table.classList.add('inactive');
  }
  calcButton.classList.add('inactive');
});
