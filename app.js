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
    user     : 'root',
    password : 'root',
    database : 'db_pigeon'
});

connection.connect(function(error){
	if(!!error){
		console.log('Error', error);
	}else{
		console.log('Connected xD');
	}
});

// post function for send data to data base 
app.post('/insertUser/:id',function(req,resp){
	connection.query(`UPDATE user SET nom ='${req.body.last_name}', prenom ='${req.body.first_name}', mail='${req.body.email}', telephone =${req.body.phone}, adresse='${req.body.address}', pays ='${req.body.countries_states}' ,code_postal =${req.body.zip}, ville ='${req.body.countries_city}'where id_user='${req.params.id}'`,
			function(error, rows, fields){
			if(!!error){
				console.log('error in the query update user', error);
				resp.sendStatus(400);
			} else{
				console.log('SUCCESSFUL QUERY update user ',resp);
				resp.send(true);
			}
		}
	);
});

/*app.post('/insertPigeon/:id',function(req,resp){
	connection.query(`insert into pigeon (id_user,couleur,numero_bague,annee_naissance,sexe,etat,souche,nom_pigeon,pigeonnier,num_bague_pere,num_bague_mere,annee_naiss_pere,annee_naiss_mere,supplement) values(${req.params.id},'${req.body.couleur}',${req.body.numero_bague},${req.body.annee_naissance},'${req.body.sexe}','${req.body.etat}','${req.body.souche}','${req.body.nom_pigeon}','${req.body.pigeonnier}',${req.body.num_bague_pere},${req.body.num_bague_mere},${req.body.annee_naiss_pere},${req.body.annee_naiss_mere},'${req.body.supplement}')`,
        function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert pigeon for nvaqui page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert pigeon for nvaqui page',resp);
				resp.send(true);
			}
		}
	);
});*/

app.post('/insertPigeon/:id',function(req,resp){
	console.log(req.body.image);
	connection.query(`insert into pigeon (id_user,image,numero_bague) values(${req.params.id},'${req.body.image}',${req.body.numero_bague})`,
        function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert pigeon for nvaqui page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert pigeon for nvaqui page',req.body.image);
				resp.send(true);
			}
		}
	);
});

app.post('/insertNaissance/:id',function(req,resp){
	connection.query(`insert into pigeon(id_user,date_nv_naiss,copain,serie,nid,commentaire,pose,eclos,numero_bague) values(${req.params.id},${req.body.date_nv_naiss},'${req.body.copain}','${req.body.serie}','${req.body.nid}','${req.body.commentaire}','${req.body.pose}','${req.body.eclos}',${req.body.numero_bague})`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert for pigeon nv naissance page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for pigeon nv naissance page');
				resp.send(true);
			}
		}
	);
});

app.post('/insertMessage',function(req,resp){
	connection.query(`insert into contact(nom,mail,telephone,objet,message) values('${req.body.nom}','${req.body.email}',${req.body.mobile},'${req.body.subject}','${req.body.message}')`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert for contact page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for contact page',resp);
				resp.send(true);
			}
		}
	);
});

app.post('/updateVaccination/:id',function(req,resp){
	connection.query(`UPDATE pigeon SET date_vaccination =${req.body.date_vaccination}, description='${req.body.description}', termine_par='${req.body.termine_par}', medication='${req.body.medication}', dosage ='${req.body.dosage}' ,commentaire_vaccination ='${req.body.commentaire_vaccination}' where numero_bague=${req.params.id}`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query update vaccination', error);
			} else{
				console.log('SUCCESSFUL QUERY update vaccination ',resp);
				resp.send(true);
			}
		}
	);
});

app.post('/updatePigeon/:id',function(req,resp){
	connection.query(`UPDATE pigeon SET annee_naissance=${req.body.annee_naissance}, sexe='${req.body.sexe}', etat='${req.body.etat}', souche ='${req.body.souche}' ,nom_pigeon ='${req.body.nom_pigeon}',pigeonnier ='${req.body.pigeonnier}',num_bague_pere =${req.body.num_bague_pere},annee_naiss_pere =${req.body.annee_naiss_pere},num_bague_mere =${req.body.num_bague_mere},annee_naiss_mere =${req.body.annee_naiss_mere},supplement ='${req.body.supplement}' where numero_bague=${req.params.id}`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query update pigeon modal', error);
			} else{
				console.log('SUCCESSFUL QUERY update pigeon modal ');
				resp.send(true);
			}
		}
	);
});

// get function for get data from data base
app.get('/selectAll',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query('select * from user',function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All', error);
		} else{
			console.log('SUCCESSFUL QUERY select All');
			resp.send(rows);
		}
	});
});

app.get('/selectPigeon/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from pigeon where id_user='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select selectPigeon', error);
		} else{
			console.log('SUCCESSFUL QUERY select selectPigeon');
			resp.send(rows);
		}
	});
});

app.get('/selectPigeonUpdate/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from pigeon where numero_bague='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query selec updatet', error);
		} else{
			console.log('SUCCESSFUL QUERY select update');
			resp.send(rows);
		}
	});
});



/*app.get('/selectAllPigeon',function(req,resp){
	//about mysql requet...
	connection.query('select * from pigeon',function(error,rows,fields){
		if(!!error){
			console.log('error in the query select', error);
		} else{
			console.log('SUCCESSFUL QUERY select');
			resp.send(rows);
		}
	});
});*/

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
	connection.query(`select count(*) as totalStatique from pigeon where id_user='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select', error);
		} else{
			console.log('SUCCESSFUL QUERY select <<count all total>> ', rows[0].totalStatique);
			resp.send(rows);
		}
	});
});

app.get('/selectMales/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select count(*) as totalMales from pigeon where id_user='${req.params.id}' and sexe = 'Male'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select', error);
		} else{
			console.log('SUCCESSFUL QUERY select <<count all males>> ',rows[0].totalMales);
			resp.send(rows);
		}
	});
});

app.get('/selectJeunes/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select count(*) as totalJeunes from pigeon where id_user='${req.params.id}' and sexe = 'Jeune'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select', error);
		} else{
			console.log('SUCCESSFUL QUERY select <<count all jeunes>> ',rows[0].totalJeunes);
			resp.send(rows);
		}
	});
});

app.get('/selectFemales/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select count(*) as totalFemales from pigeon where id_user='${req.params.id}' and sexe = 'Female'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select', error);
		} else{
			console.log('SUCCESSFUL QUERY select <<count all Females>> ',rows[0].totalFemales);
			resp.send(rows);
		}
	});
});

app.get('/selectVaccination/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from pigeon where numero_bague='${req.params.id}'`,
		function(error,rows,fields){
			if(!!error){
				console.log('error in the query select vaccination', error);
			} else{
				console.log('SUCCESSFUL QUERY select vaccination');
				resp.send(rows);
			}
	});
});

app.get('/selectPigeonVacciner/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select numero_bague from pigeon where id_user='${req.params.id}' and etat_vaccination = 1`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query selec vaccination option', error);
		} else{
			console.log('SUCCESSFUL QUERY select All vaccination option',rows);
			resp.send(rows);
		}
	});
});


app.listen(1337);