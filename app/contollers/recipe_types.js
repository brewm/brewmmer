/* jslint node: true */
'use strict';

module.exports = function(router) {

  var Recipe   = require('../models/recipe');

  // on routes that end in /recipe_types
  // ----------------------------------------------------
  router.route('/recipe/types')

    // get all the recipe_types (accessed at GET http://localhost:<PORT>/api/recipe/types)
    .get(function(req, res) {
      Recipe.distinct('type', function(err, recipe_types) {
        if (err)
          res.send(err);

        res.json(recipe_types);
      });
    });
};
