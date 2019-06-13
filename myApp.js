
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(challenge7);
function challenge7(req, res, next){
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
}

// --> 11)  Mount the body-parser middleware  here
var bodyParser = require('body-parser');

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
//app.HttpMethod(path, handler);
/*app.get("/",challenge2);
function challenge2(challenge2, result){
	result.send('Hello Express');
}*/

/** 3) Serve an HTML file */
app.get("/", challenge3);
function challenge3(challenge3, result){
	result.sendFile(__dirname + "/views/index.html");
}

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
//GET retrieves data without modifying anything
app.get("/json", challenge5);
function challenge5(challenge5, result){
	var hi = "Hello json";
	//var environment = process.env.NODE_ENV || 'development';
	//require('dotenv').load();
	
	//console.log(process.env.MESSAGE_STYLE);
	if (process.env.MESSAGE_STYLE == "uppercase"){
		hi = hi.toUpperCase();
	}
	result.json({"message": hi});
}

/** 6) Use the .env file to configure the app */
 
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', function challenge8(req, res, next){
	var d = new Date();
	req.time = d.toString();
	next();
}, function challenge8p2(req, res){
		res.json({"time": req.time});
})

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', challenge9);
function challenge9(challenge9, result){
	result.json({echo: challenge9.params.word});
}

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
//app.route('/name').get(challenge10).post(challenge12);
app.get('/name', challenge10);
function challenge10(challenge10, result){
	result.json({name: challenge10.query.first + ' ' + challenge10.query.last});
}
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({extended: false}));
/*function challenge11(req, res, next){
	bodyParser.urlencoded({extended: false});
	next();
}*/

/** 12) Get data form POST  */
app.post('/name', function (req, res){
	res.json({name: req.body.first + ' ' + req.body.last});
})

/**MongoDb part 1 **/
const mongoose = require('mongodb').MongoClient;
//const uri = "mongodb+srv://SL477:o8zwO6JKFFKapYNM@freecodecampmongodb-wcbbf.mongodb.net/test?retryWrites=true&w=majority";
/*const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/
mongoose.connect(process.env.MONGO_URI);

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
