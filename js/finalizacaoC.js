function apresentar(produto) {
  if (!produto) return;
  localStorage.setItem('compra', JSON.stringify([produto]));
  console.log('Produto salvo com sucesso no localStorage');
  window.location.href = '/eixoauto/eixoautopi/pages/compra.php';
}


const cartaoIcon = document.getElementById('cartao')
const container = document.getElementById('payment')

cartaoIcon.addEventListener('click', () => {
    cartaoIcon.classList.toggle('ativo')
    container.innerHTML = '';

    if (cartaoIcon.classList.contains('ativo')) {
        const div = document.createElement('div')
        div.classList.add('cartao-info')
        div.innerHTML = `
            <label for="numero-cartao">Número do Cartão:</label>
            <input type="text" class="card-not-null" id="numero-cartao" placeholder="0000 0000 0000 0000">
            <label for="validade">Validade:</label>
            <input type="text" class="card-not-null" id="validade" placeholder="MM/AA">
            <label for="cvv">CVV:</label>
            <input type="text" class="card-not-null" id="cvv" placeholder="123">
        `
        container.appendChild(div)
    }
});


const pixIcon = document.getElementById('pix')

pixIcon.addEventListener('click', () => {
    pixIcon.classList.toggle('ativo')
    container.innerHTML = '';

    if (pixIcon.classList.contains('ativo')) {
        const div = document.createElement('div')
        div.classList.add('pix-info')

        div.innerHTML = `
        <img id="Pix-QR" src="/eixoauto/eixoautopi/img/Icons/Pix-Qr.jpeg" alt="Qr-Code Pix">
        <div class="Code-container">
            <div id="Pix-Code">00020126580014BR.GOV.BCB.PIX0136bfa69947-b17a-459e-8524-83261be90aef5204000053039865802BR5925Jhennyfer Kamilli Moura R6009SAO PAULO62140510ZYY84sZjRj6304756B</div>
        </div>
        `
        container.appendChild(div)
    }
});

const ticketIcon = document.getElementById('boleto')

ticketIcon.addEventListener('click', () => {
    ticketIcon.classList.toggle('ativo')
    container.innerHTML = '';

    if (ticketIcon.classList.contains('ativo')) {
        const div = document.createElement('div')
        div.classList.add('boleto-info')

        div.innerHTML = `
            <di class = 'select-time'>
                <input type="radio" name="selectTime" class="time-selector">
                <span>28 Dias </span>
            </div>

            <div class = 'select-time'>
                <input type="radio" name="selectTime" class="time-selector">
                <span> 30 - 60 Dias</span>
            </div>

            <div class = 'select-time'>
                <input type="radio" name="selectTime" class="time-selector">
                <span>28 - 42 - 56 Dias</span>
            </div>

            <div class = 'select-time'>
                <input type="radio" name="selectTime" class="time-selector">
                <span>15 - 30 - 45 - 60 Dias</span>
            </div>

            <div class = 'select-time'>
                <input type="radio" name="selectTime" class="time-selector">
                <span>30 - 60 - 90 Dias</span>
            </div>
        `
        container.appendChild(div)
    }
});


// Apresentar Produtos selecionados
function mostrarProdutosFinalizacao() {
    const produtos = JSON.parse(localStorage.getItem('produtos-compra')) || [];
    const lista = document.getElementById('produtos-container');
    lista.innerHTML = '';

    if (produtos.length === 0) {
        lista.innerHTML = '<p>Nenhum produto selecionado.</p>';
        return;
    }

    produtos.forEach(prod => {
        let precoNum = typeof prod.preco === 'string'
            ? parseFloat(prod.preco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim())
            : prod.preco;

        const item = document.createElement('div');
        item.classList.add('produto-finalizacao');
        item.innerHTML = `
            <img class="product-img" src="${prod.imagem}" alt="${prod.nome}">
            <span>${prod.nome}</span>
            <span>Qtd: ${prod.quantidade || 1}</span>
            <span>R$ ${precoNum.toFixed(2).replace('.', ',')}</span>
        `;
        lista.appendChild(item);
    });
    
}

/*
function Cupom() {
    let valorTotalCompra = JSON.parseFloat(localStorage.getItem('totalCompra')) || 0;
    const totalEl = document.getElementById('valor-total');
    const cupom = document.getElementById('cupom-input')
    totalEl.textContent = `Total: R$ ${valorTotalCompra.toFixed(2).replace('.', ',')}`;

    if (cupom.value === "10EIXOAUTO") {
        valorTotalCompra = valorTotalCompra - (valorTotalCompra * 0.1)
    } else if (cupom.value === "5EIXOAUTO") {
        valorTotalCompra = valorTotalCompra - (valorTotalCompra * 0.05)
    }

    totalEl.textContent = `Total: R$ ${valorTotalCompra.toFixed(2).replace('.', ',')}`;
}
*/

// Endereço inicial
let enderecoAtual = "Avenida São Joao, 165 - Bandeirantes, Contagem - MG, 32240-520";

function atualizarResumo() {
    const produtos = JSON.parse(localStorage.getItem('produtos-compra')) || [];
    const lista = document.getElementById('lista-produtos');
    const totalEl = document.getElementById('valor-total');
    let total = 0;

    lista.innerHTML = '';
    produtos.forEach(prod => {
        // Converte preço para número se necessário
        let precoNum = typeof prod.preco === 'string'
            ? parseFloat(prod.preco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim())
            : prod.preco;

        total += precoNum * (prod.quantidade || 1);
        const item = document.createElement('div');
        item.classList.add('product');
        item.innerHTML = `
          <span>${prod.nome}</span>
          <span>Qtd: ${prod.quantidade || 1}</span>
          <span>R$ ${precoNum.toFixed(2).replace('.', ',')}</span>
        `;
        lista.appendChild(item);
    });

    totalEl.textContent = `Total:  ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
}

function mostrarFormularioEndereco() {
    document.getElementById('form-endereco').style.display = 'block';
    document.getElementById('endereco').value = enderecoAtual;
    document.getElementById('endereco-exibicao').style.display = 'none';
}

function salvarNovoEndereco() {
    const novoEndereco = document.getElementById('endereco').value.trim();
    if (novoEndereco !== "") {
        enderecoAtual = novoEndereco;
        document.getElementById('texto-endereco').textContent = enderecoAtual;
        document.getElementById('form-endereco').style.display = 'none';
        document.getElementById('endereco-exibicao').style.display = 'block';
    } else {
        alert("Por favor, insira um endereço válido.");
    }
}

let btn = document.getElementById('btn-buy')

btn.addEventListener('click', () => {
    const container = document.getElementById('payment')
    const cartaoInfo = container.querySelectorAll('.card-not-null')
    const boletoInfo = container.querySelectorAll('.time-selector')

    let cartaoInfoFilled = false
    let boletoInfoFilled = false

    cartaoInfo.forEach(element => {
        if (element.value && element.value.trim() != " ") {
            cartaoInfoFilled = true;
        }
    })

    boletoInfo.forEach(element => {
        if (element.value && element.value.trim() != " ") {
            boletoInfoFilled = true;
        }
    })

    if (cartaoInfoFilled === true || boletoInfoFilled === true) {
        alert('Compra realizada!')
        window.location.href = "/eixoauto/eixoautopi/pages/home.php"
    } else {
        alert("Compra não realizada. Selecione e efetue o pagamento antes de concluir a ação")
    }
})


atualizarResumo();


document.addEventListener('DOMContentLoaded', mostrarProdutosFinalizacao);
