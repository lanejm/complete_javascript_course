'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'; // ternary operator
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const user = 'Steven Thomas Williams';
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};

createUserNames(accounts);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements //need whole account to calculate values dynamically
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1) //only adding values with interest > 1 to the acc
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent form from submitting
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur()

    //display movements
    displayMovements(currentAccount.movements)

    //display balance
    calcDisplayBalance(currentAccount.movements)
    //display summary
    calcDisplaySummary(currentAccount)
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// SLICE
// let arr = ['a', 'b', 'c', 'd', 'e']

// console.log(arr.slice())

// SPLICE

// console.log((arr.splice(2))) //cuts off extracted elements--mutates array

// REVERSE
// const arr2 = ['j', 'i', 'h', 'g', 'f']
// console.log(arr2.reverse())

// CONCAT
// const letters = arr.concat(arr2)
// console.log(letters)
// console.log([...arr, ...arr2])

// JOIN
// console.log(letters.join(' - '))

// FOR EACH LOOP OF ARRAYS
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//for of loop
// for (const movement of movements)
//     for (const [i, movement] of movements.entries()) { //allows you to access counter if you loop over movement.entries()
//   if (movement > 0){
//     console.log(`Movement ${i +1 }: you deposited ${movement}`)
//     } else {
//       console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movement)}`)
//   }
// }
// console.log('------FOREACH------')
//for each loop - needs a callback function (cannot break out of with break statement)
// movements.forEach(function(mov, i, arr) {
//   if (mov > 0){
//     console.log(`Movement ${i + 1 }: you deposited ${mov}`)
//     } else {
//       console.log(`Movement ${i + 1}: you withdrew ${Math.abs(mov)}`)
//   }
// })

//MAP
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value, key, map) {
//   console.log(`${key}: ${value}`);
// })

//SET (sets don't have keys so key is not needed here, that's why _ is in there)
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR'])
// console.log(currenciesUnique)
// currenciesUnique.forEach(function(value, _, map) {
//   console.log(`${key}: ${value}`)
// })

// const euroToUsd = 1.1;
// const movemmentsUsd = movements.map(function (mov) {
//   return Math.round(mov * euroToUsd);
// });

// console.log(movemmentsUsd);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// ); //if statement is a ternary operator
// console.log(movementsDescriptions);

// FILTER METHOD
// const deposits = movements.filter(function(mov){
//   return mov > 0;

// })
// console.log(deposits)

// const withdrawals = movements.filter(function(mov){
//   return mov < 0
// })
// console.log(withdrawals)

// console.log(movements)
// //accumulator is like a snowball
// const balance = movements.reduce(function(acc,cur,i,arr){
//   return acc + cur
// }, 0) //0 here is the "default number" for accumulator
// console.log(balance)
