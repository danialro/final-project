var mongoose = require('mongoose');


var carrotSchema = new mongoose.Schema({
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

}, schemaOptions);


CommentSchema.methods.participantsCounter = function() {
  this.numParticipants += 1;
};

CommentSchema.methods.moneyPledgedCounter = function() {
  this.moneyPledged += 10; // entrance fee
};




var Carrot = mongoose.model('Carrot', carrotSchema);

module.exports = Carrot;