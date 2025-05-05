const API_BASE = "http://localhost:8080"; // Altere para o backend Vercel se precisar

async function buscarMusicas() {
  const termo = document.getElementById("searchInput").value.toLowerCase();
  const resp = await fetch(`${API_BASE}/musicas`);
  const musicas = await resp.json();

  const resultados = musicas.filter(m =>
    m.cantor.toLowerCase().includes(termo) ||
    m.titulo.toLowerCase().includes(termo)
  );

  const div = document.getElementById("musicas");
  div.innerHTML = resultados.map(m =>
    `<div><strong>${m.titulo}</strong> - ${m.cantor}<br><pre>${m.letra}</pre></div><hr>`
  ).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const novaMusica = {
        cantor: document.getElementById("cantor").value,
        titulo: document.getElementById("titulo").value,
        letra: document.getElementById("letra").value
      };

      try {
        const resp = await fetch(`${API_BASE}/musicas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novaMusica)
        });

        if (resp.ok) {
          alert("Música cadastrada!");
          form.reset();
          carregarMusicasAdmin();
        } else {
          alert("Erro ao cadastrar.");
        }
      } catch (err) {
        alert("Erro ao conectar com o servidor.");
      }
    });

    carregarMusicasAdmin();
  }
});

async function carregarMusicasAdmin() {
  const div = document.getElementById("musicasAdmin");
  const resp = await fetch(`${API_BASE}/musicas`);
  const musicas = await resp.json();

  div.innerHTML = musicas.map(m =>
    `<div>
      <strong>${m.titulo}</strong> - ${m.cantor}<br>
      <pre>${m.letra}</pre>
      <button onclick="excluirMusica(${m.id})">Excluir</button>
    </div><hr>`
  ).join('');
}

async function excluirMusica(id) {
  const confirmado = confirm("Deseja excluir esta música?");
  if (confirmado) {
    await fetch(`${API_BASE}/musicas/${id}`, { method: "DELETE" });
    carregarMusicasAdmin();
  }
  // Função para carregar as músicas cadastradas
function carregarMusicas() {
  const musicas = JSON.parse(localStorage.getItem("musicas")) || [];
  const listaMusicas = document.getElementById("lista-musicas");
  listaMusicas.innerHTML = ""; // Limpa a lista antes de recarregar

  musicas.forEach(musica => {
    const item = document.createElement("li");
    item.textContent = `${musica.nome} - ${musica.cantor}`;
    listaMusicas.appendChild(item);
  });
}

// Função para cadastrar uma nova música
document.getElementById("form-musica").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const cantor = document.getElementById("cantor").value;
  const letra = document.getElementById("letra").value;

  const novaMusica = { nome, cantor, letra };

  // Adiciona a música no localStorage
  const musicas = JSON.parse(localStorage.getItem("musicas")) || [];
  musicas.push(novaMusica);
  localStorage.setItem("musicas", JSON.stringify(musicas));

  // Limpa os campos do formulário
  document.getElementById("nome").value = "";
  document.getElementById("cantor").value = "";
  document.getElementById("letra").value = "";

  // Recarrega a lista de músicas
  carregarMusicas();
});

// Carrega as músicas armazenadas ao iniciar a página
window.onload = carregarMusicas;

}
