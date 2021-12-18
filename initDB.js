'use strict';

// Conexion a la base de datos
const dbConnection = require('./lib/connectMongoose');

// Modelo de anuncios
const Anuncio = require('./models/Anuncio');
const anuncioData = require('./anunciosIniciales.json');

main().catch(err=>console.log('Hubo un error', err));

async function main(){
    await initAnuncios();

    dbConnection.close(); 
}

async function initAnuncios(){
    // Elimino todos los documentos de la coleccion anuncios
    const deleted = await Anuncio.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} anuncios`);

    // Crear anuncios iniciales
    //console.log(anuncioData);
    const anuncios = await Anuncio.insertMany(anuncioData.anuncios);
    console.log(`Creados ${anuncios.length} anuncios`);
}

