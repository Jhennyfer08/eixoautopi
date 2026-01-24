<?php
include 'config.php';
header('Content-Type: application/json; charset=utf-8');

$termo = isset($_GET['q']) ? $_GET['q'] : '';
$produtos = [];

if ($stmt = $conexao->prepare("SELECT 
    Pro_ID as id, 
    Pro_Nome as nome, 
    Pro_Descricao as descricao, 
    Pro_Preco as preco, 
    Pro_Imagem as imagem, 
    Pro_LinkProduto as link, 
    Pro_CodigoOriginal as codigo 
FROM tb_produto 
WHERE Pro_Nome LIKE ? OR Pro_Descricao LIKE ? OR Pro_CodigoOriginal LIKE ?")) {

    $likeTerm = "%$termo%";
    $stmt->bind_param("sss", $likeTerm, $likeTerm, $likeTerm);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }

    echo json_encode($produtos, JSON_UNESCAPED_UNICODE);

    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Erro na preparação da query',
        'db_error' => $conexao->error
    ], JSON_UNESCAPED_UNICODE);
}
?>
