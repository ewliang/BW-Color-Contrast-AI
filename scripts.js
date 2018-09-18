// BW Color Contrast AI - scripts.js
// Author: Eric Liang
// Author URI: https://www.eric-liang.com
// Author Github URI: https://www.github.com/ewliang
// Project Repository URI: https://github.com/ewliang/BW-Color-Contrast-AI
// Description: The core logic that handles the BW Color Contrast AI functionalities.
// License: GPL v3.0

var net = new brain.NeuralNetwork();

var blackBox = document.getElementById('blackBox');
var whiteBox = document.getElementById('whiteBox');
var toggleTraining = document.getElementById('toggleTraining');

var r, g, b;

var trainingData = [];

var predictedOutput;

// Initialize Colors
updateColors();
console.log(Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255));

// Initialize Training Data
trainingData.push({ input: { r: 0, g: 0, b: 0 }, output: { white: 1 } });
trainingData.push({ input: { r: 1, g: 1, b: 1 }, output: { black: 0 } });

blackBox.onclick = function() {
  if(toggleTraining.checked == true) {
    trainingData.push({ input: { r: r, g: g, b: b }, output: { black: 0 } });
  } else {
    predictedOutput = net.run({ r: r, g: g, b: b });
    if (predictedOutput.black > predictedOutput.white) {
      blackBox.style.border = "5px solid black";
      whiteBox.style.border = "0px";
    } else {
      blackBox.style.border = "0px";
      whiteBox.style.border = "5px solid black";
    }
    console.log(predictedOutput);
  }
  updateColors();
  displayTrainingData();
}

whiteBox.onclick = function() {
  if(toggleTraining.checked == true) {
    trainingData.push({ input: { r: r, g: g, b: b }, output: { white: 1 } });
  } else {
    predictedOutput = net.run({ r: r, g: g, b: b });
    if (predictedOutput.black > predictedOutput.white) {
      blackBox.style.border = "5px solid black";
      whiteBox.style.border = "0px";
    } else {
      blackBox.style.border = "0px";
      whiteBox.style.border = "5px solid black";
    }
    console.log(predictedOutput);
  }
  updateColors();
  displayTrainingData();
}

toggleTraining.onclick = function() {
  if(toggleTraining.checked == false) {
    net.train(trainingData);
  }
  // console.log("PREDICTION: " + net.run({ r: r, g: g, b: b }));
}

function updateColors() {
  r = Math.random();
  g = Math.random();
  b = Math.random();
  blackBox.style.backgroundColor = 'rgb(' + Math.floor(r * 255) + ', ' + Math.floor(g * 255) + ', ' + Math.floor(b * 255) + ')';
  whiteBox.style.backgroundColor = 'rgb(' + Math.floor(r * 255) + ', ' + Math.floor(g * 255) + ', ' + Math.floor(b * 255) + ')';
}

function displayTrainingData() {
  console.log(trainingData);
}
