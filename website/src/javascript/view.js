document.addEventListener('DOMContentLoaded', () => {  
  // Data Visualization Charts
  const initializeCharts = () => {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      console.error('Chart.js is not loaded');
      return;
    }

    // Line Chart - Energy Consumption by Environment
const lineCtx = document.getElementById('lineChart');
if (lineCtx) {
  const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      datasets: [{
        label: 'Kitchen',
        data: [2.1, 2.8, 3.5, 3.2, 4.1, 3.8],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,           // antes: 1000
        easing: 'easeInOutCubic'  // transição mais suave
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgb(17, 24, 39)',
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(229, 231, 235, 0.5)' },
          ticks: {
            callback: value => value + ' kW'
          }
        },
        x: { grid: { display: false } }
      }
    }
  });

  // Animate line chart data
  setInterval(() => {
    lineChart.data.datasets[0].data = lineChart.data.datasets[0].data.map(() =>
      (Math.random() * 3 + 1.5).toFixed(1)
    );
    lineChart.update('active');
  }, 5000); // antes: 3000
}

// Bar Chart - Consumption Alerts
const barCtx = document.getElementById('barChart');
if (barCtx) {
  const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Device 1', 'Device 2', 'Device 3', 'Device 4', 'Device 5'],
      datasets: [{
        label: 'Consumption',
        data: [65, 85, 45, 95, 70],
        backgroundColor: [
          'rgb(16, 185, 129)',
          'rgb(251, 191, 36)',
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
          'rgb(251, 191, 36)'
        ],
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeInOutCubic'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgb(17, 24, 39)',
          padding: 12,
          cornerRadius: 8
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(229, 231, 235, 0.5)' },
          ticks: {
            callback: value => value + '%'
          }
        },
        x: { grid: { display: false } }
      }
    }
  });

  // Animate bar chart data
  setInterval(() => {
    barChart.data.datasets[0].data = barChart.data.datasets[0].data.map(() => {
      const value = Math.floor(Math.random() * 60 + 40);
      return value;
    });
    barChart.data.datasets[0].backgroundColor = barChart.data.datasets[0].data.map(value => {
      if (value < 70) return 'rgb(16, 185, 129)';
      if (value < 85) return 'rgb(251, 191, 36)';
      return 'rgb(239, 68, 68)';
    });
    barChart.update('active');
  }, 5000); // antes: 2500
}

    // Horizontal Bar Chart - Device Comparison
    const horizontalBarCtx = document.getElementById('horizontalBarChart');
    if (horizontalBarCtx) {
      const horizontalBarChart = new Chart(horizontalBarCtx, {
        type: 'bar',
        data: {
          labels: ['HVAC', 'Lighting', 'Computers', 'Kitchen', 'Other'],
          datasets: [{
            label: 'Energy Usage (kWh)',
            data: [45, 28, 35, 22, 18],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgb(17, 24, 39)',
              padding: 12,
              cornerRadius: 8
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                color: 'rgba(229, 231, 235, 0.5)'
              },
              ticks: {
                callback: function(value) {
                  return value + ' kWh';
                }
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          }
        }
      });

      // Animate horizontal bar chart data
      setInterval(() => {
        horizontalBarChart.data.datasets[0].data = horizontalBarChart.data.datasets[0].data.map(() => 
          Math.floor(Math.random() * 30 + 15)
        );
        horizontalBarChart.update('active');
      }, 4000);
    }

    // Doughnut Chart - Energy Savings Overview
    const doughnutCtx = document.getElementById('doughnutChart');
    if (doughnutCtx) {
      const doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Saved', 'Used'],
          datasets: [{
            data: [28, 72],
            backgroundColor: [
              'rgb(16, 185, 129)',
              'rgb(229, 231, 235)'
            ],
            borderWidth: 0,
            cutout: '75%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgb(17, 24, 39)',
              padding: 12,
              cornerRadius: 8
            }
          }
        }
      });

      // Animate doughnut chart data
      setInterval(() => {
        const savedPercentage = Math.floor(Math.random() * 15 + 20);
        doughnutChart.data.datasets[0].data = [savedPercentage, 100 - savedPercentage];
        doughnutChart.update('active');
        
        const centerText = document.querySelector('.center-percentage');
        if (centerText) {
          // Smooth transition for center text
          centerText.style.transition = 'opacity 0.3s ease';
          centerText.style.opacity = '0';
          setTimeout(() => {
            centerText.textContent = savedPercentage + '%';
            centerText.style.opacity = '1';
          }, 300);
        }
      }, 4000);

    }
  };

  // Initialize charts when the data visualization section is visible
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initializeCharts();
        chartObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  const dataVizSection = document.querySelector('.data-visualization-section');
  if (dataVizSection) {
    chartObserver.observe(dataVizSection);
  }
});