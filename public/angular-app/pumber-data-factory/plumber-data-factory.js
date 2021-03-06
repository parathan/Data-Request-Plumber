angular.module('drplumber').factory('plumberDataFactory', plumberDataFactory);

function plumberDataFactory($http) {
  return {
    usersDisplay: usersDisplay,
    userDisplay: userDisplay,
    postRequest: postRequest
  };

  function usersDisplay() {
    return $http.get('/api/users').then(complete).catch(failed);
  }

  function userDisplay(id) {
    return $http.get('/api/users/' + id).then(complete).catch(failed);
  }

  function postRequest(id, request) {
    return $http.post('/api/users/' + id + '/requests', request).then(complete).catch(failed);
  }

  function complete(response) {
    return response;
  }

  function failed(error) {
    console.log(error.statusText);
  }

}
