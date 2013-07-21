//controller for /
function PostListCtrl($scope, $http, $rootScope, $location){
	var reqURL = property.url + '/api/post';

	$http.get(reqURL).
	success(function(data){
		//console.log(data.Posts);
		data.Posts.forEach(function(post){
			var date = new Date(post.date);
			post.date = date.toDateString();
		});
		$scope.posts = data.Posts;
	}).
	error(function(data){
		console.log(data);
	});

	$scope.DeletePost = function($event, id){
		var reqURL = property.url + '/api/post/' + id;
		$http({
        	    url: reqURL,
           		method: "DELETE",
            })
			.success(function (data, status, headers, config) {
            	$rootScope.$broadcast('showModal', {
 					title: 'Success', 
    				message: 'Post Deleted', 
   					alert: 'Success'
					});
            	$location.path('#');
        		})
        	.error(function (data, status, headers, config) {
        		$rootScope.$broadcast('showModal', {
   					title: 'Error', 
   					message: status, 
    				alert: 'error'
				});
        	});
	}
}

function SummitPostCtrl($scope, $rootScope, $location, $http){
	$scope.postType = 'post';

	$scope.addPost = function(){
		var body = $('#body').val();
		if ($scope.postType == "post"){
			var reqURL = property.url + '/api/post';
			var data = $.param({title: $scope.title, body: body, author: "DinoCow", hidden: "false"});
			var redirection = '#';
		}else{
			var reqURL = property.url + '/api/portfolio';
			var data = $.param({title: $scope.title, description: body});
			var redirection = '/portfolio'
		}
			
			$http({
        	    url: reqURL,
           		method: "POST",
				data: data,
            	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        		})
			.success(function (data, status, headers, config) {
            	$rootScope.$broadcast('showModal', {
 					title: 'Success', 
    				message: 'Post Saved', 
   					alert: 'Success'
					});
            	
            	$location.path(redirection);
        		})
        	.error(function (data, status, headers, config) {
        		$rootScope.$broadcast('showModal', {
   					title: 'Error', 
   					message: status, 
    				alert: 'error'
				});
        	});
		}

	$scope.$on('$viewContentLoaded', function(){
		$('#body').wysihtml5();
	});
}

function GetMeCtrl($scope, $http){
	var reqURL = property.url + '/api/me';

	$http.get(reqURL).
	success(function(data){
		$scope.me = data.Me;
		//console.log(data);
	}).
	error(function(data){
		console.log(data);
	});
}

function EditInfoCtrl($scope, $rootScope, $location, $http){
	var reqURL = property.url + '/api/me';

	$scope.$on('$viewContentLoaded', function(){
		$('#description').wysihtml5();
		$http.get(reqURL).
			success(function(data){
			$scope.name = data.Me.name,
			$scope.imgUrl = data.Me.pictureUrl;
			$('#description').data("wysihtml5").editor.setValue(data.Me.description);
		}).
		error(function(data){
			console.log(data);
		});
	});

	

	$scope.saveInfo = function(){
		var description = $('#description').val();
		//console.log(body);
		var data = $.param({name: $scope.name, description: description, pictureUrl: $scope.imgUrl});
		$http({
            url: reqURL,
            method: "PUT",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        	})
		.success(function (data, status, headers, config) {
            $rootScope.$broadcast('showModal', {
 				title: 'Success', 
    			message: 'Post Saved', 
   				alert: 'Success'
				});
            $location.path('/about');
        	})
        .error(function (data, status, headers, config) {
        	$rootScope.$broadcast('showModal', {
   				title: 'Error', 
   				message: status, 
    			alert: 'error'
			});
        });
    }
}

function PostDetailCtrl($scope, $routeParams, $location, $http){
	var reqURL = property.url + '/api/post/' + $routeParams.id;

	$scope.$on('$viewContentLoaded', function() {
		var currentPageId = $location.path();
		loadDisqus(currentPageId);
	});

	$http.get(reqURL).
	success(function(data){
		data.post[0].date = new Date(data.post[0].date).toDateString();
		$scope.post = data.post[0];
	}).
	error(function(data){
		console.log(data);
	});
}

