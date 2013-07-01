//routing
angular.module('BLOG', []).
  config(['$routeProvider' , function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/posts', controller:'GetPostsCtrl'}).
      when('/about', {templateUrl: 'partials/about'}).
      when('/post', {templateUrl:'partials/post', controller:'PostCtrl'}).
      when('/contact', {templateUrl:'partials/contact', controller:'ContactCtrl'}).
      otherwise({redirectTo: '/'})
  }]).
      config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);