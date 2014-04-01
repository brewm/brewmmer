var motor = require('./motorControl.js');
/*var readline = require('readline');

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
	delay = parseInt(delay_);

  ask("How many steps?", function(steps_){
  	steps = parseInt(steps_);

	ask("Choose mode type: (1) One Phase, (2) Two Phase, (h) Half Step", function(type) {
	  if(type == '1'){
        if(steps > 0){
          motor.forward1Phase(steps);
          motor.run(delay);
	    }else{
          motor.backwards1Phase(Math.abs(steps));
          motor.run(delay);
        }
	  }
	  if(type == '2'){
        if(steps > 0){			
		  motor.forward2Phase(steps);
          motor.run(delay);
		}else{
          motor.backwards2Phase(Math.abs(steps));
          motor.run(delay);
        }
	  }	
	  if(type == 'h'){
        if(steps > 0){			
		  motor.forwardHs(steps);
          motor.run(delay);
		}else{
          motor.backwardsHs(Math.abs(steps));
          motor.run(delay);
        }
	  }	
	});
  });
});*/
var delay = process.argv[2];
var mode = process.argv[3];
var step = parseInt(process.argv[4]);


if(type == '1'){
  if(steps > 0){
    motor.forward1Phase(steps);
    motor.run(delay);
  }else{
    motor.backwards1Phase(Math.abs(steps));
    motor.run(delay);
  }
}
if(type == '2'){
  if(steps > 0){			
    motor.forward2Phase(steps);
    motor.run(delay);
  }else{
    motor.backwards2Phase(Math.abs(steps));
    motor.run(delay);
  }
}	
if(type == 'h'){
  if(steps > 0){			
    motor.forwardHs(steps);
    motor.run(delay);
  }else{
    motor.backwardsHs(Math.abs(steps));
    motor.run(delay);
  }
}	


