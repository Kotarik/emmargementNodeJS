'use strict';
var request = require('request');
var fs = require('fs');
var variables = require('/var/www/html/api/variables.json');
var token = null;
var token_exp = 0;
var token_iat = 0;

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

		connexion: function (req, response) 
		{

		//connexion a CO2

			request.post(
			{

				headers: {'content-type': 'application/x-www-form-urlencoded'},
				url: 'https://sandbox.compteco2.com/v1/login',
				form: {"app": variables.APP_ID, "secret": variables.SECRET}

			}, function (error, res) 
			{

				if (res.statusCode === 200) 
				{

					var body = JSON.parse(res.body);

					if (body.name == "BOC" && body.app == variables.APP_ID) 
					{

						token = body.token;
						console.log("body.token");
						console.log(body.token);

						token_exp = body.token_exp;
						console.log("body.token_exp");
						console.log(body.token_exp);

						token_iat = body.token_iat;
						console.log("body.token_iat");
						console.log(body.token_iat);

						response.status(201);
						response.json({ connexion: 'effectuée'});
					}

				}

				else 
				{
					response.status(500);
					response.json({ connexion: 'Prout'});
				}

			//else if token token expiré on en redemande un autre
			 });
		},


		infos: function(req, response)
		{
			//envoi de l'ID_carte a CO2
			request.get("https://sandbox.compteco2.com/v1/user/cards/?pan="+variables.ID_carte2,{

				headers : {
					"Authorization" : "bearer "+token
				}
			}, function (error, res) 
			{
					if (res.statusCode === 200) 
					{
						var body = JSON.parse(res.body);
						var prenom=body.firstName;
						var nom = body.lastName;
						//var fichier = "/var/www/html/log/"+variables.ID_carte2+".txt";
						//reception nom + prenom et écriture dans un fichier
						fs.writeFile('/var/www/html/log/'+variables.ID_carte2+'.txt', 'prenom= '+prenom+' - nom= '+nom+' - id_carte = '+variables.ID_carte2, function (err) {
						//	fs.writeFile('/var/www/html/log/.txt', 'prenom=', function (err) {
								if (err) throw err;
								console.log('etudiant ecrit dans fichier /var/www/html/log/'+variables.ID_carte2+'.txt');
								response.status(201);
								response.json({ 
									ecriture: 'faite',
									nom: nom,
									prenom: prenom,
									carte: variables.ID_carte2
								});
							});
					} else {
						if (error) throw error;
						response.status(500);
						response.json({ recup_data: 'Prout'});
					}
			});
		}
	};
