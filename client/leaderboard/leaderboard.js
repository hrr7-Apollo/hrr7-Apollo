angular.module('app.leaderboard', [])

.controller('leaderboardController', function($scope, $state, $http, trackScore, gameOver, trackSession){

  $http.get('/api/leaderboard')
  .then(function(res){
    $scope.scores = res.data;
  });
  
  $scope.startGame = function(){
    // resets the player's score in the game view
    trackScore.totalScore = 0;
    // requests a new session id from the database
    trackSession.getSession();
    // redirects back to the game view
    $state.transitionTo('game');
  };

})
