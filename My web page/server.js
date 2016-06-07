var express = require('express');
var path = require('path');
var User = require('./model/users');

var app = express();

var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('//Remote mongodb link');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var urlencodedParser = bodyParser.urlencoded({ extended: false });
// var jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '/views')));
// app.use(express.urlencoded());
// app.use(express.json());

var router = express.Router();

// app.get('/getusers', function(req, res) {
// 	// console.log(users);
// 	console.log('Get users');
// 	res.json(users);
// });

router.get('/', function(req, res) {
	console.log('Home page');
	res.sendFile('./views/index.html');
});

router.route('/oprtUsers')
	.get(function(req, res) {
		// console.log('In route oprtUsers, method get');
		// res.json(users);
		User.find({}, function(err, users) {
			if (err)
				console.log(err);
			res.json(users);
		});
	})

	.post(function(req, res) {
		console.log('enter oprtUsers post');
		// console.log('show data:' + req.body.fName);
		User.count({}, function(err, count) {
			if (err)
				console.log(err);

			var user = new User();

			user.id = count + 1;
			user.fName = req.body.fName;
			user.lName = req.body.lName;
			user.title = req.body.title;
			user.sex = req.body.sex;
			user.age = req.body.age;
			console.log(user);

			user.save(function(err) {
				if (err)
					console.log(err);
				res.json({message : "Save success"});
			});
		});
		
	});

router.route('/oprtUsers/:id')
	.get(function(req, res) {
		
		// console.log('req param id: ' + req.params.id);
		User.find({id : req.params.id}, function(err, user) {
			if (err)
				console.log(err);
			console.log(user);
			res.json(user);
		});
	})

	.put(function(req, res) {
		
		User.findOneAndUpdate(
			{
				id : req.params.id
			},

			{ $set: { fName : req.body.fName, 
					  lName : req.body.lName,
					  title : req.body.title,
					  sex : req.body.sex,
					  age : req.body.age 
					} 
			}, 

			function(err) {
				if (err)
					console.log(err);
				res.json({ message : 'Updated success' });
			}
		);
	})

	.delete(function(req, res) {
		
		User.findOneAndRemove(
			{
				id : req.params.id
			},

			function(err) {
				if (err)
					console.log(err);
				res.json({ message : 'Delete success' });
			}
		);
	});
// app.get('*', function(req, res) {
// 	res.sendFile('./views/index.html');
// });
app.use('/api', router);
console.log('server init..');

app.listen(8080, function() {
	console.log('listening 8080..');	
});

// console.log(__dirname);