Pour le moment, cette API REST est utilis� en local sur une VM.

Pour faire fonctionner le projet il est n�c�ssaire de : 
	- Creer l'arborescence suivante : 	/var/www/html/emmargementNodeJS
	- Faire un git clone dans : 		/var/www/html/emmargementNodeJS
	- Creer le dossier suivant : 		/var/www/html/emmargementNodeJS/log
	- Installer npm et faire un "npm install" apr�s avoir t�l�charg� le projet

Le serveur tourne sur le port 3000

Les donn�es de CB sont pouss� sur l'API via postman

Les requettes s�par�e permettent de se tester ind�pendament les unes des autres. Elles sont les suivantes : 

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




La requete finale est la suivante :

	post remont� de l'id carte et connexion + questionnement C02
	url:
		http://localhost:3000/id_carte_final
	retour: 
		{
    		  "ecriture": "faite",
    		  "nom": "Sims",
    		  "prenom": "Dam",
    		  "carte": "5469234684536946"
		}
