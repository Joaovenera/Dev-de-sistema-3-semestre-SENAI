const mysql = require('mysql2');

// Configuração da conexão
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
});

// Verifica se o banco de dados existe, se não existir cria
const setupDatabase = async () => {
  connection.query(`CREATE DATABASE IF NOT EXISTS API_controle_estoque`, (err) => {
    if (err) throw err;
    console.log('Banco de dados API_controle_estoque verificado/criado.');

    // Usando o banco de dados criado
    connection.query(`USE API_controle_estoque`, (err) => {
      if (err) throw err;
      
      // Verifica e cria a tabela mercado
      const mercadoTable = `
        CREATE TABLE IF NOT EXISTS mercado (
          id INT NOT NULL AUTO_INCREMENT,
          nome VARCHAR(255) NOT NULL,
          endereco VARCHAR(255),
          PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
      `;
      connection.query(mercadoTable, (err) => {
        if (err) throw err;
        console.log('Tabela mercado verificada/criada.');

        // Verifica e cria a tabela produto
        const produtoTable = `
          CREATE TABLE IF NOT EXISTS produto (
            id INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL,
            descricao VARCHAR(255),
            preco DECIMAL(10,2) NOT NULL,
            quantidade INT NOT NULL,
            id_mercado INT DEFAULT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (id_mercado) REFERENCES mercado(id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `;
        connection.query(produtoTable, (err) => {
          if (err) throw err;
          console.log('Tabela produto verificada/criada.');

          // Verifica e cria a tabela movimentacao
          const movimentacaoTable = `
            CREATE TABLE IF NOT EXISTS movimentacao (
              id INT NOT NULL AUTO_INCREMENT,
              tipo ENUM('entrada', 'saída') NOT NULL,
              quantidade INT NOT NULL,
              data_movimentacao DATE DEFAULT NULL,
              id_produto INT NOT NULL,
              PRIMARY KEY (id),
              FOREIGN KEY (id_produto) REFERENCES produto(id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
          `;
          connection.query(movimentacaoTable, (err) => {
            if (err) throw err;
            console.log('Tabela movimentacao verificada/criada.');
          });
        });
      });
    });
  });
};

// Exportando a função para ser usada no servidor
module.exports = setupDatabase;
