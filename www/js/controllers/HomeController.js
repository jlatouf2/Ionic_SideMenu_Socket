(function(){
	angular.module('starter')
	.controller('HomeController', ['$http', '$scope', '$state', 'localStorageService', 'SocketService', HomeController]);
	
	function HomeController($http, $scope, $state, localStorageService, SocketService){

				//$http.post('http://localhost:3001/confirm').success(function( data) { }, function(posts) {});

		var me = this;

		me.current_room = localStorageService.get('room');
		me.rooms = ['Coding', 'Art', 'Writing', 'Travel', 'Business', 'Photography'];
		

		$scope.login = function(username){
			localStorageService.set('username', username);
			$state.go('rooms');
		};

		$scope.enter = function(){
			$state.go('register');
			console.log("logout")
		};
		$scope.testing = function(){
console.log('THIS WORKS!')
				$http.post('http://localhost:3001/confirm').success(function( data) { }, function(posts) {});
		
		};
		
		//IT WORKS!!!!
		$scope.testing2 = function(){
			SocketService.emit('testing');
			console.log("Button");
		
		};
		
		SocketService.on('message22', function(msg){
console.log('loffign');

	});

		

		$scope.passedName = function(){
			console.log("Button");
			
			     SocketService.emit('passName', {body: '$scope.SendUserData3'});
		};

		/*
					SocketService.emit('join:room', room);

		$scope.passedName = function(){
			var name = "bob";
						//			var name = $scope.SendUserData;

			//SocketService.emit('passName', name);
			console.log("Button");
			
			     SocketService.emit('passName', {body: '$scope.SendUserData3'});
						//	SocketService.emit('join:room', room);
						
	  //   $socket.emit('postedinfo', {body: $scope.SendUserData3});
		};


					SocketService.on('message', function(msg){
console.log('loffign');


	});


	socket.on('join:room', function(data){
		var room_name = data.room_name;
		socket.join(room_name);
		console.log(data);
		console.log("WORKED!");
	});
*/
				 $scope.submitInformation = function(){
						$http.post('/user/storePostalcode', 
							{"store": $scope.storetoAdd, "postal": $scope.postal123}).
							success(function() {
							console.log('Post success');
							console.log($scope.storetoAdd)
							
					console.log('success')
								}).error(function() {
									console.log('Post failure');
								});
						    };
	  //   $socket.emit('postedinfo', { username : $scope.SendUserData2, body: $scope.SendUserData3});



		$scope.enterRoom = function(room_name){

			me.current_room = room_name;
			localStorageService.set('room', room_name);
			
			var room = {
				'room_name': room_name
			};

			SocketService.emit('join:room', room);

			$state.go('room');
		};

	}

})();