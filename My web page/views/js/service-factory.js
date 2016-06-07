angular.module('customServices', [])
	.factory('listService', function($http, $q) {
		
		console.log('factory init..');
		var tmpUsers = [];

		var usersPerPage = 5;
		var currentPage = 0;
		var showPrevPage = false;
		var showNextPage;
		var baseUrl = '/api/oprtUsers';

		return {
			getFlag: function() {
				return flag;
			},

			setFlag: function() {
				flag++;
			},

			getUsers: function($scope) {
				// console.log('Begin receiving...');
				// var deferred = $q.defer();				
				$http({
					method: 'GET',
					url: baseUrl					
				}).then(function(res) {
					// alert(res.data);
					console.log(res.data);					
					// deferred.resolve(res.data);
					tmpUsers = res.data;
					$scope.users = res.data;
					// alert('success');
					// return tmpUsers;
				});		
				// console.log('return promise');
				// return deferred.promise;
			},

			getUsersPerPage: function() {
				return usersPerPage;
			},

			setCurrentPage: function(n) {
				currentPage = n;
			},

			getCurrentPage: function() {
				return currentPage;
			},

			setShowPrevPage: function(flag) {
				showPrevPage = flag;
			},

			getShowPrevPage: function() {
				return showPrevPage;
			},

			initShowNextPage: function() {
				if (tmpUsers.length > usersPerPage)
					showNextPage = true;
				else
					showNextPage = false;
			},

			setShowNextPage: function(flag) {
				showNextPage = flag;
			},

			getShowNextPage: function() {
				return showNextPage;
			},

			getRange: function() {
				var numOfPage = Math.ceil(tmpUsers.length / usersPerPage);
		    	var res = [];
		    	
		    	for (var i = 0; i < numOfPage; i++) {
		    		res.push(i);
		    	}
		    	return res;
			},

			getPageCount: function() {
				return Math.ceil(tmpUsers.length / usersPerPage) - 1;
			},

			getLength: function() {
				return tmpUsers.length;
			},

			addNewUser: function(user) {
				// tmpUsers.push(user);
				$http({
					method: 'POST',
					url: baseUrl,
					data: user					
				}).then(function(res) {
					// alert(res.data);
					console.log(res.data);					
					
				});
			}, 

			updateUser: function(id, newUser) {
				
				var urlWithId = baseUrl + '/' + id;
				$http({
					method: 'PUT',
					url: urlWithId,
					data: newUser
				}).then(function(res) {
					console.log(res.data);
				});
			},

			deleteUser: function(id) {

				var urlWithId = baseUrl + '/' + id;
				$http({
					method: 'DELETE',
					url: urlWithId
				}).then(function(res) {
					console.log(res.data);
				});
			},

			rePagenation: function() {
				var curPageCount = Math.ceil(tmpUsers.length / usersPerPage) - 1;
				if (currentPage > curPageCount) {
					currentPage = curPageCount;
					showNextPage = false;
					showPrevPage = true;
				} else if (currentPage == 0) {
					showPrevPage = false;
					if (tmpUsers.length > usersPerPage)
						showNextPage = true;
					else
						showNextPage = false;
				} else if (currentPage == curPageCount && currentPage == 0) {
					showNextPage = false;
					showPrevPage = false;
				} else if (currentPage == curPageCount) {
					showNextPage = false;
					showPrevPage = true;
				} else {
					showNextPage = true;
					showPrevPage = true;
				}

			},

			getUserById: function(id, $scope) {
				
				var urlWithId = baseUrl + '/' + id;
				$http({
					method: 'GET',
					url: urlWithId
				}).then(function(res) {
					console.log(res.data);
					var tmp = res.data;
					$scope.fName = tmp[0].fName;
					$scope.lName = tmp[0].lName;
					$scope.title = tmp[0].title;
					$scope.sex = tmp[0].sex;
					$scope.age = tmp[0].age;
				});
			}

		};
	});