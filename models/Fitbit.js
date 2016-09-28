var mongoose = require('mongoose');
var express = require('express');


var FitbitSchema = new mongoose.Schema({

  access_token: String,
  expires_in: Number,
  refresh_token: String,
  scope: String,
  token_type: String,
  user_id: {type: String, unique: true},
  user_info: Object,
  stickyCarrotUser_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});


// CarrotSchema.methods.participantsCounter = function() {
//   this.numParticipants += 1;
// };

// CarrotSchema.methods.moneyPledgedCounter = function() {
//   this.moneyPledged += this.entrance_fee;
// };




var Fitbit = mongoose.model('Fitbit', FitbitSchema);

module.exports = Fitbit;