function apresentar(produto) {
  if (!produto || !produto.id) {
    console.warn('Produto inválido ao tentar apresentar:', produto);
    return;
  }

  localStorage.setItem('compra', JSON.stringify([produto]));
  console.log('Produto salvo com sucesso no localStorage');

  window.location.href = `/eixoauto/eixoautopi/pages/compra.php?id=${produto.id}`;
}

// Página de Compras
function PaginaDeProdutos() {
  const compra = JSON.parse(localStorage.getItem('compra')) || [];
  const container = document.getElementById('produto-compra');
  container.innerHTML = '';

  if (!compra.length) {
    container.innerHTML = '<p>Produto não encontrado.</p>';
    return;
  }

  const produto = compra[0];
  console.log("Produto imagem recebido:", produto.imagem);

  // Normalizar caminho da imagem
  let imgPath = produto.imagem;
  if (imgPath.startsWith("/eixoauto/eixoautopi/")) {
    // já vem completo -> não mexe
  } else if (imgPath.startsWith("img/")) {
    imgPath = "/eixoauto/eixoautopi/" + imgPath;
  } else {
    imgPath = "/eixoauto/eixoautopi/img/Produtos/" + imgPath;
  }

  const div = document.createElement('div');
  div.classList.add('product-container');
  div.innerHTML = `
      <div class="img-box">
        <div class="icon">
          <img id="fav-heart" src="/eixoauto/eixoautopi/img/Icons/heart.png" alt="Icone de Favoritos">
        </div>
        <img src="${imgPath}" alt="${produto.nome}">
        <h2 class="product-prize"> ${produto.preco}</h2>

        <div class="btn-container">
          <button onclick='adicionarNoCarrinho(${JSON.stringify(produto)})'>Adicionar ao carrinho</button>
        </div>
      </div>

      <div class="info-section">
        <div class="top-row">
          <img class="logo" src="/eixoauto/eixoautopi/img/Fornecedores/Kleed.png" alt="">
          <h2 class="name">${produto.nome}</h2>
        </div>
        <div class="desc">
          <h3>Descrição</h3>
          <p>${produto.descricao}</p>
        </div>
      </div> 
    `;

  div.addEventListener('click', (event) => {
    if (event.target.id === 'fav-heart' ) {
      favoritar(produto, event);
      return;
    }
  })
  
  container.appendChild(div);
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

// Botão Compra
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('product')) {
    window.location.href = '/eixoauto/eixoautopi/pages/finalizacaoC.php';
  }
});

// Botão Adicionar ao carrinho
function adicionarNoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Normaliza o caminho da imagem ANTES de salvar
  let imgPath = produto.imagem;
  if (imgPath && !imgPath.startsWith('/eixoauto/eixoautopi/')) {
    if (imgPath.startsWith('img/')) {
      imgPath = '/eixoauto/eixoautopi/' + imgPath;
    } else if (!imgPath.startsWith('/')) {
      imgPath = '/eixoauto/eixoautopi/img/Produtos/' + imgPath;
    }
    produto.imagem = imgPath;
  }

  if (!carrinho.find(p => p.id === produto.id)) {
    carrinho.unshift(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  } else {
    alert('Produto já está no carrinho!');
  }
}

// INICIALIZAÇÃO 
document.addEventListener('DOMContentLoaded', () => {
  PaginaDeProdutos();
});

// Buscar ofertas do mesmo produto em outros fornecedores
if (typeof produto !== "undefined" && produto && produto.codigo) {
  fetch(`/eixoauto/eixoautopi/pages/get_ofertas_produto.php?codigo=${encodeURIComponent(produto.codigo)}`)
    .then(res => res.json())
    .then(ofertas => {
      const section = document.getElementById('product-section');
      if (!section) return;
      if (ofertas.length > 1) {
        let html = '<h3>Ofertas de outros fornecedores:</h3>';
        ofertas.forEach(oferta => {
          if (oferta.id != produto.id) {
            html += `
                <div class="oferta-item" style="margin-bottom:10px;">
                  <span><b>${oferta.fornecedor}</b></span> - 
                  <span>R$ ${oferta.preco}</span>
                  <a href="${oferta.link_fornecedor}" target="_blank" style="margin-left:10px;">Ver na loja</a>
                </div>
              `;
          }
        });
        section.innerHTML += html;
      }
    });
}

// Salvar produtos selecionados (exemplo)
const selecionados = typeof produtos !== "undefined" ? produtos.filter(p => p.selecionado) : [];
if (selecionados.length > 0) {
  localStorage.setItem('produtos-compra', JSON.stringify(selecionados));
}

// Finalização da compra
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('buy')) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtosAcomprar = Array.from(document.querySelectorAll('.select-product:checked'))
      .map(cb => {
        const container = cb.closest('.item-carrinho');
        if (!container) return;

        const nome = container.querySelector('h2').textContent.trim();
        const produto = carrinho.find(p => p.nome === nome);
        if (!produto) return;
        const qtd = parseInt(container.querySelector('.qtd').textContent.trim(), 10) || 1;
        return { ...produto, quantidade: qtd };
      }).filter(p => p !== undefined);

    localStorage.setItem('produtos-compra', JSON.stringify(produtosAcomprar));

    let total = typeof FinalizacaoCompra === "function" ? FinalizacaoCompra() : 0;
    if (total > 0) {
      window.location.href = '/eixoauto/eixoautopi/pages/finalizacaoC.php';
    } else {
      alert('Nenhum produto foi selecionado. Selecione no mínimo um produto para finalizar a compra.');
    }
  }
});
