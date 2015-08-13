angular.module('app.game', [])
  .controller('gameController', function($scope, $timeout, $interval, $http, gameOver, trackScore, trackSession){
    angular.extend($scope, gameOver);
    $scope.challengeFixtures;

    // requests a new session id from the database
    // this should be modularized into a factory method
    $http.post('/api/sessions')
    .then(function(res){
      trackSession.sessionId = res.data.session;
    });

    // simulates get request by accessing challengeFixtures.JSON file
    $http.get('challengeFixtures.JSON')
    .then(function(res){
      $scope.challengeFixtures = res.data;
      $scope.level = 0;
      $scope.challenge = $scope.challengeFixtures[$scope.level]['content'];
      $scope.timeLimit = $scope.challengeFixtures[$scope.level]['timeLimit'];
    });

    $scope.totalScore = trackScore;
    $scope.showMessage = false;

    $scope.gameOver = false;
    var stop;
    var start = function(timeLimit){
      stop = $interval(function(){
        $scope.timeLimit--;

        // if the timer runs out before a successful submit, the player loses
        if ($scope.timeLimit === 0){
          $interval.cancel(stop);
          $scope.gameOver = true;
          gameOver.checkScore($scope.totalScore);
        }
      }, 1000);
    };
    start();


    $scope.checkSolution = function(playerSolution){
      if ($scope.challenge === playerSolution) {
        // stops timer
        $interval.cancel(stop);
        stop = undefined;

        // shows 'correct' message
        $scope.submitMessage = 'You are fucking amazing!'
        $scope.showMessage = true;

        // increase user's level
        $scope.level += 1;

        // get user's score for this level and add it to total score
        $scope.score = $scope.timeLimit;
        $http.post('/api/sessions', {
          session: trackSession.sessionId,
          score: $scope.score
        }).then(function(res){
          // set the factory score variable to the score returned
          trackScore.totalScore = res.data;
        });

        // after a pause
        $timeout(function(){
          // removes win message
          $scope.showMessage = false;
          // resets textbox
          $scope.playerSolution = "";
          // sets next challenge if there is one
          if ($scope.challengeFixtures[$scope.level]){
            $scope.challenge = $scope.challengeFixtures[$scope.level]['content'];
            // restarts timer for next challenge
            $scope.timeLimit = $scope.challengeFixtures[$scope.level]['timeLimit'];
            start($scope.challengeFixtures[$scope.level]['timeLimit']);
          // otherwise show a win message and check if the score is high enough for the leaderboard
          } else {
            $scope.gameWon = true;
            gameOver.checkScore($scope.totalScore);
          }
        }, 1500);
      } else {
        // shows 'incorrect' message
        $scope.submitMessage = 'You suck.'
        $scope.showMessage = true;
      }
    }
  })
  .factory('gameOver', function($http, $state){
    var obj = {};
    obj.checkScore = function(playerScore) {
      $http.get('/api/minHighscore')
        .then(function(res){
          var minHighscore = res.data;
          if (playerScore.totalScore < minHighscore) {
            $state.transitionTo('leaderboard');
          } else {
            $state.transitionTo('setInitials');
          }
        })
    };

    return obj;
  })
  // this creates a score variable that we can pass to the setInitials view
  .factory('trackScore', function(){
    var obj = {};
    obj.totalScore = 0;
    return obj;
  })
  // this creates a session variable that we can pass to the setInitials view
  .factory('trackSession', function(){
    var obj = {};
    obj.sessionId;
    return obj;
  });
