const express = require('express')
const cors= require('cors')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Header','Origin','X-Requested-With','Content-Type','Accept','Authorization')
    res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    if(req.method ==='OPTIONS'){
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH');
        return res.status(200).send({

        })
    }
    app.use(cors());
    next();
});
const rotaLogin = require('./routes/login')
const rotaResident = require('./routes/resident')
const rotaAdm = require('./routes/adm')

app.use('/credentials', rotaLogin)
app.use('/resident', rotaResident)
app.use('/adm', rotaAdm)

module.exports = app