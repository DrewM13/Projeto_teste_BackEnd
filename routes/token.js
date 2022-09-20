const jwt = require('jsonwebtoken')
const token = (req,res,next)=>{
    try{
        const decode = jwt.verify(req.headers.authorization,'secretKey')
        req.userData = decode
        next()
    }
    catch(error){
        return res.status(401).send({mensagem:'Falha na autenticação'})
    }
  }
  
  module.exports = token