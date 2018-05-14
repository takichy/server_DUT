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
	connection.query(`insert into produit (image_produit,nom_produit,nom_fournisseur,prix_produit,quantite_produit,date_peremption) values ('${req.body.imageinput}','${req.body.nom_produit}','${req.body.nom_fournisseur}','${req.body.prix_produit}','${req.body.quantite_produit}','${req.body.date_peremption}')`,
        function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert produit for ajouter produit page', error);
			} else{
				console.log('SUCCESSFUL in the query insert produit for ajouter produit page');
				resp.send(true);
			}
		}
	);
});

app.post('/insertStock',function(req,resp){
	console.log(req.body.nom_fournisseur);
	connection.query(`insert into stock (image_product,nom_produit,nom_fournisseur,prix_produit,quantite_produit,date_peremption)values('${req.body.imageinput}','${req.body.nom_produit}','${req.body.nom_fournisseur}',${req.body.prix_produit},${req.body.quantite_produit},'${req.body.date_peremption}')`,
        function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert produit for ajouter produit in stock', error);
			} else{
				console.log('SUCCESSFUL in the query insert produit for ajouter produit in stock');
				resp.send(true);
			}
		}
	);
});

app.post('/deletStockSortie',function(req,resp){
	connection.query(`UPDATE stock SET 
		quantite_produit = 
	 where date_peremption = '${req.body.date_expiration}' AND nom_produit = '${req.body.nom_product}'`,
        function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query update produit for sortie produit from stock', error);
			} else{
				console.log('SUCCESSFUL in the query update produit for sortie produit from stock');
				resp.send(true);
			}
		}
	);
});

app.post('/UpdateClient',function(req,resp){
	connection.query(`UPDATE user SET  nom_client = '${req.body.nom_client}', telephone_client = ${req.body.telephone_client}, Commentaire = '${req.body.Commentaire}' where id_user = ${req.body.id_user}`,
	    function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query update client from modal edite', error);
			} else{
				console.log('SUCCESSFUL in the query update client from modal edite');
				resp.send(true);
			}
		}
	);
});

app.post('/UpdateFournisseur',function(req,resp){
	connection.query(`UPDATE fournisseur SET  nom_fournisseur = '${req.body.nom_fournisseur}', telephone_fournisseur = ${req.body.telephone_fournisseur}, Commentaire = '${req.body.Commentaire}' where id_fournisseur = ${req.body.id_fournisseur}`,
	    function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query update fourniseur from modal editer', error);
			} else{
				console.log('SUCCESSFUL in the query update fourniseur from modal editer');
				resp.send(true);
			}
		}
	);
});

app.post('/UpdateProduct',function(req,resp){
	connection.query(`UPDATE stock SET  nom_produit = '${req.body.nom_produit}', nom_fournisseur = '${req.body.nom_fournisseur}', prix_produit = ${req.body.prix_produit}, quantite_produit = ${req.body.quantite_produit}, date_peremption = '${req.body.date_peremption}' where id_stock = ${req.body.id_stock}`,
	    function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query update product from modal editer', error);
			} else{
				console.log('SUCCESSFUL in the query update product from modal editer');
				resp.send(true);
			}
		}
	);
});

app.post('/insertStockEntree',function(req,resp){
	connection.query(`insert into stock (nom_produit,nom_fournisseur,prix_produit,quantite_produit,date_peremption)values('${req.body.nom_product}','${req.body.nom_supplier}',${req.body.price_product},${req.body.quantity_product},'${req.body.date_expiration}')`,
        function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert produit for entree produit in stock mouvement', error);
			} else{
				console.log('SUCCESSFUL in the query insert produit for entree produit in stock mouvement');
				resp.send(true);
			}
		}
	);
});

app.post('/insertStockSortie',function(req,resp){
	connection.query(`insert into produit_sortie (nom_produit,quantite,date_peremption,date_sortie)values ('${req.body.nom_product}',${req.body.quantity_product},'${req.body.date_expiration}','${req.body.date_sortie}')`,
        function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query insert produit for sortie produit in stock mouvement', error);
			} else{
				console.log('SUCCESSFUL in the query insert produit for sortie produit in stock mouvement');
				resp.send(true);
			}
		}
	);
});

app.post('/deleteCustomer',function(req,resp){
	connection.query(`DELETE from user where id_user = ${req.body.id_usr} `,
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
	connection.query(`DELETE from fournisseur where id_fournisseur = ${req.body.id_fourniss} `,
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
	connection.query(`DELETE from stock where id_stock = ${req.body.id_sto} `,
		function(error, rows, fields){
			if(!!error){
				resp.sendStatus(400);
				console.log('error in the query delete produit from stock table', error);
			} else{
				console.log('SUCCESSFULin the query delete produit from stock table');
				resp.send(true);
			}
		}
	);
});

app.post('/UpdateAdmin',function(req,resp){
	connection.query(`UPDATE admin SET  nom_admin ='${req.body.nom_admin}',login_admin ='${req.body.login_admin}',telephone =${req.body.telephone},sexe='${req.body.sexe}' where mail_admin='${req.body.mail_admin}' and mot_passe='${req.body.mot_passe}'`,
			function(error, rows, fields){
				if(!!error){
					console.log('error in the query update admin', error);
					resp.sendStatus(400);
				} else{
					console.log('SUCCESSFUL QUERY update admin');
					resp.send(true);
				}
			}
		);
});

app.post('/UpdatePassword',function(req,resp){
	connection.query(`UPDATE admin SET  mot_passe ='${req.body.mot_passe_nv}' where mot_passe='${req.body.mot_passe}'`,
			function(error, rows, fields){
				if(!!error){
					console.log('error in the query update admin', error);
					resp.sendStatus(400);
				} else{
					console.log('SUCCESSFUL QUERY update admin');
					resp.send(true);
				}
			}
		);
});

// get function for getting data from data base
app.get('/selectAllClient',function(req,resp){
	//about mysql requet...
	connection.query(`select * from user`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All clients', error);
		} else{
			console.log('SUCCESSFUL QUERY select All clients');
			resp.send(rows);
		}
	});
});


