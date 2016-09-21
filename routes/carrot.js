var request = require('request');
var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Carrot = require('../models/Carrot');


// GET requests for all carrots
exports.getCarrots = function(req, res, next) {
 Carrot.find(function(err, carrots){
   if(err){ return next(err); }

   res.json(carrots);
 });
};


 // POST new carrot request
exports.postCarrot = function(req, res, next) {
  var carrot = new Carrot(req.body);

  console.log(req.user);

  carrot.save(function(err, post){
    if(err){ return next(err); }

    res.json(carrot);
  });
};