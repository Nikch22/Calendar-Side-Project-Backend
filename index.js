const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


const app = express();

//CORS
app.use( cors() )

//DB
dbConnection();

//Público
app.use( express.static('./public') )

//Lectura y parseo del body
app.use( express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );


//Si no es para la api, entonces redirige al frontend
app.use('*', ( req, res ) => {  
  res.sendFile( path.join( __dirname, '/public/index.html') );
} );



// Puerto
app.listen( process.env.PORT , () => {
  console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
  
} )