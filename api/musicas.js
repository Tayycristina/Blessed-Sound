export default function handler(req, res) {
  if (req.method === 'POST') {
    const { nome, cantor, letra } = req.body;
    // Simulação do armazenamento no banco de dados (aqui você poderia conectar com SQLite)
    console.log("Recebido:", nome, cantor, letra);
    res.status(201).json({ mensagem: 'Música cadastrada com sucesso' });
  } else {
    res.status(405).json({ mensagem: 'Método não permitido' });
  }
}
