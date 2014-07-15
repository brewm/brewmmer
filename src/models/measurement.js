/* jslint node: true */
'use strict';

var mongoose = require('mongoose');

var MeasurementSchema = new mongoose.Schema({
  temperature   : { type: Number, required: true, min: -20, max: 120 },
  timestamp     : { type: Date, required: true }
});

var Measurement = mongoose.model('Measurement', MeasurementSchema);

module.exports = {
  Measurement: Measurement
};
