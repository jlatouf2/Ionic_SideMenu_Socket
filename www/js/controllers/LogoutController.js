(function(){
	angular.module('starter')
	.controller('LogoutController', ['$http', '$scope', '$state', 'localStorageService', 'SocketService', '$location', 'AuthService',  '$rootScope', LogoutController]);
	
	function LogoutController($http, $scope, $state, localStorageService, SocketService, $location, AuthService, $rootScope ){

			//	$http.post('http://localhost:3001/confirm').success(function( data) { }, function(posts) {});

		
		$scope.testing = function(){
console.log('THIS WORKS!')
				$http.post('http://localhost:3001/confirm').success(function( data) { }, function(posts) {});
		};

		$scope.enter = function(){
			$state.go('rooms');
		};

		$scope.seeFunc = function(){
				AuthService.checkStuff()
						
		};
		
		$scope.sock = function(){
			SocketService.emit('testing');
		};


		$scope.logout = function() {
						
								console.log(AuthService.getUserStatus());
				
				//Delete Store Variables:
			                $rootScope.useremail = '';
			                $rootScope.name = '';
			                $rootScope.id = '';
			                $rootScope.token = '';
			
								// call logout from service
								AuthService.logout().then(function() {
									                $rootScope.userdata = null;
									$location.path('/login');
								});
						
							};
						
							$scope.facebooklogout = function() {
			
								$http.get('/logout333', {
							
								}).success(function() {
									console.log('Logout Success');
									
								}).error(function() {
									console.log('Logout failure');
								});
			
							};
			


	}

})();