(function(){

angular.module('starter')
.factory('AuthService', ['$q', '$timeout', '$http', '$rootScope', 'SocketService', Services]);
  function Services ($q, $timeout, $http, $rootScope, SocketService, Services) {

    // create user variable
    var user = null;

    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      confirm: confirm,
      checkStuff: checkStuff
    });

    function isLoggedIn() {
        if(user) {
          return true;
        } else {
          return false;
        }
    }
    
    /*
        var user2 = null;

    function isLoggedIn2() {
        if(user2) {
          return true;
        } else {
          return false;

        }
    }
*/

    function getUserStatus() {
      return user;
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }
    
   

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }
    
    
        function postLogin(username) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login', {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    
    
        function checkStuff() {
console.log('BLOCK');
			SocketService.emit('testing');

      // send a post request to the server
    //  $http.post('http://localhost:3001/confirm').success(function( data) { }, function(posts) {});


    }

/*
 * TO MAKE THIS LOGIN FROM SOCKETS WORK:
 * HAVE A FUNCITON CALL LOGIN FROM SOCKET IN NODE BACKEND IN REGUALR CONTROLLER [IE. HOMECONTROLLER] 
 * THEN USE SOCKETSERVICE.ON TO GET CALL BACK THAT WILL CALL FUNCITON IN SERVICES TO TURN USER = TRUE;
 */
				SocketService.on('echo3', function (data) {
		              //  $scope.serverResponse3 = data;
		                // $scope.serverResponse4 = data.data1;

		                        console.log('Socket ON');
		            });

    
    
        function confirm() {

    $http.get('/confirm-login')
        .success(function (data) {
        	            if (data) {
        	            	            user2 = true;
console.log(user2);
        	     	console.log("FFFFFFFFFFFFFFFFFFFFFFF"+data.username);
        	     	console.log(data);

                $rootScope.userdata = data;

                $rootScope.useremail = data.facebook.email;
                $rootScope.name = data.facebook.displayName;
                $rootScope.id = data._id;
                $rootScope.token = data.facebook.token;

              // var dog = JSON.parse(user);
               // console.log('Userdata' + user);
                                console.log('data.username: ' + data.username);
                               // console.log('Userdata' + data);
                                console.log('_id: ' + data._id);
                                console.log('fbid: ' + data.facebook.fbid);
			                    console.log('displayName: ' + data.displayName);
                                console.log('Facebook.email: ' + data.facebook.email);
                                 console.log('Facebook.displayName: ' + data.facebook.displayName);
                                 console.log('Facebook.token: ' + data.facebook.token);
		// use req.data.destroy or $rootScope.useremail = ""; OR $scope.useremail = "";
            }
		
              });
    }

/*
 * 1.Facebook button 
 */

}
})();