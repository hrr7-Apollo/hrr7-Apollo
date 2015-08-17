angular.module('app.setInitials', [])

.controller('setInitialsController', function($scope, $timeout, $interval, $http, scoreFactory, $state, sessionFactory){
  // adds the total score to the scope so it can be viewed in the DOM
  $scope.totalScore = scoreFactory;

  // sends the player's score to the database for the leaderboard
  $scope.submitScore = function(playerInitials, playerScore){
    $http.post('/api/games', {
      session: sessionFactory.sessionId,
      initials: playerInitials,
      score: playerScore
    }).then(function(res){
      $state.transitionTo('leaderboard');
    });
  };

});