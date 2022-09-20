const express = require('express')
const router = express.Router()
const mysql =require('../MySql').pool
const token = require('../routes/token')

//Cria o usuário
router.post('/AddUser',token,(req,res,next)=>{
  mysql.getConnection((err,conn)=>{
    if(err){return res.status(500).send({error:err})}
conn.query('SELECT * FROM Users' ,(error,results)=>{
  if(error){return res.status(500).send({error:error})}
  else{
    conn.query(`INSERT INTO Users(username, password, Adm,email) VALUES (?,?,?,?)`,[req.body.username,req.body.password,req.body.Adm, req.body.email],
(error,results)=>{
  conn.release()
  if(error){ return res.status(500).send({error:error})}
  response = {
    mensagem:'Usuário criado com sucesso',
    usuarioCriado: {data:req.body.data}
  }
  return res.status(201).send(response)
})}
})
})
})
//Altera os dados do usuário
router.put('/:idUsers',token,(req,res,next)=>{
  mysql.getConnection((err,conn)=>{
    if(err){return res.status(500).send({error:err})}
conn.query('SELECT * FROM Users' ,(error,results)=>{
  if(error){return res.status(500).send({error:error})}
  else{
    conn.query(`UPDATE Users SET username = ?, password=?, Adm=?, email=? WHERE idUsers =?`,[req.body.username,req.body.password,req.body.Adm, req.body.email,req.body.idUsers],
(error,results)=>{
  conn.release()
  if(error){ return res.status(500).send({error:error})}
  response = {
data:req.body
  }
  return res.status(202).send(response)
})}
})
})
})
//Mostra todos os usuários
router.get('/',token,(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Users;',
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(200).send({data:result})
        }
        )
    })
})
//Mostra somente o usuário do id
router.get('/:idUsers',token,(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Users WHERE idUsers=?;',[req.params.idUsers],
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(200).send({data:result})
        }
        )
    })
})
//Exclui um usuário
router.delete('/:idUsers',token,(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('DELETE FROM Users WHERE idUsers=?;',[req.params.idUsers],
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(202).send({mensagem:'Morador excluído com sucesso'})
        }
        )
    })
})
module.exports = router