angular.module('app.leaderboard', [])

.controller('leaderboardController', function($scope, $state, $http){
  $scope.startGame = function(){
    $state.transitionTo('game');
  };

  $scope.getScores = function(){
    // send $http get request for the leaderboard scores
  };

})
