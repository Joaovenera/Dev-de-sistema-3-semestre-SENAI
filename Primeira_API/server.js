const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json()); // Para trabalhar com JSON

// Carregar o estado do arquivo state.json
let state = {
  totalRequests: 0,
  requestsLast24Hours: [],
  createdResources: new Set()
};

// Função para salvar o estado no arquivo
const saveState = () => {
  fs.writeFileSync('state.json', JSON.stringify({
    totalRequests: state.totalRequests,
    requestsLast24Hours: state.requestsLast24Hours,
    createdResources: Array.from(state.createdResources)
  }, null, 2));
};

// Função para carregar o estado do arquivo
const loadState = () => {
  if (fs.existsSync('state.json')) {
    const savedState = JSON.parse(fs.readFileSync('state.json', 'utf-8'));
    state.totalRequests = savedState.totalRequests || 0;
    state.requestsLast24Hours = savedState.requestsLast24Hours || [];
    state.createdResources = new Set(savedState.createdResources || []);
  }
};

// Carregar o estado inicial quando a API começa
loadState();

// Middleware para contar os requests
app.use((req, res, next) => {
  state.totalRequests++;
  const now = Date.now();
  state.requestsLast24Hours.push(now);

  // Remover requests que ocorreram há mais de 24 horas
  state.requestsLast24Hours = state.requestsLast24Hours.filter(time => now - time < 24 * 60 * 60 * 1000);

  saveState();  // Salvar o estado atualizado
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
  let resourcesList = Array.from(state.createdResources).map(resource => {
    return `<li><a href="/${resource}">${resource}</a></li>`;
  }).join('');

  if (!resourcesList) {
    resourcesList = '<p>Nenhum recurso criado até o momento.</p>';
  }

  res.send(`
    <h1>API Dashboard</h1>
    <p>Total de Requests: ${state.totalRequests}</p>
    <p>Requests nas Últimas 24 Horas: ${state.requestsLast24Hours.length}</p>
    <p>Recursos criados:</p>
    <ul>${resourcesList}</ul>
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

// Função genérica para lidar com recursos dinâmicos
const getCollection = (resource) => {
  return mongoose.connection.collection(resource);
};

// CREATE - POST (Criar um novo recurso dinamicamente)
app.post('/:resource', async (req, res) => {
  try {
    const resource = req.params.resource;
    state.createdResources.add(resource); // Adiciona o nome do recurso à lista
    const collection = getCollection(resource);  // Usar a coleção dinâmica
    const result = await collection.insertOne(req.body);
    saveState(); // Salvar o estado atualizado
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

// Rota para resetar a API (excluir os recursos criados)
app.delete('/reset', async (req, res) => {
  try {
    // Percorre cada recurso criado e apaga todas as coleções
    for (const resource of state.createdResources) {
      const collection = getCollection(resource);
      await collection.drop(); // Exclui a coleção inteira
    }

    // Reinicia o estado da API
    state = {
      totalRequests: 0,
      requestsLast24Hours: [],
      createdResources: new Set()
    };
    saveState(); // Salvar o estado resetado
    res.send('Todos os dados foram excluídos e a API foi resetada!');
  } catch (error) {
    res.status(500).send('Erro ao resetar a API: ' + error.message);
  }
});

// Porta para a API rodar
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
