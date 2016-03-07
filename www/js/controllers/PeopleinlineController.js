(function(){
	angular.module('starter')
	.controller('PeopleinlineController', ['$http', '$scope', '$state', 'localStorageService', 'SocketService', '$location', PeopleinlineController]);
	
	function PeopleinlineController($http, $scope, $state, localStorageService, SocketService, $location){

			//	$http.post('http://localhost:3001/confirm').success(function( data) { }, function(posts) {});



	
					console.log ("LineIn NEEDS TO BE SEARCHED: " + $scope.grabLineIn);

console.log ('Name' +$scope.name)
console.log('Email' +$scope.useremail);

//Searches Storeline db for Walmart Store and finds people in line		
					/*
						$http.post('/user/peopleLine', { }).success(function( data)
						 {$scope.contacts = data;
							console.log (data);
							}, function(posts) {});
			*/
	
//Searchs through Information db for people
							//$http.get('/user/postinfo').success(function( data) {$scope.userstuff = data}, function(posts) {});
						   
						   
						     SocketService.emit('postinfo');


		SocketService.on('gotPeople', function(data){
console.log('GotPeople');
console.log(data)
//$scope.userstuff = data
$scope.userstuff = JSON.parse(data)

	});

//Button that goes to the Storelines Page	
					$scope.otherPage = function(){
						$location.path('/storelines');
						console.log ("Moved page ");
					}

//Delete the specifc line in the table that the button is in:	
/*		
$scope.deleted = function(contact){
	console.log('Name in Line' + contact);
	$rootScope.nameDelete = contact;
console.log ('Name' + $scope.nameDelete)


   	$http.post('/user/deleteName', {"name": $scope.nameDelete}).success(function( ) {
   		  console.log("deleted");
   		  $route.reload();
       		  
  }, function(posts) {});

    };
    */
				    $scope.deletedPeople = function(contact){
					    	console.log('Name in Line' + contact);
					    	$rootScope.nameDelete = contact;
						console.log ('Name' + $scope.nameDelete)

					     SocketService.emit('postinfo', {"name": $scope.nameDelete});
				       		  $route.reload();

						    };

			
//Person name is grabbed:			
$scope.grabName = function(contact){
			console.log("Name " + contact);
	
$rootScope.grabPeopleName = contact;
console.log ("LineName  in variable: " + $scope.grabPeopleName);
//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
}
						
		/*	
//		This is NOT in the peopleinline	
   $scope.changeStatus30 = function(){
		console.log("clicked");

$http.post('/user/postinfo30', 
{ "store": $scope.store })
		.success(function( data) {
		$scope.contacts = data;
		console.log (data);
	}, function(posts) {});

}
*/
							   $scope.changeStatus30 = function(){
									console.log("clicked");
							
				  SocketService.emit('postinfo30', {"store": $scope.store});

									$scope.contacts = data;
									console.log (data);

							$http.post('/user/postinfo30', 
							{ "store": $scope.store })
									.success(function( data) {
									//$scope.contacts = data;
									$scope.userstuff = JSON.parse(data)

									console.log (data);
								}, function(posts) {});
							
							}
					
	//Places a name in the database to add to the Lineup                  $rootScope.name
	//THIS IS WHERE the user who has the app needs to be add there name to it...	
	/*	
  $scope.submitName = function(){
		      //  contacts.set($scope.contact);
$http.post('/user/postinfo', {
		    name: $scope.name,
			  email: $scope.useremail,
			

		}).success(function() {
			console.log('Post success');
		//	$location.path('/login');
$route.reload();
  //$location.path('/'); // This works as expected, if path != current_path

		}).error(function() {
			console.log('Post failure');
		});
		$scope.SendUserData = '';

	        $scope.contact = null;
	        $scope.added = true;
    };
		*/	

				      $scope.submitName = function(){
				  SocketService.emit('postinfo', {"stoer": $scope.name, "email": $scope.username});
			
									$route.reload();

						    };


	}

})();