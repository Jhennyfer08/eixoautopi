<?php
// Conexão com o banco de dados
$conn = new mysqli('localhost', 'root', '', 'db_atvpi');
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Caminho da pasta de imagens
$pastaImagens = __DIR__ . '/../img/Produtos/';

// Verifica se a pasta existe
if (!is_dir($pastaImagens)) {
    die("Pasta de imagens não encontrada: $pastaImagens");
}

// Busca os arquivos de imagem na pasta
$arquivosImagens = scandir($pastaImagens);

// Remove "." e ".." dos resultados
$arquivosImagens = array_filter($arquivosImagens, function ($arquivo) {
    return !in_array($arquivo, ['.', '..']);
});

// Atualiza o campo Pro_Imagem no banco de dados
foreach ($arquivosImagens as $arquivo) {
    // Remove a extensão do arquivo para comparar com o nome do produto
    $nomeImagem = pathinfo($arquivo, PATHINFO_FILENAME);

    // Busca o produto cujo nome é parecido com o nome da imagem
    $sql = "SELECT Pro_ID, Pro_Nome FROM tb_produto WHERE Pro_Nome LIKE '%$nomeImagem%' OR Pro_Nome LIKE '%" . str_replace('_', ' ', $nomeImagem) . "%'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $produtoId = $row['Pro_ID'];
            $produtoNome = $row['Pro_Nome'];

            // Atualiza o campo Pro_Imagem com o caminho da imagem
            $caminhoImagem = "/eixoauto/eixoautopi/img/Produtos/$arquivo";
            $updateSql = "UPDATE tb_produto SET Pro_Imagem = '$caminhoImagem' WHERE Pro_ID = $produtoId";

            if ($conn->query($updateSql)) {
                echo "Imagem atualizada para o produto '$produtoNome' (ID: $produtoId): $caminhoImagem<br>";
            } else {
                echo "Erro ao atualizar imagem para o produto '$produtoNome' (ID: $produtoId): " . $conn->error . "<br>";
            }
        }
    } else {
        echo "Nenhum produto encontrado para a imagem '$arquivo'<br>";
    }
}

$conn->close();
?>
