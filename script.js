const API_BASE = "http://localhost:8080";

async function buscarMusicas() {
  const busca = document.getElementById("buscaInput").value;
  const res = await fetch(`${API_BASE}/musicas`);
  const musicas = await res.json();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
  musicas.filter(m => m.nome.includes(busca) || m.cantor.includes(busca))
         .forEach(m => resultado.innerHTML += `<p><strong>${m.nome}</strong> - ${m.cantor}<br/>${m.letra}</p>`);
}

async function cadastrarMusica() {
  const novaMusica = {
    cantor: document.getElementById("cantor").value,
    nome: document.getElementById("nome").value,
    letra: document.getElementById("letra").value
  };
  const res = await fetch(`${API_BASE}/musicas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novaMusica)
  });
  if (res.ok) {
    alert("Música cadastrada!");
    location.reload();
  } else {
    alert("Erro ao cadastrar");
  }
}

async function deletarMusica(id) {
  const res = await fetch(`${API_BASE}/musicas/${id}`, {
    method: "DELETE"
  });
  if (res.ok) {
    alert("Música deletada");
    location.reload();
  } else {
    alert("Erro ao deletar");
  }
}
