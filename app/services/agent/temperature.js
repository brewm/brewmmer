/* jslint node: true */
'use strict';

var callback = function(err,res){console.log(err);console.log(res);}

var request = require('request');

exports.get = function(callback){
  request('http://192.168.1.131:3555/api/temperature', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, JSON.parse(body));
    } else {
      callback(error, null);
    }
  });
}
