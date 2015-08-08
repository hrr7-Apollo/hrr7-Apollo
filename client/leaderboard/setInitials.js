angular.module('app.setInitials', [])

.controller('setInitialsController', function($scope, $timeout, $interval, $http, gameOver, trackScore, $state){
  $scope.totalScore = trackScore;

  $scope.submitScore = function(playerInitials, playerScore){
    $http.post('/api/games', {
      initials: playerInitials,
      highscore: playerScore
    }).then(function(res){
      $state.transitionTo('leaderboard');
    });
  };

});