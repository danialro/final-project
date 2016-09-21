var mongoose = require('mongoose');
var express = require('express');

var CarrotSchema = new mongoose.Schema({
  carrotName: String,
  weeklyGoal: Number,
  launchDate: {type: Date, default: Date.now()},
  entrance_fee: Number,
  image: String,
  description: String,
  numParticipants: {type: Number, default: 0},
  type: {type: String, default: "Running"},
  active: Boolean,
  moneyPledged: {type: Number, default: 0},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

});


CarrotSchema.methods.participantsCounter = function() {
  this.numParticipants += 1;
};

CarrotSchema.methods.moneyPledgedCounter = function() {
  this.moneyPledged += 10; // entrance fee
};




var Carrot = mongoose.model('Carrot', CarrotSchema);

module.exports = Carrot;