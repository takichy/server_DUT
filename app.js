var express = require('express');
const mysql = require('mysql');
const moment = require('moment');
 
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());  // support json encoded bodies
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
    user     : 'root',
    password : 'root',
    database : 'webo_rinopha'
});

connection.connect(function(error){
	if(!!error){
		console.log('Error', error);
	}else{
		console.log('Connected xD');
	}
});

// post function for send data to data base 
app.post('/insertClient',function(req,resp){
	connection.query(`insert into user (nom_client,telephone_client,Commentaire)values('${req.body.nom_client}',${req.body.telephone_client},'${req.body.Commentaire}')`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert for ajouter client', error);
			} else{
				console.log('SUCCESSFUL in the query insert for ajouter client');
				resp.send(true);
			}
		}
	);
});

app.post('/insertFournisseur',function(req,resp){
	connection.query(`insert into fournisseur (nom_fournisseur,telephone_fournisseur,Commentaire)values('${req.body.nom_fournisseur}',${req.body.telephone_fournisseur},'${req.body.Commentaire}')`,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert for ajouter fournisseur', error);
			} else{
				console.log('SUCCESSFUL in the query insert for ajouter fournisseur');
				resp.send(true);
			}
		}
	);
});

app.post('/insertProduit',function(req,resp){
	connection.query(`insert into produit (image_produit,nom_produit,nom_fournisseur,prix_produit,quantite_produit,date_peremption)values('${req.body.image_produit}','${req.body.nom_produit}','${req.body.nom_fournisseur}','${req.body.prix_produit}','${req.body.quantite_produit}','${req.body.date_peremption}')`,
        function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert produit for ajouter produit page', error);
			} else{
				console.log('SUCCESSFUL in the query insert produit for ajouter produit page',resp);
				resp.send(true);
			}
		}
	);
});

app.post('/deleteCustomer',function(req,resp){
	connection.query(`DELETE from user where id_user = ${req.body.id_user} `,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query delete Customer', error);
			} else{
				console.log('SUCCESSFULin the query delete Customer');
				resp.send(true);
			}
		}
	);
});

app.post('/deleteFournisseur',function(req,resp){
	connection.query(`DELETE from fournisseur where id_fournisseur = ${req.body.id_fournisseur} `,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query delete fournisseur', error);
			} else{
				console.log('SUCCESSFULin the query delete fournisseur');
				resp.send(true);
			}
		}
	);
});

app.post('/deleteProduit',function(req,resp){
	connection.query(`DELETE from produit where id_produit = ${req.body.id_produit} `,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query delete produit', error);
			} else{
				console.log('SUCCESSFULin the query delete produit');
				resp.send(true);
			}
		}
	);
});

// get function for getting data from data base
app.get('/selectAllClient',function(req,resp){
	//about mysql requet...
	connection.query('select * from user',function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All clients', error);
		} else{
			console.log('SUCCESSFUL QUERY select All clients');
			resp.send(rows);
		}
	});
});

app.get('/selectAllFourniseur',function(req,resp){
	//about mysql requet...
	connection.query('select * from fournisseur',function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All fournisseurs', error);
		} else{
			console.log('SUCCESSFUL QUERY select All fournisseurs');
			resp.send(rows);
		}
	});
});

app.get('/selectAllProduit',function(req,resp){
	//about mysql requet...
	connection.query('select * from produit',function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All produit', error);
		} else{
			console.log('SUCCESSFUL QUERY select All produit');
			resp.send(rows);
		}
	});
});

app.listen(1337);