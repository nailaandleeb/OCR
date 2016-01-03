var path = require('path');
var http = require('http');
var express = require('express');
var Resource = require('express-resource');
var bodyParser= require('body-parser');
var methodOverride= require('method-override');
var  multer  = require('multer');
fs=require('fs');
dv=require('dv');
fv=require('fv');


app = express();
//app.use(express.static('../client'));
    //app.use(bodyParser.json());  
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(methodOverride());



	var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
			console.log("entering in storage");
		cb(null, './files')
        },
        filename: function (req, file, cb) {
			var datetimestamp = Date.now();
			cb(null,'image2.jpg');
        }
    });
	upload = multer({ //multer settings
                    storage: storage
				}).single('file');
				 
				


	
//sql=require('./sql.js');
var apidata=require('./controllers/apidata.js');
var apidata2=app.resource("apidata",apidata);

var def1=require('./controllers/default.js');
var def2=app.resource(def1);
def2.map('POST','/:id',def1.api);
app.use(express.static(__dirname + '/sheets'));
db="";
var waterlineConfig = require('./config/waterline')
, waterlineOrm = require('./init/models').waterlineOrm;
var modelPath = path.join(__dirname, '/models');
require('./init/models')(modelPath);
console.log("\n\nWait...!!  Server will be started very soon");
waterlineOrm.initialize(waterlineConfig, function (err, models) {
    if (err) throw err;
	db = function (table) { return models['collections'][table]; };
    db.collections = models.collections;
    db.connections = models.connections;
	
	http.createServer(app).listen(app.get('port'),app.get('ipaddr'),function(req,res){console.log("\n\nServer is listening on "+app.get('ipaddr')+":"+app.get('port')+"\n and host "+app.get('host')+"\n");});
});

app.set("host", process.env.OPENSHIFT_GEAR_DNS ||"localhost:3000");
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

