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
}
