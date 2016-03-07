var express = require('express'), router = express.Router(), passport = require('passport');
User = require('../models/user.js');
Post = require('../models/post.js')
Info = require('../models/info.js')
Store = require('../models/storelocation.js')
Storeline = require('../models/storeline.js')
Track = require('../models/trackPosition.js')

var app = express();

router.post('/register', function(req, res) {
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

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
	if (err) {
	return res.status(500).json({err: err});
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

router.post('/different', function(req, res) {
	User.register(new User({
		username : req.body.username
	}), function(err, account) {
		if (err) {
		}


	});
});

router.post('/posting', function() {
	console.log('It worked!');
	var username = "blacky";
});


router.post('/posted', function (req, res, next) {
  var post = new Post({
    username: req.body.username,
    body: req.body.body
  })
  post.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
  })
})

router.post('/postinfo', function (req, res, next) {
  var info = new Info({
  name: req.body.name,
  email: req.body.email,
  phone: req.body.phone,
  website: req.body.website,
  address: req.body.address,
  notes: req.body.notes

  })
  info.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
  })
})


router.get('/posts2', function (req, res, next) {
Post.find({username: 'DeclanProud'}, {_id:0, __v:0})

  .sort('-date')
  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);

res.send(black)
//res.json(posts)
	console.log(black );

  })
})

router.get('/postinfo', function (req, res, next) {
//Info.find({name: 'John'}, {_id:0, __v:0})
Info.find()
  .sort('-date')
  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);

res.send(black)
//res.json(posts)
	console.log(black );

  })
})


router.get('/getCords', function (req, res, next) {

Track.find()
 // .sort('-date')
  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);

res.send(black)
//res.json(posts)
	console.log(black );

  })
})




router.post('/postinfo25', function (req, res, next) {
//Store.find({postal: 'N9J3J6'})

//THIS ALLOWS YOU TO SEARCH FOR PARTICULAR STRING:  Store.find({postal: /N9J/})
//Store.find({postal: /N9J/})

bob1 = req.body.postal
console.log(bob1);
bob2 = "N9J";
bob = /N9J/
//bob1 = /bob/;

//Store.find({"postal": /.*bob.*/})
      
//db.inventory.find( { 'ratings.0': 5 } )
//Store.find({ postal: "N9J3J6" })

//Store.find( { "postal": "N9J3J6", "$**": "text" } )
 

Store.find({"postal": new RegExp(bob1)})

  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);

res.send(black)
//res.json(posts)
	console.log(black );
	console.log(posts );

  })
})


router.post('/postCord', function (req, res, next) {

bob1 = req.body.store
console.log(bob1);
 

Track.find({"store": new RegExp(bob1)})

  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);

res.send(black)
//res.json(posts)
	console.log(black );
	console.log(posts );

  })
})




router.post('/postStore', function (req, res, next) {
  var store = new Store({
  store: req.body.store,

//  email: req.body.email,

  })
  store.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
console.log('worked')
  })
})

router.post('/storePostalcode', function (req, res, next) {
  var store = new Store({
  store: req.body.store,
  postal: req.body.postal,

//  email: req.body.email,

  })
  store.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
console.log('worked')
  })
})




router.post('/postCoordinates', function (req, res, next) {
  var track = new Track({
  username: req.body.username,
  latitude: req.body.latitude,
  longitude: req.body.longitude,
  distance: req.body.distance,
//  email: req.body.email,

  })
  track.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
console.log('worked')
  })
})


router.post('/postinfo30', function (req, res, next) {
//Store.find({postal: 'N9J3J6'})
bob1 = req.body.store
console.log(bob1);
 

Store.find({"store": new RegExp(bob1)})

  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);

res.send(black)
//res.json(posts)
	console.log(black );
	console.log(posts );

  })
})

router.post('/storeName', function (req, res, next) {
//Storeline.find({store: 'Walmart'})
//bob1 = req.body.store
//console.log(bob1);
//Store.find({"store": new RegExp(bob1)})

/*
 * This will find the storename that is passed to backend that is not Walmart:
 bob1 = req.body.store
 Store.find({"store": new RegExp(bob1)})
 */

Storeline.find({store: 'Walmart'})

  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);

res.send(black)
//res.json(posts)
	console.log(black );
	console.log(posts );

  })
})




router.post('/lineNumber', function (req, res, next) {
//db.collection.count

/*
 * *****TO DETERMINE LINE COUNT ALL YOU HAVE TO DO IS COUNT THE NUMBER OF TIMES THE STORE NAME IS STORED
 IN THE DATABASE......
 */

Storeline.count({store: 'Walmart'})

  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);

res.send(black)
//res.json(posts)
	console.log(black );
	console.log(posts );

  })
})


router.post('/addLine', function (req, res, next) {
 bob1 = req.body.store
 console.log(bob1);
//Storeline.count({store: 'Walmart'})
  var storestuff = new Storeline({
	linein: req.body.linein,
	store: req.body.store,

  })
  storestuff.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
console.log('worked')
  })
})


router.post('/postCoordinates', function (req, res, next) {
  var track = new Track({
  username: req.body.username,
  latitude: req.body.latitude,
  longitude: req.body.longitude,
  distance: req.body.distance,
//  email: req.body.email,

  })
  track.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
console.log('worked')
  })
})





router.post('/peopleLine', function (req, res, next) {

Storeline.find({store: 'Walmart'})

  .exec(function(err, posts) {
    if (err) { return next(err) }
       var black = JSON.stringify(posts);

res.send(black)
//res.json(posts)
	console.log(black );
	console.log(posts );

  })
})

router.post('/deleteName', function (req, res, next) {
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

res.send(black)
//res.json(posts)
	console.log(black );

  })
})


router.post('/poststoreinfo', function (req, res, next) {
  var storeline = new Storeline({
			    post_id: '1',
			    linein: 'Line1',
				line1 : '1',
				line2 : '0',
				line3 : '0',
				store: 'Walmart'


  })
  storeline.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
	console.log(posts );

  })
})


/*
router.post('/postinfo25', function (req, res, next) {
  var store = new Store({
					    post_id: '5',
						  longitude: '22'

  })
  store.save(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
  })
})
*/

router.get('/confirm-login', function (req, res) {
        res.send(req.user)
        console.log('confirm');
    }
);


router.get('/logout', function(req, res) {

	req.logout();
	res.status(200).json({
		status : 'Bye!'
	});
});



module.exports = router; 