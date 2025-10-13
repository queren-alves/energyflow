<?php
session_start();

// verifica se o usuário está logado
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: ../../login.html');
    exit;
}

$userName = $_SESSION['user_name'] ?? 'User';
$userEmail = $_SESSION['user_email'] ?? '';
?>
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <title>Dashboard - EnergyFlow</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="../styles/dashboard.css" rel="stylesheet" />
  </head>
  <body>
    <header class="header">
      <div class="header-container">
        <div class="header-content">
          <a href="../index.html" class="logo-link">
            <img
              src="https://c.animaapp.com/mgf8ql20WYB2aa/assets/icon-1.svg"
              alt="Icon"
              class="logo-icon"
            />
            <span class="logo-text">EnergyFlow</span>
          </a>
          <div class="user-section">
            <span class="welcome-text">Bem vindo(a), <?php echo htmlspecialchars($userName); ?></span>
            <a href="logout.php" class="logout-btn">Sair</a>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="background-gradient"></div>
      
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">Dashboard</h1>
          <p class="page-subtitle">Bem vindo(a) ao seu painel de energia da EnergyFlow</p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <h3 class="stat-title">Consumo atual</h3>
              <img src="https://c.animaapp.com/mgf8ql20WYB2aa/assets/icon-2.svg" alt="Icon" class="stat-icon" />
            </div>
            <p class="stat-value">2.4 kW</p>
            <p class="stat-description">Monitoramento em tempo real</p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <h3 class="stat-title">Custo de hoje</h3>
              <img src="https://c.animaapp.com/mgf8ql20WYB2aa/assets/icon-8.svg" alt="Icon" class="stat-icon" />
            </div>
            <p class="stat-value">R$12.50</p>
            <p class="stat-description">30% de redução</p>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <h3 class="stat-title">Status do Sistema</h3>
              <img src="https://c.animaapp.com/mgf8ql20WYB2aa/assets/icon-18.svg" alt="Icon" class="stat-icon" />
            </div>
            <p class="stat-value">99.9%</p>
            <p class="stat-description">Disponibilidade</p>
          </div>
        </div>

        <div class="chart-card">
          <h2 class="chart-title">Consumo Energético</h2>
          <div class="chart-container">
            <div class="chart-bars">
              <div class="chart-bar chart-bar-1"></div>
              <div class="chart-bar chart-bar-2"></div>
              <div class="chart-bar chart-bar-3"></div>
              <div class="chart-bar chart-bar-4"></div>
              <div class="chart-bar chart-bar-5"></div>
              <div class="chart-bar chart-bar-6"></div>
              <div class="chart-bar chart-bar-7"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</html>
