/* jslint node: true */
'use strict';

var restify = require('restify');
var mongoose = require('mongoose');

var temperature = require('./temperature.js');

mongoose.connect('mongodb://admin:br3wmm3r@kahana.mongohq.com:10037/brewmmer');
var Measurement = require('./models/measurement').Measurement;

var server = restify.createServer({
  name: 'brewmmer',
  version: '2.0.0'
});

server
  .use(restify.queryParser())
  .use(restify.fullResponse())
  .use(restify.bodyParser());

server.get('test', ok);
server.get('temperature', getTemperature);
server.get('temperatures/:limit', getTemperatures);

server.listen(3551, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function ok(req, res, next) {
  res.send('I\'m alive! \n');
  return next();
}


function getTemperature(req, res, next){
  temperature.get(function(err, data){
    if(err) return next(new restify.InternalError('Can\'t read current temperature!'));

    res.send(data);
    return next();
  });
}

function getTemperatures(req, res, next){
  var query = Measurement.find({}, {'timestamp': 1, 'temperature': 1, '_id': 0}).sort({'timestamp': -1 }).limit(req.params.limit);

  query.exec(
    function(err, measurements) {
      if(err) return next(new restify.InternalError('Can\'t read temperature log!'));

      var records = {
        records: measurements
      };

      records.records.sort(function(a, b) {
        return a.timestamp - b.timestamp;
      });

      res.send(records);
      return next();
  });
}
