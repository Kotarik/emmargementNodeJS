'use strict';
var request = require('request');
var fs = require('fs');
var APP_ID = "5ab51d7bff563c1583e2cde8";
var SECRET = "b0275b7fd2b1e039c3ffe5c13dfd8500928d763ed0e270b8d68602c168021df31366a25b2cc1fbe1333f746c533bdc8ef222a18398f1f90fa44214f90216c358e677e0d20e40443dcf122823ad69d8e1e03a8c8c9f681ef4818b64c7823dd1c4b35e216abb74141f0451a2e7aae929c7b700e4a5b991af0f0b60f94a234ceb38";

//var mongoose = require('mongoose'),
// Commentaire = mongoose.model('Commentaire'),
// ID = mongoose.model('ID');
/**var mongo = require('./mongo.js');
var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;
var Mongo = require('mongodb')
var BSON = Mongo.BSONPure;


var host = process.env.MONGODB_ADDON_HOST;
var uri = process.env.MONGODB_ADDON_URI;
var pwd = process.env.MONGODB_ADDON_PASSWORD;
var user = process.env.MONGODB_ADDON_USER;
var db = process.env.MONGODB_ADDON_DB;
var port = process.env.MONGODB_ADDON_PORT;
**/

	module.exports = 
	{
	
/**		list_all_film: function(req, res) {
			MongoClient.connect(url, function(err, back) {
				if (err) throw err;
				var dbo = back.db("API");
				
				dbo.collection("films").find().toArray(function(err, film) {
					if (err) throw err;
					res.status(200);
					res.json(film);
			    });
			});
		},
**/
		get_racine: function(req, response) 
		{

			response.json({message: "hourra"});
		},

		remonte_id_carte: function(req, response) 
		{
			//remonté de l'ID_carte bancaire depuis le NFC
			//if (err) throw err;
			var ID_carte=req.body.id;
			console.log("body");
			console.log(ID_carte);

			response.status(201);
			response.json({ message: 'id stocké'});
		},

		connexion: function(req, response)
		{
			//connexion a CO2
			request.post(
			{
		  		headers: {'content-type' : 'application/x-www-form-urlencoded'},
		  		url:     'https://sandbox.compteco2.com/v1/login',
		  		body:    { "app":APP_ID, "secret":SECRET }
			}, function(error, res, body)
			{
				if (body.name == "BOC" && body.app=="5ab51d7bff563c1583e2cde8")
				{
					var token=body.token;
					console.log("body.token");
					console.log(body.token);

					var token_exp=body.token_exp;
					console.log("body.token_exp");
					console.log(body.token_exp);

					var token_iat=body.token_iat;
					console.log("body.token_iat");
					console.log(body.token_iat);

					response.status(201);

				}
				//else if token token expiré on en redemande un autre
			});
			
		}

/**
		infos: function(req, response)
		{

			//envoi de l'ID_carte a CO2
			request.get(("https://sandbox.compteco2.com/v1/user/cards/?pan="+=ID_carte).auth(null, null, true, "bearer"+=token), function(error, response, body) 
			{
		   		var prenom=body.firstName;
		   		var nom = body.lastName;
		   		//reception nom + prenom et écriture dans un fichier
		   		fs.writeFile("/var/www/html/log/"+=ID_carte".txt", "prenom= "+=prenom+=" - nom= "+=nom+=" - id_carte = "+=ID_carte , function (err) {
		 	 		if (err) throw err;
		  			console.log("etudiant ecrit dans fichier /var/www/html/log/"+=ID_carte".txt");
				});
			});
		}
**/
	};
	

/**		create_a_commentaire: function(req, response)
		{
			MongoClient.connect(url, function(err, back)
			{
				if (err) throw err;
				var dbo = back.db("API");
				
				
//					console.log("body");
//					console.log(req.body);					
				dbo.collection("commentaires").insertOne(req.body, function(err, res)
				{
					if (err) throw err;
					response.status(201);
					response.json({ message: 'commentaire créé '});
				});								
			});
		},
		
		
		read_a_film: function(req, response)
		{
			MongoClient.connect(url, function(err, back)
			{
				if (err) throw err;
				var dbo = back.db("API");
				
				try {
						dbo.collection("films").findOne( {"_id": new Mongo.ObjectID(req.params.filmId) }, function(err, film) {
							console.log("film");
							console.log(film);
							if (err)
							{
								response.send(err);
								response.status(500);
							} else 
							{
								if (film == null)
								{
									response.status(500);
									response.send ("mauvais ID");
									
								} else {
									response.status(200);
									response.json(film);
								
								}
							}
						});
					}
					catch (err) 
					{
							response.send(err);
							response.status(500);
					}
			});
		}
**/		
	
