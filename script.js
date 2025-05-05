const API_BASE = "http://localhost:8080"; // Altere se necessário para o backend correto

// ===================
// CADASTRAR MÚSICA
// ===================
const formMusica = document.getElementById('form-musica');
if (formMusica) {
    formMusica.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const cantor = document.getElementById('cantor').value;
        const letra = document.getElementById('letra').value;

        const novaMusica = { nome, cantor, letra };

        fetch(`${API_BASE}/musicas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaMusica)
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao cadastrar");
            return response.json();
        })
        .then(data => {
            alert("Música cadastrada com sucesso!");
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error("Erro ao cadastrar música:", error);
            alert("Erro ao cadastrar música.");
        });
    });
}

// ===================
// LOGIN ADMIN
// ===================
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const cpf = document.getElementById('cpf').value;
        const senha = document.getElementById('senha').value;

        fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cpf, senha })
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'admin-panel.html';
            } else {
                alert('CPF ou senha incorretos.');
            }
        })
        .catch(error => {
            console.error("Erro no login:", error);
            alert("Erro ao tentar login.");
        });
    });
}

// ===================
// BUSCAR E LISTAR MÚSICAS
// ===================
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const listaMusicas = document.getElementById('lista-musicas');

function carregarMusicas(filtro = "") {
    fetch(`${API_BASE}/musicas`)
        .then(response => response.json())
        .then(musicas => {
            listaMusicas.innerHTML = "";

            const musicasFiltradas = musicas.filter(musica =>
                musica.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                musica.cantor.toLowerCase().includes(filtro.toLowerCase())
            );

            if (musicasFiltradas.length === 0) {
                listaMusicas.innerHTML = "<li>Nenhuma música encontrada.</li>";
            } else {
                musicasFiltradas.forEach(musica => {
                    const item = document.createElement('li');
                    item.innerHTML = `
                        <strong>${musica.nome}</strong> - ${musica.cantor}<br>
                        <pre>${musica.letra}</pre>
                    `;
                    listaMusicas.appendChild(item);
                });
            }
        })
        .catch(error => {
            console.error("Erro ao buscar músicas:", error);
        });
}

// Ativa busca se os elementos existirem na tela inicial
if (searchInput && searchBtn && listaMusicas) {
    carregarMusicas(); // Inicializa com todas as músicas

    searchBtn.addEventListener('click', () => {
        const filtro = searchInput.value.trim();
        carregarMusicas(filtro);
    });
}
