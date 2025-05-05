// Função de busca de músicas
function searchMusic() {
    const searchQuery = document.getElementById('search').value;
    const musicList = document.getElementById('music-list');

    // Aqui você pode fazer uma requisição ao backend para buscar as músicas
    // Por exemplo:
    fetch(`https://seu-backend.com/api/search?query=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            musicList.innerHTML = ''; // Limpa a lista atual
            data.musicas.forEach(musica => {
                const musicItem = document.createElement('div');
                musicItem.textContent = `${musica.nome} - ${musica.cantor}`;
                musicList.appendChild(musicItem);
            });
        });
}

// Função de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    // Verificar as credenciais do login
    fetch('https://seu-backend.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha })
    })
        .then(response => response.json())
        .then(data => {
            if (data.sucesso) {
                window.location.href = 'admin-panel.html'; // Redireciona para o painel admin
            } else {
                alert('Credenciais inválidas');
            }
        });
});

// Função para cadastrar música
document.getElementById('add-music-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('music-name').value;
    const cantor = document.getElementById('singer-name').value;
    const letra = document.getElementById('lyrics').value;

    // Enviar dados para o backend
    fetch('https://seu-backend.com/api/musicas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cantor, letra })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.mensagem);
        });
});
