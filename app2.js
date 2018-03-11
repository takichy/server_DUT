var express = require('express');
const mysql = require('mysql');

var app = express();



var connection = mysql.createConnection({
	//properties...
	host     : 'localhost',
    user     : 'PFE',
    password : '123456',
    database : 'DB_pigeon'
});


connection.connect(function(error){
	if(!!error){
		console.log('Error');
	}else{
		console.log('Connected awlad l97ab');
	}
});


app.post('/insert',function(req,resp){

	console.log(req);
	//about mysql requet...
/*	connection.query(`insert into user values(${req.params.id},${req.params.name},'oulid omali','ayyouboulidiomali@gmail.com',663566903,'rue 50 mamouniya','france','toulouse',30050)`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query insert');
		} else{
			console.log('SUCCESSFUL QUERY insert');
		}
	});*/
});



/*app.get('/select/{id}',function(req,resp){
	//about mysql requet...
	connection.query("select * from user",function(error,rows,fields){
		if(!!error){
			console.log('error in the query select');
		} else{
			console.log('SUCCESSFUL QUERY select');
			resp.send(rows[0].nom);
		}
	});
})*/


app.listen(1337);
