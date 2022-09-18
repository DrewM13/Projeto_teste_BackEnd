const express = require('express')
const router = express.Router()
const mysql =require('../MySql').pool
const login = require('../routes/login')

//Cria o cliente
router.post('/AddClient',login,(req,res,next)=>{
  mysql.getConnection((err,conn)=>{
    if(err){return res.status(500).send({error:err})}
conn.query('SELECT * FROM DadosCliente' ,(error,results)=>{
  if(error){return res.status(500).send({error:error})}
  else{
    conn.query(`INSERT INTO DadosCliente(Nome, Telefone, Email, Celular, CPF) VALUES (?,?,?,?,?)`,[req.body.Nome,req.body.Telefone,req.body.Email,req.body.Celular,req.body.CPF],
(error,results)=>{
  conn.release()
  if(error){ return res.status(500).send({error:error})}
  response = {
    mensagem:'Cliente criado com sucesso',
    clienteCriado: {data:req.body}
  }
  return res.status(201).send(response)
})}
})
})
})
//Altera os dados do cliente
router.patch('/:idClient',login,(req,res,next)=>{
  mysql.getConnection((err,conn)=>{
    if(err){return res.status(500).send({error:err})}
conn.query('SELECT * FROM DadosCliente' ,(error,results)=>{
  if(error){return res.status(500).send({error:error})}
  else{
    conn.query(`UPDATE DadosCliente SET Nome = ?, Telefone=?, Email=?, Celular=?, CPF=? WHERE idClient =?`,[req.body.Nome,req.body.Telefone,req.body.Email,req.body.Celular,req.body.CPF,req.params.idClient],
(error,results)=>{
  conn.release()
  if(error){ return res.status(500).send({error:error})}
  response = {
    mensagem:'Cliente alterado com sucesso',
    clienteAlterado: {data:req.body}
  }
  return res.status(202).send(response)
})}
})
})
})
//Mostra todos os clientes
router.get('/',login,(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('SELECT * FROM DadosCliente;',
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(200).send({data:result})
        }
        )
    })
})
//Mostra somente o cliente do id
router.get('/:idClient',login,(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('SELECT * FROM DadosCliente WHERE idClient=?;',[req.params.idClient],
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(200).send({data:result})
        }
        )
    })
})
//Exclui um cliente
router.delete('/:idClient',login,(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('DELETE FROM DadosCliente WHERE idClient=?;',[req.params.idClient],
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(202).send({mensagem:'Cliente excluído com sucesso'})
        }
        )
    })
})




module.exports = router