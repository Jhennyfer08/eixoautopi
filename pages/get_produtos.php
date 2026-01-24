<?php
include 'config.php';
header('Content-Type: application/json; charset=utf-8');

$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0;
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

$sql = "SELECT 
            Pro_ID as id, 
            Pro_Nome as nome, 
            Pro_Descricao as descricao, 
            Pro_Preco as preco, 
            Pro_LinkProduto as link, 
            Pro_CodigoOriginal as codigo, 
            Pro_Imagem as imagem,
            Pro_Categoria as categoria
        FROM tb_produto";


if ($limit > 0) {
    $sql .= " LIMIT $limit OFFSET $offset";
}

$result = $conexao->query($sql);
$produtos = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $img = $row['imagem'];

        if (!empty($img)) {
            if (is_string($img) && strpos($img, '/') !== false) {
                // Caminho relativo do banco
                $row['imagem'] = '/eixoauto/eixoautopi/' . ltrim($img, '/');
            } else {
                $row['imagem'] = 'data:image/jpeg;base64,' . base64_encode($img);
            }
        } else {
            $row['imagem'] = '/eixoauto/eixoautopi/img/Icons/sem-foto.png';
        }

        // Formata preço no padrão BR
        $row['preco'] = "R$ " . number_format($row['preco'], 2, ',', '.');

        $produtos[] = $row;
    }
}

echo json_encode($produtos, JSON_UNESCAPED_UNICODE);
?>
