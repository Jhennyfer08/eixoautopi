<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/eixoauto/eixoautopi/css/finalizacaoC.css">
    <title>Document</title>
</head>

<body>

    <header>
        <div id="logo">
            <a href="/eixoauto/eixoautopi/pages/home.php"><img src="/eixoauto/eixoautopi/img/Icons/LogoBrancareal.png" alt="Logo da empresa Eixo"></a>
        </div>
    </header>
    <div class="checkout-container">

        <!-- Endereço -->
        <div class="section">
            <h3>Endereço de Entrega</h3>
            <div id="endereco-exibicao">
                <p id="texto-endereco">Avenida São João 165, Bandeirantes - Contagem MG, 32240-520</p>
                <button class="btn-alterar" onclick="mostrarFormularioEndereco()">Alterar Endereço</button>
            </div>

            <div id="form-endereco" style="display: none;">
                <label for="endereco">Novo Endereço:</label>
                <textarea id="endereco" rows="3"></textarea>
                <button class="btn-alterar" onclick="salvarNovoEndereco()">Salvar Endereço</button>
            </div>
        </div>

        <div class="section">
            <h3>Produtos</h3>
            <div id="produtos-container"></div>
        </div>


        <!-- Forma de Pagamento -->
        <div class="section">
            <h3>Forma de Pagamento</h3>
            <input type="radio" name="Select-Payment" class="checkbox" id="cartao">
            <img id="cartao" src="/eixoauto/eixoautopi/img/Icons/Card-Icon.png" alt="Ícone Cartão de Crédito">
            <input type="radio" name="Select-Payment" class="checkbox" id="pix">
            <img id="pix" src="/eixoauto/eixoautopi/img/Icons/Pix-Icon.png" alt="Ícone Pix">
            <input type="radio" name="Select-Payment" class="checkbox" id="boleto">
            <img id="boleto" src="/eixoauto/eixoautopi/img/Icons/Ticket-Icon.png" alt="Ícone Boleto">
            
            <div id="payment"></div>
        </div>
        
        <!-- Produtos -->
        <div class="section">
            <h3>Valor dos Produtos</h3>
            <div class="products" id="lista-produtos"></div>
            <div class="total" id="valor-total">Total: R$ 0,00</div>
        </div>

        <!-- Botão de Finalizar -->
        <button id="btn-buy">Comprar</button>
    </div>

    <script src="/eixoauto/eixoautopi/js/finalizacaoC.js"></script>
</body>
</html>