/* jslint node: true */
'use strict';

module.exports = function() {
  var startTime;
  var timer = 0;
  var elapsedSecs = 0;
  var schedule = [];

  function tick() {
    var now = Date.now();

    elapsedSecs = (now - startTime) / 1000;

    schedule.forEach(function(event) {
      if(elapsedSecs / 60 > event.time) {
        schedule.splice(event, 1); // remove current element
        event.callback();
      }
    });
  }

  this.getElapsedInSec = function() {
    return elapsedSecs;
  };

  this.getElapsed = function() {
    return elapsedSecs / 60;
  };

  this.start = function() {
    startTime = Date.now();
    timer = setInterval(tick, 100);
  };

  this.stop = function() {
    clearInterval(timer);
  };

  this.reset = function() {
    startTime = Date.now();
  };

  this.notify = function(time, callback) {
    schedule.push({time: time, callback: callback});
  };

  this.getSchedule = function() {
    return schedule;
  };
};
