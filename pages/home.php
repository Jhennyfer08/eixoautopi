<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/eixoauto/eixoautopi/css/home.css">
    <link rel="shortcut icon" href="Imagem da LOGO" type="image/x-icon">
    <title>eixoautopipeças</title>
</head>

<body>

    <!-- Header (Logo, Icons, Input) -->
    <header>
        <nav>
            <div id="logo">
                <img src="/eixoauto/eixoautopi/img/Icons/LogoBrancareal.png" alt="Logo EixoAuto">
            </div>

            <div id="header-content" style="position: relative;">
                <input type="text" id="input-busca" placeholder="Buscar produtos..." autocomplete="on">
                <div id="busca-resultados"></div>
            </div>

            <div class="icon"> <!-- Ícones favoritos e carrinho -->
                <ul>
                    <li>
                        <a href="/eixoauto/eixoautopi/pages/carrinho.php">
                            <img class="icons" src="/eixoauto/eixoautopi/img/Icons/carrinho-branco.png" alt="Carrinho">
                        </a>
                    </li>
                    <li>
                        <a href="/eixoauto/eixoautopi/pages/favoritos.php">
                            <img class="icons" src="/eixoauto/eixoautopi/img/Icons/heart-branco.png" alt="Favoritos">
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <!-- Banner principal -->
    <div class="banner-slide">
        <div class="carousel-slide" id="banner">
            <img class="img-banner" src="/eixoauto/eixoautopi/img/Propagandas/banner-1.png" alt="">
            <img class="img-banner" src="/eixoauto/eixoautopi/img/Propagandas/banner-2.png" alt="">
            <img class="img-banner" src="/eixoauto/eixoautopi/img/Propagandas/banner-3.png" alt="">
        </div>
    </div>

    <div class="container">
        <!-- Cards de Categorias -->
        <div class="cards">
            <a href="#motor-category" class="category">
                <img src="/eixoauto/eixoautopi/img/Icons/Motor.png" alt="categoria">
                <h1>Motor</h1>
            </a>
            <a href="#suspension-category" class="category">
                <img src="/eixoauto/eixoautopi/img/Icons/Amortecedor.png" alt="categoria">
                <h1>Suspensão</h1>
            </a>
            <a href="#transmission-category" class="category">
                <img src="/eixoauto/eixoautopi/img/Icons/Embreagem.png" alt="categoria">
                <h1>Transmissão</h1>
            </a>
            <a href="#freio-category" class="category">
                <img src="/eixoauto/eixoautopi/img/Icons/Freio.png" alt="categoria">
                <h1>Freio</h1>
            </a>
        </div>

        <!-- Slide promocional -->
        <div class="container-slide">
            <div class="carousel-slide" id="slider">
                <img class="img-slides" src="/eixoauto/eixoautopi/img/Propagandas/slide-Freio.png" alt="">
                <img class="img-slides" src="/eixoauto/eixoautopi/img/Propagandas/slide-Pneu.png" alt="">
                <img class="img-slides" src="/eixoauto/eixoautopi/img/Propagandas/slide-Oleo.png" alt="">
            </div>
            <button class="btn" id="prev">&#10094;</button>
            <button class="btn" id="next">&#10095;</button>
        </div>

       
        <div class="collum">
            <div class="linear-container" id="motor-category">
                <div class="" id="produto"></div>
            </div>
        </div>

        <div class="collum">
            <div class="linear-container" id="suspension-category">
                <div class="linear-products" id="produto-suspension"></div>
            </div>
        </div>

        <div class="collum">
            <div class="fluid-linear-container" id="transmission-category"></div>
        </div>

        <div class="cards">
            <img class="prop" src="/eixoauto/eixoautopi/img/Propagandas/propaganda1.svg" alt="propaganda">
            <img class="prop" src="/eixoauto/eixoautopi/img/Propagandas/propaganda2.svg" alt="propaganda">
            <img class="prop" src="/eixoauto/eixoautopi/img/Propagandas/propaganda3.svg" alt="propaganda">
            <img class="prop" src="/eixoauto/eixoautopi/img/Propagandas/propaganda4.svg" alt="propaganda">
        </div>

        <div class="collum">
            <div class="fluid-linear-container" id="freio-category"></div>
        </div>

        <div class="container-slide">
            <div class="carousel-slide" id="slider">
                <img class="img-slides" src="/eixoauto/eixoautopi/img/Propagandas/slide-Filtro.png" alt="">
                <img class="img-slides" src="/eixoauto/eixoautopi/img/Propagandas/slide-Cupom.png" alt="">
                <img class="img-slides" src="/eixoauto/eixoautopi/img/Propagandas/slide-FreteGratis.png" alt="">
            </div>
            <button class="btn" id="prev">&#10094;</button>
            <button class="btn" id="next">&#10095;</button>
        </div>

        <div class="collum">
            <img class="suppliers" src="/eixoauto/eixoautopi/img/Fornecedores/LF.png" alt="logo de empresa fornecedora">
            <img class="suppliers" src="/eixoauto/eixoautopi/img/Fornecedores/Fly.png" alt="logo de empresa fornecedora">
            <img class="suppliers" src="/eixoauto/eixoautopi/img/Fornecedores/TruxMecanina.png" alt="logo de empresa fornecedora">
            <img class="suppliers" src="/eixoauto/eixoautopi/img/Fornecedores/TruckFIX.png" alt="logo de empresa fornecedora">
            <img class="suppliers" src="/eixoauto/eixoautopi/img/Fornecedores/Laranja.png" alt="logo de empresa fornecedora">
            <img class="suppliers" src="/eixoauto/eixoautopi/img/Fornecedores/Kleed.png" alt="logo de empresa fornecedora">
        </div>

    </div>


    <!-- Footer -->
     
    <footer>
        <div class="footer-container">
            <div class="footer-info">
                <img src="/eixoauto/eixoautopi/img/Icons/LogoBrancareal.png" alt="" sizes="" srcset="">
                <p>Seu destino para peças e acessórios automotivos de qualidade.</p>
                <p>Endereço: Rua Paineiras, 1300 - Contagem, Minas Gerais</p>
            </div>
            <div class="footer-links">
                <h3>Links Rápidos</h3>
                <ul>
                    <li><a href="#">Sobre nós</a></li>
                    <li><a href="#">Contato</a></li>
                    <li><a href="#">Política de Privacidade</a></li>
                    <li><a href="#">Termos e Condições</a></li>
                </ul>
            </div>
            <div class="footer-social">
                <h3>Redes Sociais</h3>
                <ul>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Twitter</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Loja de Autopeças - Todos os direitos reservados.</p>
        </div>
    </footer>

    <!-- Scripts JS -->

    <script src="/eixoauto/eixoautopi/js/favoritos.js"></script>
    <script src="/eixoauto/eixoautopi/js/index.js"></script>
    <script src="/eixoauto/eixoautopi/js/compras.js"></script>

</body>

</html>
