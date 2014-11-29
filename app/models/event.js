/* jslint node: true */
'use strict';

var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  service       : { type: String, required: true },
  action        : { type: String, required: true },
  timestamp     : { type: Date,   required: true }
});

module.exports = mongoose.model('Event', EventSchema);
