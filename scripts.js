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

var requestTrainingData = new XMLHttpRequest();

// Initialize Colors
updateColors();
console.log(Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255));

// Initialize Training Data
trainingData.push({ input: { r: 0, g: 0, b: 0 }, output: { white: 1 } });
trainingData.push({ input: { r: 1, g: 1, b: 1 }, output: { black: 0 } });
// Load Material Design Colors Into Training Data
requestTrainingData.open('GET', 'https://ewliang.github.io/BW-Color-Contrast-AI/training-data/material-colors.json');
requestTrainingData.onload = function () {
  var materialTrainingData = JSON.parse(requestTrainingData.responseText);
  for(let i = 0; i < materialTrainingData.length; i++) {
    trainingData.push({
      input: {
        r: materialTrainingData[i].input.r / 255,
        g: materialTrainingData[i].input.g / 255,
        b: materialTrainingData[i].input.b / 255
      },
      output: materialTrainingData[i].output
    });
  }
}
requestTrainingData.send();

// Click EventListeners
blackBox.onclick = function() {
  if(toggleTraining.checked == true) {
    trainingData.push({ input: { r: r, g: g, b: b }, output: { black: 0 } });
    displayTrainingData();
  } else {
    generatePrediction();
  }
  updateColors();
}

whiteBox.onclick = function() {
  if(toggleTraining.checked == true) {
    trainingData.push({ input: { r: r, g: g, b: b }, output: { white: 1 } });
    displayTrainingData();
  } else {
    generatePrediction();
  }
  updateColors();
}

toggleTraining.onclick = function() {
  if(toggleTraining.checked == false) {
    // No Longer In Training Mode - Train Network with Acquired Trained Data and Generate a Prediction
    net.train(trainingData);
    generatePrediction();
  } else {
    // In Training Mode - Reset Prediction Border Highlighting
    blackBox.style.border = "0px";
    whiteBox.style.border = "0px";
  }
}

// Generates New Colors
function updateColors() {
  r = Math.random();
  g = Math.random();
  b = Math.random();
  document.body.style.backgroundColor = 'rgb(' + Math.floor(r * 255) + ', ' + Math.floor(g * 255) + ', ' + Math.floor(b * 255) + ')';
  whiteBox.style.backgroundColor = 'rgb(' + Math.floor(r * 255) + ', ' + Math.floor(g * 255) + ', ' + Math.floor(b * 255) + ')';
}

// Display Training Data
function displayTrainingData() {
  console.log(trainingData);
}

// Generates A Prediction
function generatePrediction() {
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
