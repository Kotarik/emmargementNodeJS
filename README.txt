Pour le moment, cette API REST est utilisé en local sur une VM.

Il est nécéssaire de faire un "npm install" après avoir téléchargé le projet

Le serveur tourne sur le port 3000

Les données de CB sont simulées en variables locales

Les requettes sont les suivantes : 

	post remonté de l'id carte
	url :
		http://localhost:3000/id_carte

	body :
		{
		  "id": 123456
		}

	get racine afin de tester le bon fonctionnement du serveur nodeJS
	url:
		http://localhost:3000/
	retour : "Houra !"


	get connexion à l'API distante 
	url : 
		http://localhost:3000/connexion
	retour :  "Connexion : effectuée"
	
	get pour récuperer des infos
	url :
		http://localhost:3000/infos
	retour : nom : xxx
			 prenom : xxx
	
	
