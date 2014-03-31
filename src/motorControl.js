var Gpio = require('onoff').Gpio; // Constructor function for Gpio objects.

var coil_A1_pin = new Gpio(18, 'out');
var coil_A2_pin = new Gpio(23, 'out');
var coil_B1_pin = new Gpio(24, 'out');
var coil_B2_pin = new Gpio(25, 'out');

var queue = [];

function forward1phase(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 0, B1 : 0, B2 : 1});
  }
}

function push(pin, value){
  pin.write(value, function(err){
    if (err) throw err;
  });
}

function setStep(w1, w2, w3, w4){
  push(coil_A1_pin, w1);
  push(coil_A2_pin, w2);
  push(coil_B1_pin, w3);
  push(coil_B2_pin, w4); 
}

function async(arg, callback) {
  setTimeout(function() { 
    setStep(arg.A1, arg.A2, arg.B1, arg.B2);
    callback(); 
  }, delay);
}

function final() { 
  coil_A1_pin.unexport();
  coil_A2_pin.unexport();
  coil_B1_pin.unexport();
  coil_B2_pin.unexport();
  console.log('Done');   
}

function run(item) {
  if(item) {
    async( item, function() {
      return run(queue.shift());
    });
  } else {
    return final();
  }
}

run(queue.shift());





var delay = 8;
var steps = 512;
forward1phase(delay, steps);