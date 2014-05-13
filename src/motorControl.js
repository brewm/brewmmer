/* jslint node: true */
'use strict';

var Gpio = require('onoff').Gpio;
var async = require('async');

//Create Gpio pin objects
var coil_A1_pin = new Gpio(18, 'out');
var coil_A2_pin = new Gpio(23, 'out');
var coil_B1_pin = new Gpio(24, 'out');
var coil_B2_pin = new Gpio(25, 'out');

/**
  Queue for commands
*/
var queue = [];

var delay;

/**
 *  Mode: Wave Drive (one phase on)
 *  Description: In this drive method only a single phase is activated at a time.
 *  It has the same number of steps as the full step drive, but the motor will have
 *  significantly less than rated torque. This mode has the lowest energy demand.
 *  Direction: Forward
 *  @param {Number} steps
 */
module.exports.forward1Phase = function(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 0, B1 : 0, B2 : 1});
  }
};

/**
 *  Mode: Wave Drive (one phase on)
 *  Description: In this drive method only a single phase is activated at a time.
 *  It has the same number of steps as the full step drive, but the motor will have
 *  significantly less than rated torque. It takes 4 steps to rotate by one teeth
 *  position. This mode has the lowest energy demand.
 *  Direction: Backwards
 *  @param {Number} steps
 */
module.exports.backwards1Phase = function(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 0, A2 : 0, B1 : 0, B2 : 1});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 0});
  }
};

/**
 *  Mode: Full step drive (two phases on)
 *  Description: Two phases are always on so the motor will provide its maximum rated
 *  torque. As soon as one phase is turned off, another one is turned on.
 *  Direction: Forward
 *  @param {Number} steps
 */
module.exports.forward2Phase = function(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 1, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 0, A2 : 1, B1 : 1, B2 : 0});
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 1});
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 1});
  }
};

/**
 *  Mode: Full step drive (two phases on)
 *  Description: Two phases are always on so the motor will provide its maximum rated
 *  torque. As soon as one phase is turned off, another one is turned on.
 *  Direction: Backwards
 *  @param {Number} steps
 */
module.exports.backwards2Phase = function(steps){
  for (var i=0;i<steps;i++){
    queue.push({ A1 : 0, A2 : 0, B1 : 1, B2 : 1});
    queue.push({ A1 : 0, A2 : 1, B1 : 1, B2 : 0});
    queue.push({ A1 : 1, A2 : 1, B1 : 0, B2 : 0});
    queue.push({ A1 : 1, A2 : 0, B1 : 0, B2 : 1});
  }
};

/**
 *  Mode: Half stepping
 *  Description: When half stepping, the drive alternates between two phases on and a
 *  single phase on. This increases the angular resolution, but the motor also has less
 *  torque (approx 70%) at the half step position (where only a single phase is on).
 *  This may be mitigated by increasing the current in the active winding to compensate.
 *  The advantage of half stepping is that the drive electronics need not change to support it.
 *  Direction: Forward
 *  @param {Number} steps
 */
module.exports.forwardHs = function(steps){
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
};

/**
 *  Mode: Half stepping
 *  Description: When half stepping, the drive alternates between two phases on and a
 *  single phase on. This increases the angular resolution, but the motor also has less
 *  torque (approx 70%) at the half step position (where only a single phase is on).
 *  This may be mitigated by increasing the current in the active winding to compensate.
 *  The advantage of half stepping is that the drive electronics need not change to support it.
 *  Direction: Backwards
 *  @param {Number} steps
 */
module.exports.backwardsHs = function(steps){
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
};


/**
  Send the prepared commands to the Stepping motor
*/
module.exports.run = function(delay_){
  delay = delay_;

  async.mapLimit(queue, 1, step,  function(err, results){
    if (err) return console.error(err);

    //Finish: Set every phase to zero
    step({ A1 : 0, A2 : 0, B1 : 0, B2 : 0});
  });
};

function step(command, callback) {
  setState(coil_A1_pin, command.A1);
  setState(coil_A2_pin, command.A2);
  setState(coil_B1_pin, command.B1);
  setState(coil_B2_pin, command.B2);
  setTimeout(callback, delay);
}

function setState(pin, value){
  pin.write(value, function(err){
    if (err) return console.error(err);
  });
}
