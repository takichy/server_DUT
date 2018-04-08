var express = require('express');
const mysql = require('mysql');
const moment = require('moment');
 
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
  	// port: 8889,
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

app.post('/insertPigeon/:id',function(req,resp){
	connection.query(`insert into pigeon (id_user,couleur,numero_bague,annee_naissance,sexe,etat,famille,race,nom_pigeon,source,num_bague_pere,num_bague_mere,annee_naiss_pere,annee_naiss_mere,supplement,image) values(${req.params.id},'${req.body.couleur}',${req.body.numero_bague},${req.body.annee_naissance},'${req.body.sexe}','${req.body.etat}','${req.body.famille}','${req.body.race}','${req.body.nom_pigeon}','${req.body.source}',${req.body.num_bague_pere},${req.body.num_bague_mere},${req.body.annee_naiss_pere},${req.body.annee_naiss_mere},'${req.body.supplement}','${req.body.imageinput}')`,
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
});

app.post('/insertEclos/:id',function(req,resp){
	console.log(req.params.id);
	connection.query(`insert into eclosion (id_user, date, copain,serie,nid,pose,eclos,commentaire) values(${req.params.id},'${req.body.date_nv_naiss}', '${req.body.copain}','${req.body.serie}','${req.body.nid}','${req.body.pose}','${req.body.eclos}','${req.body.commentaire}')`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert for pigeon eclosion page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for pigeon eclosion page');
				resp.send(true);
			}
		}
	);
});

app.post('/insertNettoyage/:id',function(req,resp){
	console.log(req.params.id);
	connection.query(`insert into nettoyage (id_user,date_nettoyage,cause_nettoyage,produit,commentaire) values(${req.params.id},'${req.body.date_nettoyage}','${req.body.cause_nettoyage}','${req.body.produit}','${req.body.commentaire}')`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert nettoyage', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for nettoyage');
				resp.send(true);
			}
		}
	);
});

