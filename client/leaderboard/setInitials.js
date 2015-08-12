angular.module('app.setInitials', [])

.controller('setInitialsController', function($scope, $timeout, $interval, $http, gameOver, trackScore, $state, trackSession){
  $scope.totalScore = trackScore;

  $scope.submitScore = function(playerInitials, playerScore){
    $http.post('/api/games', {
      session: trackSession.sessionId,
      initials: playerInitials,
      score: playerScore
    }).then(function(res){
      $state.transitionTo('leaderboard');
    });
  };

});