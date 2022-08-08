const express = require('express')
const cors= require('cors')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Header','Origin','X-Requested-With','Content-Type','Accept','Authorization')

    if(req.method ==='OPTIONS'){
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH');
        return res.status(200).send({

        })
    }
    app.use(cors());
    next();
});
const rotaLogin = require('./routes/login')
app.use('/credentials',rotaLogin)

module.exports = app