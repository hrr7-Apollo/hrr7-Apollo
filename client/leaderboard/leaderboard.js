angular.module('app.leaderboard', [])

.controller('leaderboardController', function($scope, $state, $http, trackScore){
  $scope.startGame = function(){
    trackScore.totalScore = 0;
    $state.transitionTo('game');
  };

  $scope.scores;

  $scope.getScores = function(){
    $http.get('/api/leaderboard')
    .then(function(res){
      $scope.scores = res.data;
    });
  };

  $scope.getScores();

})
