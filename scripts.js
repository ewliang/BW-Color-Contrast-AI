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
