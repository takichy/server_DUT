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
	/*port: 8889,*/
    user     : 'PFE',
    password : '123456',
    database : 'db_pigeon'
});

connection.connect(function(error){
	if(!!error){
		console.log('Error', error);
	}else{
		console.log('Connected successful');
	}
});

app.post('/insertUser/:id',function(req,resp){
	connection.query(`UPDATE user SET nom ='${req.body.last_name}', prenom ='${req.body.first_name}', mail='${req.body.email}', telephone =${req.body.phone}, adresse='${req.body.address}', pays ='${req.body.countries_states}' ,code_postal =${req.body.zip}, ville ='${req.body.countries_city}'where id_user='${req.params.id}'`,
				function(error, rows, fields){
			if(!!error){
				console.log('error in the query update user', error);
			} else{
				console.log('SUCCESSFUL QUERY update user ');
				resp.send(true);
			}
		}
	);
});

app.post('/insertPigeon',function(req,resp){
	console.log(req.body.couleur);
	connection.query(`insert into pigeon1(couleur,numero_bague,annee_naissance,sexe,etat,souche,nom_pigeon,pigeonnier,num_bague_pere,num_bague_mere,annee_naiss_pere,annee_naiss_mere,supplement)values('${req.body.couleur}',${req.body.numero_bague},${req.body.annee_naissance},'${req.body.sexe}','${req.body.etat}','${req.body.souche}','${req.body.nom_pigeon}','${req.body.pigeonnier}',${req.body.num_bague_pere},${req.body.num_bague_mere},${req.body.annee_naiss_pere},${req.body.annee_naiss_mere},'${req.body.supplement}')`,
        function(error, rows, fields){
			if(!!error){
				console.log('error in the query insert pigeon for nvaqui', error);
			} else{
				console.log('SUCCESSFUL QUERY insert pigeon for nvaqui page');
				resp.send(true);
			}
		}
	);
});

app.post('/insertNaissance',function(req,resp){
	console.log(' je suis sur insert nv naissance');
	connection.query(`insert into pigeon(date_nv_naiss,copain,serie,nid,commentaire,pose,eclos,numero_bague)values('${req.body.date_nv_naiss}','${req.body.copain}','${req.body.serie}','${req.body.nid}','${req.body.commentaire}','${req.body.pose}','${req.body.eclos}',${req.body.numero_bague})`,
		function(error, rows, fields){
			if(!!error){
				console.log('error in the query insert for contact page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for contact page');
				resp.send(true);
			}
		}
	);
});

app.post('/insertMessage',function(req,resp){
	connection.query(`insert into contact(nom,mail,telephone,objet,message) values('${req.body.nom}','${req.body.email}',${req.body.mobile},'${req.body.subject}','${req.body.message}')`,
		function(error, rows, fields){
			if(!!error){
				console.log('error in the query insert for contact page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for contact page');
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
});

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
});

app.get('/selectUser/:id',function(req,resp){
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
});

app.get('/selectTotal/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select count(*) from pigeon where id_user='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select', error);
		} else{
			console.log('SUCCESSFUL QUERY select nombre totale');
			resp.send(rows);
		}
	});
});

app.listen(1337);