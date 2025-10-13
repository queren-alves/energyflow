<?php
session_start();

// reseta as variáveis da sessão
$_SESSION = array();

// apaga os cookie da sessão
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// destroi a sessão
session_destroy();

// redimenciona pra página de login
header('Location: ../../login.html');
exit;
?>
