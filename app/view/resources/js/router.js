//routing
angular.module('BLOG', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/posts.html', controller:'GetPostsCtrl'}).
      when('/about', {templateUrl: 'partials/about.html'}).
      when('/post', {templateUrl:'partials/post.html', controller:'PostCtrl'}).
      otherwise({redirectTo: '/'});
}]);