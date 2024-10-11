const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs'
  });

connection.connect((erro) =>{
    if(erro) {
        console.log("Deu erro:", erro.message);
        return;
    }
    console.log("Conectado com sucesso!")
})

connection.query("select 1+1 As funcionou",(erro,result) =>{
    if(erro){
    console.log("Deu erro:",erro.message)
    return;
    }
    console.log("Funcionou",result[0].funcionou)
});


connection.query("select nome,email from usuarios",(erro,result) =>{
    if(erro){
    console.log("Deu erro:",erro.message)
    return;
    }
    console.log("Results: ",result)
    console.log("nome: ",result[0].nome)
    console.log("Email:",result[0].email)
});

connection.end();
