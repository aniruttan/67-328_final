
var mongoModel = require('../models/users.js')

exports.init = function(app) {
  var passport = app.get('passport');

  app.get('/membersOnly',
          checkAuthentication,
          doMembersOnly);

  app.post('/login',
          passport.authenticate('local', {
                                  failureRedirect: '/login.html',
                                  successRedirect: '/membersOnly'}));
  app.post('/start_game', doStartGame);
  app.post('/signup', doSignUp);
  app.get('/game_over/:score', doGameOver);
  // The Logout route
  app.get('/logout', doLogout);

}

// Members Only path handler
doMembersOnly = function(req, res) {
  if (req.user.username) {
    res.redirect('/home.html?&member='+req.user.username);
  } else {
    res.render('error', { 'message': 'Application error...' });
  }
};

//passport function to verify authentication
function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
      //login not detected
        res.redirect("/login.html");
    }
}

//route to direct the server to start a game
function doStartGame(req,res){
  res.render('game', { 'category': req.body.trivia_category });
}


//function that signs up a user
doSignUp = function(req, res){
  console.log("in do signup")
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.body.cpassword);

  mongoModel.create (
                     {username: req.body.username,password: req.body.password},
                     function(result) {
                       var success = (result ? "successful" : "fail");
                       res.redirect("/login.html?&from_signup=yes");
                     });

}

//game over function computes the users score and sends it
function doGameOver(req,res){
  res.render('game_over',{'score':req.score})
}


function doLogout(req, res){
  req.logout();
  res.redirect('/');
};
