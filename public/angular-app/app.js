angular.module('drplumber', ['ngRoute']).config(config);

function config($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/home/home.html',
      controller: HomeController,
      controllerAs: 'vm'
    })
    .when('/:userid', {
      templateUrl: 'angular-app/user/user.html',
      controller: UserController,
      controllerAs: 'vm'
    })
    .when('/:userid/request', {
      templateUrl: 'angular-app/submit-request/request.html',
      controller: RequestController,
      controllerAs: 'vm'
    });
  $locationProvider.html5Mode(false).hashPrefix('!');
}
