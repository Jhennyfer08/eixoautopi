// Função para carregar produtos do banco e renderizar nos containers
async function carregarProdutosDoBanco() {
  try {
    const resp = await fetch('/eixoauto/eixoautopi/pages/get_produtos.php');
    const produtos = await resp.json();
    renderizarCategorias(produtos);
  } catch (e) {
    console.error('Erro ao carregar produtos do banco:', e);
  }
}

carregarProdutosDoBanco();

function atualizarIconeFavorito(produto, imgElement) {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const estaFavoritado = favoritos.some(p => p.id === produto.id);

  imgElement.src = estaFavoritado
    ? "/eixoauto/eixoautopi/img/Icons/heart-checked.png"
    : "/eixoauto/eixoautopi/img/Icons/heart.png";
}

// Renderiza os produtos em um container específico pelo ID
function renderizarProdutos(lista, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  lista.forEach(produto => {
    const div = document.createElement('div');
    div.classList.add('produto');
    div.innerHTML = `
      <img class="fav_heart" alt="Ícone de favoritos">
      <img class="produtos" src="${produto.imagem}" alt="${produto.nome}">
      <a href="#">${produto.nome}</a>
      <h2>${produto.preco}</h2>
    `;

    const coracao = div.querySelector('.fav_heart');
    atualizarIconeFavorito(produto, coracao);

    div.style.cursor = 'pointer';

    div.addEventListener('click', (event) => {
      if (event.target.closest('img.fav_heart')) {
        favoritar(produto, event);
        atualizarIconeFavorito(produto, coracao);
        return;
      } else {
        apresentar(produto);
      }
    });

    container.appendChild(div);
  });
}

// Função para favoritar/desfavoritar produtos
function favoritar(produto, event) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const coracao = event.target;

  if (!favoritos.find(p => p.id === produto.id)) {
    favoritos.unshift(produto);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    coracao.src = "/eixoauto/eixoautopi/img/Icons/heart-checked.png";
  } else {
    favoritos = favoritos.filter(p => p.id !== produto.id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    coracao.src = "/eixoauto/eixoautopi/img/Icons/heart.png";
  }
}

// Função para remover produto dos favoritos
function removerFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(p => p.id !== id);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  ProdutosFavoritados();
}

// Exibir os produtos favoritados
function ProdutosFavoritados() {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const container = document.getElementById('favoritos-container');
  if (!container) return;

  container.innerHTML = '';

  if (favoritos.length === 0) {
    container.innerHTML = "<p>Nenhum produto favoritado.</p>";
    return;
  }

  favoritos.forEach((produto) => {
  const div = document.createElement('div');
  div.classList.add('produto');

  // Normaliza o caminho da imagem
  let imgPath = produto.imagem;
  if (imgPath && !imgPath.startsWith('/eixoauto/eixoautopi/')) {
    if (imgPath.startsWith('img/')) {
      imgPath = '/eixoauto/eixoautopi/' + imgPath;
    } else if (!imgPath.startsWith('/')) {
      imgPath = '/eixoauto/eixoautopi/img/Produtos/' + imgPath;
    }
  }

  const noCarrinho = carrinho.find(p => p.id === produto.id);
  const carrinhoImgSrc = noCarrinho
    ? "/eixoauto/eixoautopi/img/Icons/carrinho-preenchido.png"
    : "/eixoauto/eixoautopi/img/Icons/carrinho-branco.png";

  div.innerHTML = `
    <img class="fav_heart" src="/eixoauto/eixoautopi/img/Icons/heart-checked.png" alt="Ícone de favoritos" onclick="removerFavorito(${produto.id})">
    <div class='produtos'><img src='${imgPath}' alt='${produto.nome}'></div>
    <h3>${produto.nome}</h3>
    <div class='content'>
      <h2>${produto.preco}</h2>
      <img class="compras" src="${carrinhoImgSrc}" alt="Ícone do carrinho">
    </div>
  `;

    div.addEventListener('click', (event) => {
      if (event.target.classList.contains('fav_heart')) {
        removerFavorito(produto.id);
        return;
      } else if (event.target.classList.contains('compras')) {
        adicionarNoCarrinho(produto, event);
        window.location.reload(true);
        return;
      } else {
        apresentar(produto);
      }
    });

    container.appendChild(div);
  });
}

function adicionarNoCarrinho(produto, event) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (!carrinho.find(p => p.id === produto.id)) {
    carrinho.unshift(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  } else {
    carrinho = carrinho.filter(p => p.id !== produto.id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
}

ProdutosFavoritados();

// Filtrar e renderizar por categoria
function renderizarCategorias(produtos) {
  const motores = produtos.filter(p => p.categoria === 'Motor').slice(0, 5);
  const transmissoes = produtos.filter(p => p.categoria === 'Transmissão').slice(0, 5);
  const suspensoes = produtos.filter(p => p.categoria === 'Suspensao').slice(0, 5);
  const freios = produtos.filter(p => p.categoria === 'Freio').slice(0, 5);

  // Limpa containers antes de renderizar (com verificação)
  if (document.getElementById('motor-category')) document.getElementById('motor-category').innerHTML = "";
  if (document.getElementById('transmission-category')) document.getElementById('transmission-category').innerHTML = "";
  if (document.getElementById('suspension-category')) document.getElementById('suspension-category').innerHTML = "";
  if (document.getElementById('freio-category')) document.getElementById('freio-category').innerHTML = "";

  // Renderiza no máximo 5 de cada categoria
  renderizarProdutos(motores, 'motor-category');
  renderizarProdutos(transmissoes, 'transmission-category');
  renderizarProdutos(suspensoes, 'suspension-category');
  renderizarProdutos(freios, 'freio-category');
}

