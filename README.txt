Pour le moment, cette API REST est utilis� en local sur une VM.

Les requettes fonctionnelles sont les suivantes : 

	post remont� de l'id carte
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


get connexion � l'API distante 
	url : 
		http://localhost:3000/connexion
	retour :  "Connexion : effectu�e"
	
Les requetes en cours de d�veloppement:

	get pour r�cuperer des infos
	url :
		http://localhost:3000/infos
	retour : nom : xxx
			 prenom : xxx
	
	
