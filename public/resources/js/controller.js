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
}

function SummitPostCtrl($scope, $rootScope, $location, $http){
	var reqURL = property.url + '/api/post';

	$scope.addPost = function(){
		var body = $('#body').val();
		//console.log(body);
		var data = $.param({title: $scope.title, body: body, author: "DinoCow", hidden: "false"});
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
	console.log(reqURL);
	
	$http.get(reqURL).
	success(function(data){
		console.log(data);
		$scope.post = data.Post;
	}).
	error(function(data){
		console.log(data);
	});
}