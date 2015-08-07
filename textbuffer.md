<!-- // EXAMPLE CURL TO CREATE NEW USER
// curl --data "email=john&password=doe&initials=JFD" http://localhost:8080/api/users

// curl --data "initials=GRV&highscore=100" http://localhost:8080/api/games
// curl --data "initials=BOB&highscore=25" http://localhost:8080/api/games
// curl --data "initials=DJO&highscore=9001" http://localhost:8080/api/games

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
// }); -->