const API_BASE = "http://localhost:8080";

// Tela de busca
document.getElementById("search-btn")?.addEventListener("click", async () => {
  const termo = document.getElementById("search").value;
  const res = await fetch(`${API_BASE}/musicas`);
  const musicas = await res.json();
  const filtradas = musicas.filter(m => 
    m.nomeMusica.toLowerCase().includes(termo.toLowerCase()) || 
    m.nomeCantor.toLowerCase().includes(termo.toLowerCase())
  );
  const ul = document.getElementById("resultados");
  ul.innerHTML = "";
  filtradas.forEach(m => {
    const li = document.createElement("li");
    li.innerText = `${m.nomeCantor} - ${m.nomeMusica}`;
    ul.appendChild(li);
  });
});

// Tela de login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf, senha })
  });

  if (res.ok) {
    window.location.href = "admin-panel.html";
  } else {
    alert("CPF ou senha incorretos.");
  }
});

// Validação falsa de login (sem backend)
document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;

  // CPF e senha fixos para simular o login
  const CPF_VALIDO = "12345678900";
  const SENHA_VALIDA = "1234";

  if (cpf === CPF_VALIDO && senha === SENHA_VALIDA) {
    window.location.href = "admin-panel.html";
  } else {
    alert("CPF ou senha incorretos.");
  }
});

// Tela de cadastro
document.getElementById("cadastro-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nomeCantor = document.getElementById("nomeCantor").value;
  const nomeMusica = document.getElementById("nomeMusica").value;
  const letra = document.getElementById("letra").value;

  const res = await fetch(`${API_BASE}/musicas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nomeCantor, nomeMusica, letra })
  });

  if (res.ok) {
    alert("Música cadastrada!");
    document.getElementById("cadastro-form").reset();
  } else {
    alert("Erro ao cadastrar a música.");
  }
});
