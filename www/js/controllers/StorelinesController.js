(function(){
	angular.module('starter')
	.controller('StorelinesController', ['$http', '$scope', '$state', 'localStorageService', 'SocketService', '$rootScope', StorelinesController]);
	
	function StorelinesController($http, $scope, $state, localStorageService, SocketService, $rootScope){


//CALLBACK WORKS!!!!
		                SocketService.emit('storeName', $scope.dataToSend, function (data) {
											$scope.contacts = data;
							$rootScope.numberofRows = data.length;
		                			});

		
						
										$scope.numberRows = function(){
		                SocketService.emit('lineNumber', $scope.dataToSend, function (data) {
							console.log('THIS SHOWS THE NUMBER OF LINES ' +data );
								var b = parseInt("data")
								console.log (b);
		                			});
						}
						

						
					$rootScope.exampleLine = "Walmart";
					
					
		//	This is copy of above that needs to be fixed so that it 1)Counts rows
		 //		2) On success makes adds a http function that adds another line to Storelines
		 	
				$scope.numberStuff = function(){
				//	console.log("Number of Rows " + $scope.numberofRows);
					$http.post('/user/lineNumber', {"store" : $scope.exampleLine }).success(function( data)
						 {
						 	//$scope.contacts = data;
							console.log('THIS SHOWS THE NUMBER OF LINES ' +data );
							
							$rootScope.lineNum = data;
							console.log('DATA LENGTH' + (data.length+1))
							addLineFunction();
							
							
							}, function(posts) {});
						}
						
						
						
			
/*
	function addLineFunction() {
	$http.post('/user/addLine', {"store" : $scope.exampleLine, "linein" : $scope.numberofRows  }).success(function(data)
		 {
		 	
		 	$scope.contacts = data;
			console.log('THIS SHOWS THE NUMBER OF LINES ' +data );
			console.log(data)
			myData22()
			}, function(posts) {});

	}
	*/
	
	
						function addLineFunction() {
											
							 SocketService.emit('addLine', {"store" : $scope.exampleLine, "linein" : $scope.numberofRows  }, function (data) {
						 	$scope.contacts = data;
							console.log('THIS SHOWS THE NUMBER OF LINES ' +data );
							console.log(data)
							myData22()
		                			});

					}


			
					function myData22(){
						
					 SocketService.emit('storeName', { }, function (data) {
						 	$scope.contacts = data;
		                			});
}
			
			
			
			
			
			
						var $index;
						var contact;
						
						
						var fruits = ["Banana", "Orange", "Apple", "Mango"];
						console.log(fruits.length);
			
						
				$scope.grabStuff = function(contact){
							console.log("LineIn " + contact);
							
						$rootScope.grabLineIn = contact;
						console.log ("LineIn Saved in variable: " + $scope.grabLineIn);
					}






	}

})();