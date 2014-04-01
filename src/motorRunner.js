var motor = require('./motorControl.js');

var mode = process.argv[2];
var steps = parseInt(process.argv[3]);
var delay = parseInt(process.argv[4]);

if(mode == '1'){
  if(steps > 0){
    motor.forward1Phase(steps);
  }else{
    motor.backwards1Phase(Math.abs(steps));
  }
}
if(mode == '2'){
  if(steps > 0){			
    motor.forward2Phase(steps);
  }else{
    motor.backwards2Phase(Math.abs(steps));
  }
}	
if(mode == 'h'){
  if(steps > 0){			
    motor.forwardHs(steps);
  }else{
    motor.backwardsHs(Math.abs(steps));
  }
}

motor.run(delay);