app.get('/selectEditClient/:id',function(req,resp){
	//about mysql requet...
	connection.query(`select * from user where id_user='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All user specifique data', error);
		} else{
			console.log('SUCCESSFUL QUERY select All user specifique data');
			resp.send(rows);
		}
	});
});

app.get('/selectEditSupplier/:id',function(req,resp){
	//about mysql requet...
	connection.query(`select * from fournisseur where id_fournisseur='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All fournisseur specifique data', error);
		} else{
			console.log('SUCCESSFUL QUERY select All fournisseur specifique data');
			resp.send(rows);
		}
	});
});

app.get('/selectEditProduct/:id',function(req,resp){
	//about mysql requet...
	connection.query(`select * from stock where id_stock='${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All produit specifique data', error);
		} else{
			console.log('SUCCESSFUL QUERY select All produit specifique data');
			resp.send(rows);
		}
	});
});

app.get('/selectAdmin',function(req,resp){
	//about mysql requet...
	connection.query(`select * from admin`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All admin', error);
		} else{
			console.log('SUCCESSFUL QUERY select All admin');
			resp.send(rows);
		}
	});
});

app.get('/selectLogin/:username/:password',function(req,resp){
	//about mysql requet...
	console.log('voila kfrgosrj',$username);
	console.log($password);
/*	connection.query(`select * from admin`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All admin', error);
		} else{
			console.log('SUCCESSFUL QUERY select All admin');
			resp.send(rows);
		}
	});*/
});

app.get('/selectAllFourniseur',function(req,resp){
	//about mysql requet...
	connection.query(`select * from fournisseur`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select All fournisseurs', error);
		} else{
			console.log('SUCCESSFUL QUERY select All fournisseurs');
			resp.send(rows);
		}
	});
});

app.get('/selectAllProduit',function(req,resp){
	connection.query(`SELECT id_stock,image_product,nom_produit,nom_fournisseur,prix_produit,SUM(quantite_produit) as totalQuantite
	,date_peremption FROM stock GROUP BY nom_produit,nom_fournisseur,prix_produit`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select sum quantite and data produit from stock', error);
		} else{
			console.log('SUCCESSFUL QUERY select sum quantite and data produit from stock');
			resp.send(rows);
		}
	});
});

/*app.get('/selectAllDateExperation/:id',function(req,resp){
	connection.query(`SELECT date_peremption FROM stock where nom_produit = '${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select date peremption from stock for affichage table', error);
		} else{
			console.log('SUCCESSFUL QUERY select date peremption from stock for affichage table', rows);
			resp.send(rows);
		}
	});
});*/

app.get('/selectProduitEntree',function(req,resp){
	connection.query(`SELECT nom_produit FROM stock GROUP BY nom_produit`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select nom produit for entree stock', error);
		} else{
			console.log('SUCCESSFUL QUERY select nom produit for entree stock');
			resp.send(rows);
		}
	});
});

app.get('/selectProductDate/:id',function(req,resp){
	connection.query(`SELECT nom_produit,quantite_produit,date_peremption FROM stock where nom_produit = '${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select nom produit and date peremption for edit modal', error);
		} else{
			console.log('SUCCESSFUL QUERY select nom produit and date peremption for edit modal');
			resp.send(rows);
		}
	});
});

app.get('/selectSupplierEntree/:id',function(req,resp){
	connection.query(`SELECT nom_fournisseur from stock where nom_produit = '${req.params.id}' GROUP BY nom_fournisseur`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select nom fournisseur for stock entree', error);
		} else{
			console.log('SUCCESSFUL QUERY select nom fournisseur for stock entree');
			resp.send(rows);
		}
	});
});

app.get('/selectExpirationEntree/:id',function(req,resp){
	connection.query(`SELECT date_peremption from stock where nom_produit = '${req.params.id}' ORDER BY date_peremption ASC`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select date expiration for stock entree', error);
		} else{
			console.log('SUCCESSFUL QUERY select date expiration for stock entree');
			resp.send(rows);
		}
	});
});

app.get('/selectCountProduit/:id',function(req,resp){
	connection.query(`SELECT count (*) as CountProd from stock where nom_produit = '${req.params.id}'`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select count produit unique', error);
		} else{
			console.log('SUCCESSFUL QUERY select count produit unique',rows[0].CountProd);
			resp.send(rows);
		}
	});
});

app.get('/selectTotalProduit',function(req,resp){
	//about mysql requet...
	connection.query(`select count(*) as totalProduit from produit`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select total produit', error);
		} else{
			console.log('SUCCESSFUL QUERY select total produit ', rows[0].totalProduit);
			resp.send(rows);
		}
	});
});

app.get('/selectTotalFournisseur',function(req,resp){
	//about mysql requet...
	connection.query(`select count(*) as totalFournisseur from fournisseur`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select total fournisseur', error);
		} else{
			console.log('SUCCESSFUL QUERY select total fournisseur ', rows[0].totalFournisseur);
			resp.send(rows);
		}
	});
});

app.get('/selectTotalClient',function(req,resp){
	//about mysql requet...
	connection.query(`select count(*) as totalclient from user`,function(error,rows,fields){
		if(!!error){
			console.log('error in the query select total user', error);
		} else{
			console.log('SUCCESSFUL QUERY select total user ', rows[0].totalclient);
			resp.send(rows);
		}
	});
});

app.listen(1337);