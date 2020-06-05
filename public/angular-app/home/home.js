angular.module('drplumber').controller('HomeController', HomeController);

function HomeController(plumberDataFactory) {
  var vm = this;
  vm.header = 'Search User';
  plumberDataFactory.usersDisplay().then(function(response) {
    vm.users = response.data;
  });
}
