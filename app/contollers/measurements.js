/* jslint node: true */
'use strict';

module.exports = function(router) {

  var Measurement = require('../models/measurement');

  // on routes that end in /measurements
  // ----------------------------------------------------
  router.route('/measurements')

    // get all the measurements (accessed at GET http://localhost:<PORT>/api/measurements)
    .get(function(req, res) {
      var query = Measurement.find().select({'timestamp': 1, 'temperature': 1, '_id': 0}).limit( req.query.limit );
      query.exec( function(err, measurements) {
        if (err)
          return res.send(err);

        res.json(measurements);
      });
    });
};
