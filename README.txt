Pour le moment, cette API REST est utilisé en local sur une VM.

Les requettes fonctionnelles sont les suivantes : 

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

	
Les requetes en cours de développement:

	post connexion à l'API distante 
	url : 
		http://localhost:3000/connexion
	body : 
		{
		  ... a venir...
		}

	get pour récuperer des infos
	url :
		http://localhost:3000/infos

	
	
