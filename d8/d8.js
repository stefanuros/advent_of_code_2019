const { input } = require('./input');

function getLayers(encryptedInput) {
  let layers = [];

  // 25 by 6 for each layer
  for (let i = 0; i < encryptedInput.length / 150; i++) {
    layers.push(encryptedInput.slice(i * 150, (i + 1) * 150));
  }

  return layers;
}

function countNums(layer) {
  let count = {
    "0": 0,
    "1": 0,
    "2": 0
  };

  for (let i of layer) {
    count[i]++;
  }

  return count;
}

function mergeLayers(layers) {

  // Transparent layer of 150 things
  let merged = "222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222".split("");
  layers.push("111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111".split(""));

  // Start from the top (first layer) and loop through each pixel
  for (let pixel = 0; pixel <= merged.length; pixel++) {
    let layerIndex = 0;
    // While the current pixel in the final image is transparent, look through the layers
    while (merged[pixel] === "2") {
      // Set the new pixel to the one in the next layer
      merged[pixel] = layers[layerIndex][pixel];

      layerIndex++;
    }
  }

  return merged.join("");

}

function solvePartOne() {
  let layers = getLayers(input);
  let numCounts = layers.map(el => {
    return countNums(el);
  });

  numCounts = numCounts.sort((a, b) => {
    return (a["0"] >= b["0"] ? 1 : -1);
  });

  console.log(numCounts[0]["1"] * numCounts[0]["2"]);
}

function solvePartTwo() {
  let layers = getLayers(input);

  layers = layers.map(el => {
    return el.split("");
  });
  
  let finalImage = mergeLayers(layers);

  console.log(finalImage);

}

solvePartOne();
solvePartTwo();

/**
 * 10010 11100 10010 11110 11100
 * 10010 10010 10010 10000 10010
 * 10010 11100 10010 11100 10010
 * 10010 10010 10010 10000 11100
 * 10010 10010 10010 10000 10000
 * 01100 11100 01100 10000 10000
 */
// UBUFP
