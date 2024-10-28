const db = require('../config/db');

// Listar todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produto');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obter um único produto
exports.getProdutoById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produto WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Criar um novo produto
exports.createProduto = async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;
  try {
    const [result] = await db.query('INSERT INTO produto (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?)', [nome, descricao, preco, quantidade]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar um produto
exports.updateProduto = async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;
  try {
    const [result] = await db.query('UPDATE produto SET nome = ?, descricao = ?, preco = ?, quantidade = ? WHERE id = ?', [nome, descricao, preco, quantidade, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar um produto
exports.deleteProduto = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM produto WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//////////////////////////////////////////////////////////



// Listar produtos de um mercado específico
exports.getProdutosByMercadoId = async (req, res) => {
  //const { id_mercado } = req.params; // Captura o id_mercado da rota
  console.log(`Buscando produtos para o mercado com ID: ${req.params.id_mercado}`); // Adicione esta linha
  try {
    const [rows] = await db.query('SELECT * FROM produto WHERE id_mercado = ?', req.params.id_mercado); // Filtra produtos pelo id do mercado
    if (rows.length === 0) return res.status(404).json({ error: 'Nenhum produto encontrado para este mercado' });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Obter um único produto de um mercado específico
exports.getProdutosByMercadoIdAndById = async (req, res) => {
  const { id_mercado } = req.params; // Captura o id_mercado da rota
  console.log(`Buscando produtos para o mercado com ID: ${id_mercado}`); // Adicione esta linha
  try {
    const [rows] = await db.query('SELECT * FROM produto WHERE id = ?  and id_mercado = ?', [req.params.id , req.params.id_mercado]); // Filtra produtos pelo id do mercado
    console.log('SELECT * FROM produto WHERE id = ?  and id_mercado = ?', [req.params.id , req.params.id_mercado]);
    if (rows.length === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({produto: rows[0]});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Criar um novo produto
exports.createProdutoByMercadoId = async (req, res) => {
  const { nome, descricao, preco, quantidade} = req.body;
  try {
    const [result] = await db.query('INSERT INTO produto (nome, descricao, preco, quantidade, id_mercado) VALUES (?, ?, ?, ?, ?)', [nome, descricao, preco, quantidade, req.params.id_mercado]);
    const [rows] = await db.query('SELECT * FROM produto WHERE id = ? ', [result.insertId]);
    res.status(201).json({produto: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Atualizar um produto
exports.updateProdutoByMercadoId = async (req, res) => {
  const { nome, descricao, preco, quantidade } = req.body;
  try {
    const [result] = await db.query('UPDATE produto SET nome = ?, descricao = ?, preco = ?, quantidade = ? WHERE id = ? and id_mercado = ? ', [nome, descricao, preco, quantidade, req.params.id, req.params.id_mercado]);
    const [rows] = await db.query('SELECT * FROM produto WHERE id = ? ', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({produto: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletar um produto
exports.deleteProdutoByMercadoId = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM produto WHERE id = ? and id_mercado = ?', [req.params.id, req.params.id_mercado]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};