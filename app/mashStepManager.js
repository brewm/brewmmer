/* jslint node: true */
'use strict';
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:br3wmm3r@kahana.mongohq.com:10037/brewmmer');

var Recipe = require('./models/recipe').Recipe;

var startTime;
var lastStep;
var steps = [];

var timer;

function init(recipe){
  startTime = Date.now();
  lastStep = Date.now();

  steps = recipe.mash_steps;
}

function checker(){
  var now = Date.now();

  var timeDifference = now - lastStep;
  var minutes = timeDifference / 60000;

  var temp = getTemperatureAtTime(minutes);

  console.log(temp);
}

function getTemperatureAtTime(delta){

  console.log('delta: ' + delta);

  var step = steps[0];
  if(step == null){
    clearInterval(timer);
    return;
  }


  if(delta < step.interval){
    return step.temperature;
  } else {
    console.log('shift!')
    steps.shift();
    lastStep = Date.now();
    return steps[0] ? steps[0].temperature : null;
  }
}

var x = Recipe.findById('53e28b3e023cc3568fa18423');
x.exec(function(err,recipe){
  if(err) return console.err(err);

  init(recipe);

  timer = setInterval(checker, 1000);

});

