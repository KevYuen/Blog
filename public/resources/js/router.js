//routing
angular.module('BLOG', []).
  config(['$routeProvider' , function($routeProvider) {
  $routeProvider.
      when('/post', {templateUrl: 'partials/postList', controller: PostListCtrl}).
      when('/about', {templateUrl: 'partials/about', controller: GetMeCtrl}).
      when('/about/edit', {templateUrl:'partials/editInfo', controller: EditInfoCtrl}).
      when('/post/create', {templateUrl:'partials/post', controller: SummitPostCtrl}).
      when('/post/:id', {templateUrl:'partials/postDetail', controller: PostDetailCtrl}).
      otherwise({redirectTo: '/post'})
  }]).
      config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);
