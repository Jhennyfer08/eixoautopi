
function inicializarCarrinho() {
  CarrinhodeProdutos();
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarCarrinho();
});

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
  }
};

// Função para exibir os produtos no carrinho
function CarrinhodeProdutos() {
  const container = document.createElement('div');
  container.id = "carrinho";
  document.body.appendChild(container);

  if (!container) {
    console.error('Elemento #carrinho não encontrado no DOM');
    return;
  }else{
    console.log('Elemento #carrinho encontrado no DOM');
  }

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Garante que é um array
  if (!Array.isArray(carrinho)) {
    console.warn('Carrinho não é um array, convertendo...');
    if (typeof carrinho === 'object' && carrinho !== null) {
      carrinho = Object.values(carrinho);
    } else {
      carrinho = [];
    }
  }

  console.log('Carrinho do localStorage:', carrinho);
  console.log('Quantidade de produtos:', carrinho.length);

  container.innerHTML = '';

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    console.log('Carrinho vazio - mostrando mensagem');
    return;
  }


  carrinho.forEach((produtoObj, index) => {
    console.log(`Renderizando produto ${index}:`, produtoObj);

    const div = document.createElement('div');
    div.classList.add('item-carrinho');
    div.innerHTML = `
      <input type="checkbox" name="select-product" class="select-product" data-id="${produtoObj.id}">
      <img class="products" src="${produtoObj.imagem}" alt="${produtoObj.nome}">
      <h2>${produtoObj.nome}</h2>
      <div class="quantity">
        <button class="btn"><img class="less" src="/eixoauto/eixoautopi/img/Icons/subtracao-Icon.png" alt=""></button>
        <div class="qtd">1</div>
        <button class="btn"><img class="more" src="/eixoauto/eixoautopi/img/Icons/adicao-Icon.png" alt=""></button>
      </div>
      <div class="prize">
        <h1>${produtoObj.preco}</h1>
      </div>
    `;

    div.style.cursor = 'pointer';

    div.addEventListener('click', (event) => {
      if (event.target.closest('.select-product')) {
        event.stopPropagation();
        SelectProducts();
        return;
      } else if (event.target.closest('.btn') || event.target.closest('.qtd')) {
        QtdPreco(event);
        return;
      } else {
        apresentar(produtoObj);
      }
    });

    container.appendChild(div);
  });

  function anexarEventosCarrinho() {
    const carrinhoElement = document.getElementById('carrinho');
    if (!carrinhoElement) return;

    carrinhoElement.addEventListener('click', (event) => {
      const qtdDiv = event.target.closest('.qtd');
      if (!qtdDiv) return;

      const item = qtdDiv.closest('.item-carrinho');
      if (!item) return;

      const nome = item.querySelector('h2').textContent;
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const produto = carrinho.find(p => p.nome === nome);
      if (!produto) return;

      // Cria input para edição
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.value = qtdDiv.textContent.trim();
      input.classList.add('qtd');
      qtdDiv.replaceWith(input);

      // Foco automático
      input.focus();

      // Quando sair do input ou apertar Enter → salvar
      function salvar() {
        let quantidadeAtual = parseInt(input.value) || 1;
        if (quantidadeAtual < 1) quantidadeAtual = 1;

        // Atualiza o carrinho
        const precoEl = item.querySelector('.prize h1');
        const precoUnitario = parsePreco(produto.preco);
        precoEl.textContent = (quantidadeAtual * precoUnitario).toFixed(2).replace('.', ',');

        // Substitui input pelo div novamente
        const novoDiv = document.createElement('div');
        novoDiv.classList.add('qtd');
        novoDiv.textContent = quantidadeAtual;
        input.replaceWith(novoDiv);

        FinalizacaoCompra();
      }

      input.addEventListener('blur', salvar);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          salvar();
        }
      });
    });
  }
}


// Função para navegar para a página de compra
function apresentar(produto) {
  if (!produto) return;
  // Garante que o produto tem o campo id
  const id = produto.id || produto.Pro_ID || produto.ID;
  if (!id) {
    alert('Produto sem ID!');
    return;
  }

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

  localStorage.setItem('compra', JSON.stringify([produto]));
  console.log('Produto salvo com sucesso no localStorage');
  // Redireciona com o id na URL!
  window.location.href = `/eixoauto/eixoautopi/pages/compra.php?id=${id}`;
}

