var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var paginate = require('express-paginate');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(paginate.middleware(10, 50));

var port = process.env.PORT || 8080;        
var router = express.Router();              
var foo = require('./app/search.js');

//the params are page and limit
//to test run ex:http://localhost:8080/api?limit=5&page=1
router.get('/', function(req, res) {
    foo.test(req.query.page,req.query.limit,function(response){
    	res.json(response);
  	});
});
app.use('/api', router);
app.listen(port);






