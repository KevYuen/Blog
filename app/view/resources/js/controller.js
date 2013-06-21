//controller for /
function GetPostsCtrl($scope, $http){
	var reqURL = property.url + '/api/post';

	$http.get(reqURL).
	success(function(data){
		//console.log(data);
		$scope.posts = data.Posts;
	}).
	error(function(data){
		console.log(data);
	});
}

function PostCtrl($scope, $http){
	var reqURL = property.url + '/api/post'

	$scope.addPost = function(){
		//console.log($scope);
		//console.log($scope.title);
		//console.log($scope.body);
		var data = $.param({title: $scope.title, body: $scope.body, author: "DinoCow", hidden: "false"});
		$http({
            url: reqURL,
            method: "POST",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        	})
		.success(function (data, status, headers, config) {
                alert(status);
        	})
        .error(function (data, status, headers, config) {
                alert(status);
            });

	}
}