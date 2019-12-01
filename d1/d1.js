const {input} = require('./input');

// Part 1 functions
function calculateFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function sumFuel() {
  return input.reduce((tot, cur) => {
    return tot + calculateFuel(cur);
  }, 0);
}

// Part 2 functions
function calculateFuelPrime(mass) {

  // Initial fuel calculations
  let fuel = Math.floor(mass / 3) - 2;

  // If the fuel has a negative or 0 mass, return 0
  if (fuel <= 0) {
    return 0;
  }

  // But if the fuel needs fuel, calculate the fuel for the fuel
  return fuel + calculateFuelPrime(fuel);
}

function sumFuelPrime() {
  return input.reduce((tot, cur) => {
    return tot + calculateFuelPrime(cur);
  }, 0);
}

console.log(`Part 1 fuel: ${sumFuel()}`);
console.log(`Part 2 fuel: ${sumFuelPrime()}`);
