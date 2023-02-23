
const express = require("express");


const logMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} - ${new Date()}`);
    next();
}
  
module.exports = 
    {
        logMiddleware
    }