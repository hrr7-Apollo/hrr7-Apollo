angular.module('app.leaderboard', [])

.controller('leaderboardController', function($scope, $state, $http, scoreFactory, sessionFactory){

  // get scores for leaderboard
  $http.get('/api/leaderboard')
  .then(function(res){
    $scope.scores = res.data;
  });
  
  $scope.startGame = function(){
    // resets the player's score in the game view
    scoreFactory.totalScore = 0;
    // requests a new session id from the database
    sessionFactory.getSession();
    // redirects back to the game view
    $state.transitionTo('game');
  };

})
