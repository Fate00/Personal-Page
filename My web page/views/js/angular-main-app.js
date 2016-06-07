	var app = angular.module("myapp", ['ngRoute', 'customServices']);
	
	console.log('App init..');

	app.config(['$routeProvider',
	    function($routeProvider) {
	        $routeProvider
	        	.when('/', {
	        		templateUrl: 'userList.html',
	                controller: 'listController'
	        	})
	            .when('/createRoute/', {
	                templateUrl: 'createUser.html',
	                controller: 'createUserController'
	            })
	            .when('/editRoute/:userId', {
	                templateUrl: 'editUser.html',
	                controller: 'editUserController'
	            })
	            .otherwise({
	                redirectTo: '/'
	            });
	    }
	]);

	app.controller('listController', function($scope, $routeParams, listService) {
	 	$scope.users = [];

		console.log('Enter list controller..');

		listService.getUsers($scope);

		$scope.$watch('users', function() {
			listService.initShowNextPage();
			$scope.usersPerPage = listService.getUsersPerPage();
			$scope.currentPage = listService.getCurrentPage();
			$scope.showPrevPage = listService.getShowPrevPage();
			$scope.showNextPage = listService.getShowNextPage();

		    $scope.range = listService.getRange();

		    $scope.pageCount = listService.getPageCount();
		});

	    $scope.prevPage = function() {
	    	if (listService.getCurrentPage() > 0) {
	    		// $scope.currentPage -= 1;
	    		listService.setCurrentPage(listService.getCurrentPage() - 1);
	    		// $scope.showPrevPage = true;
	    		listService.setShowPrevPage(true);
	    		// $scope.showNextPage = true;
	    		listService.setShowNextPage(true);
	    		if (listService.getCurrentPage() == 0)
	    			// $scope.showPrevPage = false;
	    			listService.setShowPrevPage(false);
	    		else
	    			// $scope.showPrevPage = true;
	    			listService.setShowPrevPage(true);
		    }
		    listService.getUsers($scope);
			$scope.usersPerPage = listService.getUsersPerPage();
			$scope.currentPage = listService.getCurrentPage();
			$scope.showPrevPage = listService.getShowPrevPage();
			$scope.showNextPage = listService.getShowNextPage();	
	    }

	    $scope.nextPage = function() {
	    	// alert('!!');
	    	if (listService.getCurrentPage() < $scope.pageCount) {
	    		// $scope.currentPage += 1;
	    		listService.setCurrentPage(listService.getCurrentPage() + 1);
	    		// $scope.showPrevPage = true;
	    		listService.setShowPrevPage(true);
	    		// $scope.showNextPage = true;
	    		listService.setShowNextPage(true);
	    		if (listService.getCurrentPage() == $scope.pageCount)
	    			// $scope.showNextPage = false;
	    			listService.setShowNextPage(false);
	    		else
	    			// $scope.showNextPage = true;
	    			listService.setShowNextPage(true);
	    	}
	    	listService.getUsers($scope);
			$scope.usersPerPage = listService.getUsersPerPage();
			$scope.currentPage = listService.getCurrentPage();
			// alert('currentPage: ' + $scope.currentPage);
			$scope.showPrevPage = listService.getShowPrevPage();
			$scope.showNextPage = listService.getShowNextPage();	
	    }

	    $scope.setPage = function(n) {	
	    	// alert("trigger set page function");	 
	    	// $scope.currentPage = n;
	    	listService.setCurrentPage(n);

	    	// console.log($scope.currentPage);
	    	if (n == 0) {
	    		// $scope.showPrevPage = false;
	    		listService.setShowPrevPage(false);
	    		// $scope.showNextPage = true;
	    		listService.setShowNextPage(true);
	    	} else if (n == $scope.pageCount) {
	    		// $scope.showPrevPage = true;
	    		listService.setShowPrevPage(true);
	    		// $scope.showNextPage = false;
	    		listService.setShowNextPage(false);

	    	} else {
	    		// alert(listService.getCurrentPage() + " in set page function");
	    		// $scope.showPrevPage = true;
	    		listService.setShowPrevPage(true);
	    		// $scope.showNextPage = true;
	    		listService.setShowNextPage(true);
	    		// alert(listService.getShowPrevPage());
	    	}	
	    	// $scope.$apply();
	    	listService.getUsers($scope);
			$scope.usersPerPage = listService.getUsersPerPage();
			$scope.currentPage = listService.getCurrentPage();
			$scope.showPrevPage = listService.getShowPrevPage();
			$scope.showNextPage = listService.getShowNextPage();	    	
	    }

	    $scope.sort = function(keyName) {
	    	$scope.sortKey = keyName;
	    	$scope.reverse = !$scope.reverse;
	    }

	    $scope.deleteUser = function(id) {
			// alert(id);
			listService.deleteUser(id);
			// alert(listService.rePagenation());				
			$scope.range = listService.getRange();
			listService.rePagenation();
			// listService.setFlag();
			// alert('flag: ' + listService.getFlag());
			listService.getUsers($scope);
			// alert($scope.users.length);
			$scope.usersPerPage = listService.getUsersPerPage();
			$scope.currentPage = listService.getCurrentPage();
			$scope.showPrevPage = listService.getShowPrevPage();
			$scope.showNextPage = listService.getShowNextPage();

			// $location.path('/index.html');	
		}

	});

	app.controller('createUserController', function($scope, $location, listService) {

	    $scope.saveNewUser = function() {
	    	var user = {};
	    	// $scope.users = users;
	    	// user['id'] = listService.getLength() + 1;
	    	user['fName'] = $scope.fName;
	    	user['lName'] = $scope.lName;
	    	user['title'] = $scope.title;
	    	user['sex'] = $scope.sex;
	    	user['age'] = $scope.age;
	    	// $scope.users.push(user);
	    	// users = $scope.users;
	    	// console.log($scope.users);
	    	listService.addNewUser(user);
	    	listService.rePagenation();
	    	$location.path('/index.html');
	    }
	});

	app.controller('editUserController', function($scope, $location, $routeParams, listService) {


		listService.getUserById($routeParams.userId, $scope);

		$scope.saveEditedUser = function() {

			var user = {};
			// user['id'] = $routeParams.userId;
			user['fName'] = $scope.fName;
			user['lName'] = $scope.lName;
			user['title'] = $scope.title;
			user['sex'] = $scope.sex;
			user['age'] = $scope.age;
			listService.updateUser($routeParams.userId, user);				
			$location.path('/index.html');
		}
	});

	app.filter('offset', function() {
		return function(input, start) {

			return input.slice(start);
		};
	});