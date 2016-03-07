(function(){
	angular.module('starter')
	.controller('RegisterController', ['$http', '$scope', '$state', 'localStorageService', 'SocketService', RegisterController]);
	
	function RegisterController($http, $scope, $state, localStorageService, SocketService){


		
		$scope.testing = function(){
console.log('THIS WORKS!')
				$http.post('http://localhost:3001/confirm').success(function( data) { }, function(posts) {});
		};

		$scope.enter = function(){
			$state.go('rooms');
		};


	}

})();