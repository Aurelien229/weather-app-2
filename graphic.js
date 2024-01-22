// chart.js

let temperatureChart; // Déclarer la variable en dehors de la fonction

export function createTemperatureChart(temperatureData, humidityData, windData) {
    // Vérifier si le graphique existe et le détruire le cas échéant
    if (temperatureChart) {
        temperatureChart.destroy();
    }

    let ctx = document.getElementById('temperatureChart').getContext('2d');
    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: temperatureData.length }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Température (°C)',
                    data: temperatureData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Humidité (%)',
                    data: humidityData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                },
                {
                    label: 'Vitesse du vent (km/h)',
                    data: windData,
                    borderColor: 'rgba(255, 205, 86, 1)',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: 'rgba(255, 205, 86, 0.5)',
                },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        fontSize: 14
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        fontSize: 16
                    }
                }
            }
        }
    });

    // Centrer horizontalement le conteneur du graphique
    let container = document.getElementById('temperatureChartContainer');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
}
