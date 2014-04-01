var motor = require('./motorControl.js');

var mode = process.argv[2];
var steps = parseInt(process.argv[3]);


if(mode == '1'){
  if(steps > 0){
    motor.forward1Phase(steps);
    motor.run();
  }else{
    motor.backwards1Phase(Math.abs(steps));
    motor.run();
  }
}
if(mode == '2'){
  if(steps > 0){			
    motor.forward2Phase(steps);
    motor.run();
  }else{
    motor.backwards2Phase(Math.abs(steps));
    motor.run();
  }
}	
if(mode == 'h'){
  if(steps > 0){			
    motor.forwardHs(steps);
    motor.run();
  }else{
    motor.backwardsHs(Math.abs(steps));
    motor.run();
  }
}