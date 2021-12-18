const express = require('express');
const router = express.Router();

/**GET /privado */
router.get('/', (req,res,next) => {

    if(!req.session.usuarioLogado){
        res.redirect('/login');
        return;
    }
    res.render('privado')
});

module.exports = router;