Pour le moment, cette API REST est utilis� en local sur une VM.

Il est n�c�ssaire de faire un "npm install" apr�s avoir t�l�charg� le projet

Le serveur tourne sur le port 3000

Les donn�es de CB sont simul�es en variables locales

Les requettes sont les suivantes : 

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
	
	get pour r�cuperer des infos
	url :
		http://localhost:3000/infos
	retour : nom : xxx
			 prenom : xxx
	
	
