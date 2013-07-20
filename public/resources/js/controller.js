//controller for /
function PostListCtrl($scope, $http){
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

	$scope.DeletePost = function(id){
		var reqURL = property.url + '/api/post' + id;
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
            	console.log(redirection);
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
            $location.path('/#/about');
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

function PostDetailCtrl($scope, $routeParams, $http){
	var reqURL = property.url + '/api/post/' + $routeParams.id;

	$http.get(reqURL).
	success(function(data){
		data.post[0].date = new Date(data.post[0].date).toDateString();
		$scope.post = data.post[0];
	}).
	error(function(data){
		console.log(data);
	});
}

function PortfolioListCtrl($scope, $http){
	var reqURL = property.url + '/api/portfolio';

	$http.get(reqURL).
	success(function(data){
		$scope.portfolioItems = data.portfolioItems;
		//console.log(data);
	}).
	error(function(data){
		console.log(data);
	});
}

function PortfolioDetailCtrl($scope, $http, $routeParams){
		var reqURL = property.url + '/api/portfolio/' + $routeParams.id;

	$http.get(reqURL).
	success(function(data){
		$scope.post = data.portfolioItem[0];
	}).
	error(function(data){
		console.log(data);
	});

}