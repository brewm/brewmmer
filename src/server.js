/* jslint node: true */
'use strict';

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3555; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:br3wmm3r@kahana.mongohq.com:10037/brewmmer');
var Recipe   = require('./models/recipe');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  // console.log('we can log here');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:<PORT>/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the root!' });
});

// on routes that end in /recipes
// ----------------------------------------------------
router.route('/recipes')

  // create a recipe (accessed at POST http://localhost:<PORT>/recipes)
  .post(function(req, res) {
    var recipe = new Recipe(req.body);

    recipe.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Recipe created!' });
    });
  })

  // get all the recipes (accessed at GET http://localhost:<PORT>/api/recipes)
  .get(function(req, res) {
    Recipe.find(function(err, recipes) {
      if (err)
        res.send(err);

      res.json(recipes);
    });
  });

// on routes that end in /recipes/:recipe_id
// ----------------------------------------------------
router.route('/recipes/:recipe_id')

  // get the recipe with that id
  .get(function(req, res) {
    Recipe.findById(req.params.recipe_id, function(err, recipe) {
      if (err)
        res.send(err);
      res.json(recipe);
    });
  })

  // update the recipe with this id
  .put(function(req, res) {
    Recipe.findByIdAndUpdate(req.params.recipe_id, req.body,
      function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Recipe updated!' });
      }
    );
  })

  // delete the recipe with this id
  .delete(function(req, res) {
    Recipe.remove({
      _id: req.params.recipe_id
    }, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('We run on port ' + port);
