// dependencies
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    localStrategy = require('passport-local' ).Strategy;

 
 var io = require('socket.io')(3000);

var app = express();
var http = require('http');
var port = 3001;
var httpServer = http.Server(app);

 httpServer.listen(port, function(){
    console.log('Express server listening on port ' + httpServer.address().port);

});

// mongoose
mongoose.connect('mongodb://localhost/mean-auth-goodapp');

// user schema/model
var User = require('./models/user.js');
var Post = require('./models/post.js');
var Store = require('./models/storelocation.js');

app.post('/confirm', function (req, res) {
console.log('djsflksjflksjdlkjlfsjldksjflksdjfldskfjdsl!')	
    });


// require routes
var routes = require('./routes/api.js');

// define middleware
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// configure passport
passport.use(new localStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

	passport.serializeUser(function(user, done) {
		done(null, user.id);
		console.log('LSKDFJLSKJDFLKSJLDFKJSLKFJDSLJFFFFFFFFFFFFFFFFFFF' +user)
	//	console.log('LSKDFJLSKJDFLKSJLDFKJSLKFJDSLJFFFFFFFFFFFFFFFFFFF' +req.session.passport.user)

		 	//	req.session.passport.user

		/*
		 * to solve issue of having userdata variable be on when you save user info with seralization:
		 * go to a new page ang user $rootScope.userdata = data; there.
		 */
	});

	passport.deserializeUser(function(id, done) {
		User.findOne(
			{_id: id},
			'-password',
			function(err, user) {
				done(err, user);
			}
		);
	});

/*
app.use(session({
  store: new RedisStore({
    client: redis
  }),
  secret: 's3cret',
  resave: true,
  saveUninitialized: true
}));
*/


app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));


app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/index.html' }),
        function(req, res) {
            res.redirect('/#/register');
app.get('/confirm-login');
	/*
	    //     user : req.user // get the user out of session and pass to template
         //	sess=req.session;	
	//sess.data=req.user;

            res.cookie('userblog', JSON.stringify({
        'username': user
        //'role': role

	 */
        });
        
        /*
         * to coordinate facebook login with regular login using passport (determine if use is logged in already)
         * just make sure that facebook login button checks for something like userId or name before going to the
         * href ="facebook/login" part of the link.....
         * THIS WILL WORK!
         */

passport.use(new FacebookStrategy({
            clientID: '1508673329451547',
            clientSecret: 'c42fb352fa1a185823ddd34f6267551c',
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'link',  'photos', 'emails']

        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
          //     User.findOne({'facebook.id' : profile.id, 'facebook.name' : profile.name, 'facebook.email' : profile.email}, function (err, user) {
         User.findOne({'facebook.email' : profile.email}, function (err, user) {

                    console.log(profile);
                    if (err) return done(err);
                    if (user) {
                     return   done(null, user);
                    } else {
                        var newUser = new User();
  newUser.username = profile.emails[0].value;
                        newUser.facebook.token = accessToken;
                        newUser.facebookprofileUrl = profile.profileUrl;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.fbid = profile.id;
                        newUser.facebook.displayName = profile.displayName;
                        newUser.firstname =profile.name.givenName;
                        newUser.lastname=profile.name.familyName;
                                       console.log('ACCESSTOKEN' + accessToken) 
                                   console.log('EMAIL' + profile.emails[0].value)       	  
      	  /*
      	   * IF SOMETHING IS WRONG: TURN ALL newUser back to user
      	   */
                           newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                    }
                });
            });
        }
    ));



app.get('/confirm-login', function (req, res) {
	user = req.user
	res.send(user);
	
    });








app.get('/logout333', function(req, res, sess) {
        req.logout();
       // sess.destroy
        //       delete req.sess; // delete the password from the session
      //  req.sess = user;  //refresh the session value

        res.redirect('/');
    });



// routes
app.use('/user/', routes);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// error hndlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});






