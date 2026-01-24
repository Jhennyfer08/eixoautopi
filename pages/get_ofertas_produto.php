<?php
include 'config.php';
header('Content-Type: application/json; charset=utf-8');

// Recebe o código original do produto via GET
$codigo = isset($_GET['codigo']) ? $conexao->real_escape_string($_GET['codigo']) : '';

$sql = "SELECT p.Pro_ID as id, p.Pro_Nome as nome, p.Pro_Descricao as descricao, p.Pro_Preco as preco, p.Pro_LinkProduto as imagem, f.For_Nome as fornecedor, f.For_LinkSite as link_fornecedor
FROM tb_produto p
JOIN tb_fornecedor f ON p.For_ID = f.For_ID
WHERE p.Pro_CodigoOriginal = '$codigo'";

$result = $conexao->query($sql);
$ofertas = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $ofertas[] = $row;
    }
}
echo json_encode($ofertas, JSON_UNESCAPED_UNICODE);
?>
