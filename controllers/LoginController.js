'use strict';

const jwt = require('jsonwebtoken');
const { Usuario } = require('../models'); 

class LoginController{

    index(req,res,next){
        res.locals.error = '';
        res.render('login');
    }

    async post(req,res,next){
        try{
            const { email, password } = req.body;

            //buscar el usuario en la bd
            const usuario = await Usuario.findOne({email})

            //sino lo encuentro o no existe en la bd o pw es diferente, mostramos error 
            //usuario compare nos devuelve una promesa
            if(!usuario || !(await usuario.comparePassword(password)) ){ 
                res.locals.error = res.__('Invalid credentials');
                res.render('login');
                return;
            }

            // si lo encuentro y la contraseña coincide
            // --> Apuntar en su sesion que esta autenticado (sabemos quien es)
            // --> lo redirigimos a la zona privada

            req.session.usuarioLogado = {
                _id: usuario._id
            };

            // Enviamos un email al usuario
            const result = await usuario.enviarEmail('Asunto', 'Bienvenido a NodePop');
            console.log('Mensaje enviado', result.messageId);
            console.log('Ver mensaje: ', result.getTestMessageUrl);
            
            res.redirect('/privado');
        }catch (err){
            next(err)
        }
        
    }

    logout(req, res, next){
        req.session.regenerate(err=> {
            if(err){
                next(err);
                return;
            }
        })

        res.redirect('/');

    }

    // POST /apiv1/login
    async postJWT(req,res,next){
        try{
            const {email,password} = req.body;

            //buscar el usuario en la bd
            const usuario = await Usuario.findOne({email})

            //sino lo encuentro o no existe en la bd o pw es diferente, mostramos error 
            //usuario compare nos devuelve una promesa
            if(!usuario || !(await usuario.comparePassword(password)) ){ 
                res.json({ error: 'Invalid credentials' });
                return;
            }

            // Si el usuario existe y valida la contraseña 
            //Creamos un JWT que incluya el _id del usuario
            jwt.sign({ _id: usuario._id },process.env.JWT_SECRET, { 
                expiresIn:'2h' 
            }, (err,jwtToken)=>{
                if(err){
                    next();
                    return;
                }

                // Devolver el token generado
                res.json({ token: jwtToken })
            });

        }catch(err){
            next();
        }

    }

}

module.exports = LoginController;