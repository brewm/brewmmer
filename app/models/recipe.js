/* jslint node: true */
'use strict';

var mongoose = require('mongoose');
var Schema       = mongoose.Schema;

var RecipeSchema = new Schema({
  name:           { type: String, required: true },
  type:           { type: String, required: true },
  ingredients: {
  	water: [{
      name:       { type: String, required: true },
      volume:     { type: Number, required: true }
    }],
  	malts: [{
      name:       { type: String, required: true },
      weight:     { type: Number, required: true }
    }],
  	hops: [{
      name:       { type: String, required: true },
      weight:     { type: Number, required: true }
    }],
    yeast: {
      name:       { type: String, required: true },
      weight:     { type: Number, required: true }
    }
  },
  mash_steps: [{
    temperature:  { type: Number, required: true },
    interval:     { type: Number, required: true },
  }],
  hop_steps: [{
    hop:          { type: String, required: true },
    weight:       { type: Number, required: true },
    phase:        { type: String, required: true },
    interval:     { type: Number, required: true },
  }],
  extras: [{
    name:         { type: String }
  }],
  evaluation:     { type: String },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
