'use strict';

const mongoose = require('mongoose');

mongoose.connection.on('error',err=>{
    console.log('Error de conexion');
    process.exit(1);
});

mongoose.connection.once('open', ()=>{
    //console.log('Conectado a MongoDB a la BD: ',mongoose.connection.name);
});


// No hace falta especificar el puerto si conectamos mongo esta en puerto estandar
mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});  


module.exports = mongoose.connection;