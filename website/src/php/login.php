<?php
session_start();
require_once 'config.php';

setJSONHeaders();

// lida com OPTIONS request do CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// só aceita request POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSONResponse(false, 'Metódo de requisição inválido');
}

// valida as entradas
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password = $_POST['password'] ?? '';

// valida o e-mail
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJSONResponse(false, 'Digite um e-mail válido');
}

// valida a senha
if (empty($password)) {
    sendJSONResponse(false, 'Senha obrigatória');
}

// conecta com o database
$pdo = getDBConnection();
if (!$pdo) {
    sendJSONResponse(false, 'Falha ao conectar com banco de dados. Por favor, tente novamente mais tarde.');
}

try {
    // query pra procurar usuário no database
    $stmt = $pdo->prepare("SELECT id, first_name, last_name, email, password FROM users WHERE email = :email LIMIT 1");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    // verifica se o usuário existe
    if (!$user) {
        sendJSONResponse(false, 'E-mail ou senha inválidos');
    }

    // verifica a senha
    if (!password_verify($password, $user['password'])) {
        sendJSONResponse(false, 'E-mail ou senha inválidos');
    }

    // definição das variáveis da sessão
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_name'] = $user['first_name'] . ' ' . $user['last_name'];
    $_SESSION['logged_in'] = true;

    // atualiza o último login do usuário
    $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
    $updateStmt->execute(['id' => $user['id']]);

    // resposta de login concluído
    sendJSONResponse(
        true, 
        'Login concluído! Redimencionando...', 
        [
            'user' => [
                'id' => $user['id'],
                'name' => $user['first_name'] . ' ' . $user['last_name'],
                'email' => $user['email']
            ]
        ],
        'dashboard.html'
    );

} catch (PDOException $e) {
    error_log("Erro no login: " . $e->getMessage());
    sendJSONResponse(false, 'Houve um erro durante o login. Por favor, tente novamente.');
}
?>