app.post('/insertAccouplement/:id',function(req,resp){
	console.log(req.params.id);
	connection.query(`insert into pondaison (id_user,female,male,date_accouplement,numero_couple) values(${req.params.id},${req.body.female_acco},${req.body.male_acco},'${req.body.date_accouplement}','${req.body.numero_couple}')`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert for accouplement page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for accouplement page');
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

app.post('/insertVaccination/:id',function(req,resp){
	console.log(req.params.id);
	connection.query(`insert into vaccination
	(id_user,numero_bague,date_vaccination,date_prochaine_vaccination,description,termine_par,medication,dosage,contre,commentaire_vaccination) values(${req.params.id},${req.body.numero_bague},${req.body.date_vaccination},'${req.body.date_prochaine_vaccination}','${req.body.description}','${req.body.termine_par}','${req.body.medication}','${req.body.dosage}','${req.body.contre}','${req.body.commentaire_vaccination}')`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert for vaccination page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for vaccination page');
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

app.post('/updatePondaison/:id',function(req,resp){
	console.log(req.params.id);
	connection.query(`UPDATE pondaison SET date_oeuf_one =${req.body.date_oeuf_one},date_oeuf_one =${req.body.date_oeuf_one},nid ='${req.body.nid}' where female = ${req.body.female} AND male = ${req.body.male} AND id_user = ${req.params.id}`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert for pondaison page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for pondaison page');
				resp.send(true);
			}
		}
	);
});

app.post('/updateEclos/:id',function(req,resp){
	connection.query(`UPDATE eclosion SET  num_bague =${req.body.num_bague} where id_eclosion = ${req.body.id_eclosion} AND id_user = ${req.params.id} `,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query update eclosion', error);
			} else{
				console.log('SUCCESSFUL QUERY update eclosion ',resp);
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

app.get('/selectEclosion/:id_use',function(req,resp){
	console.log("req params: ", req.params);
	console.log(req.params.id_use);
	//about mysql requet...
	connection.query(`select * from eclosion where id_user='${req.params.id_use}' and num_bague IS NULL`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select select eclosion', error);
		} else{
			console.log('SUCCESSFUL QUERY select select eclosion');
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

app.get('/selectEclo/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from eclosion where id_eclosion='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query selec updatet eclosion', error);
		} else{
			console.log('SUCCESSFUL QUERY select update eclosion');
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

app.get('/selectCouple/:id/:id_use',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from pondaison where id_user='${req.params.id_use}' AND numero_couple='${req.params.id}'`,
		function(error,rows,fields){
			if(!!error){
				console.log('error in the query select num male and female', error);
			} else{
				console.log('SUCCESSFUL QUERY select num male and female');
				resp.send(rows);
			}
	});
});

app.get('/selectListVaccin/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from vaccination where id_user='${req.params.id}'`,
		function(error,rows,fields){
			if(!!error){
				console.log('error in the query select list vaccin', error);
			} else{
				console.log('SUCCESSFUL QUERY select list vaccin');
				resp.send(rows);
			}
	});
});

app.get('/selectListVaccinUrgent/:id',function(req,resp){
	console.log("req params: ", req.params);
	const datemin = moment().subtract(15, "days").format("YYYY-MM-DD");
	const datemax = moment().format("YYYY-MM-DD");
	console.log("=====", datemin, datemax);
	//about mysql requet...
	connection.query(`select * from vaccination where id_user='${req.params.id}' AND 'date_prochaine_vaccination' >= '${datemin}' AND 'date_prochaine_vaccination' <= '${datemax}'`,
		function(error,rows,fields){
			if(!!error){
				console.log('error in the query select rappelle vaccin', error);
			} else{
				console.log('SUCCESSFUL QUERY select rappelle vaccin');
				resp.send(rows);
			}
	});
});

app.get('/selectNumBag/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from pigeon where id_user='${req.params.id}'`,
		function(error,rows,fields){
			if(!!error){
				console.log('error in the query select numero de bague', error);
			} else{
				console.log('SUCCESSFUL QUERY select numero de bague');
				resp.send(rows);
			}
	});
});

app.get('/selectPigeonFemale/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select numero_bague from pigeon where id_user='${req.params.id}' and sexe = "Female"`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select pigeon female option', error);
		} else{
			console.log('SUCCESSFUL QUERY select All pigeon female option');
			resp.send(rows);
		}
	});
});

app.get('/selectPigeonMale/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select numero_bague from pigeon where id_user='${req.params.id}' and sexe = "Male"`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select pigeon male option', error);
		} else{
			console.log('SUCCESSFUL QUERY select All pigeon male option');
			resp.send(rows);
		}
	});
});

app.get('/selectNumeroCouple/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from pondaison where id_user='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select numero couple', error);
		} else{
			console.log('SUCCESSFUL QUERY select numero couple');
			resp.send(rows);
		}
	});
});

app.get('/selectNettoyage/:id',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select * from nettoyage where id_user='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select nettoyage', error);
		} else{
			console.log('SUCCESSFUL QUERY select nettoyage');
			resp.send(rows);
		}
	});
});

// page login et inscription
app.get('/selectLogin/:username/:password',function(req,resp){
	console.log("req params: ", req.params);
	//about mysql requet...
	connection.query(`select id_user from user where mail='${req.params.username}' AND password ='${req.params.password}'`,function(error,rows,fields){
		if (!!error  || rows[0] == undefined){
			console.log('error ',error);
			resp.send(false);
		} else{
			console.log('SUCCESSFUL QUERY select ');
			resp.send(true);
		}
	});
});

app.post('/insertUser/',function(req,resp){

	connection.query(`insert into user (nom,prenom,mail,telephone,adresse,pays,ville,code_postal,password) values ('${req.params.nom}','${req.body.prenom}','${req.body.emaill}','${req.body.number}','${req.body.adresse}','${req.body.pays}','${req.body.ville}','${req.body.postale}','${req.body.passwordd}')`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert for user  page', error);
			} else{
				console.log('SUCCESSFUL QUERY insert for user page');
				resp.send(true);
			}
		}
	);
});

app.listen(1337);