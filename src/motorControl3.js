var Gpio = require('onoff').Gpio; // Constructor function for Gpio objects.

var coil_A_1_pin = new Gpio(18, 'out');
var coil_A_2_pin = new Gpio(23, 'out');
var coil_B_1_pin = new Gpio(24, 'out');
var coil_B_2_pin = new Gpio(25, 'out');


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;     
    }   
  } 
}
   
function forward1phase(delay, steps){
  for (var i=0;i<steps;i++){
    console.log('Start the 1 phase rotate...');
    setStep(1, 0, 0, 0);
    sleep(delay);
    setStep(0, 1, 0, 0);
    sleep(delay);
    setStep(0, 0, 1, 0);
    sleep(delay);
    setStep(0, 0, 0, 1);
    sleep(delay);
  }
}

function setStep(w1, w2, w3, w4){
  push(coil_A_1_pin, w1);
  push(coil_A_2_pin, w2);
  push(coil_B_1_pin, w3);
  push(coil_B_2_pin, w4); 
}

function push(pin, value){
  console.log('push: ' + pin + 'to: ' + value);
  pin.writeSync(value);
}


var delay = 10;
var steps = 30;
forward1phase(delay, steps);