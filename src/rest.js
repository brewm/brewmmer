/* jslint node: true */
'use strict';

var restify = require('restify');
var sqlite3 = require('sqlite3');
var temperature = require('./temperature.js');

var db = new sqlite3.Database('./brewmmer.db');

var server = restify.createServer({
  name: 'brewmmer',
  version: '1.0.0'
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
  db.all('SELECT * FROM temperature_log ORDER BY timestamp DESC LIMIT ?;', req.params.limit,
    function(err, rows){
      if(err) return next(new restify.InternalError('Can\'t read temperature log!'));

      var records = {records:rows};
      records.records.sort(function(a, b) {
        return a.timestamp - b.timestamp;
      });
      res.send(records);
      return next();
    });
}
