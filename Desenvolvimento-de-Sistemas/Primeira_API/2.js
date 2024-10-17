const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // Para trabalhar com JSON

let totalRequests = 0;
let requestsLast24Hours = [];

// Middleware para contar os requests
app.use((req, res, next) => {
  totalRequests++;
  const now = Date.now();
  requestsLast24Hours.push(now);
  requestsLast24Hours = requestsLast24Hours.filter(time => now - time < 24 * 60 * 60 * 1000);
  next();
});

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/meuapi')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error(err));

// Rota para exibir o dashboard
app.get('/', (req, res) => {
  res.send(`
    <h1>API Dashboard</h1>
    <p>Total de Requests: ${totalRequests}</p>
    <p>Requests nas Últimas 24 Horas: ${requestsLast24Hours.length}</p>
    <p>Use qualquer caminho como /<recurso> para criar ou interagir com novos recursos dinamicamente.</p>
    <h2>Exemplo de Rotas</h2>
    <ul>
      <li>GET /usuarios</li>
      <li>POST /vagas</li>
    </ul>
    <button onclick="confirmReset()">Resetar API</button>
    <script>
      function confirmReset() {
        if (confirm('Tem certeza de que deseja excluir todos os dados?')) {
          fetch('/reset', { method: 'DELETE' })
            .then(response => response.json())
            .then(data => alert(data.message));
        }
      }
    </script>
  `);
});

// Rota para resetar a API (deletar dados)
app.delete('/reset', (req, res) => {
  mongoose.connection.db.dropDatabase(() => {
    res.json({ message: 'Todos os dados foram excluídos.' });
  });
});

// Função para lidar com recursos dinâmicos
app.use('/:collection', async (req, res, next) => {
  const collectionName = req.params.collection; // Pega o nome da coleção da URL
  const method = req.method;
  
  // Acessa a coleção dinamicamente
  const collection = mongoose.connection.db.collection(collectionName);

  try {
    if (method === 'GET') {
      // Pega todos os documentos da coleção
      const data = await collection.find().toArray();
      res.json(data);
    } else if (method === 'POST') {
      // Insere um novo documento na coleção
      const newItem = req.body;
      await collection.insertOne(newItem);
      res.status(201).json(newItem);
    } else if (method === 'PUT') {
      // Atualiza um documento na coleção (usando _id no corpo da requisição)
      const { _id, ...rest } = req.body;
      await collection.updateOne({ _id: mongoose.Types.ObjectId(_id) }, { $set: rest });
      res.json({ message: 'Item atualizado com sucesso!' });
    } else if (method === 'DELETE') {
      // Deleta um documento da coleção (usando _id no corpo da requisição)
      const { _id } = req.body;
      await collection.deleteOne({ _id: mongoose.Types.ObjectId(_id) });
      res.json({ message: 'Item deletado com sucesso!' });
    } else {
      res.status(405).json({ message: 'Método não permitido!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Porta para a API rodar
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