io.on('connection', function(socket){

	socket.on('join:room', function(data){
		var room_name = data.room_name;
		socket.join(room_name);
		console.log(data);
		console.log("WORKED!");
	});


	socket.on('leave:room', function(msg){
		msg.text = msg.user + ' has left the room';
		socket.leave(msg.room);
		socket.in(msg.room).emit('message', msg);
				console.log("WORKED 2222!");

	});


	socket.on('send:message', function(msg){
		socket.in(msg.room).emit('message', msg);
				console.log("WORKED 33333!");

	});

	socket.on('testing', function(){
				console.log("WORKED 1111!");
			socket.emit('message22');

	});
	
		socket.on('passName', function(data){
				console.log("WORKED 44444!");
				
				console.log(data);
console.log(data.body);

	});



	socket.on('testing2', function(){
	User.register(new User({
		username : req.body.username
	}), req.body.password, function(err, account) {
		if (err) {
			return res.status(500).json({
				err : err
			});
		}
		passport.authenticate('local')(req, res, function() {
			return res.status(200).json({
				status : 'Registration successful!'
			});
		});
	});

	});

/*
 *  1) Add callbacks
 * 	2) for each res.status response add a socket.on event on login controller page that corresponds with it
 * 	3) for login successful, pass callback() that is successful
 */

socket.on('login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
	if (err) {
	return res.status(500).json({err: err});
	/*
			SocketService.emit('testing'); to Services page with pass all data in 
	 */
	}
	if (!user) {
	return res.status(401).json({err: info});
	}
	req.logIn(user, function(err) {
	if (err) {
	return res.status(500).json({err: 'Could not log in user'});
	}
	res.status(200).json({status: 'Login successful!'});
	});
	})(req, res, next);

	
	
});



/*
 * PEOPLEINLINE
 */

socket.on('postinfo', function(req, res, next) {

//Info.find({name: 'John'}, {_id:0, __v:0})
Info.find()
  .sort('-date')
  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);
		
					console.log(black );    
	socket.emit('gotPeople', black);
//res.send(black)
//res.json(posts)
	console.log(black );

  })

});

socket.on('deleteName', function(req, res, next) {

//Info.find({name: 'John'}, {_id:0, __v:0})
//db.inventory.remove( { type : "food" } )
bob1 = req.body.name
console.log('blacky' + bob1);

//Info.remove ({ name : "Jacob Latouf22"})
Info.remove ({ name : new RegExp(bob1)})

  .sort('-date')
  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);
       
	socket.emit('deletePeople', black);

//res.send(black)
//res.json(posts)
	console.log(black );

  })
});

socket.on('postinfo30', function(req, res, next) {
//Store.find({postal: 'N9J3J6'})
bob1 = req.body.store
console.log(bob1);
 

Store.find({"store": new RegExp(bob1)})

  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);
       
	socket.emit('deletePeople', black);

//res.send(black)
//res.json(posts)
	console.log(black );
	console.log(posts );

  })
})


/*
 * Storelines
 */

		socket.on('storeName', function (data, callback, next) {
Storeline.find({store: 'Walmart'})
  .exec(function(err, posts) {
    if (err) { return next(err) }
       	  callback(posts);
	console.log(posts );
  })
})



		socket.on('lineNumber', function (data, callback, next) {
Storeline.count({store: 'Walmart'})
  .exec(function(err, posts) {
    if (err) { return next(err) }
       	  callback(posts);
	console.log(posts );
  })
})


		socket.on('lineNumber', function (data, callback, next) {

 bob1 = req.body.store
 console.log(bob1);
//Storeline.count({store: 'Walmart'})
  var storestuff = new Storeline({
	linein: req.body.linein,
	store: req.body.store,

  })
  storestuff.save(function (err, post) {
    if (err) { return next(err) }
  //  res.json(201, post)
       	  callback(post);

console.log('worked')
console.log(post)

  })
})

/*
 * STOERNAMES CONTROLLERS
 */

socket.on('postinfo25', function (data, callback, next) {
//bob1 = req.body.postal
bob1 = data.postal
console.log(bob1);
bob2 = "N9J";
bob = /N9J/

Store.find({"postal": new RegExp(bob1)})

  .exec(function(err, posts) {
    if (err) { return next(err) }
       	  callback(posts);

	console.log(posts );

  })
})
socket.on('postinfo30', function (data, callback, next) {

//Store.find({postal: 'N9J3J6'})
bob1 = req.body.store
console.log(bob1);
Store.find({"store": new RegExp(bob1)})

  .exec(function(err, posts) {
    if (err) { return next(err) }
callback(posts)
	console.log(posts );

  })
})

socket.on('postStore', function (data, callback, next) {
  var store = new Store({
  store: req.body.store,
  })
  store.save(function (err, post) {
    if (err) { return next(err) }
callback(post)
console.log(post)
  })
})

socket.on('storePostalcode', function (data, callback, next) {
  var store = new Store({
  store: req.body.store,
  postal: req.body.postal,
  })
  store.save(function (err, post) {
    if (err) { return next(err) }
callback(post)
console.log(post)
  })
})


});
 
 