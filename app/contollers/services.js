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

  // on routes that end in /services/logger
  // ----------------------------------------------------
  router.route('/services/logger')

    // manage logger
    .put(function(req, res) {
      var action  = req.query.action;

      switch(action) {
        case 'start':
          recordEvent('logger', action, res);
          Logger.start(10);
          break;
        case 'stop':
          recordEvent('logger', action, res);
          Logger.stop();
          break;
        case 'restart':
          recordEvent('logger', action, res);
          Logger.stop();
          Logger.start(10);
          break;
        default:
          res.json({ error: 'Invalid action for ' + 'logger' + '!' });
      }
    });

  // on routes that end in /services/masher
  // ----------------------------------------------------
  router.route('/services/masher')

    // manage masher
    .put(function(req, res) {
      var action  = req.query.action;

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
    });
};
