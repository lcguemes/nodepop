'use strict';

const nodemailer = require('nodemailer');

module.exports = async function() {
    // Desarrollo
    const testAccount = await nodemailer.createTestAccount();
    
    // Transporte
    const developTransport = {
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }      
    };

    const prodTransport = {
        service: process.env.EMAIL_SERVICE_NAME,
        auth: {
            user: process.env.EMAIL_SERVICE_USER, 
            pass: process.env.EMAIL_SERVICE_PASS,
        } 
    };

    const activeTransport = process.env.NODE_ENV === 'production' ?
    prodTransport:    
    developTransport;
    
    // TODO: Solucionar el problema que porque nos llega el process.env.NODE_ENV vacio
    //console.log('process.env.NODE_ENV', process.env.NODE_ENV);

    const transport = nodemailer.createTransport(activeTransport);

    return transport;

}