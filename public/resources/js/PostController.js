function PostListCtrl($scope, $http, $rootScope, $location){
	var reqURL = property.url + '/api/post';

	$scope.items = [];
	$scope.busy = false;
  	$scope.offset = '';
	$scope.nextPage = function(){
		if ($scope.busy) return;
    	$scope.busy = true;

    	var url = reqURL + '?offset=' + $scope.offset;
		$http.get(url).
		success(function(data){
			var items = data.Posts;
			for (var i = 0; i < items.length; i++) {
				var date = new Date(items[i].date);
				items[i].date = date.toDateString();
				items[i].body = $.truncate(items[i].body, {length:1400, words: true}).trim();
      			$scope.items.push(items[i]);
     		}
			$scope.offset = $scope.items.length;
      		$scope.busy = false;
		}).
		error(function(data){
			console.log(data);
		});
	}

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
		$('#body').wysihtml5({
			"font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
			"emphasis": true, //Italics, bold, etc. Default true
			"lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
			"html": true, //Button which allows you to edit the generated HTML. Default false
			"link": true, //Button to insert a link. Default true
			"image": true, //Button to insert an image. Default true,
			"color": true //Button to change color of font  
		});
	});
}

function EditPostCtrl($scope, $http, $location, $routeParams, $rootScope){
	var reqURL = property.url + '/api/post/' + $routeParams.id;

	$scope.$on('$viewContentLoaded', function(){
		$('#description').wysihtml5({
				"font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
				"emphasis": true, //Italics, bold, etc. Default true
				"lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
				"html": true, //Button which allows you to edit the generated HTML. Default false
				"link": true, //Button to insert a link. Default true
				"image": true, //Button to insert an image. Default true,
				"color": true //Button to change color of font  
			});
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
		var data = $.param({title: $scope.name, body: description, hidden: false});
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