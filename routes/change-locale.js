const express = require('express');
const { request } = require('../app');
const router = express.Router();

/**GET /change-locale */
router.get('/:locale', (req,res,next) => {

    // Recogemos al locale que queremos cambiar
    const locale = req.params.locale;
    // Ponemos una cookie en la respuesta que nos indique el idioma que me piden
    // metodo de express que permite definir cookie
    res.cookie('nodepop-locale',locale,{
        maxAge : 1000 * 60 * 24 * 30 // 1 mes
    });
    // Hacemos una redireccion a la misma pagina donde estaba el usuario
    res.redirect(req.get('referer'));
});

module.exports = router;