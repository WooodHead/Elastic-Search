var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        
var router = express.Router();              


//var test = require('./app/search.js').test,
var foo = require('./app/search.js');


router.get('/', function(req, res) {
    //res.json(res);
    console.log("weeeee");
    //res.json(foo.test());
    foo.test(function(response){
    	//console.log(response);
    	res.json(response);
  	});
    //res.json(response);
    //console.log("Adding %d to 10 gives us %d", foo.test());
    //console.log(foo);
    //res.json({ message: 'hooray! welcome to our api!' });   
});


app.use('/api', router);


app.listen(port);
