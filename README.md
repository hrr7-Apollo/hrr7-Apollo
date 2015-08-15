# hrr7-Apollo

## How to Get Started ##

Seeding the Database with Challenges:

1. In your Terminal, navigate to the server/ directory.
2. Enter the mongo shell by typing 'mongo' and hitting enter.
3. Create or switch to the database that you wish to use with Homerow Apollo with the ```use``` command (for example, ```use apollo-db```).
4. Seed the database with the challenges from challengeBatch.js by entering the following: ```load('seedBatch.js')```
5. Exit the mongo shell with ctrl+c
6. Run the server and open the browser to localhost:8080

## Tools ##

- Angular
- Express
- Mongoose
- Node.js
- Bower
- Grunt
- Morgan
- Method-Override
- Body-Parser
- CodeMirror
- Sass

## Minimum Viable Product

- User can start a new Game.
- User can complete challenges by typing prompts into text fields.
- Score earned is based on how long it takes the User to complete each level.
- Game includes levels of increasing difficulty.
- Database holds Leaderboard of highest current scores.
- View for Leaderboard.

## Stretch Features

- User accounts
- Criteria-based/bonus challenges
- Report of words per minute or other performance breakdown
- Find source for challenge content
- Option to play Game with other programming languages
- D3 visualization of Leaderboard

## Questions

- What does the game actually look like? (campy arcade game vs. simple typing tool)
- How do users give us their initials/username for the leaderboard?

## Priorities as of 8/10/2015
- Deployment (Greg / Derek)
- Security for POSTing fake scores (Diedra)
- Seeding Challenges of ranging difficulty (Diedra)
- Create endpoint to fetch challenges (Greg / Derek)
- Testing / Grunt (Diedra / Nick)
- Documentation (Greg)
- Parsing user input (Derek)
- Design (Greg)
- Event Listener on submit button in Game (keeps hands on keyboard) (Derek)
- Refactor client to use server challenge content (batches) (Diedra)
