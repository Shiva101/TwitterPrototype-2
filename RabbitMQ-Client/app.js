var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , home = require('./routes/home')
  , homepage = require('./routes/homepage')
  , users = require('./routes/users')
  , search = require('./routes/search')
  , follow = require('./routes/follow')
  , path = require('path');

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/Lab2MongoDB";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
//var login = require("./routes/login");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//get requests
app.get('/', routes.index);
app.get('/signin',home.sign_in);
app.get('/signup',home.sign_up);
app.get('/homepage', home.homepage);
app.get('/users/:name', users.userpage); // for random user hyprlink
app.get('/search/:q', search.searchpage); // for tweet search 

//post requests
app.post('/signin', home.after_sign_in);
app.post('/signup', home.after_sign_up);
app.post('/logout',home.logout);
app.post('/profileInfo', homepage.profileInfo);
app.post('/allTweetInfo', homepage.allTweetInfo);
app.post('/postTweet', homepage.postTweet);
app.post('/userTweetInfo', users.userTweetInfo);
app.post('/searchTweetInfo', search.searchTweetInfo);

// edit profile
app.get('/editprofile', home.editprofile);
//app.post('/editprofile', home.editprofile);
//follow stuffs
app.get('/:name/following', follow.followingpage);
app.get('/:name/followers', follow.followerspage);
app.post('/follow', follow.follow);
app.post('/unfollow', follow.unfollow);

//not used 
app.get('/success_login', home.success_login);
app.get('/success_signup', home.sign_in);
app.get('/fail_login', home.fail_login);





//connect to the mongo collection session and then createServer
mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});
