'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailTransportConfigure = require('../lib/emailTransportConfigure');

// Creo el esquema 
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String
  });

  usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
    return bcrypt.hash(passwordEnClaro, 7);
  }

  usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
    return bcrypt.compare(passwordEnClaro, this.password);
  }

  usuarioSchema.methods.enviarEmail = async function(asunto, cuerpo) {
    
  const transport = await emailTransportConfigure();

    // Enviar el email
    const result = await transport.sendMail({
      from: process.env.EMAIL_SERVICE_FROM,
      to: this.email,
      subject: asunto,
      html: cuerpo
    });
    // generamos propiedad con el metodo del resultado de nodeMailer
    result.getTestMessageUrl = nodemailer.getTestMessageUrl(result);

    return result;

  }

// Creo el modelo 
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exporto el modelo
module.exports = Usuario;