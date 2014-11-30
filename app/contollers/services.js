/* jslint node: true */
'use strict';

var Event  = require('../models/event.js');
var Logger = require('../services/logger.js');
var Masher = require('../services/masher.js');

function recordEvent(service, action, res){
  var event = new Event({service: service, action: action, timestamp: new Date()});
  event.save(function(err) {
    if (err)
      return res.send(err);

    res.json(event);
  });
}

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
              recordEvent(service, action, res);
              Logger.start(10);
              break;
            case 'stop':
              recordEvent(service, action, res);
              Logger.stop();
              break;
            case 'restart':
              recordEvent(service, action, res);
              Logger.stop();
              Logger.start(10);
              break;
            default:
              res.json({ error: 'Invalid action for ' + service + '!' });
          }
          break;
        case 'masher':
          switch(action) {
            case 'init':
              Masher.init(req.query.recipe_id, res.json.bind(res));
              break;
            case 'start':
              Masher.start(res.json.bind(res));
              break;
            case 'stop':
              Masher.stop(res.json.bind(res));
              break;
            case 'status':
              Masher.status(res.json.bind(res));
              break;
            default:
              res.json({ error: 'Invalid action for ' + service + '!' });
          }
          break;
        default:
          res.json({ error: 'Invalid service!' });
      }
    });
};
