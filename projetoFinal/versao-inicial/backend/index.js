const app = require('express')();
const port = 3000;
const consign = require("consign");
const db = require('./config/db');
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db;
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(port, () =>{
    console.log("Servidor Backend Rodando: http://localhost:" + port)
})