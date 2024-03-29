// * Wasnt able to solve part 1 in time. Will finish later

const { input1, input2 } = require('./input');
// The 2 inputs are the same length

// Function to convert the strings to usable things
function convertInput(input) {

  let output = input.split(",");

  output = output.map(el => {
    return {
      direction: el[0],
      distance: parseInt(el.slice(1))
    };
  });

  return output;
}

// This function traces the 2 wires at the same time and generates a list of positions
// Where each position corresponds to an intersection
function traceWires(wireA, wireB) {
  // Get coordinates of both wires
  let wireACoords = getCoords(wireA);
  let wireBCoords = getCoords(wireB);

  let intersections = [];

  // Go through each length of wire and check if the other wire is intersecting
  // Dont include the very first point since its 0,0
  for (let a = 2; a < wireACoords.length; a++) {
    // Loop through wireB and check it against the current section of wire A
    for (let b = 1; b < wireBCoords.length; b++) {
      let wireASection = [wireACoords[a - 1], wireACoords[a]];
      let wireBSection = [wireBCoords[b - 1], wireBCoords[b]];

      // Get the intersection between the wire sections. It will return null if they do not intersect
      let intersect = getIntersection(wireASection, wireBSection);

      // If the intersect is not null, add it to the list of intersections
      if (intersect) {
        intersections.push(intersect);
      }
    }
  }

  return intersections;
}

function getCoords(wire) {
  let coords = [{ x: 0, y: 0 }];
  let mostRecent = { x: 0, y: 0 };

  wire.forEach(el => {
    // From the most recent coord, get the new corner coord
    switch (el.direction) {
      case "R":
        // Move the most recent coords
        mostRecent.x += el.distance;
        break;
      case "L":
        // Move the most recent coords
        mostRecent.x -= el.distance;
        break;
      case "U":
        // Move the most recent coords
        mostRecent.y += el.distance;
        break;
      case "D":
        // Move the most recent coords
        mostRecent.y -= el.distance;
        break;
      default:
    }

    // Add a copy of most recent to the list of coords
    coords.push({
      x: mostRecent.x,
      y: mostRecent.y
    });
  });

  return coords;

}

function getIntersection(a, b) {

  if (
    Math.min(a[0].y, a[1].y) < b[0].y &&
    Math.max(a[0].y, a[1].y) > b[0].y &&
    Math.min(b[0].x, b[1].x) < a[0].x &&
    Math.max(b[0].x, b[1].x) > a[0].x
  ) {
    // Find the intersect
    return {
      x: a[0].x,
      y: b[0].y
    };
  }
  else if (
    Math.min(b[0].y, b[1].y) < a[0].y &&
    Math.max(b[0].y, b[1].y) > a[0].y &&
    Math.min(a[0].x, a[1].x) < b[0].x &&
    Math.max(a[0].x, a[1].x) > b[0].x
  ) {
    // Find the intersect
    return {
      x: b[0].x,
      y: a[0].y
    };
  }
}

function findClosestIntersection(intersects) {
  // Convert to manhattan distances
  let manhattanDistances = intersects.map(el => {
    return Math.abs(el.x) + Math.abs(el.y);
  });

  // Return the closest distance
  return Math.min(...manhattanDistances);
}

function solvePart1(A, B) {
  let convertedInput1 = convertInput(A);
  let convertedInput2 = convertInput(B);

  let intersections = traceWires(convertedInput1, convertedInput2);

  let closestDistance = findClosestIntersection(intersections);

  console.log(closestDistance);
}

solvePart1("R8,U5,L5,D3", "U7,R6,D4,L4"); // Should be 6
solvePart1("R75,D30,R83,U83,L12,D49,R71,U7,L72", "U62,R66,U55,R34,D71,R55,D58,R83"); // Should be 159
solvePart1("R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51", "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"); // Should be 135
solvePart1(input1, input2);
