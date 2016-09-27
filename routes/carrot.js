var request = require('request');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/User');
var Carrot = require('../models/Carrot');


 // POST new carrot request
exports.postCarrot = function(req, res, next) {

  var carrot = new Carrot(req.body);

  carrot.owner = req.user; // defining an owner of the carrot
  carrot.participants.push(req.user);
  carrot.participantsCounter(); // adding += 1 to number of participants
  carrot.moneyPledgedCounter(); // adding the entrance fee to the total money pledged

  carrot.save(function(err, carrot){
    if(err){ return next(err); }

  req.user.createdCarrots.push(carrot); // pushing this carrot to createdCarrots array of the user created it
  req.user.save(function(err, user) {
    if(err){ return next(err); }

      res.json(carrot);

    });
  });
}


// PUT request to have user join a carrot
exports.joinCarrot = function(req, res, next) {
  
  req.carrot.participants.push(req.user); // pushing a user to the carrots participants array

  req.carrot.participantsCounter(); // adding += 1 to number of participants
  req.carrot.moneyPledgedCounter(); // adding the entrance fee to the total money pledged

  req.carrot.save(function(err, carrot) {
    if(err){ return next(err); }

  req.user.joinedCarrots.push(carrot); // pushing this carrot to joinedCarrots array of the user who joined it
  req.user.save(function(err, user) {
    if(err){ return next(err); }

    res.json(carrot);

    });
  });
};


// get one carrot
exports.getOneCarrot = function(req, res, next) {
  res.json(req.carrot);
};

//get one carrot participants
exports.getCarrotParticipants = function(req, res, next) {
  res.json(req.carrot.participants);
};


// GET all carrots
exports.getCarrots = function(req, res, next) {
 Carrot.find(function(err, carrots){
   if(err){ return next(err); }

   res.json(carrots);
 });
};









