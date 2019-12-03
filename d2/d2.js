const { input } = require('./input');

function runProgram(program) {
  // Loop through
  for(let i = 0; i < program.length; i += 4) {
    let op = program[i];

    // Terminate program
    if(op === 99) {
      return program;
    }

    // The positions of the 2 values
    let pos1 = program[i + 1];
    let pos2 = program[i + 2];
    // The 2 values
    let val1 = program[pos1];
    let val2 = program[pos2];
    // The postion to place the new value
    let newPos = program[i + 3];
    // The new value
    let newVal;

    // Calculate the new value based on the op code
    // pos 3 = val 1 + val 2
    if(op === 1) {
      newVal = val1 + val2;
    }
    // pos 3 = val 1 * val 2
    else if(op === 2) {
      newVal = val1 * val2;
    }

    // Update the new position with the new value
    program[newPos] = newVal;
  }

  // return the completed program
  return program;
}

function alterInput(inputProgram, noun, verb) {
  inputProgram[1] = noun;
  inputProgram[2] = verb;
  return inputProgram;
}

function solvePartOne(inputProgram) {
  // Alter the input
  inputProgram = alterInput(inputProgram, 12, 2);

  // Run the program
  let finishedProgram = runProgram([...inputProgram]);
  console.log(finishedProgram[0]);
  return finishedProgram[0];
}

function solvePartTwo() {
  let expected = 19690720;

  for(let noun = 0; noun <= 99; noun++) {
    for(let verb = 0; verb <= 99; verb++) {
      // Make the changes to the input program. This copies input every time
      let inputProgram = alterInput([...input], noun, verb);

      // Get the result of running the program
      let result = runProgram(inputProgram)[0];

      // If the result is what we expect, print the results
      if(expected === result) {
        console.log(`${("0" + noun).slice(-2)}${("0" + verb).slice(-2)}`);
      }
    }
  }
}


solvePartOne(input);
solvePartTwo();
