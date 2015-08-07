angular.module('app.game', [])
  .controller('gameController', function($scope, $timeout){

    $scope.challangeFixtures = ["var this", "getting better dude", "wow such a master"];
    $scope.level = 0;
    $scope.showMessage = false;

    $scope.challenge = $scope.challangeFixtures[$scope.level];
    $scope.checkSolution = function(playerSolution){
      if ($scope.challenge === playerSolution) {
        $scope.level += 1;

        $scope.submitMessage = 'You are fucking amazing!'
        $scope.showMessage = true;

        var context = $scope;

        $timeout(function(){
          $scope.challenge = $scope.challangeFixtures[$scope.level];
          $scope.playerSolution = "";
          $scope.showMessage = false;
        }, 1500);
      } else {
        $scope.submitMessage = 'You suck.'
        $scope.showMessage = true;
      }
    }
  })