# hrr7-Apollo

## Minimum features for complete product
<ul>
<li>ability to start a new game</li>
<li>be able to complete challenges (code blocks?) in text field</li>
<li>score based on time completed in (for each level and accumulated for this session) (have a base points number that you get for completing the level, and you get extra points for completing it faster) (current total score visible on the game screen)</li>
<li>levels of increasing difficulty</li>
<li>database that holds leaderboard info of highest current scores</li>
<li>page/view for leaderboard (possibly shown to the player after completing each level)</li>
</ul>

## Would be nice
<ul>
<li>user accounts</li>
<li>criteria/bonus challenges</li>
<li>report words per minute</li>
</ul>

## Pie in the sky
<li>scraping code for challenge blocks</li>
<li>ability to choose which language the challenge is in</li>
<li>d3 visualisation for leaderboard?</li>
</ul>

## Questions
<ul>
<li>what does the game actually look like? (campy arcade game vs. simple typing tool)</li>
<li>how do users give us their initials/username for the leaderboard? (if there is no game over state, would need to get their name either at the beginning or at the end of the first level)</li>
</ul>

## Tech Stack
Server
 - What do we want to persist and send to the client?
  - Scores ("Top 20")
    - User initials
  - User information (stretch - record with their high score, login, etc)
  - Challenge Content (maybe - if data gets too big for client)

Client
 - Challenge Content
  - List of code blocks for users to type out
 - Track user's current information
  - Level
  - High Score (sent to db if 'high score')
 - Get user initials

## Priorities as of 8/10/2015
- Deployment (Greg / Derek)
- Security for POSTing fake scores (Diedra)
- Seeding Challenges of ranging difficulty (Diedra)
- Create endpoint to fetch challenges (Greg / Derek)
- Testing (Diedra / Nick)

- Documentation
- Parsing user input
- Grunt / Gulp
- Design?
