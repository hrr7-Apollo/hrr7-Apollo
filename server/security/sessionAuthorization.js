var mongoose = require('mongoose');
var express = require('express');
var app = express();
var Session = require('./sessionModel.js');

// authentication middleware that checks to see if the score we've received is in the valid range before posting scores to the Game collection
exports.checkSession = function(req, res, next){
  Session.findOne({_id: req.body.session}).exec(function(err, session){
    // please note that if the challenges are changed to not all have the same timeLimit, you will need to add up the timeLimits of the challenges that the user has already completed and check the res.score against that total
    if (req.body.score < (session.level * 90) ) {
      next();
    } else {
      res.send(400);
    }
  });
};
