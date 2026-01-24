<?php 

include_once('config.php');

if(isset($_POST['submit'])){
    $nome = $_POST['Cli_Nome'];
    $cnpj = $_POST['Ins_CNPJ'];
    $inscricao = $_POST['Ins_InscricaoEstadual'];
    $email = $_POST['Ema_Email1'];
    $senha = $_POST['Cli_Senha'];
    $confirma_senha = $_POST['Cli_ConfirmaSenha']; 
    $telefone = $_POST['Tel_Telefone'];
    $rua = $_POST['End_Rua'];
    $numero = $_POST['End_Numero'];
    $bairro = $_POST['End_Bairro'];
    $cidade = $_POST['End_Cidade'];
    $estado = $_POST['End_Estado'];
    $cep = $_POST['End_CEP'];
    
    // Validação de senha
    if ($senha !== $confirma_senha) {
        echo "As senhas não coincidem!";
        exit;
    }

    
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
   

    $result_ins = "INSERT INTO tb_inscricao (Ins_CNPJ, Ins_InscricaoEstadual) VALUES (?, ?)";
    $pre_ins = $conexao->prepare($result_ins);
    $pre_ins->bind_param("ss", $cnpj, $inscricao);
    $pre_ins->execute();
    print($cnpj);

    // Inserir Ema_Email1
    $result_ema = "INSERT INTO tb_email (Ema_Email1) VALUES (?)";
    $pre_ema = $conexao->prepare($result_ema);
    $pre_ema->bind_param("s", $email);
    $pre_ema->execute();
    $ema_id = $conexao->insert_id;

    // Inserir Tel_Telefone
    $result_tel = "INSERT INTO tb_telefone (Tel_Telefone) VALUES (?)";
    $pre_tel = $conexao->prepare($result_tel);
    $pre_tel->bind_param("s", $telefone);
    $pre_tel->execute();
    $tel_id = $conexao->insert_id;

    // Inserir endereço
    $result_end = "INSERT INTO tb_endereco (End_CEP, End_Rua, End_Numero, End_Bairro, End_Cidade, End_Estado)  
                    VALUES (?, ?, ?, ?, ?, ?)";
    $pre_end = $conexao->prepare($result_end);
    $pre_end->bind_param("isisss", $cep, $rua, $numero, $bairro, $cidade, $estado);
    $pre_end->execute();
    $end_id = $conexao->insert_id;

    // Inserir cliente
    $result_cli = "INSERT INTO tb_cliente (Ins_CNPJ, Ema_id, Tel_Id, End_Id, Cli_Nome, Cli_Senha) VALUES (?, ?, ?, ?, ?, ?)";
    $pre_cli = $conexao->prepare($result_cli);
    $pre_cli->bind_param("siiiss", $cnpj, $ema_id, $tel_id, $end_id, $nome, $senha_hash);
    $pre_cli->execute();
    $cli_id = $conexao->insert_id;
}

?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <link rel="stylesheet" href="/eixoauto/eixoautopi/css/cadastro.css">
</head>

<body>

    <header>
        <div id="logo">
            <img src="/eixoauto/eixoautopi/img/Icons/LogoBrancareal.png.png" alt="Logo da empresa Eixo">
        </div>
    </header>


    <div id="container">

        <form action="#" method="POST">
            <h1>Cadastro</h1>
            
            <label for="Cli_Nome">Nome da Empresa:</label>
            <input type="text" id="Cli_Nome" name="Cli_Nome" required>

            <div class="input-group">
                <div class="input-item">
                    <label for="Ins_CNPJ">CNPJ:</label>
                    <input type="text" id="Ins_CNPJ" name="Ins_CNPJ">
                </div>

                <div class="input-item">
                    <label for="Ins_InscricaoEstadual">Inscrição:</label>
                    <input type="text" id="Ins_InscricaoEstadual" name="Ins_InscricaoEstadual" required>
                </div>
            </div>

            <label for="Ema_Email1">Email:</label>
            <input type="Ema_Email1" id="Ema_Email1" name="Ema_Email1" required>

            <label for="Cli_Senha">Senha:</label>
            <input type="password" id="Cli_Senha" name="Cli_Senha" required>

            <label for="Cli_ConfirmaSenha">Confirmar Senha:</label>
            <input type="password" id="Cli_ConfirmaSenha" name="Cli_ConfirmaSenha" required>

            <label for="Tel_Telefone">Telefone:</label>
            <input type="tel" id="Tel_Telefone" name="Tel_Telefone" required>

            <div class="input-group">
                <div class="input-item">
                    <label for="End_CEP">CEP:</label>
                    <input type="number" id="End_CEP" name="End_CEP">

                </div>

                <div class="input-item">
                    <label for="End_Numero">Número:</label>
                    <input type="number" id="End_Numero" name="End_Numero" required>
                </div>
            </div>

            <label for="End_Rua">Rua:</label>
            <input type="text" id="End_Rua" name="End_Rua" required>

            <label for="End_Bairro">Bairro:</label>
            <input type="text" id="End_Bairro" name="End_Bairro" required>


            <div class="input-group">
                <div class="input-item">
                    <label for="End_Cidade">Cidade:</label>
                    <input type="text" id="End_Cidade" name="End_Cidade" required>

                </div>

                <div class="input-item">
                    <label for="End_Estado">Estado:</label>
                    <input type="text" id="End_Estado" name="End_Estado" required>
                </div>
            </div>

            <button id="btn-cadastro" type="submit" name="submit" >
                <h4 id="cadastro">Cadastrar</h4>
            </button >
        </form>
    </div>
    <script src="/eixoauto/eixoautopi/js/cadastro.js"></script>
</body>

</html>