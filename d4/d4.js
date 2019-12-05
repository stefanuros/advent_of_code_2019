const {input} = require('./input');

function validateNum(num) {
  let numStr = num + "";

  let adjacent = false;

  for(let i = 1; i < numStr.length; i++) {
    if(numStr[i] === numStr[i-1]) {
      adjacent = true;
    }

    if(parseInt(numStr[i]) < parseInt(numStr[i-1])) {
      return false;
    }
  }

  return adjacent;
}

function partOne() {

  let convertedInput = input.split("-").map(el => {
    return parseInt(el);
  });

  let startNum = convertedInput[0];
  let endNum = convertedInput[1];

  let count = 0;

  for(let i = startNum; i <= endNum; i++) {
    if(validateNum(i)) {
      count++;
    }
  }

  console.log(count);
}

// Part 2
function validateNumPrime(num) {
  let numStr = num + "";

  let adjacent = [];
  let group = numStr[0];

  for(let i = 1; i < numStr.length; i++) {
    if(numStr[i] === group[0]) {
      group += numStr[i];
    }
    else {
      adjacent.push([...group]);
      group = numStr[i];
    }

    if(parseInt(numStr[i]) < parseInt(numStr[i-1])) {
      return false;
    }
  }

  adjacent.push([...group]);

  let isThereDouble = adjacent.some(el => {
    return el.length === 2;
  });

  return isThereDouble;
}

function partTwo() {

  let convertedInput = input.split("-").map(el => {
    return parseInt(el);
  });

  let startNum = convertedInput[0];
  let endNum = convertedInput[1];

  let count = 0;

  for(let i = startNum; i <= endNum; i++) {
    if(validateNumPrime(i)) {
      count++;
    }
  }

  console.log(count);
}

partOne();
partTwo();

// console.log(validateNumPrime("112233"));
// console.log(validateNumPrime("123444"));
// console.log(validateNumPrime("111122"));
