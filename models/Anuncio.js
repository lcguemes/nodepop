'use strict';

const mongoose = require('mongoose');

// Definimos esquema
const anuncioSchema = mongoose.Schema({
	//name:{type: String, index: true}
    nombre: String,
	venta: Boolean,
	// TODO cambiar a decimal con formato 2 decimales
    precio: Number, 
	foto: String,
	tags: [String],
	ciudad: String
	},{
		collection:'anuncios'
	});

	// Metodo static del modelo Anuncio
anuncioSchema.statics.lista = function(filtro, skip, limit, select, sort){
	const query = Anuncio.find(filtro); // devuelve query
	query.skip(skip);
	query.limit(limit);
	query.select(select);
	query.sort(sort);
	return query.exec();
}

// Creamos modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exportamos modelo (opcional)
module.exports = Anuncio;
