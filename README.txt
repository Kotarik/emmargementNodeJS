Afin d'utiliser cette API REST il est nécéssaire de se connecter sur http://88.185.195.174:3000

Si le serveur nodeJs est planter, ne pas hésiter a me demander de le redémarrer

Les requettes fonctionnelles sont les suivantes : 
	get all films
	url :
		http://88.185.195.174:3000/film

	post creation de film
	url : 
		http://88.185.195.174:3000/film
	body :
		{
		  "film": "oui-oui",
		  "auteur": "un auteur"
		}

	post creation commentaire (les commentaires sont aux films par l'id du film)
	url : 
		http://localhost:3000/film/5a70aac060b2c0256c0ee117/commentaire
	body : 
		{
		  "filmId": "5a70aac060b2c0256c0ee117",
		  "text": "bonne critique"
		}

	get film by id
	url :
		http://localhost:3000/film/5a70aac060b2c0256c0ee117

	Erreure connu : 
	Lorsque l'on renvoi un mauvais ID (bonne longeur de caractère) une erreur 500 est bien renvoyé.
	Lorsque l'on renvoi un mauvais ID (mauvaise longueur de caractère,) une erreur 200 est malheureusement envoyé.

	
