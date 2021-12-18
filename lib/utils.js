'use strict';

function isAPIRequest(req){
    console.log(req.originalUrl);
    return req.originalUrl.startsWith('/api/')
  };


  module.exports = {
      isAPIRequest
  }