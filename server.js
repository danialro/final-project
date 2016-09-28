var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var runkeeper = require('runkeeper-js');

// Load environment variables from .env file
dotenv.load();

// Models
var User = require('./models/User');
var Carrot = require('./models/Carrot')

// Routes
var userRoute = require('./routes/user');
var contactRoute = require('./routes/contact');
var carrotRoute = require('./routes/carrot');

var app = express();


// mongoose.connect(process.env.MONGODB || 'mongodb://localhost/carrots');
mongoose.connect('mongodb://localhost/carrots');
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});


// helps to find a specific carrot
app.param('carrot', function(req, res, next, id) {
  var query = Carrot.findById(id);

  query.exec(function (err, carrot){
    if (err) { return next(err); }
    if (!carrot) { return next(new Error('can\'t find carrot')); }

    req.carrot = carrot;
    return next();
  });
});

// helps to find a specific user
app.param('user', function(req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user = user;
    return next();
  });
});


app.post('/contact', contactRoute.contactPost);
app.put('/account', userRoute.ensureAuthenticated, userRoute.accountPut);
app.delete('/account', userRoute.ensureAuthenticated, userRoute.accountDelete);
app.post('/signup', userRoute.signupPost);
app.post('/login', userRoute.loginPost);
app.post('/forgot', userRoute.forgotPost);
app.post('/reset/:token', userRoute.resetPost);
app.get('/unlink/:provider', userRoute.ensureAuthenticated, userRoute.unlink);

app.post('/auth/facebook', userRoute.authFacebook);
app.get('/auth/facebook/callback', userRoute.authFacebookCallback);

// app.get('/authorize', userRoute.authFitbit);
// app.get('/callback', userRoute.authFitbitCallback);

app.post('/runkeepercodetotoken', userRoute.tryToGetNewToken); //get user token for runkeeper


app.get('/carrots', carrotRoute.getCarrots); // get all carrots
app.get('/carrots/:carrot', carrotRoute.getOneCarrot); // get one carrot
app.post('/carrots', carrotRoute.postCarrot); // post new carrot
app.put('/carrots/:carrot/join', carrotRoute.joinCarrot); // jion a specific carrot
app.get('/users/:user', userRoute.getOneUser); // get one user
app.get('/carrots/:carrot/participants', carrotRoute.getCarrotParticipants); // get carrot participants

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


console.log("========SERVER RUNNING========")
module.exports = app;