// Função para selecionar produtos no carrinho
function SelectProducts() {
  const container = document.getElementById('select-menu-container');
  container.innerHTML = '';

  const div = document.createElement('div');
  div.classList.add('select-menu');
  div.innerHTML = `
    <ul>
      <li id="selectAll">Selecionar todos</li>
      <li id="exclude">Excluir</li>
    </ul>
  `;

  container.appendChild(div);
}

function VisibilidadeMenu() {
  const div = document.querySelector('.select-menu')
  const checkboxes = document.querySelectorAll('.select-product');
  const algumMarcado = Array.from(checkboxes).some(cb => cb.checked);
  div.style.display = algumMarcado ? 'block' : 'none';
}

document.addEventListener('click', (event) => {
  if (event.target.id === 'selectAll') {
    const checkboxes = document.querySelectorAll('.select-product');
    const AllcheckboxesSelected = Array.from(checkboxes).every(cb => cb.checked);

    if (AllcheckboxesSelected) {
      checkboxes.forEach(cb => cb.checked = false);
    } else {
      checkboxes.forEach(cb => cb.checked = true);
    }

    FinalizacaoCompra();
    VisibilidadeMenu();
  }
});

document.addEventListener('change', (event) => {
  if (event.target.classList.contains('select-product')) {
    FinalizacaoCompra();
    VisibilidadeMenu();
  }
});

document.addEventListener('click', (event) => {
  if (event.target.id === 'exclude') {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const checkboxesSelected = document.querySelectorAll('.select-product:checked');
    const NamesToExclude = Array.from(checkboxesSelected).map(cbs => {
      const item = cbs.closest('.item-carrinho')
      return item.querySelector('h2').textContent.trim()
    });
    carrinho = carrinho.filter(p => !NamesToExclude.includes(p.nome.trim()));
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.reload();
    CarrinhodeProdutos()
  }
});

// Função para ajustar a quantidade e preço
function QtdPreco(event) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  const item = event.target.closest('.item-carrinho');
  if (!item) return;

  const more = event.target.closest('.more');
  const less = event.target.closest('.less');


  const qtd = item.querySelector('.qtd');
  const preco = item.querySelector('.prize h1');
  const nome = item.querySelector('h2').textContent;

  const produto = carrinho.find(p => p.nome === nome);
  if (!produto) return;

  const precoInicial = parsePreco(produto.preco);

  let quantidadeAtual = parseInt(qtd.textContent);
  if (more) {
    quantidadeAtual++;
  } else if (less && quantidadeAtual > 1) {
    quantidadeAtual--;
  }

  qtd.textContent = quantidadeAtual;

  const total = quantidadeAtual * precoInicial;
  preco.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  FinalizacaoCompra();
}

// Função para calcular o valor total da compra
function FinalizacaoCompra() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const checkboxes = document.querySelectorAll('.select-product:checked');
  let valorTotalCompra = 0;

  checkboxes.forEach(cb => {
    const container = cb.closest('.item-carrinho');
    if (!container) return;

    const nome = container.querySelector('h2').textContent.trim();
    const produto = carrinho.find(p => p.nome === nome);
    if (!produto) return;

    const qtd = parseInt(container.querySelector('.qtd').textContent.trim(), 10) || 1;

    const precoUnitario = parsePreco(produto.preco);
    valorTotalCompra += qtd * precoUnitario;
  });

  const PrecoFinal = document.getElementById('Preco-Final');
  PrecoFinal.textContent = valorTotalCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  localStorage.setItem('totalCompra', valorTotalCompra.toFixed(2));
  return valorTotalCompra;
}

// Exemplo: ao clicar no botão "Finalizar Compra"
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

    // Salva os produtos selecionados para finalizar
    localStorage.setItem('produtos-compra', JSON.stringify(produtosAcomprar));

    if (produtosAcomprar.length > 0) {
      window.location.href = '/eixoauto/eixoautopi/pages/finalizacaoC.php';
    } else {
      alert('Selecione ao menos um produto para finalizar a compra.');
    }
  }
});

function parsePreco(precoStr) {
  // Remove "R$" e espaços, troca ponto de milhar e vírgula decimal
  return parseFloat(
    precoStr.replace('R$', '').replace(',', '.').trim()
  );
}
