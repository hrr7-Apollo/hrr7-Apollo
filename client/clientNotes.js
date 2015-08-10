// ** Authenticating that a user has a high enough score to reach setInitials view and/or submit their score to the database

// idea: make a helper function that determines if a user has a high enough score to submit to the leaderboard
// add scoreChecker call to score submission method so it fails if the helper returns false
// add if statement to setInitials route or something that redirects to leaderboard if scoreChecker helper returns false
