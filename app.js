/*
 * In this example, I put the typical Express stuff first
 * even though I don't use it in the example.  It can serve
 * as a template for your apps if you need Express.
 * Then I put the socket.io specific stuff after
 * It doesn't need to be after, but I'm doing it this
 * way just to make it easier to differentiate the two.
 */

// Normal Express requires...
var express = require('express'),
  http = require('http'),
  morgan = require('morgan'),
  app = express();
var request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
// var Materialize = require('node-materialize');
// Materialize.inject();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('passport', require('./models/authentication.js').init(app));

// Set the views directory
app.set('views', __dirname + '/views');
// Define the view (templating) engine
app.set('view engine', 'ejs');
// Log requests
app.use(morgan('tiny'));



// var passport = require('passport')
//   , FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://www.example.com/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate(..., function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));

// This is where your normal app.get, app.put, etc middleware would go.
// Handle static files
app.use(express.static(__dirname + '/public'));
app.all('/', function(req, res) {res.redirect("/login.html");});
/*
 * This section is pretty typical for setting up socket.io.
 *
 * 1) it is necessary to link socket.io to the same http-layer
 * server that Express is running in.  In other words, you can think
 * of Express as a higher-level server running on a lower-level
 * http layer.  You need to get a reference to that http-layer server
 * (the variable httpServer) that Express is using (variable app).
 *
 * 2) Then require socket.io
 * 3) Give socket.io the reference to the same the underlying http server
 * that  Express is using.
 * 4) Start the httpServer listening for both Express and socket.io
 *
 * This can be essentially reused as boilerplate for setting up socket.io
 * alongside Express.
 */

/*1*/ var httpServer = http.Server(app);
/*2*/ var sio =require('socket.io');
/*3*/ var io = sio(httpServer);
/*4*/ httpServer.listen(50000, function() {console.log('Listening on 50000');});

/*
 * For this particular example, I have separated out the main logic for
 * controlling the socket.io exchange to a route called serverSocket.js
 */

var gameSockets = require('./routes/serverSocket.js');

require('./routes/memberRoutes.js').init(app);
gameSockets.init(io);
