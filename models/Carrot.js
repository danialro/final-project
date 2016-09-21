var mongoose = require('mongoose');
var express = require('express');


var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};


var CarrotSchema = new mongoose.Schema({
  carrotName: String,
  weeklyGoal: Number,
  entrance_fee: Number,
  image: String,
  description: String,
  numParticipants: {type: Number, default: 0},
  type: {type: String, default: "Running"},
  active: Boolean,
  moneyPledged: {type: Number, default: 0},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

}, schemaOptions);


CarrotSchema.methods.participantsCounter = function() {
  this.numParticipants += 1;
};

CarrotSchema.methods.moneyPledgedCounter = function() {
  this.moneyPledged += 10; // entrance fee
};




var Carrot = mongoose.model('Carrot', CarrotSchema);

module.exports = Carrot;