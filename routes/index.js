var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');

/* GET home page. */

router.get('/',async(req,res,next)=>{
  //Usamos i18n en un controlador, por defecto viene siempre en res
  res.locals.ejemplo=res.__('this is an example');
  try{
      // lista es nuestro metodo static creado en el modelo Anuncio
      const anuncios = await Anuncio.find();
      //res.json({results: anuncios});
      res.render('index',{anuncios :anuncios});
  }catch(err){
      next(err);
  }
});
module.exports = router;
