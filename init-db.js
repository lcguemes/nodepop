'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
require('./lib/connectMongoose');

const {Anuncio, Usuario} = require('./models');

main().catch(err => console.log(err));

async function main(){
    // Inicializo la coleccion de anuncios
    await initAnuncios();

    // Inicializo la coleccion de usuarios
    await initUsuarios();

    mongoose.connection.close();
}

async function initAnuncios(){
    const { deletedCount } = await Anuncio.deleteMany();
    console.log(`Eliminados ${deletedCount} anuncios.`);

    const result = await Anuncio.insertMany([
        {
            "nombre": "Vendo Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "/images/bicicleta.jpg",
            "tags": [
                "lifestyle",
                "motor"
            ],
            "ciudad":"Cordoba"
        },
        {
            "nombre": "Busco iPhone 3Gs",
            "venta": false,
            "precio": 170.00,
            "foto": "/images/movil.png",
            "tags": [
                "lifestyle",
                "mobile"
            ],
            "ciudad":"Malaga"
        }
    ]);
    console.log(`Insertados ${result.length} anuncios.`);
}

async function initUsuarios(){
    const { deletedCount } = await Usuario.deleteMany();
    console.log(`Eliminados ${deletedCount} usuarios.`);

    const result = await Usuario.insertMany([
        {
            email:'luis@email.com',
            password: await Usuario.hashPassword('123456')
        },
        {
            email:'luis1@email.com',
            password: await Usuario.hashPassword('123456')
        }


    ]);
    console.log(`Insertados ${result.length} usuarios.`);
}
