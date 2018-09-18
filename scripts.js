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

r = Math.random(),
g = Math.random(),
b = Math.random();

changeColor();

console.log(r, g, b);

blackBox.onclick = function() {
  changeColor();
}
whiteBox.onclick = function() {
  changeColor();
}

function changeColor() {
  r = Math.random();
  g = Math.random();
  b = Math.random();
  blackBox.style.backgroundColor = 'rgb(' + r * 255 + ', ' + g * 255 + ', ' + b * 255 + ')';
  whiteBox.style.backgroundColor = 'rgb(' + r * 255 + ', ' + g * 255 + ', ' + b * 255 + ')';
}
