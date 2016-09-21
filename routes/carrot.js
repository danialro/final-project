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
  console.log("in the postCarrot in server");
  carrot.save(function(err, carrot){
    if(err){ return next(err); }

    res.json(carrot);
  });
};


// // find specific carrot
// router.param('carrot', function(req, res, next, id) {
//   var query = Carrot.findById(id);

//   query.exec(function (err, carrot){
//     if (err) { return next(err); }
//     if (!carrot) { return next(new Error('can\'t find carrot')); }

//     req.carrot = carrot;
//     return next();
//   });
// });


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























