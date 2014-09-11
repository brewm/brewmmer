/* jslint node: true */
'use strict';

module.exports = function(router) {

  var Temperature = require('../temperature.js');

  // on routes that end in /temperature
  // ----------------------------------------------------
  router.route('/temperature')

    // get all the temperature (accessed at GET http://localhost:<PORT>/api/temperature)
    .get(function(req, res) {

      Temperature.get(function(err, data){
        if (err)
          res.send(err);

        res.json(data);
      });
    });
};
