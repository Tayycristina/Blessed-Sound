document.addEventListener("DOMContentLoaded", () => {
  const busca = document.getElementById("busca");
  const resultados = document.getElementById("resultados");

  if (busca) {
    busca.addEventListener("input", async () => {
      const query = busca.value;
      const res = await fetch("http://localhost:8080/musicas?busca=" + query);
      const musicas = await res.json();

      resultados.innerHTML = "";
      musicas.forEach(musica => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${musica.cantor} - ${musica.nome}</strong><pre>${musica.letra}</pre>`;
        resultados.appendChild(div);
      });
    });
  }

  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const cantor = document.getElementById("cantor").value;
      const musica = document.getElementById("musica").value;
      const letra = document.getElementById("letra").value;

      try {
        const res = await fetch("http://localhost:8080/musicas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cantor, nome: musica, letra })
        });

        if (res.ok) {
          alert("Música cadastrada com sucesso!");
          location.reload();
        } else {
          alert("Erro ao cadastrar música.");
        }
      } catch (err) {
        alert("Erro ao conectar com o servidor.");
      }
    });
  }

  const listaMusicas = document.getElementById("listaMusicas");
  if (listaMusicas) {
    fetch("http://localhost:8080/musicas")
      .then(res => res.json())
      .then(musicas => {
        musicas.forEach(m => {
          const li = document.createElement("li");
          li.innerHTML = `${m.cantor} - ${m.nome} <button onclick="deletarMusica(${m.id})">Excluir</button>`;
          listaMusicas.appendChild(li);
        });
      });
  }
});

function deletarMusica(id) {
  fetch(`http://localhost:8080/musicas/${id}`, { method: "DELETE" })
    .then(() => location.reload())
    .catch(() => alert("Erro ao deletar música."));
}
