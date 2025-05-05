// Voltar para tela inicial
function voltarInicio() {
  window.location.href = "index.html";
}

// Exibir músicas na tela inicial
window.onload = function () {
  const lista = JSON.parse(localStorage.getItem("musicas")) || [];
  const container = document.getElementById("lista-musicas");

  if (container) {
    container.innerHTML = "";
    lista.forEach((m) => {
      const item = document.createElement("li");
      item.innerHTML = `<strong>${m.musica}</strong> - ${m.cantor}<br>${m.letra}`;
      container.appendChild(item);
    });
  }
};

// Login simulado (sem backend)
document.getElementById("login-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;

  if (cpf === "12345678900" && senha === "admin") {
    window.location.href = "admin-panel.html";
  } else {
    alert("CPF ou senha incorretos.");
  }
});

// Cadastro de música (salva no localStorage)
document.getElementById("cadastro-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const cantor = document.getElementById("nomeCantor").value;
  const musica = document.getElementById("nomeMusica").value;
  const letra = document.getElementById("letra").value;

  if (cantor && musica && letra) {
    const lista = JSON.parse(localStorage.getItem("musicas")) || [];
    lista.push({ cantor, musica, letra });
    localStorage.setItem("musicas", JSON.stringify(lista));

    alert("Música cadastrada com sucesso!");
    document.getElementById("cadastro-form").reset();
  } else {
    alert("Preencha todos os campos!");
  }
});

// Busca
document.getElementById("search-btn")?.addEventListener("click", () => {
  const termo = document.getElementById("search").value.toLowerCase();
  const lista = JSON.parse(localStorage.getItem("musicas")) || [];
  const container = document.getElementById("lista-musicas");

  if (container) {
    container.innerHTML = "";
    lista
      .filter((m) =>
        m.cantor.toLowerCase().includes(termo) ||
        m.musica.toLowerCase().includes(termo)
      )
      .forEach((m) => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${m.musica}</strong> - ${m.cantor}<br>${m.letra}`;
        container.appendChild(item);
      });
  }
});
