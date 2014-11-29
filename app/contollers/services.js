/* jslint node: true */
'use strict';

var Logger = require('../logger.js');


module.exports = function(router) {

  // on routes that end in /services
  // ----------------------------------------------------
  router.route('/services')

    // get all the measurements
    .put(function(req, res) {
      var service = req.query.service;
      var action  = req.query.action;

      switch(service) {
        case 'logger':
          switch(action) {
            case 'start':
              Logger.start(10);
              break;
            case 'stop':
              Logger.stop();
              break;
            case 'restart':
              Logger.stop();
              Logger.start(10);
              break;
            default:
              res.json({ error: 'Invalid action!' });
          }
          break;
        default:
          res.json({ error: 'Invalid service!' });
      }
    });
};
