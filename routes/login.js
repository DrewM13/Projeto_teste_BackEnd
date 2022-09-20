const express = require('express')
const router = express.Router()
const mysql =require('../MySql').pool
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')

router.post('/',(req,res,next)=>{
  mysql.getConnection((error,conn)=>{
    if(error){return res.status(500).send({error:error})}
    const query='SELECT * FROM Users WHERE email=?'
    conn.query(
     query,[req.body.email],
      (error,result,field)=>{
        conn.release()
        if(error){res.status(500).send({error:error})}

        if(result.length<1){return res.status(401).send({mensagem:'Falha na autenticação'})}
        if(req.body.password !== result[0].password){return res.status(403).send({mensagem:'Falha na autenticação'})}

         if(result){
          let token = jwt.sign({
            idUsers:result[0].idUsers,
            email:result[0].email
          }, 'secretKey',{expiresIn:'1h'})
          return res.status(200).send({mensagem:'Autenticado com sucesso', token:token})}
      }
    )
  })
})

// router.post('/NewUser',(req,res,next)=>{
//   mysql.getConnection((err,conn)=>{
//     if(err){return res.status(500).send({error:err})}
//     bcrypt.hash(req.body.UserPW,10,(errBcrypt,hash)=>{
// if(errBcrypt){return res.status(500).send({error:errBcrypt})}
// conn.query('SELECT * FROM Users WHERE UserMail=?',[req.body.UserMail],(error,results)=>{
//   if(error){return res.status(500).send({error:error})}
//   if(results.length>0){
//     res.status(409).send({ mensagem:"Usuário já cadastrado"})
//   }
//   else{
//     conn.query(`INSERT INTO Users(UserMail,UserPW) VALUES (?,?)`,
// [req.body.UserMail,hash],
// (error,results)=>{
//   conn.release()
//   if(error){ return res.status(500).send({error:error})}
//   response = {
//     mensagem:'Usuário criado com sucesso',
//     usuarioCriado: {email:req.body.NewUserMail, id_usuario: results.insertId}
//   }
//   return res.status(201).send(response)
// }
// )

//   }
// })

//     })
//   })
//   })

// router.post('/login',(req,res,next)=>{
//   mysql.getConnection((error,conn)=>{
//     if(error){return res.status(500).send({error:error})}
//     const query='SELECT * FROM Users WHERE UserMail=?'
//     conn.query(
//      query,[req.body.UserMail],
//       (error,result,field)=>{
//         conn.release()
//         if(error){res.status(500).send({error:error})}

//         if(result.length<1){return res.status(401).send({mensagem:'Falha na autenticação'})}

//         bcrypt.compare(req.body.UserPW,result[0].UserPW,(error,result)=>{
          
//           if(error){ return res.status(401).send({mensagem:'Falha na autenticação'})}

//          if(result){ return res.status(200).send({mensagem:'Autenticado com sucesso'})}

//          return res.status(401).send({mensagem:'Falha na autenticação'})
//         })
//       }
//     )
//   })
// })





module.exports = router