function PortfolioListCtrl($scope, $http, $rootScope, $location){
	var reqURL = property.url + '/api/portfolio';

	$http.get(reqURL).
	success(function(data){
		$scope.portfolioItems = data.portfolioItems;
		//console.log(data);
	}).
	error(function(data){
		console.log(data);
	});

	$scope.DeletePortfolioItem = function($event, id){
		var reqURL = property.url + '/api/portfolio/' + id;
		$http({
        	    url: reqURL,
           		method: "DELETE",
            })
			.success(function (data, status, headers, config) {
            	$rootScope.$broadcast('showModal', {
 					title: 'Success', 
    				message: 'Portfolio Item Deleted', 
   					alert: 'Success'
				});
            	$location.path("/portfolio");
        	})
        	.error(function (data, status, headers, config) {
        		$rootScope.$broadcast('showModal', {
   					title: 'Error', 
   					message: status, 
    				alert: 'error'
				});
        	});
	}
}

function PortfolioDetailCtrl($scope, $http, $location, $routeParams){
	var reqURL = property.url + '/api/portfolio/' + $routeParams.id;
	
	$scope.$on('$viewContentLoaded', function() {
		var currentPageId = $location.path();
		loadDisqus(currentPageId);
	});
	
	$http.get(reqURL).
	success(function(data){
		$scope.portfolioItem = data.portfolioItem[0];
	}).
	error(function(data){
		console.log(data);
	});
}


function EditPostCtrl($scope, $http, $location, $routeParams, $rootScope){
	var reqURL = property.url + '/api/post/' + $routeParams.id;

	$scope.$on('$viewContentLoaded', function(){
		$('#description').wysihtml5();
		$http.get(reqURL).
			success(function(data){
			$scope.name = data.post[0].title,
			$('#description').data("wysihtml5").editor.setValue(data.post[0].body);
		}).
		error(function(data){
			console.log(data);
		});
	});

	

	$scope.saveInfo = function(){
		var description = $('#description').val();
		//console.log(body);
		var data = $.param({title: $scope.title, body: description, hidden: false});
		$http({
            url: reqURL,
            method: "PUT",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        	})
		.success(function (data, status, headers, config) {
            $rootScope.$broadcast('showModal', {
 				title: 'Success', 
    			message: 'Post Saved', 
   				alert: 'Success'
				});
            $location.path('#');
        	})
        .error(function (data, status, headers, config) {
        	$rootScope.$broadcast('showModal', {
   				title: 'Error', 
   				message: status, 
    			alert: 'error'
			});
        });
    }
}


function EditPortfolioCtrl($scope, $http, $location, $rootScope, $routeParams){
var reqURL = property.url + '/api/portfolio/' + $routeParams.id;

	$scope.$on('$viewContentLoaded', function(){
		$('#description').wysihtml5();
		$http.get(reqURL).
			success(function(data){
			$scope.name = data.portfolioItem[0].title,
			$('#description').data("wysihtml5").editor.setValue(data.portfolioItem[0].description);
		}).
		error(function(data){
			console.log(data);
		});
	});

	

	$scope.saveInfo = function(){
		var description = $('#description').val();
		//console.log(body);
		var data = $.param({title: $scope.name, description: description});
		$http({
            url: reqURL,
            method: "PUT",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        	})
		.success(function (data, status, headers, config) {
            $rootScope.$broadcast('showModal', {
 				title: 'Success', 
    			message: 'Portfolio Item Saved', 
   				alert: 'Success'
				});
            $location.path('/portfolio');
        	})
        .error(function (data, status, headers, config) {
        	$rootScope.$broadcast('showModal', {
   				title: 'Error', 
   				message: status, 
    			alert: 'error'
			});
        });
    }
}

function loadDisqus(currentPageId) {
    // http://docs.disqus.com/help/2/
    window.disqus_shortname = 'dinocowblog';
    window.disqus_identifier = currentPageId;
    window.disqus_url = property.url + '/' + currentPageId;

    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] ||
        document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();

    angular.element(document.getElementById('disqus_thread')).html('');
 }
