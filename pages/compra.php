<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compra</title>

  <link rel="stylesheet" href="/eixoauto/eixoautopi/css/compra.css">
</head>

<body>
  <header>
    <div id="logo">
      <a href="/eixoauto/eixoautopi/pages/home.php">
        <img src="/eixoauto/eixoautopi/img/Icons/LogoBrancareal.png" alt="Logo da empresa Eixo">
      </a>
    </div>
  </header>

  <div id="produto-compra">
    <div class="product-container" id="product-container">
      <?php
      include 'config.php';
      $codigoOriginal = '';
      $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

      if ($id > 0) {
          $sql = "SELECT 
            p.Pro_Nome, 
            p.Pro_Preco, 
            p.Pro_Descricao,
            p.Pro_LinkProduto, 
            p.Pro_Imagem,
            f.For_Nome AS fornecedor, 
            f.logo AS logo, 
            f.For_LinkSite AS site,
            p.Pro_CodigoOriginal
          FROM tb_produto p
          JOIN tb_fornecedor f ON p.For_ID = f.For_ID
          WHERE p.Pro_ID = $id
          LIMIT 1";

          $result = $conexao->query($sql);

          if ($result && $result->num_rows > 0) {
              $row = $result->fetch_assoc();
              $codigoOriginal = $row['Pro_CodigoOriginal'];
              echo '<div class="product-section">';

                // imagem do produto
                if (!empty($row['Pro_Imagem'])) {
                  echo '<img class="img-product" src="/eixoauto/eixoautopi/' . htmlspecialchars($row['Pro_Imagem']) . '" alt="' . htmlspecialchars($row['Pro_Nome']) . '">';
                } else {
                  echo '<img class="img-product" src="/eixoauto/eixoautopi/img/Icons/heart-checked.png" alt="Imagem padrão">';
                }

                // nome e preço
                echo '<div class="prize">';
                echo '<a href="#">' . htmlspecialchars($row['Pro_Nome']) . '</a>';
                echo '<h1>R$ ' . number_format($row['Pro_Preco'], 2, ',', '.') . '</h1>';
                echo '</div>';

                // logo + link do site
                echo '<div class="store-link">';
                if (!empty($row['logo'])) {
                  echo '<a href="' . htmlspecialchars($row['site']) . '" target="_blank">
                          <img src="/eixoauto/eixoautopi/' . htmlspecialchars($row['logo']) . '" alt="Logo do Fornecedor" class="logo-fornecedor">
                        </a>';
                } else {
                  echo htmlspecialchars($row['fornecedor']);
                }
                echo '<a href="' . htmlspecialchars($row['Pro_LinkProduto']) . '" target="_blank"><button>Comprar na Loja</button></a>';
                echo '</div>';

                // descrição
                echo '<div class="desc">';
                echo '<h3>Descrição</h3>';
                echo '<p>' . htmlspecialchars($row['Pro_Descricao']) . '</p>';
                echo '</div>';

              echo '</div>'; // fim product-section
          } else {
              echo "<p>Produto não encontrado.</p>";
          }
      } else {
          echo "<p>ID inválido.</p>";
      }
      ?>
    </div>
  </div>

  <div class="comparison">
    <?php
    // NÃO precisa incluir config.php de novo!

    if (!empty($codigoOriginal)) {
        $sql = "SELECT 
              p.Pro_ID,
              p.Pro_Nome, 
              p.Pro_Preco, 
              p.Pro_LinkProduto, 
              p.Pro_Imagem,
              f.For_Nome AS fornecedor, 
              f.logo AS logo, 
              f.For_LinkSite AS site
            FROM tb_produto p
            JOIN tb_fornecedor f ON p.For_ID = f.For_ID
            WHERE p.Pro_CodigoOriginal = '" . $conexao->real_escape_string($codigoOriginal) . "' 
              AND p.Pro_ID != $id
            LIMIT 15";

        $result = $conexao->query($sql);

        if ($result && $result->num_rows > 0) {
          while ($row = $result->fetch_assoc()) {
            echo '<div class="product-section">';
            // imagem do produto
            if (!empty($row['Pro_Imagem'])) {
              echo '<img class="img-product" src="/eixoauto/eixoautopi/' . htmlspecialchars($row['Pro_Imagem']) . '" alt="' . htmlspecialchars($row['Pro_Nome']) . '">';
            } else {
              echo '<img class="img-product" src="/eixoauto/eixoautopi/img/Icons/heart-checked.png" alt="Imagem padrão">';
            }
            // nome e preço
            echo '<div class="prize">';
            echo '<a href="#">' . htmlspecialchars($row['Pro_Nome']) . '</a>';
            echo '<h1>R$ ' . number_format($row['Pro_Preco'], 2, ',', '.') . '</h1>';
            echo '</div>';
            // logo + link do site
            echo '<div class="store-link">';
            if (!empty($row['logo'])) {
              echo '<a href="' . htmlspecialchars($row['site']) . '" target="_blank">
                      <img src="/eixoauto/eixoautopi/' . htmlspecialchars($row['logo']) . '" alt="Logo do Fornecedor" class="logo-fornecedor">
                    </a>';
            } else {
              echo htmlspecialchars($row['fornecedor']);
            }
            echo '<a href="' . htmlspecialchars($row['Pro_LinkProduto']) . '" target="_blank"><button>Comprar na Loja</button></a>';
            echo '</div>';
            echo '</div>'; // fim product-section
          }
        } else {
          echo '<p>Nenhuma oferta encontrada.</p>';
        }
    } else {
        echo '<p>Nenhuma oferta encontrada.</p>';
    }
    ?>
  </div>

  <?php
  echo "<!-- Código original: $codigoOriginal -->";
  ?>

  <script src="/eixoauto/eixoautopi/js/favoritos.js"></script>
  <script src="/eixoauto/eixoautopi/js/compras.js"></script>
  <script src="/eixoauto/eixoautopi/js/index.js"></script>
  <script>
    // Exemplo de redirecionamento com ID
    function apresentar(produto) {
        if (!produto || !produto.id) {
            console.error("Produto ou ID do produto não encontrado.");
            return;
        }

        
        window.location.href = `/eixoauto/eixoautopi/pages/compra.php?id=${produto.id}`;
    }
  </script>
</body>

</html>
