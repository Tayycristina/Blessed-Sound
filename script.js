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

  // Valida se os campos não estão vazios
  if (nome && cantor && letra) {
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

    // Redireciona para a página inicial
    window.location.href = "index.html";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

// Carrega as músicas armazenadas ao iniciar a página
window.onload = carregarMusicas;
