'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');
const {body, validationResult} = require('express-validator');

// GET /api/anuncios
// Devuelve una lista de anuncios
router.get('/',async(req,res,next)=>{
    try{
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const tags = req.query.tags;
        const precio = req.query.precio;
        const ciudad = req.query.ciudad;

        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const select = req.query.select; 
        const sort = req.query.sort;

        console.log('El usuario tiene el _id: ', req.apiAuthUserId);

        const filtro = {};
        // Cambio por if ternario
        //if(venta) { filtro.venta = venta; }
        nombre ? filtro.nombre = nombre : filtro;
        venta ? filtro.venta = venta: filtro;
        tags ? filtro.tags = tags:filtro;

        if(precio){
            let rango = precio.split('-')
            console.log(rango)
            if(rango[0]!=='' & rango[1]!==''){
                filtro.precio ={$gte:rango[0],$lte:rango[1]}
            }else if (rango[0]!=='' & rango[1]===''){
                filtro.precio ={$gte:rango[0]}
            }else if(rango[0]==='' & rango[1]!==''){
                filtro.precio ={$lte:rango[1]}
            }   
        }
        ciudad ? filtro.ciudad = ciudad:filtro;


        // lista es nuestro metodo static creado en el modelo Anuncio
        const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort);
        res.json({results: anuncios});
    }catch(err){
        next(err);
    }

});

// /api/anuncios:id
// Obtener anuncio por ID
router.get('/buscar/:identificador', async(req, res, next)=>{
    try{
        const _id = req.params.identificador;

        const anuncio = await Anuncio.find({_id:_id});
        res.json({result:anuncio});

    }catch(err){
        next(err);
    }
});


// CREATE /api/anuncios/new-anuncio (body)
// Crear un anuncio

router.post('/nuevo',async(req, res, next)=>{
    try{
        const anuncioData = req.body;

        const anuncio = new Anuncio(anuncioData); // Creamos objeto anuncio en memoria

        const anuncioCreado = await anuncio.save();
        res.status(201).json({result:anuncioCreado});

    }catch(err){
        next(err);
    }
});

// DELETE /api/anuncios:id
// Elimina un anuncio
router.delete('/borrar/:id',async(req, res, next)=>{
    try{
        const _id = req.params.id;

        await Anuncio.deleteOne({_id:_id});
        res.json();

    }catch(err){
        next(err);
    }
});


// UPDATE /api/anuncios:id
// Elimina un anuncio
router.put('/modificar/:id',async(req, res, next)=>{
    try{
        const _id = req.params.id;
        const anuncioData = req.body;
        const anuncioActualizado = await Anuncio.findOneAndUpdate({_id:_id}, anuncioData,{
            new:true //devolvemos el estado final del documento
        });

        if(!anuncioActualizado){
            res.status(404).json({error:'not found'})
            return;
        }

        res.json({result: anuncioActualizado});

    }catch(err){
        next(err);
    }
});

module.exports = router;