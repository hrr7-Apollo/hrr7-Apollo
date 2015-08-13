///////////
// SET UP
///////////
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var morgan = require('morgan');                   // log requests to the console (express4)
var bodyParser = require('body-parser');          // pull information from HTML POST (express4)
var methodOverride = require('method-override');  // simulate DELETE and PUT (express4)
var security = require('./server/security/sessionAuthorization.js');


///////////
// CONFIG
///////////
// DB_URI enviroment variable contains mongoLab url for production server
DB_URI = process.env.DB_URI || 'mongodb://localhost/apollo';
mongoose.connect(DB_URI);
var db = mongoose.connection;
// Log database connection errors
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongo DB connection is open");
});
module.exports = db;

app.use(express.static(__dirname + '/client/'));                // set the static files location /client/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


///////////
// MODELS
///////////
var User = require('./server/users/userModel.js');
var Game = require('./server/games/gameModel.js');
var ChallengeBatch = require('./server/challengeBatches/challengeBatchModel.js');
var Session = require('./server/security/sessionModel.js');


///////////
// ROUTES
///////////
// SIGNUP
app.post('/api/users', function (req, res){
  var user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.initials = req.body.initials;
  user.highscore = 0;

  // IF SENT USER DATA FAILS ANY VALIDATIONS, SEND ERROR
  // OTHERWISE, SEND BACK NEW USER
  user.save(function(err) {
    if (err) {
      console.log('ERROR:', err);
      res.send(err);
    }
    res.json(user);
  });
});

// HIGH SCORES
app.get('/api/minHighscore', function (req, res){
  //look through data base and retrieve lowest highscore
  Game.find({})
    .sort('-highscore')
    .exec(function (err, games) {
      if (err) {
        console.log('ERROR',err);
        res.send(err);
      }

      // sends back 10th highscore
      // arbitrary # of how many you want in Leaderboard (maybe extract to variable)
      res.json(games[9].highscore);
  });
});

// GAMES
app.post('/api/games', security.checkSession, function (req, res){
  // find entry in Session collection with session id to get the user's total score
  Session.findOne({_id: req.body.session})
    .exec(function(err, session){
      // save it to the Games collection for the leaderboard
      var game = new Game();
      game.initials = req.body.initials;
      game.highscore = session.currentScore;
      game.date = new Date();
      game.save(function(err){
        if (err) {
          console.log('ERROR:', err);
          res.send(err);
        }
        res.json(game);
      });

    });
});

// LEADERBOARD
app.get('/api/leaderboard', function (req, res){
  Game.find({})
    .sort('-highscore')
    .limit(10)
    .exec(function (err, games){
      if(err){
        console.log('ERROR:', err);
        res.send(err);
      }

      res.json(games);
    });
});

// CHALLENGE BATCH - INCOMPLETE (RETURNS [])
app.get('/api/challengeBatch/:id', function (req, res){
  ChallengeBatch.find({id: req.params.id})
    .exec(function (err, batch){
      if (err) {
        console.log('ERROR:', err);
        res.send(err);
      }

      console.log('BATCH:', batch);
      res.json(batch);
    });
});

// SESSIONS
app.post('/api/sessions', function (req, res){
  // if there is no session id and no score sent with the request, insert a new session entry
  if (!req.body.session && !req.body.score){
    var session = new Session();
    session.date = new Date();
    session.level = 0;
    session.currentScore = 0;
    session.save(function(err){
      if (err) {
        console.log('ERROR:', err);
        res.send(err);
      }
      res.json( {session: session._id} );
    });
  // if it's missing either the score or the id, or the score is higher than what the game allows, send back a 'Bad Request' response
  // please note that if the timeLimits of the various challenges are changed to be not all the same, this last check will need to happen after you've gotten the existing entry out of the database so you can see what level the user was last on and check that against the timeLimit of that level's challenge
  } else if (!req.body.session || !req.body.score || req.body.score >= 90){
    res.send(400);
  // else update the score in the collection entry of the id
  } else {
    var query = {
      _id: req.body.session
    };
    // get existing document so we can get the current values and update them
    Session.findOne(query)
      .exec(function(err, session){
        if (err) {
          console.log('ERROR:', err);
          res.end(err);
        }
        var totalScore = session.currentScore + +req.body.score;
        var level = session.level + 1;
        var insert = {
          currentScore: totalScore,
          level: level
        };
        Session.findOneAndUpdate(query, insert, function(err, doc){
          if (err) return res.send(500, { error: err });
          // send the total score back to the client
          return res.json(totalScore);
        });
      });
  }
});


///////////
// LISTEN
///////////
var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port " + port);
