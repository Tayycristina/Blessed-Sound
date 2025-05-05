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
    document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, senha }),
    });

    if (response.ok) {
      window.location.href = "admin-panel.html";
    } else {
      document.getElementById("mensagemErro").textContent = "Login inválido.";
    }
  } catch (error) {
    document.getElementById("mensagemErro").textContent = "Erro de conexão com o servidor.";
  }
});

  }
}
