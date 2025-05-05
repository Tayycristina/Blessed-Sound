// Exemplo de lista de músicas (substitua por dados reais)
const musicas = [
  { id: 1, nome: "Música 1", cantor: "Cantor 1" },
  { id: 2, nome: "Música 2", cantor: "Cantor 2" },
  { id: 3, nome: "Música 3", cantor: "Cantor 3" },
];

// Função para exibir a lista de músicas
function exibirMusicas() {
  const listaMusicas = document.getElementById("lista-musicas");
  listaMusicas.innerHTML = ""; // Limpa a lista antes de adicionar novas músicas

  musicas.forEach(musica => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${musica.nome}</strong> - <em>${musica.cantor}</em>`;
    listaMusicas.appendChild(li);
  });
}

// Chama a função para exibir as músicas ao carregar a página
document.addEventListener("DOMContentLoaded", exibirMusicas);
