const express = require("express");
const helmet = require('helmet');

const db = require("../data/dbConfig.js");
const accountsRouter = require('../api/accountsRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger);



server.get('/', (req, res) => {
    res.status(200).json(`Success!!! Your Server Is Up and Running!!!!`)
})

server.use('/api/accounts', accountsRouter);

server.use(notFound);

function logger(req, res, next){
    const method = req.method;
    const endpoint = req.originalUrl;
    
    console.log(`${method} to ${endpoint} at ${new Date().toISOString()}`);
    next();
}

function notFound(req, res, next){
    res.status(404).json({errorMessage: "Oops, we didn't find what you're looking for!"})
}

module.exports = server;