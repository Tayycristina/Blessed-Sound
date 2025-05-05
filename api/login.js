document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha })
      });

      if (response.ok) {
        window.location.href = "admin-panel.html";
      } else {
        document.getElementById("mensagemErro").textContent = "Login inválido.";
      }
    } catch (error) {
      document.getElementById("mensagemErro").textContent = "Erro ao conectar com o servidor.";
    }
  });
});
