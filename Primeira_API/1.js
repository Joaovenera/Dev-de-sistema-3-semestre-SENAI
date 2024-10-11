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

  // Remover requests que ocorreram há mais de 24 horas
  requestsLast24Hours = requestsLast24Hours.filter(time => now - time < 24 * 60 * 60 * 1000);

  next();
});

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/meuapi')
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch(err => console.error(err));

// Rota para exibir o dashboard
app.get('/', (req, res) => {
  res.send(`
    <h1>API Dashboard</h1>
    <p>Total de Requests: ${totalRequests}</p>
    <p>Requests nas Últimas 24 Horas: ${requestsLast24Hours.length}</p>
    <p>Use a API adicionando qualquer <b>recurso</b> na URL: <code>/seu-recurso</code></p>
  `);
});

// Função genérica para lidar com recursos dinâmicos
const getCollection = (resource) => {
  return mongoose.connection.collection(resource);
};

// CREATE - POST (Criar um novo recurso dinamicamente)
app.post('/:resource', async (req, res) => {
  try {
    const resource = req.params.resource;
    const collection = getCollection(resource);  // Usar a coleção dinâmica
    const result = await collection.insertOne(req.body);
    res.status(201).send(result.ops[0]);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ - GET all (Ler todos os documentos de um recurso)
app.get('/:resource', async (req, res) => {
  try {
    const resource = req.params.resource;
    const collection = getCollection(resource);
    const documents = await collection.find({}).toArray();
    res.send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ - GET by ID (Ler um documento específico por ID)
app.get('/:resource/:id', async (req, res) => {
  try {
    const resource = req.params.resource;
    const collection = getCollection(resource);
    const document = await collection.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!document) return res.status(404).send();
    res.send(document);
  } catch (error) {
    res.status(500).send(error);
  }
});

// UPDATE - PUT (Atualizar um documento específico por ID)
app.put('/:resource/:id', async (req, res) => {
  try {
    const resource = req.params.resource;
    const collection = getCollection(resource);
    const result = await collection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!result.value) return res.status(404).send();
    res.send(result.value);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE - DELETE (Excluir um documento específico por ID)
app.delete('/:resource/:id', async (req, res) => {
  try {
    const resource = req.params.resource;
    const collection = getCollection(resource);
    const result = await collection.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!result.value) return res.status(404).send();
    res.send(result.value);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Porta para a API rodar
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
