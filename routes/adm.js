const express = require('express')
const router = express.Router()
const mysql =require('../MySql').pool

//Cria o usuário
router.post('/AddUser',(req,res,next)=>{
  mysql.getConnection((err,conn)=>{
    if(err){return res.status(500).send({error:err})}
conn.query('SELECT * FROM Adm_users' ,(error,results)=>{
  if(error){return res.status(500).send({error:error})}
  else{
    conn.query(`INSERT INTO Adm_users(Usuario, Senha, EditarCriar, Excluir, Adm,Email) VALUES (?,?,?,?,?,?)`,[req.body.Usuario,req.body.Senha,req.body.EditarCriar,req.body.Excluir,req.body.Adm, req.body.Email],
(error,results)=>{
  conn.release()
  if(error){ return res.status(500).send({error:error})}
  response = {
    mensagem:'Usuário criado com sucesso',
    usuarioCriado: {data:req.body}
  }
  return res.status(201).send(response)
})}
})
})
})
//Altera os dados do usuário
router.patch('/:idAdm',(req,res,next)=>{
  mysql.getConnection((err,conn)=>{
    if(err){return res.status(500).send({error:err})}
conn.query('SELECT * FROM Adm_users' ,(error,results)=>{
  if(error){return res.status(500).send({error:error})}
  else{
    conn.query(`UPDATE Adm_users SET Usuario = ?, Senha=?, EditarCriar=?, Excluir=?, Adm=?, Email=? WHERE idAdm =?`,[req.body.Usuario,req.body.Senha,req.body.EditarCriar,req.body.Excluir,req.body.Adm, req.body.Email,req.body.idAdm],
(error,results)=>{
  conn.release()
  if(error){ return res.status(500).send({error:error})}
  response = {
    mensagem:'Usuário alterado com sucesso',
    usuarioAlterado: {data:req.body}
  }
  return res.status(202).send(response)
})}
})
})
})
//Mostra todos os usuários
router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Adm_users;',
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(200).send({data:result})
        }
        )
    })
})
//Mostra somente o usuário do id
router.get('/:idAdm',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Adm_users WHERE idAdm=?;',[req.params.idAdm],
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(200).send({data:result})
        }
        )
    })
})
//Exclui um usuário
router.delete('/:idAdm',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('DELETE FROM Adm_users WHERE idAdm=?;',[req.params.idAdm],
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(202).send({mensagem:'Usuário excluído com sucesso'})
        }
        )
    })
})




module.exports = router