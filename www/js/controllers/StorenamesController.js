(function(){
	angular.module('starter')
	.controller('StorenamesController', ['$http', '$scope', '$state', 'localStorageService', 'SocketService', '$rootScope', StorenamesController]);
	
	function StorenamesController($http, $scope, $state, localStorageService, SocketService, $rootScope){

/*
 * 				SocketService.emit('postinfo25', { "postal": $scope.postal2 }, function (data) {

 * 		FOR SOCKETS YOU USE  data.postal [see above] to get the data on the backend, 
 * 		but for REST commands you use req.body.postal to get data
 * 
 * 		-you dont have to json data to send to frontend to get it to work
 * 		-if you json on backend, you need to json on frontend: 		$scope.userstuff = JSON.parse(data);
		-if you dont json, then just use 						$scope.userstuff = data;


solved the problem of passing data back with req [like for login/register] you can just use sockets/callbacks
 */


							postal123 =null;
							$scope.store = "Walmart";
						//	$scope.postalcodetoAdd = "postal123";

					
						  // wire up button click
					$(document).ready(function () {
						  // wire up button click
						 // $('#go').click(function () {
						    // test for presence of geolocation
						    if(navigator && navigator.geolocation) {
						      // make the request for the user's position
						      navigator.geolocation.getCurrentPosition(geo_success, geo_error);
						    } else {
						      // use MaxMind IP to location API fallback
						      printAddress(geoip_latitude(), geoip_longitude(), true);
						    }
					 //     });
					 });
								 
						 
	function geo_success(position) {
				  printAddress(position.coords.latitude, position.coords.longitude);
				}
				 
	function geo_error(err) {
				  // instead of displaying an error, fall back to MaxMind IP to location library
				  printAddress(geoip_latitude(), geoip_longitude(), true);
				}
						 
						// use Google Maps API to reverse geocode our location
	function printAddress(latitude, longitude, isMaxMind) {
				    // set up the Geocoder object
						    var geocoder = new google.maps.Geocoder();
						 
				    // turn coordinates into an object
				    var yourLocation = new google.maps.LatLng(latitude, longitude);
				 
				    // find out info about our location
				    geocoder.geocode({ 'latLng': yourLocation }, function (results, status) {
				    if(status == google.maps.GeocoderStatus.OK) {
				      if(results[0]) {
				        $('#results').fadeOut(function() {
				          $(this).html('<p><b>Abracadabra!</b> My guess is:</p><p><em>' + results[0].formatted_address  +  '</em></p>').fadeIn();
				         
				                     var searchAddressComponents = results[0].address_components,
				    searchPostalCode="";

					$.each(searchAddressComponents, function(){
					    if(this.types[0]=="postal_code"){
					        searchPostalCode=this.short_name;
					        console.log(searchPostalCode);
					        $rootScope.postal123 = searchPostalCode;
					            //   console.log("Postal code" + searchPostalCode);
					    //  $scope.postalcodetoAdd = postal123;

					var newpostalcode = searchPostalCode.substr(0, searchPostalCode.length-4);
					console.log('newpostal' + newpostalcode);
					$rootScope.postal2 = newpostalcode;
					
					    }
					});
					
				SocketService.emit('postinfo25', { "postal": $scope.postal2 }, function (data) {
											$scope.contacts = data;
											console.log (data);
		                			});

					
					          console.log('formatted_address' + results[0].formatted_address);
					        })
					      } else {
					        error('Google did not return any results.');
					      }
					    } else {
					      error("Reverse Geocoding failed due to: " + status);
					    }
					  });
					  
					  
					  					 
					 
							  // if we used MaxMind for location, add attribution link
							  if(isMaxMind) {
							    $('body').append('<p><a href="http://www.maxmind.com" target="_blank">IP to Location Service Provided by MaxMind</a></p>');
							  }
							}
								 
					function error(msg) {
					  alert(msg);
					}
								
//Posts Store name to SEARCH for in table			
				   $scope.changeStatus30 = function(){
				   	
				SocketService.emit('postinfo30', { "store": $scope.store }, function (data) {
							$scope.contacts = data;
							console.log (data);
    			});
					}
			
//Grabs Storename to pass to next page			
				$scope.grabStuff = function(contact){
							console.log("Name of Store " + contact);
							
						$rootScope.grabStorename = contact;
						console.log ("Name of Store variable: " + $scope.grabStorename);
						//THEREFORE USE $scope.grabLineIn to pass the vaariable to the next page:
					}
			
//Posts New Store Name....BUT does not post address


				      $scope.submitName = function(){
				      	
			   SocketService.emit('postStore', {"store": $scope.storetoAdd }, function (data) {
						console.log($scope.storetoAdd)
				console.log('success')
    			});

						    };

					     //   $rootScope.postal123 = searchPostalCode;


		 $scope.submitInformation = function(){
		 	
			   SocketService.emit('storePostalcode', {"store": $scope.storetoAdd, "postal": $scope.postal123}, function (data) {
							console.log('Post success');
							console.log($scope.storetoAdd)
							
					console.log('success')
    			});
						    };


	}

})();