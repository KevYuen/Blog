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





function EditPortfolioCtrl($scope, $http, $location, $rootScope, $routeParams){
	var reqURL = property.url + '/api/portfolio/' + $routeParams.id;

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

function PortfolioListCtrl($scope, $http, $rootScope, $location){
	var reqURL = property.url + '/api/portfolio';

	$scope.items = [];
	$scope.busy = false;
	$scope.offset = '';

	$scope.nextPage = function(){
		if ($scope.busy) return;
		$scope.busy = true;

		var url = reqURL + "?offset=" + $scope.offset;
		$http.get(url).
		success(function(data){
			var items = data.portfolioItems;
			for(var i = 0; i < items.length; i++){
				$scope.items.push(items[i]);
			}
			$scope.offset = $scope.items.length;
			$scope.busy = false;
		}).
		error(function(data){
			console.log(data);
		});
	}
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