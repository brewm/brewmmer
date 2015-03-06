/* jslint node: true */
'use strict';

module.exports = function(router) {

  var Recipe   = require('../models/recipe');

  // on routes that end in /recipes
  // ----------------------------------------------------
  router.route('/recipes')

    // create a recipe
    .post(function(req, res) {
      var recipe = new Recipe(req.body);

      recipe.save(function(err) {
        if (err)
          return res.send(err);

        res.json({ message: 'Recipe created!' });
      });
    })

    // get all the recipes
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
          return res.send(err);
        res.json(recipe);
      });
    })

    // update the recipe with this id
    .put(function(req, res) {
      Recipe.findByIdAndUpdate(req.params.recipe_id, req.body,
        function(err) {
          if (err)
            return res.send(err);

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
          return res.send(err);

        res.json({ message: 'Successfully deleted' });
      });
    });
};
