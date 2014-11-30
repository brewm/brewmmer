/* jslint node: true */
'use strict';

var Recipe  = require('../models/recipe');
var Stopper = require('../services/stopper');

var lock = false;
var current_step = {};
var steps = [];
var stopper = new Stopper();

function cook(){
  current_step = steps.shift();

  // TODO: wait until the temperature reaches the ecpected value

  if(current_step) {
    stopper.reset();
    stopper.notify(current_step.interval, cook);
    stopper.start();
  } else {
    stopper.stop();
  }
}

var exports = module.exports = {};

exports.init = function(recipe_id, callback) {
  Recipe.findById(recipe_id, function(err, recipe) {
    if (err)
      return callback({ error: err });

    steps = recipe.mash_steps;
    lock = false;
    callback({ message: 'Recipe successfully loaded!', steps: steps });
  });
};

exports.start = function start(callback) {
  if(!steps[0]){
    callback({ error: 'Nothing to start, please load a recipe...' });
  } else {
    if(lock){
      callback({ error: 'Can\'t start, mashing in progress...', steps: steps });
    } else{
      callback({ message: 'Starting mash phase...', steps: steps });

      lock = true;
      cook();
    }
  }
};

exports.stop = function(callback) {
  if(lock){
    current_step = {};
    steps = [];
    lock = false;
    stopper.stop();

    callback({ message: 'Mashing stopped!' });
  } else {
    callback({ error: 'Nothing to stop! Mashing never started...' });
  }
};

exports.status = function(callback) {
  callback({
    status: lock ? 'In progress' : 'Idle',
    time_elapsed: stopper.getElapsed(),
    current_step: current_step,
    remaining_steps: steps
  });
};
