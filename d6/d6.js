const { input } = require('./input');

function convertToTree(orbits, findPlanet = "COM") {
  let com = {};

  // Find all the planets that lead to the current one
  let directOrbits = orbits.filter(el => {
    return el.startsWith(findPlanet);
  });

  // If there are no new directOrbits, return null
  if (directOrbits.length <= 0) {
    return null;
  }

  // Add the new planets to the object, and recurse with those planets
  for (let newOrbit of directOrbits) {
    let newPlanet = newOrbit.split(")")[1];

    com[newPlanet] = convertToTree(orbits, newPlanet);
  }

  return com;
}

function countOrbits(rootOrbit, step = 0) {
  if (!rootOrbit) {
    return step;
  }

  let orbits = step;

  for (let i in rootOrbit) {
    let ptr = rootOrbit[i];
    // Recurse
    orbits += countOrbits(ptr, step + 1);
  }

  return orbits;
}

function pathToPlanet(rootOrbit, target, currentPlanet = "COM") {
  if (!rootOrbit) {
    return null;
  }

  if (Object.keys(rootOrbit).includes(target)) {
    return [currentPlanet];
  }

  for (let i in rootOrbit) {

    let path = pathToPlanet(rootOrbit[i], target, i);

    if (path) {
      return [currentPlanet, ...path];
    }
  }

  return null;
}

function differenceBetweenPaths(pathA, pathB) {
  // Get the common path between A and B
  let commonPath = pathA.filter((el, i) => {
    return el === pathB[i];
  });

  return pathA.length + pathB.length - (2 * commonPath.length);
}

function solvePartOne() {
  let converted = convertToTree(input);

  console.log(countOrbits(converted));
}

// Get the path from com to me (as a list of planets), and a similar path to santa
// Then just remove the common part between the 2 paths (+ 1 jump for the removed common planet D)
// [COM, B, C, D, E, J, K] -> YOU
// [COM, B, C, D, I] -> SAN
function solvePartTwo() {
  let converted = convertToTree(input);

  // converted = {
  //   "BBB": {
  //     "GGG": {
  //       "HHH": null
  //     },
  //     "CCC": {
  //       "DDD": {
  //         "III": {
  //           "SAN": null
  //         },
  //         "EEE": {
  //           "JJJ": {
  //             "KKK": {
  //               "LLL": null,
  //               "YOU": null
  //             }
  //           },
  //           "FFF": null
  //         }
  //       }
  //     }
  //   }
  // };

  let santaPath = pathToPlanet(converted, "SAN");
  let myPath = pathToPlanet(converted, "YOU");

  console.log(differenceBetweenPaths(santaPath, myPath));

}

solvePartOne();
solvePartTwo();
// console.log(countOrbits({
//   "B": {
//     "G": {
//       "H": null
//     },
//     "C": {
//       "D": {
//         "I": null,
//         "E": {
//           "J": {
//             "K": {
//               "L": null
//             }
//           },
//           "F": null
//         }
//       }
//     }
//   }
// }));

// console.log(countOrbits(
//   {"A": {"B": {"C": null}}}
// ));
