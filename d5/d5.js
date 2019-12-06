const { input } = require('./input');

function getModes(opCode) {

  // Padding the start with leading 0s
  opCode = String("00000" + opCode).slice(-5);
  let op = parseInt(opCode.slice(opCode.length - 2));

  let mode = [
    opCode[0],
    opCode[1],
    opCode[2],
  ];

  return {
    mode,
    op
  };
}

function runProgram(program, mode) {
  // Loop through
  let i = 0;

  let inputParam = [5];
  let inputParamIndex = 0;

  while (i < program.length) {

    // for(let i = 0; i < program.length; i += 4) {
    let opCode = program[i];

    // Get the opcopde and the modes
    let { mode, op } = getModes(opCode);

    // Terminate program
    if (op === 99) {
      return program;
    }

    // Getting the parameters
    let paramter1 = program[i + 1];
    let paramter2 = program[i + 2];
    let paramter3 = program[i + 3];

    // Getting the values
    let val1 = program[paramter1];
    let val2 = program[paramter2];
    let val3;

    // Adjusting values for the modes
    if (mode[2] === "1") {
      val1 = paramter1;
    }
    if (mode[1] === "1") {
      val2 = paramter2;
    }
    if (mode[0] === "1") {
      val3 = paramter3;
    }

    // Calculate the new value based on the op code
    // pos 3 = val 1 + val 2
    if (op === 1) {
      val3 = val1 + val2;
      program[paramter3] = val3;
      i += 4;
    }
    // pos 3 = val 1 * val 2
    else if (op === 2) {
      val3 = val1 * val2;
      program[paramter3] = val3;
      i += 4;
    }
    else if (op === 3) {
      program[paramter1] = inputParam[inputParamIndex++];
      i += 2;
    }
    else if (op === 4) {
      console.log(`Program output: ${val1}`);
      i += 2;
    }
    else if (op === 5) {
      if (val1 !== 0) {
        i = val2;
      }
      else {
        i += 3;
      }
    }
    else if (op === 6) {
      if (val1 === 0) {
        i = val2;
      }
      else {
        i += 3;
      }
    }
    else if (op === 7) {
      program[paramter3] = 0;
      if (val1 < val2) {
        program[paramter3] = 1;
      }
      i += 4;
    }
    else if (op === 8) {
      program[paramter3] = 0;
      if (val1 === val2) {
        program[paramter3] = 1;
      }
      i += 4;
    }
  }

  // return the completed program
  return program;
}

function solvePartOne(inputProgram) {
  // Run the program
  let finishedProgram = runProgram([...inputProgram]);
  console.log(finishedProgram[0]);
  return finishedProgram[0];
}

solvePartOne(input);
