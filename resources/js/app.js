var app = angular
.module("app", ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider.when("/news", {
		templateUrl: "partials/posts.html",
		controller: "MainController",
		activetab: 'news'
	})
	.when("/create", {
		templateUrl: "partials/createPost.html",
		controller: "CreatePostController",
		activetab: 'create'
	})
	.when("/news/:id", {
		templateUrl: "partials/postDetail.html",
		controller: "DetailPostController",
		activetab: 'news'
	})
	.otherwise({
		redirectTo: "/news"
	})

	$locationProvider.html5Mode(true);
}])
.controller('MainController', ['$scope', '$http', function($scope, $http) {
	$scope.isLoading = true;

    $scope.fetch = function() {
      $http({method: 'GET', url: 'http://adneom.herokuapp.com/api/posts'}).
        then(function(response) {
			$scope.isLoading = false;
          	$scope.posts = response.data;

        }, function(response) {
			$scope.isLoading = false;
          	alert('Failed to load news...');
      });
    };

    $scope.upvotePost = function($event, post){
    	console.log(post);
    	//get the up icon and add the pop-animation
    	var $commentBox = $($event.currentTarget).next('.post-item__inner');
    	var $upIcon = $($event.currentTarget).find('.fa');

    	//animate
    	$commentBox.addClass('pop-anim--small');
    	$upIcon.addClass('pop-anim');

    	//remove animation classes
  		setTimeout(function(){
  			$upIcon.removeClass('pop-anim');
  			$commentBox.removeClass('pop-anim--small');
  		},500);

    	$http({method: 'PUT', url: 'http://adneom.herokuapp.com/api/posts/'+post._id+'/upvote '}).
        then(function(response) {
          	if (response.status === 200){
          		//update votes
          		post.upvotes++;
          	}

        }, function(response) {
          	alert('Failed to upvote this news...');
      });
    }


    //start fetching
    $scope.fetch();
}])
.controller('CreatePostController', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.newPost = {
		title: "",
		link: "",
		upvotes: 0,
		comments: []
	}

	$scope.submitPost = function(){

		if ($scope.newPost.title != '' && $scope.newPost.link != ''){
			$http.post('http://adneom.herokuapp.com/api/posts', $scope.newPost, {})
			.then(function(){
				console.log("Succesfully posted");
				$location.path('/news');

			}, function(){
				console.error("Failed to create post");
			});
		}
	}
}])
.controller('DetailPostController', ['$scope', '$http', '$routeParams', '$route', function($scope, $http, $routeParams, $route){

	$scope.newComment = {
		author: "",
		body: "",
		upvotes: 0,
		post: $routeParams.id
	}

	$http({method: 'GET', url: 'http://adneom.herokuapp.com/api/posts/' + $routeParams.id}).
        then(function(response) {
          	$scope.post = response.data;

        }, function(response) {
          	alert('Request failed');
      });

    $scope.submitComment = function(){
    	if ($scope.newComment.author != '' && $scope.newComment.body != ''){
    		$http.post('http://adneom.herokuapp.com/api/posts/'+$routeParams.id+'/comments', $scope.newComment, {})
			.then(function(){
				console.log("Succesfully posted");
				$route.reload();
			}, function(){
				console.error("Failed to create post");
			});
    	}
    }

    $scope.upvoteComment = function(comment){
    	console.log('upvote: ', comment);
    }

}])
//http://stackoverflow.com/questions/27211881/how-to-fix-an-element-after-scroll-in-an-angularjs-webpage
.directive('setClassWhenAtTop', ['$window', function ($window) {
  var $win = angular.element($window); // wrap window object as jQuery object

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
          offsetTop = element.offset().top; // get element's offset top relative to document

      $win.on('scroll', function (e) {
        if ($win.scrollTop() >= offsetTop) {
          element.addClass(topClass);
        } else {
          element.removeClass(topClass);
        }
      });
    }
  };
}])
.run(['$rootScope', '$route', function ($rootScope, $route) {
    $rootScope.$route = $route;
}]);