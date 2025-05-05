export default function handler(req, res) {
    if (req.method === 'POST') {
        const { usuario, senha } = req.body;
        if (usuario === 'admin' && senha === '1234') {
            res.status(200).json({ sucesso: true });
        } else {
            res.status(401).json({ sucesso: false });
        }
    } else {
        res.status(405).end(); // Método não permitido
    }
    const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db'); // Caminho do banco de dados SQLite

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, cantor, letra } = req.body;

    // Criação da tabela (caso não exista)
    db.run('CREATE TABLE IF NOT EXISTS musicas (nome TEXT, cantor TEXT, letra TEXT)');

    // Inserindo a música no banco de dados
    db.run('INSERT INTO musicas (nome, cantor, letra) VALUES (?, ?, ?)', [nome, cantor, letra], function(err) {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao cadastrar música' });
      }
      res.status(201).json({ mensagem: 'Música cadastrada com sucesso' });
    });
  } else {
    res.status(405).json({ mensagem: 'Método não permitido' });
  }
}

}
