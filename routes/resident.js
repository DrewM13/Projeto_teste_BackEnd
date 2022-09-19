const express = require('express')
const router = express.Router()
const mysql =require('../MySql').pool
const token = require('../routes/token')

//Cria o cliente
router.post('/AddResident',token,(req,res,next)=>{
  mysql.getConnection((err,conn)=>{
    if(err){return res.status(500).send({error:err})}
conn.query('SELECT * FROM DadosCliente' ,(error,results)=>{
  if(error){return res.status(500).send({error:error})}
  else{
    conn.query(`INSERT INTO Residents(name) VALUES (?)`,[req.body.name],
(error,results)=>{
  conn.release()
  if(error){ return res.status(500).send({error:error})}
  response = {
    mensagem:'Residente criado com sucesso',
    moradorCriado: {data:req.body}
  }
  return res.status(201).send(response)
})}
})
})
})
//Altera os dados do cliente
router.patch('/:idResident',token,(req,res,next)=>{
  mysql.getConnection((err,conn)=>{
    if(err){return res.status(500).send({error:err})}
conn.query('SELECT * FROM Residents' ,(error,results)=>{
  if(error){return res.status(500).send({error:error})}
  else{
    conn.query(`UPDATE Residents SET name = ?WHERE idClient =?`,[req.body.Nome,req.params.idResidents],
(error,results)=>{
  conn.release()
  if(error){ return res.status(500).send({error:error})}
  response = {
    mensagem:'Residente alterado com sucesso',
    clienteAlterado: {data:req.body}
  }
  return res.status(202).send(response)
})}
})
})
})
//Mostra todos os clientes
router.get('/',token,(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Residents;',
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(200).send({data:result})
        }
        )
    })
})
//Mostra somente o cliente do id
router.get('/:idResidents',token,(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('SELECT * FROM Residents WHERE idResidents=?;',[req.params.idResidents],
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(200).send({data:result})
        }
        )
    })
})
//Exclui um cliente
router.delete('/:idResidents',token,(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        if(error){ return res.status(500).send({error:error})}
        conn.query('DELETE FROM Residents WHERE idResident=?;',[req.params.idResidents],
        (error,result,fields)=>{
            if(error){ return res.status(500).send({error:error})}
            return res.status(202).send({mensagem:'Residente excluído com sucesso'})
        }
        )
    })
})




module.exports = router