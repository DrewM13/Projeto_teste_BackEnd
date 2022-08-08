const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem:'Usando o GET dentro da rota de login'
    })
})
router.post('/',(req,res,next)=>{
  const login ={ Email: req.body.Email, PassWord: req.body.PassWord}
  res.status(200).send({
    mensagem:'Login realizado com sucesso!',
    LoginSuccess: login
})
})

module.exports = router