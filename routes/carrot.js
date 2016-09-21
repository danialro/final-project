var request = require('request');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/User');
var Carrot = require('../models/Carrot');


 // POST new carrot request
exports.postCarrot = function(req, res, next) {

  var carrot = new Carrot(req.body);
  carrot.owner = req.user;

  carrot.save(function(err, carrot){
    if(err){ return next(err); }

    res.json(carrot);
  });
};



// get one carrot
exports.getOneCarrot = function(req, res, next) {
  res.json(req.carrot);
};


// GET requests for all carrots
exports.getCarrots = function(req, res, next) {
 Carrot.find(function(err, carrots){
   if(err){ return next(err); }

   res.json(carrots);
 });
};























