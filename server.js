var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
 // mongoose = require('mongoose'),
 // APIRest = require('./api/models/APIRestModels'), //créer un modèle
  bodyParser = require('body-parser');
  
//  url de connexion à l'instance mongoose
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/APIRestdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/APIRestRoutes'); //importe la route
routes(app); //créer la route


app.listen(port);


console.log(' APIRest server started on: ' + port);