angular.module('app.leaderboard', [])

.controller('leaderboardController', function($scope, $state, $http, trackScore, gameOver){
  $scope.startGame = function(){
    trackScore.totalScore = 0;

    // requests a new session id from the database
    // this should be modularized into a factory method
    $http.post('/api/sessions')
    .then(function(res){
      gameOver.session = res.session;
    });
    
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
