var Gpio = require('onoff').Gpio;

var coil_A1_pin = new Gpio(18, 'out');
var coil_A2_pin = new Gpio(23, 'out');
var coil_B1_pin = new Gpio(24, 'out');
var coil_B2_pin = new Gpio(25, 'out');

var queue = [];

/**
  Mode: Wave Drive (one phase on)
  Description: In this drive method only a single phase is activated at a time. 
  It has the same number of steps as the full step drive, but the motor will have 
  significantly less than rated torque. This mode has the lowest energy demand.
  Direction: Forward
*/
function forward1Phase(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 0, B1 : 0, B2 : 1});
  }
}

/**
  Mode: Wave Drive (one phase on)
  Description: In this drive method only a single phase is activated at a time. 
  It has the same number of steps as the full step drive, but the motor will have 
  significantly less than rated torque. It takes 4 steps to rotate by one teeth 
  position. This mode has the lowest energy demand.
  Direction: Backwards
*/
function backwards1Phase(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 0, A2 : 0, B1 : 0, B2 : 1});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 0});
  }
}

/**
  Mode: Full step drive (two phases on)
  Description: Two phases are always on so the motor will provide its maximum rated 
  torque. As soon as one phase is turned off, another one is turned on. 
  Direction: Forward
*/
function forward2Phase(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 1, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 1});
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 1});
  }
}

/**
  Mode: Full step drive (two phases on)
  Description: Two phases are always on so the motor will provide its maximum rated 
  torque. As soon as one phase is turned off, another one is turned on. 
  Direction: Backwards
*/
function backwards2Phase(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 1});
    queue.push({ A1 : 0, A2 : 1, B1 : 1, B2 : 0});
    queue.push({ A1 : 1, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 1});
  }
}

/**
  Mode: Half stepping
  Description: When half stepping, the drive alternates between two phases on and a 
  single phase on. This increases the angular resolution, but the motor also has less 
  torque (approx 70%) at the half step position (where only a single phase is on). 
  This may be mitigated by increasing the current in the active winding to compensate. 
  The advantage of half stepping is that the drive electronics need not change to support it.
  Direction: Forward
*/
function forwardHs(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 0});
    queue.push({ A1 : 1, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 0});
	queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 1});
    queue.push({ A1 : 0, A2 : 0, B1 : 0, B2 : 1});
	queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 1});
  }
}

/**
  Mode: Half stepping
  Description: When half stepping, the drive alternates between two phases on and a 
  single phase on. This increases the angular resolution, but the motor also has less 
  torque (approx 70%) at the half step position (where only a single phase is on). 
  This may be mitigated by increasing the current in the active winding to compensate. 
  The advantage of half stepping is that the drive electronics need not change to support it.
  Direction: Backward
*/
function backwardsHs(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 0, A2 : 0, B1 : 0, B2 : 1});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 1});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 0, B2 : 0});
	queue.push({ A1 : 1, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 0});
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 1});
  }
}

function push(pin, value){
  pin.write(value, function(err){
    if (err) return console.error(err);
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
      run(queue.shift());
    });
  } else {
    final();
  }
}


var delay = 8;
var steps = 512;


forward1phase(steps);
run(queue.shift());





