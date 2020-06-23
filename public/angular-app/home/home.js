angular.module('drplumber').controller('HomeController', HomeController);

function HomeController($routeParams, plumberDataFactory) {
  var vm = this;
  var id = $routeParams.id;
  vm.header = 'Search User';
  plumberDataFactory.usersDisplay().then(function(response) {
    vm.users = response.data;
  });

  vm.getUser = function() {
    if (vm.searchForm.$valid) {
      plumberDataFactory.userDisplay(id).then(function(response) {
        vm.user = response.data;
      })
    }
  }
}
