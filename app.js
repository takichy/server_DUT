var express = require('express');
const mysql = require('mysql');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var connection = mysql.createConnection({
	//properties...
	host     : 'localhost',
	//port: 8889,
    user     : 'PFE',
    password : '123456',
    database : 'pfe'
});


connection.connect(function(error){
	if(!!error){
		console.log('Error', error);
	}else{
		console.log('Connected awlad l97ab');
	}
});


app.post('/insertUser',function(req,resp){
	connection.query(`insert into user values('5','${req.body.first_name}','${req.body.lase_name}','${req.body.email}','${req.body.phone}','${req.body.address}','france','toulouse',${req.body.zip})`,
		function(error, rows, fields){
			if(!!error){
				console.log('error in the query insert', error);
			} else{
				console.log('SUCCESSFUL QUERY insert User');
				resp.send(true);
			}
		}
	);
});

app.post('/insertPigeon',function(req,resp){
	connection.query(`insert into user values('5','${req.body.first_name}','${req.body.lase_name}','${req.body.email}','${req.body.phone}','${req.body.address}','france','toulouse',${req.body.zip})`,
		function(error, rows, fields){
			if(!!error){
				console.log('error in the query insert', error);
			} else{
				console.log('SUCCESSFUL QUERY insert Pigeon');
				resp.send(true);
			}
		}
	);
});

app.get('/selectAll',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query('select * from user',function(error,rows,fields){
		if(!!error){
			console.log('error in the query select', error);
		} else{
			console.log('SUCCESSFUL QUERY select');
			resp.send(rows);
		}
	});
})

app.get('/selectPigeon/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from user where id_user='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select', error);
		} else{
			console.log('SUCCESSFUL QUERY select');
			resp.send(rows);
		}
	});
})

app.listen(1337);
