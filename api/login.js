export default function handler(req, res) {
  if (req.method === 'POST') {
    const { cpf, senha } = req.body;
    if (cpf === '12345678900' && senha === 'admin') {
      res.status(200).json({ sucesso: true });
    } else {
      res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
    }
  } else {
    res.status(405).json({ mensagem: 'Método não permitido' });
  }
}
