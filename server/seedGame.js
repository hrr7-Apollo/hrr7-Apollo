// Seeding the Database with Games (under 'How to Get Started' in README):

// 1. In your Terminal, navigate to the server/ directory.
// 2. Enter the mongo shell by typing 'mongo' and hitting enter.
// 3. Create or switch to the database that you wish to use with Homerow Apollo with the ```use``` command (for example, ```use apollo```).
// 4. Seed the database with the games by entering the following: ```load('seedGame.js')```
// 5. Exit the mongo shell with ctrl+c
// 6. Run the server and open the browser to localhost:8080

db.games.insert({
  initials: "AAA",
  highscore: 100,
  date: new Date()
});

db.games.insert({
  initials: "BBB",
  highscore: 200,
  date: new Date()
});

db.games.insert({
  initials: "CCC",
  highscore: 300,
  date: new Date()
});

db.games.insert({
  initials: "DDD",
  highscore: 400,
  date: new Date()
});

db.games.insert({
  initials: "EEE",
  highscore: 500,
  date: new Date()
});

db.games.insert({
  initials: "FFF",
  highscore: 600,
  date: new Date()
});

db.games.insert({
  initials: "GGG",
  highscore: 700,
  date: new Date()
});

db.games.insert({
  initials: "HHH",
  highscore: 800,
  date: new Date()
});

db.games.insert({
  initials: "III",
  highscore: 900,
  date: new Date()
});

db.games.insert({
  initials: "JJJ",
  highscore: 1000,
  date: new Date()
});
