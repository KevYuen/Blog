//routing
angular.module('BLOG', ['infinite-scroll']).
  config(['$routeProvider' , function($routeProvider) {
  $routeProvider.
      when('/post', {templateUrl: 'partials/postList', controller: PostListCtrl}).
      when('/about', {templateUrl: 'partials/about', controller: GetMeCtrl}).
      when('/about/edit', {templateUrl:'partials/secure/editInfo', controller: EditInfoCtrl}).
      when('/post/create', {templateUrl:'partials/secure/post', controller: SummitPostCtrl}).
      when('/post/:id/:title', {templateUrl:'partials/postDetail', controller: PostDetailCtrl}).
      when('/post/:id/:title/edit', {templateUrl:'partials/secure/editPost', controller: EditPostCtrl}).
      when('/portfolio',{templateUrl:'partials/portfolioList', controller: PortfolioListCtrl}).
      when('/portfolio/:id/:title', {templateUrl: 'partials/portfolioDetail', controller: PortfolioDetailCtrl}).
      when('/portfolio/:id/:title/edit', {templateUrl: 'partials/secure/editPortfolioItem', controller: EditPortfolioCtrl}).
      otherwise({redirectTo: '/post'})
  }]).
      config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);
