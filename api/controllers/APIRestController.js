'use strict';
//module permettant d'effectuer des requetes vers une autre API
var request = require('request');
//module pour utilise les calendriers
var ical = require('node-ical');
//module pour parser les calendrier
var data = ical.parseFile('/var/www/html/api/ics/');
//module pour écrire sur le filesystème
var fs = require('fs');
//variable détaché du code pour ne pas les publier sur github
var variables = require('/var/www/html/api/variables.json');
//initialisation des variables du token
//le token
var token = null;
//la date d'initialisation du token
var token_iat = 0;
//la date d'expiration du token
var token_exp = 0;


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
	//début des routes
	module.exports = 
	{
		//route / test de vie du serveur
		get_racine: function(req, response) 
		{
			//si on accède a / => on retourne un message "hourra". Cela permet de constater que le serveur nodejs tourne correctement.
			response.json({message: "hourra"});
		},

		//route /id_carte => Permet de remonter l'id carte depuis postman, ou le NFC vers notre api.
		remonte_id_carte: function(req, response) 
		{
			
			//if (err) throw err;

			//Récupération de la donnée se trouvant dans le body de la requete 
			var ID_carte=req.body.id;

			//Affichage du résultat dans la console shell de nodejs
			console.log("body.id_carte");
			console.log(ID_carte);

			//retourne le résultat a postman ou au capteur NFC pour dire que c'est ok.
			response.status(201);
			response.json({ message: 'id stocké'});
		},


		//route /connexion => connexion a CO2
		connexion: function (req, response) 
		{
			//on utilise le module "request" pour lancer une requete post vers l'api de CO2
			request.post(
			{
				//données à placer dans le header de la requete
				headers: {'content-type': 'application/x-www-form-urlencoded'},
				//url de connexion C02
				url: 'https://sandbox.compteco2.com/v1/login',
				//Body de la requete. Les données sont stocké dans le fichier variable pour rester secrete sur github.
				form: {"app": variables.APP_ID, "secret": variables.SECRET}

			}, function (error, res) 
			{
				//Si la requete a bien fonctionner, elle retourne un status code = 200
				if (res.statusCode === 200) 
				{
					//on parse en JSON le retour de la requete
					var body = JSON.parse(res.body);
					//On s'assure que la réponse concerne bien notre application
					if (body.name == "BOC" && body.app == variables.APP_ID) 
					{
						//on récupère le token
						token = body.token;
						//On affiche en console shell nodejs le token
						console.log("body.token");
						console.log(body.token);
						//on récupère la date d'expiration du token
						token_exp = body.token_exp;
						console.log("body.token_exp");
						console.log(body.token_exp);
						//on récupère la date d'initialisation du token
						token_iat = body.token_iat;
						console.log("body.token_iat");
						console.log(body.token_iat);
						
						//on retourne à notre postman un résultat concluant

						response.status(201);
						response.json({ connexion: 'effectuée'});
					}

				}

				else 
				{
					//la requete de connexion vers CO2 n'as pas fonctionné
					response.status(500);
					response.json({ connexion: 'Prout'});
				}

			//A faire : else if token expiré on en redemande un autre
			});
		},

		//route /infos => requete permetant de récuperer les infos (nom prenom) d'une personne grâce à son N° de CB
		infos: function(req, response)
		{
			//utilisation du module request pour envoyer l'ID_carte à CO2
			request.get("https://sandbox.compteco2.com/v1/user/cards/?pan="+variables.ID_carte2,{

				//passage du token de connexion dans le header de la requete pour que CO2 sache qui nous sommes
				headers : {
					"Authorization" : "bearer "+token
				}
			}, function (error, res) 
			{		
				//si la requete de récuperation de données à bien fonctionné,
				if (res.statusCode === 200) 
				{
					//on parse le résultat du body en JSON
					var body = JSON.parse(res.body);
					//on récupère le prénom et le nom
					var prenom=body.firstName;
					var nom = body.lastName;

					//var fichier = "/var/www/html/log/"+variables.ID_carte2+".txt";
					//reception nom + prenom et écriture dans un fichier

					//on écrit dans un fichier les données récupéré
					fs.writeFile('/var/www/html/log/'+variables.ID_carte2+'.txt', 'prenom= '+prenom+' - nom= '+nom+' - id_carte = '+variables.ID_carte2, function (err) {
							//s'il n'y a pas d'erreur
							if (err) throw err;
							//on affiche en console shell nodejs le succès de l'écriture
							console.log('etudiant ecrit dans fichier /var/www/html/log/'+variables.ID_carte2+'.txt');
							//on retourne a postman ou au module NFC l'information comme quoi on a bien récupéré les données utilisateurs
							response.status(201);
							response.json({ 
								ecriture: 'faite',
								nom: nom,
								prenom: prenom,
								carte: variables.ID_carte2
							});
						});
				//Si la requete de récuperation de données chez CO2 n'as pas fonctionné
				} else {
					//affichange de l'erreur en shell nodejs
					if (error) throw error;
					//retour de l'erreur a postman/NFC
					response.status(500);
					response.json({ recup_data: 'Prout'});
				}
			});
		},

//*************************************************************************************************************************************************************************************************************
//************ Ci-dessus, les fonctions sont éclaté *******************************************
//************ Ci-dessous, On essais de tout rassembler dans un même processus*****************
//*********************************************************************************************


		remonte_id_carte_final: function(req, response) 
		{
			//remonté de l'ID_carte bancaire depuis le NFC
			//if (err) throw err;
			var ID_carte=req.body.id;
			//console.log("body.id_carte");
			//console.log(ID_carte);

			//On a l'id carte, on se connecte maintenant a CO2

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
						//console.log("body.token");
						//console.log(body.token);

						token_exp = body.token_exp;
						//console.log("body.token_exp");
						//console.log(body.token_exp);

						token_iat = body.token_iat;
						//console.log("body.token_iat");
						//console.log(body.token_iat);

						//Connexion effectué, on envoit maintenant l'ID carte

						request.get("https://sandbox.compteco2.com/v1/user/cards/?pan="+ID_carte,{

							headers : {
								"Authorization" : "bearer "+token
							}
						}, function (error, res) 
						{
							//console.log('res.statusCode');
							//console.log(res.statusCode);	
							if (res.statusCode === 200) 
							{
								var body = JSON.parse(res.body);
								var prenom=body.firstName;
								var nom = body.lastName;
								
								//reception nom + prenom et écriture dans un fichier
								console.log("id_carte");
								console.log(ID_carte);
								console.log("prenom");
								console.log(prenom);
								console.log("nom");
								console.log(nom);

								fs.writeFile('/var/www/html/log/'+ID_carte+'.txt', 'prenom= '+prenom+' - nom= '+nom+' - id_carte = '+ID_carte, function (err) {
										if (err) throw err;
										console.log('etudiant ecrit dans fichier /var/www/html/log/'+ID_carte+'.txt');
										response.status(201);
										response.json({ 
											ecriture: 'faite',
											nom: nom,
											prenom: prenom,
											carte: ID_carte
										});
									});
							} else {
								if (error) throw error;
								response.status(500);
								response.json({ recup_data: 'Prout'});
							}
						});
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
	};
