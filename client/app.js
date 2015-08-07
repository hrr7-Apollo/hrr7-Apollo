angular.module('app', ['ui.router', 'app.game'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  var game = {
    name: 'game',
    url: '/',
    templateUrl: './game/game.html'
  };

  var leaderboard = {
    name: 'leaderboard',
    url: '/leaderboard',
    templateUrl: './leaderboard/leaderboard.html'
  };

  $stateProvider
    .state(game)
    .state(leaderboard)

}])

.run(['$state', function($state){
  $state.transitionTo('game');
}]);


