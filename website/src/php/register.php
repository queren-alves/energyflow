<?php
session_start();
require_once 'config.php';

setJSONHeaders();

// lida com OPTIONS request do CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// verifica se o request é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSONResponse(false, 'Metódo de requisição inválido');
}

// valida as entradas
$firstName = trim($_POST['firstName'] ?? '');
$lastName = trim($_POST['lastName'] ?? '');
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';

// valida o nome
if (empty($firstName)) {
    sendJSONResponse(false, 'Nome é obrigatório');
}

// valida o sobrenome
if (empty($lastName)) {
    sendJSONResponse(false, 'Sobrenome é obrigatório');
}

// valida e-mail
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendJSONResponse(false, 'Digite um e-mail válido');
}

// valida senha
if (empty($password)) {
    sendJSONResponse(false, 'Senha é obrigatória');
}

// verifica a segurança da senha
if (strlen($password) < 8) {
    sendJSONResponse(false, 'Senha deve possuir pelo menos 8 caracteres');
}

if (!preg_match('/[A-Z]/', $password)) {
    sendJSONResponse(false, 'Senha deve possuir pelo menos uma letra maiúscula');
}

if (!preg_match('/[a-z]/', $password)) {
    sendJSONResponse(false, 'Senha deve possuir pelo menos uma letra minúscula');
}

if (!preg_match('/[0-9]/', $password)) {
    sendJSONResponse(false, 'Senha deve possuir pelo menos um número');
}

if (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $password)) {
    sendJSONResponse(false, 'Senha deve possuir pelo menos um caractere especial');
}

// valida se as senhas são iguais
if ($password !== $confirmPassword) {
    sendJSONResponse(false, 'Senhas não são iguais');
}

// conecta com o database
$pdo = getDBConnection();
if (!$pdo) {
    sendJSONResponse(false, 'Falha ao conectar com banco de dados. Por favor, tente novamente mais tarde.');
}

try {
    // verifica se o e-mail já existe
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email LIMIT 1");
    $stmt->execute(['email' => $email]);
    
    if ($stmt->fetch()) {
        sendJSONResponse(false, 'Já existe uma conta com esse e-mail');
    }

    // hash da senha
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    // inserção de novo usuário 
    $insertStmt = $pdo->prepare("
        INSERT INTO users (first_name, last_name, email, password, created_at) 
        VALUES (:first_name, :last_name, :email, :password, NOW())
    ");
    
    $insertStmt->execute([
        'first_name' => $firstName,
        'last_name' => $lastName,
        'email' => $email,
        'password' => $hashedPassword
    ]);

    // guarda o ID do usuário
    $userId = $pdo->lastInsertId();

    // resposta de cadastro concluído
    sendJSONResponse(
        true, 
        'Conta criada com sucesso! Redimencionando para o login...', 
        [
            'user_id' => $userId
        ],
        'login.html'
    );

} catch (PDOException $e) {
    error_log("Erro ao criar conta: " . $e->getMessage());
    sendJSONResponse(false, 'Houve um erro durante o cadastro da conta. Por favor, tente novamente.');
}
?>
