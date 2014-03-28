var gpio = require('pi-gpio');

const coil_A_1_pin = 18;
const coil_A_2_pin = 23;
const coil_B_1_pin = 24;
const coil_B_2_pin = 25;

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
  gpio.open(pin, "output", function(err) {
    gpio.write(pin, value, function() { 
      gpio.close(pin);
    });
  });
}


var delay = 10;
var steps = 30;
forward1phase(delay, steps);