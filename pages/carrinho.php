<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrinho de compras</title>
    <link rel="stylesheet" href="/eixoauto/eixoautopi/css/carrinho.css">
</head>

<body>
    <header>
        <div id="logo">
            <a href="/eixoauto/eixoautopi/pages/home.php"><img src="/eixoauto/eixoautopi/img/Icons/LogoBrancareal.png"
                    alt="Logo da empresa Eixo"></a>
        </div>
    </header>

    <div id="select-menu-container">
    </div>

    <div class="carrinhoContainer">
        <div id="carrinho"></div>
    </div>

    <div class="finalize-shop">
        <div class="prize">
            <p>Valor Total: </p>
            <h1 id="Preco-Final">0,00</h1>
        </div>
        <button class="buy">Finalizar Compra</button>
    </div>

    <!-- Script JS -->

    <script src="/eixoauto/eixoautopi/js/carrinho.js"></script>
    <script src="/eixoauto/eixoautopi/js/favoritos.js"></script>
</body>

</html>