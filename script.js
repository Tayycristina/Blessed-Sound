const API_BASE = "http://localhost:8080"; // Alterar para o seu endpoint de backend, se necessário

// Função para cadastrar a música
document.getElementById('form-musica').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const novaMusica = {
        nome: document.getElementById('nome').value,
        cantor: document.getElementById('cantor').value,
        letra: document.getElementById('letra').value
    };

    fetch(`${API_BASE}/musicas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaMusica)
    })
    .then(response => response.json())
    .then(data => {
        alert('Música cadastrada com sucesso!');
        window.location.href = 'index.html'; // Redireciona para a tela inicial
    })
   
