// static/app.js
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
  $routeProvider
    .when('/login', {
      templateUrl: 'static/login.html',
      controller: 'LoginController'
    })
    .when('/register', {
      templateUrl: 'static/register.html',
      controller: 'RegisterController'
    })
    .when('/home', {
      templateUrl: 'static/home.html',
      controller: 'HomeController'
    })
    .otherwise({
      redirectTo: '/login'
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
 });
});

app.controller('LoginController', function($scope, $http, $location, $window) {
    $scope.user = {}; 
  
    $scope.login = function() {
      $http.post('/login', $scope.user)
        .then(function(response) {
          $window.localStorage.setItem('token', response.data.token);
          $window.localStorage.setItem('userId', response.data.userId);
          $location.path('/home');
        }).catch(function(error) {
            // Handle login error
            $scope.error = error.data.error; // Assuming error message key is 'error'
         });
   };
});

app.controller('RegisterController', function($scope, $http, $location) {
    $scope.user = {}; 
  $scope.register = function() {
    $http.post('/register', { email: $scope.user.email, password: $scope.user.password, name: $scope.user.name })
      .then(function(response) {
        $location.path('/login');
      }, function(error) {
        $scope.error = "Registration failed";
      });
  };
});

app.controller('HomeController', function($scope, $http, $window) {
    // Make authenticated request to fetch user info
    $http.get('/api/user', {
      headers: {
        'Authorization': 'Bearer ' + $window.localStorage.getItem('token')
      }
    })
    .then(function(response) {
      $scope.username = response.data.username;
    }, function(error) {
      $scope.error = "Could not fetch user info";
    });
  });