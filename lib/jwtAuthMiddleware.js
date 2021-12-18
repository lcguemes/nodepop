'use strict';

const jwt = require('jsonwebtoken');
// Devuelve middleware

module.exports = (req, res, next)=>{
    // Recoger el JWT de la cabecera u otros sitios
    const jwtToken = req.get('Authorization') || req.query.token || req.body.token;

    // Comprobar que tengo token
    if(!jwtToken){
        const error = new Error('No token provided');
        error.status = 401;
        next(error);
        return;
    }

    // Comprobar que el token es valido
    jwt.verify(jwtToken, process.env.JWT_SECRET,(err, payload) => {
        if(err){
            err.message = 'Invalid Token';
            err.status = 401;
            next(err);
            return;
        }

        //console.log({payload});
        // Pasamos al request la propiedad _id
        req.apiAuthUserId = payload._id
        // Si es valido, continuar
        next(); 

    });

};