///////////
// SET UP
///////////
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

///////////
// CONFIG
///////////
mongoose.connect('mongodb://localhost/apollo');  //UPDATE

app.use(express.static(__dirname + '/client/app'));             // set the static files location /client/app/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

///////////
// MODELS
///////////
// var User = require('./server/users/userModel.js');

///////////
// ROUTES
///////////

app.get('/test', function (req, res){
  console.log('inside of the test route');
  res.json({a:1});
});

// // AUTH + SESSIONS
// app.post('/api/sessions', function(req, res) {
//   var user = req.body;

//   User.findOne({
//     email: user.email
//   }, function(err, found) {
//     if (err) {
//       console.log('ERROR:', err);
//       res.send(err);
//     }
//     console.log('FOUND:', found);
//     res.json(found);
//   })
// });

/////////////////
// LOAD ANGULAR
/////////////////
// load the single view file (angular will handle the page changes on the front-end)
// app.get('*', function(req, res) {
//   res.sendfile('./client/app/index.html');
// });


///////////
// LISTEN
///////////
app.listen(8080);
console.log("App listening on port 8080");
