angular.module('app.game', [])
  .controller('gameController', function($scope, $timeout, $interval, $http, scoreFactory, sessionFactory){


    //////////
    // SET UP
    //////////
    // code editor settings
    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        tabSize: 2,
        autofocus: true
    };
    // links factory score variable with scope score variable that is shown in the DOM
    $scope.totalScore = scoreFactory;
    // requests a new session id from the database
    sessionFactory.getSession();

    // helper methods
    var setNewBatch = function(resultsObject){
      $scope.level = 0;
      $scope.challengeFixtures = resultsObject.data[0].batch;
    };
    var startNewLevel = function(){
      $scope.challenge = $scope.challengeFixtures[$scope.level]['content'];
      $scope.timeLimit = $scope.challengeFixtures[$scope.level]['timeLimit'];
    };

    // gets the challenge content from the server for the first batch
    // and saves the content in the first level to scope variables that the DOM can access
    $http.get('/api/challengeBatch/0')
    .then(function(res){
      $scope.batch = 0;
      setNewBatch(res);
      startNewLevel();
    });

    // timer setup
    var stop;
    var startTimer = function(timeLimit){
      stop = $interval(function(){
        $scope.timeLimit--;
        // if the timer runs out before a successful submit, the player loses
        if ($scope.timeLimit === 0){
          $interval.cancel(stop);
          $scope.scoreFactory = true;
          $timeout(function(){
            scoreFactory.checkScore($scope.totalScore);
          }, 2500);
        }
      }, 1000);
    };
    // start the timer for the first challenge
    startTimer();


    //////////////////////////
    // PLAYER SOLUTION CHECKS
    //////////////////////////
    $scope.checkChar = function(playerSolution){
      if(playerSolution.length > 0){
        if(playerSolution === $scope.challenge){
          $scope.endLevel(playerSolution);
        } else if (playerSolution[playerSolution.length-1] === $scope.challenge[playerSolution.length-1]){
          //the just typed letter is equal to that in same index of the solution
          if($scope.incorrectBool){//a past value was wrong
            //change to true if values were fixed
            if(playerSolution[$scope.incorrectIndex] === $scope.challenge[$scope.incorrectIndex]){
              $scope.incorrectBool = false;
              $scope.showMessage = false;
            }
          }
        } else {
          // track that there is an error in the solution and where it is in the code
          $scope.incorrectBool = true;
          $scope.incorrectIndex = playerSolution.length-1;
          // show 'incorrect' message
          $scope.submitMessage = 'You typed an incorrect letter!'
          $scope.showMessage = true;
        }
      }
    };

    $scope.endLevel = function(playerSolution){
      // stops timer
      $interval.cancel(stop);
      stop = undefined;
      // shows 'correct' message
      $scope.submitMessage = 'You are amazing!'
      $scope.showMessage = true;
      // increase user's level
      $scope.level++;
      // get user's score for this level and add it to total score
      $scope.score = $scope.timeLimit;
      $http.post('/api/sessions', {
        session: sessionFactory.sessionId,
        score: $scope.score
      }).then(function(res){
        // set the factory score variable to the score returned
        scoreFactory.totalScore = res.data;
      });
      // after a pause
      $timeout(function(){
        // reset win message and code editor
        $scope.showMessage = false;
        $scope.playerSolution = "";
        // set up next challenge
        $scope.setNextChallenge();
      }, 1500);
    };

    $scope.setNextChallenge = function(){
      // if there are more challenges in challengeFixtures
      if ( $scope.challengeFixtures[$scope.level] !== undefined ){
        // set up the next challenge
        startNewLevel();
        startTimer();
      // if that was the last challenge in challengeFixtures
      } else {
        // get next batch from server
        $scope.batch++;
        $http.get('/api/challengeBatch/' + $scope.batch)
        .then(function(res){
          // if we received a new batch from the database
          if (res.data.length){
            // set up the next batch + challenge
            setNewBatch(res);
            startNewLevel();
            startTimer();
          // if there are no more challenge batches
          } else {
            // tell the user they won the game and check if the score is high enough for the leaderboard
            $scope.gameWon = true;
            $timeout(function(){
              scoreFactory.checkScore($scope.totalScore);
            }, 2500);
          }
        });
      }
    };
  })


  /////////////
  // FACTORIES
  /////////////
  .factory('scoreFactory', function($http, $state){
    var obj = {};

    obj.totalScore = 0;

    // checks to see if the score is high enough for the leaderboard
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
  .factory('sessionFactory', function($http){
    var obj = {};

    obj.sessionId;

    obj.getSession = function(){
      $http.post('/api/sessions')
      .then(function(res){
        obj.sessionId = res.data.session;
      });
    };

    return obj;
  });
