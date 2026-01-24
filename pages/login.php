<?php
session_start();
include_once('config.php');

if (isset($_POST['submit'])) {
    $cnpj = $_POST['Ins_CNPJ'];
    $senha = $_POST['Cli_Senha'];

    $consulta_login = "SELECT Cli_ID, Ins_CNPJ, Cli_Senha FROM tb_cliente WHERE Ins_CNPJ = ?";
    $login = $conexao->prepare($consulta_login);
    $login->bind_param("s", $cnpj);
    $login->execute();
    $login->store_result();
    $login->bind_result($id, $db_cnpj, $db_senha);

    if ($login->num_rows > 0) {
        $login->fetch();

        if (password_verify($senha, $db_senha)) {
            $_SESSION['id'] = $id;
            $_SESSION['cnpj'] = $db_cnpj;
            header("Location: home.php");
            exit; 
        } else {
            $_SESSION['erro'] = "Senha incorreta!";
            header("Location: login.php");
            exit;
        }
    } else {
        $_SESSION['erro'] = "Usuário não encontrado!";
        header("Location: login.php");
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/eixoauto/eixoautopi/css/login.css">
</head>
<body>
    <header>
        <div>
            <img id="logo" src ="/eixoauto/eixoautopi/img/Icons/LogoBrancareal.png.png" alt="">
        </div>
    </header>
    
    <div class="container">
        <form action="login.php" method="POST">
            <h2>Login</h2>
            <ul class="input-group">
                <label for="Ins_CNPJ">CNPJ:</label>
                <input type="text" id="Ins_CNPJ" name="Ins_CNPJ" required>
            <ul>
            <ul class="input-group">
                <label for="Cli_Senha">Senha:</label>
                <input type="password" id="Cli_Senha" name="Cli_Senha" required>
            <ul>
            <button type="submit" name="submit">Entrar</button>

            <nav id="signup-link">
             <p>Ainda não tem uma conta? <a href="/eixoauto/eixoautopi/pages/cadastro.php">Cadastre-se</a></p>
            </nav>
        </form>
    </div>
</body>
</html>