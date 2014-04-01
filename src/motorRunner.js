var motor = require('./motorControl.js');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function ask(question, callback) {
  console.log(question + ' ');
 
  rl.on('line', function (data) {
    data = data.toString().trim();
    callback(data);
  });
}

var delay;
var steps;
ask("Delay between steps (milliseconds)", function(delay_){
	delay = delay_;
});
ask("How many steps?", function(steps_){
	steps = steps_;
});

ask("Choose mode type: (1) One Phase, (2) Two Phase, (h) Half Step", function(type) {
  if(type == 1){
    ask("Direction: (f) Forward, (b) Backwards", function(dir){
	  if(dir == f){
	    motor.forward1Phase(steps);
	  }
	  if(dir == b){
	    motor.backwards1Phase(steps);
	  }
	})
  }	
  if(type == 2){
    ask("Direction: (f) Forward, (b) Backwards", function(dir){
	  if(dir == f){
	    motor.forward2Phase(steps);
	  }
	  if(dir == b){
	    motor.backwards2Phase(steps);
	  }
	})
  }	
  if(type == h){
    ask("Direction: (f) Forward, (b) Backwards", function(dir){
	  if(dir == f){
	    motor.forwardHs(steps);
	  }
	  if(dir == b){
	    motor.backwardsHs(steps);
	  }
	})
  }	
});

motor.run(delay);




