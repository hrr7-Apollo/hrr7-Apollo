angular.module('app.game', [])
  .controller('gameController', function($scope, $timeout, $interval){
    $scope.challangeFixtures = [
      {
        level: 0,
        content: "var this",
        timeLimit: 60
      }, {
        level: 1,
        content: "getting better dude",
        timeLimit: 90
      }, {
        level: 2,
        content: "just put whatever",
        timeLimit: 160
      }
    ];
    $scope.level = 0;
    $scope.challenge = $scope.challangeFixtures[$scope.level]['content'];
    $scope.timeLimit = $scope.challangeFixtures[$scope.level]['timeLimit'];
    $scope.totalScore = 0;
    $scope.showMessage = false;


    $scope.gameOver = false;
    var stop;
    var start = function(timeLimit){
      stop = $interval(function(){
        $scope.timeLimit--;

        if ($scope.timeLimit === 0){
          $interval.cancel(stop);
          $scope.gameOver = true;
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
        $scope.totalScore += $scope.score;

        $timeout(function(){
          // removes win message
          $scope.showMessage = false;
          // resets textbox
          $scope.playerSolution = "";
          // sets next challenge
          $scope.challenge = $scope.challangeFixtures[$scope.level]['content'];
          // restarts timer for next challenge
          $scope.timeLimit = $scope.challangeFixtures[$scope.level]['timeLimit'];
          start($scope.challangeFixtures[$scope.level]['timeLimit']);
        }, 1500);
      } else {
        // shows 'incorrect' message
        $scope.submitMessage = 'You suck.'
        $scope.showMessage = true;
      }
    }
  })