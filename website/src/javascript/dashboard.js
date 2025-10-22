document.addEventListener('DOMContentLoaded', () => {
      const mainContent = document.querySelector('.main-content');
      const navItems = document.querySelectorAll('.nav-item');
      let realtimeChart;
      let currentRefreshInterval;

      // mudar tabs
      function showPage(pageId) {
        document.querySelectorAll('.page-content').forEach(page => {
          page.classList.remove('active');
        });
        document.getElementById(`${pageId}-page`).classList.add('active');

        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.dataset.page === pageId) {
            item.classList.add('active');
          }
        });

        // para a simulação se sair do dashboard
        if (pageId !== 'dashboard' && currentRefreshInterval) {
          clearInterval(currentRefreshInterval);
          currentRefreshInterval = null;
        }

        // começa a simulação se tiver no dashboard
        if (pageId === 'dashboard') {
          startRealtimeUpdates();
        }
      }

      // chart.js
      function initializeChart() {
        const ctx = document.getElementById('realtime-chart').getContext('2d');
        realtimeChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [],
            datasets: [{
              label: 'Consumo de Energia(W)',
              data: [],
              borderColor: 'rgb(16, 185, 129)',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              fill: true,
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'category',
                title: {
                  display: true,
                  text: 'Hora'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Energia (W)'
                }
              }
            }
          }
        });
      }

      // simula dados em tempo real
      async function fetchRealtimeData() {
        const totalConsumption = Math.floor(Math.random() * (1500 - 500 + 1)) + 500; 
        const deviceUsages = {
          'device-1-usage': Math.floor(Math.random() * (100 - 10 + 1)) + 10,
          'device-2-usage': Math.floor(Math.random() * (200 - 50 + 1)) + 50,
          'device-3-usage': Math.floor(Math.random() * (500 - 100 + 1)) + 100,
          'device-4-usage': Math.floor(Math.random() * (800 - 200 + 1)) + 200,
        };

        // simula o dispositivo 3 offline as vezes
        const device3StatusElement = document.querySelector('#dashboard-page #device-3-usage').previousElementSibling.querySelector('.device-status');
        const tableDevice3StatusElement = document.querySelector('#devices-page #table-device-3-usage').previousElementSibling.querySelector('.device-status');
        if (Math.random() > 0.8) { 
          deviceUsages['device-3-usage'] = 0;
          device3StatusElement.classList.remove('active');
          device3StatusElement.classList.add('inactive');
          device3StatusElement.textContent = 'Offline';
          tableDevice3StatusElement.classList.remove('active');
          tableDevice3StatusElement.classList.add('inactive');
          tableDevice3StatusElement.textContent = 'Offline';
        } else {
          device3StatusElement.classList.remove('inactive');
          device3StatusElement.classList.add('active');
          device3StatusElement.textContent = 'Online';
          tableDevice3StatusElement.classList.remove('inactive');
          tableDevice3StatusElement.classList.add('active');
          tableDevice3StatusElement.textContent = 'Online';
        }


        // atualiza os dados
        document.getElementById('total-consumption').textContent = `${totalConsumption} W`;

        // atualiza o consumo de cada um dos dispositivos
        for (const deviceId in deviceUsages) {
          document.getElementById(deviceId).textContent = `${deviceUsages[deviceId]} W`;
          // atualiza a table
          const tableDeviceId = `table-${deviceId}`;
          const tableElement = document.getElementById(tableDeviceId);
          if (tableElement) {
            tableElement.textContent = deviceUsages[deviceId];
          }
        }

        // simula atualização de min/max
        const currentHighest = parseFloat(document.getElementById('highest-consumption').textContent) || 0;
        const currentLowest = parseFloat(document.getElementById('lowest-consumption').textContent) || Infinity;

        if (totalConsumption > currentHighest) {
          document.getElementById('highest-consumption').textContent = `${totalConsumption} W`;
        }
        if (totalConsumption < currentLowest) {
          document.getElementById('lowest-consumption').textContent = `${totalConsumption} W`;
        }

        // atualiza o grafico
        const now = new Date();
        const timeLabel = now.toLocaleTimeString();

        realtimeChart.data.labels.push(timeLabel);
        realtimeChart.data.datasets[0].data.push(totalConsumption);

        // so aparece os ultimos 20 registros
        const maxDataPoints = 20;
        if (realtimeChart.data.labels.length > maxDataPoints) {
          realtimeChart.data.labels.shift();
          realtimeChart.data.datasets[0].data.shift();
        }
        realtimeChart.update();
      }

      function getRefreshRate() {
        const rateInput = document.getElementById('refresh-rate');
        return (rateInput ? parseInt(rateInput.value) * 1000 : 5000) || 5000; 
      }

      function startRealtimeUpdates() {
        if (currentRefreshInterval) {
          clearInterval(currentRefreshInterval);
        }
        const refreshRate = getRefreshRate();
        fetchRealtimeData();
        currentRefreshInterval = setInterval(fetchRealtimeData, refreshRate);
      }

      // tabs
      navItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          showPage(e.currentTarget.dataset.page);
        });
      });

      // pra iniciar
      initializeChart();
      showPage('dashboard');
    });
