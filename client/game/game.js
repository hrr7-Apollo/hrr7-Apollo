angular.module('app.game', [])
  .controller('gameController', function($scope, $timeout, $interval){
    // get challenge data from the database
    // and that data going to have the content and timeLimit

    var stop;
    var start = function(timeLimit){
      stop = $interval(function(){
        $scope.timeLimit--;
      }, 1000, timeLimit);
    };
    start();

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
    $scope.showMessage = false;

    $scope.challenge = $scope.challangeFixtures[$scope.level]['content'];
    $scope.timeLimit = $scope.challangeFixtures[$scope.level]['timeLimit'];

    $scope.checkSolution = function(playerSolution){
      if ($scope.challenge === playerSolution) {
        $scope.level += 1;

        // shows 'correct' message
        $scope.submitMessage = 'You are fucking amazing!'
        $scope.showMessage = true;

        // stops timer
        $interval.cancel(stop);
        stop = undefined;

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