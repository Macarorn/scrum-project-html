document.addEventListener('DOMContentLoaded', function () {
    // --- Paleta de Colores  ---
    const colors = {
        green: '#4ade80',
        blue: '#60a5fa',
        purple: '#a78bfa',
        red: '#f87171',
        yellow: '#facc15',
        white: '#ffffff',
        textDark: '#1e293b',
        grey: '#e2e8f0',
        textLight: '#64748b'
    };

    const getGradient = (ctx, color) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        const rgb = Chart.helpers.color(color).rgbString().replace('rgb(', '').replace(')', '');
        gradient.addColorStop(0, `rgba(${rgb}, 0.25)`);
        gradient.addColorStop(1, `rgba(${rgb}, 0)`);
        return gradient;
    };

    // --- Datos Simulados ---
    const mockData = {
        sprintActual: { labels: ['Por Hacer', 'En progreso', 'Terminado'], data: [25, 40, 35] },
        sprints: {
            sprint7: { label: 'Sprint 7', data: [30, 25, 40, 60, 55, 65], color: '#a78bfa', status: [30, 50, 20] },
            sprint8: { label: 'Sprint 8', data: [50, 40, 70, 50, 60, 80], color: '#f87171', status: [15, 45, 40] },
            sprint9: { label: 'Sprint 9', data: [65, 59, 80, 81, 56, 55], color: '#60a5fa', status: [10, 30, 60] },
            sprint10: { label: 'Sprint 10', data: [20, 30, 50, 70, 45, 55], color: '#4ade80', status: [25, 40, 35] },
        },
        estimacion: { labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'], data: [4, 3, 5, 2] },
        sprintsTerminados: { terminados: 8, total: 12 },
        velocidad: {
            labels: ['Sprint 7', 'Sprint 8', 'Sprint 9'],
            prometido: [50, 55, 60],
            completado: [45, 50, 58]
        },
        distribucionTareas: {
            labels: ['Features', 'Bugs', 'Deuda Técnica'],
            data: [60, 25, 15]
        }
    };

    // --- Opciones Globales de Gráficos ---
    const globalChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 800, easing: 'easeInOutCubic' },
        plugins: {
            legend: {
                position: 'bottom',
                align: 'center',
                labels: {
                    font: { family: "'DM Sans', sans-serif", size: 13 },
                    color: colors.textLight,
                    boxWidth: 10,
                    boxHeight: 10,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20
                },
                // INTERACTIVIDAD: Resaltar al pasar el cursor sobre la leyenda
                onHover: (event, legendItem, legend) => {
                    legend.chart.data.datasets.forEach((dataset, index) => {
                        dataset.backgroundColor = index === legendItem.datasetIndex ? dataset.originalBackgroundColor : Chart.helpers.color(dataset.originalBackgroundColor).alpha(0.2).rgbString();
                        dataset.borderColor = index === legendItem.datasetIndex ? dataset.originalBorderColor : Chart.helpers.color(dataset.originalBorderColor).alpha(0.2).rgbString();
                    });
                    legend.chart.update();
                },
                onLeave: (event, legendItem, legend) => {
                    legend.chart.data.datasets.forEach(dataset => {
                        dataset.backgroundColor = dataset.originalBackgroundColor;
                        dataset.borderColor = dataset.originalBorderColor;
                    });
                    legend.chart.update();
                }
            },
            tooltip: { enabled: false } // Tooltip deshabilitado
        },
        interaction: { intersect: false, mode: 'index' },
        scales: {
            y: { border: { display: false }, grid: { color: '#e8eef3', drawTicks: false }, ticks: { color: colors.textLight, font: { size: 12 } } },
            x: { border: { display: false }, grid: { display: false }, ticks: { color: colors.textLight, font: { size: 12 } } }
        }
    };

    // --- Inicialización de Gráficos ---

    // 1. Sprint Actual (Doughnut)
    const sprintActualCtx = document.getElementById('sprintActualChart')?.getContext('2d');
    if (sprintActualCtx) {
        const sprintActualChart = new Chart(sprintActualCtx, {
            type: 'doughnut',
            data: {
                labels: mockData.sprintActual.labels,
                datasets: [{ data: mockData.sprintActual.data, backgroundColor: [colors.red, colors.blue, colors.green], borderColor: colors.white, borderWidth: 4, hoverOffset: 12 }]
            },
            options: {
                ...globalChartOptions,
                cutout: '75%',
                // INTERACTIVIDAD: Hacer clic en una sección
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const clickedIndex = elements[0].index;
                        const label = sprintActualChart.data.labels[clickedIndex];
                        const value = sprintActualChart.data.datasets[0].data[clickedIndex];
                        console.log(`Clic en: ${label} (${value}%)`);
                        alert(`Has hecho clic en la sección: ${label}`);
                    }
                }
            }
        });
    }

    // 2. Comparativa Desarrollo de Sprints (Line)
    const comparativaSprintsCtx = document.getElementById('comparativaSprintsChart')?.getContext('2d');
    if (comparativaSprintsCtx) {
        const chart = new Chart(comparativaSprintsCtx, {
            type: 'line',
            data: { labels: ['Día 1', 'Día 5', 'Día 10', 'Día 15', 'Día 20', 'Día 25'] },
            options: { ...globalChartOptions, scales: { ...globalChartOptions.scales, y: { ...globalChartOptions.scales.y, max: 100 } } }
        });
        const updateChart = () => {
            const sprint1 = mockData.sprints[document.getElementById('sprint1-select').value];
            const sprint2 = mockData.sprints[document.getElementById('sprint2-select').value];
            chart.data.datasets = [
                { label: sprint1.label, data: sprint1.data, borderColor: sprint1.color, backgroundColor: getGradient(comparativaSprintsCtx, sprint1.color), tension: 0.4, fill: true, pointRadius: 4, pointBackgroundColor: sprint1.color, pointBorderColor: colors.white, pointHoverRadius: 8, borderWidth: 3, originalBackgroundColor: getGradient(comparativaSprintsCtx, sprint1.color), originalBorderColor: sprint1.color },
                { label: sprint2.label, data: sprint2.data, borderColor: sprint2.color, backgroundColor: getGradient(comparativaSprintsCtx, sprint2.color), tension: 0.4, fill: true, pointRadius: 4, pointBackgroundColor: sprint2.color, pointBorderColor: colors.white, pointHoverRadius: 8, borderWidth: 3, originalBackgroundColor: getGradient(comparativaSprintsCtx, sprint2.color), originalBorderColor: sprint2.color }
            ];
            chart.update('none');
        };
        document.getElementById('sprint1-select').addEventListener('change', updateChart);
        document.getElementById('sprint2-select').addEventListener('change', updateChart);
        updateChart();
    }

    // 3. Historial de Velocidad (Bar)
    const velocidadCtx = document.getElementById('velocidadChart')?.getContext('2d');
    if (velocidadCtx) {
        new Chart(velocidadCtx, {
            type: 'bar',
            data: {
                labels: mockData.velocidad.labels,
                datasets: [
                    { label: 'Prometido', data: mockData.velocidad.prometido, backgroundColor: colors.grey, borderRadius: 6, originalBackgroundColor: colors.grey, originalBorderColor: colors.grey },
                    { label: 'Completado', data: mockData.velocidad.completado, backgroundColor: colors.green, borderRadius: 6, originalBackgroundColor: colors.green, originalBorderColor: colors.green }
                ]
            },
            options: { ...globalChartOptions, scales: { ...globalChartOptions.scales, x: { ...globalChartOptions.scales.x, grid: { display: true } } } }
        });
    }

    // 4. Estimación de entrega (Bar)
    const estimacionEntregaCtx = document.getElementById('estimacionEntregaChart')?.getContext('2d');
    if (estimacionEntregaCtx) {
        new Chart(estimacionEntregaCtx, {
            type: 'bar',
            data: {
                labels: mockData.estimacion.labels,
                datasets: [{ label: 'Semanas', data: mockData.estimacion.data, backgroundColor: colors.blue, borderRadius: 6, barPercentage: 0.6, hoverBackgroundColor: colors.purple }]
            },
            options: { ...globalChartOptions, plugins: { ...globalChartOptions.plugins, legend: { display: false } } }
        });
    }

    // 5. Distribución de Tareas (PolarArea)
    const distribucionTareasCtx = document.getElementById('distribucionTareasChart')?.getContext('2d');
    if (distribucionTareasCtx) {
        new Chart(distribucionTareasCtx, {
            type: 'polarArea',
            data: {
                labels: mockData.distribucionTareas.labels,
                datasets: [{
                    data: mockData.distribucionTareas.data,
                    backgroundColor: [ Chart.helpers.color(colors.blue).alpha(0.7).rgbString(), Chart.helpers.color(colors.red).alpha(0.7).rgbString(), Chart.helpers.color(colors.yellow).alpha(0.7).rgbString() ],
                    borderColor: colors.white, borderWidth: 3, hoverOffset: 10
                }]
            },
            options: { ...globalChartOptions, scales: { r: { grid: { circular: true }, ticks: { display: false } } } }
        });
    }

    // 6. Sprints Terminados (Doughnut)
    const sprintsTerminadosCtx = document.getElementById('sprintsTerminadosChart')?.getContext('2d');
    if (sprintsTerminadosCtx) {
        const { terminados, total } = mockData.sprintsTerminados;
        new Chart(sprintsTerminadosCtx, {
            type: 'doughnut',
            data: {
                datasets: [{ data: [terminados, total - terminados], backgroundColor: [colors.green, colors.grey], borderColor: colors.white, borderWidth: 5, hoverOffset: 4, cutout: '60%' }]
            },
            options: { responsive: true, maintainAspectRatio: false, cutout: '80%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }
        });
    }

    // --- Dashboard Object ---
    const dashboard = {
        init: function() {
            this.createComparativaChart();
            this.createSprintActualChart();
            this.createVelocidadChart();
            this.createDistribucionTareasChart();
            this.createSprintsTerminadosChart();
            this.updateDashboardHeader('sprint10'); // Iniciar con el último sprint
        },

        getGradient: function(ctx, color) {
            const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
            const rgb = Chart.helpers.color(color).rgbString().replace('rgb(', '').replace(')', '');
            gradient.addColorStop(0, `rgba(${rgb}, 0.25)`);
            gradient.addColorStop(1, `rgba(${rgb}, 0)`);
            return gradient;
        },

        createComparativaChart: function() {
            const ctx = document.getElementById('comparativaSprintsChart')?.getContext('2d');
            if (!ctx) return;
            const chart = new Chart(ctx, {
                type: 'line',
                data: { labels: ['Día 1', 'Día 5', 'Día 10', 'Día 15', 'Día 20', 'Día 25'] },
                options: { ...globalChartOptions, scales: { ...globalChartOptions.scales, y: { ...globalChartOptions.scales.y, max: 100 } } }
            });
            const updateChart = () => {
                const sprint1 = mockData.sprints[document.getElementById('sprint1-select').value];
                const sprint2 = mockData.sprints[document.getElementById('sprint2-select').value];
                chart.data.datasets = [
                    { label: sprint1.label, data: sprint1.data, borderColor: sprint1.color, backgroundColor: this.getGradient(ctx, sprint1.color), tension: 0.4, fill: true, pointRadius: 4, pointBackgroundColor: sprint1.color, pointBorderColor: colors.white, pointHoverRadius: 8, borderWidth: 3, originalBackgroundColor: this.getGradient(ctx, sprint1.color), originalBorderColor: sprint1.color },
                    { label: sprint2.label, data: sprint2.data, borderColor: sprint2.color, backgroundColor: this.getGradient(ctx, sprint2.color), tension: 0.4, fill: true, pointRadius: 4, pointBackgroundColor: sprint2.color, pointBorderColor: colors.white, pointHoverRadius: 8, borderWidth: 3, originalBackgroundColor: this.getGradient(ctx, sprint2.color), originalBorderColor: sprint2.color }
                ];
                chart.update('none');
            };
            document.getElementById('sprint1-select').addEventListener('change', updateChart);
            document.getElementById('sprint2-select').addEventListener('change', updateChart);
            updateChart();
        },

        createSprintActualChart: function() {
            const ctx = document.getElementById('sprintActualChart')?.getContext('2d');
            if (!ctx) return;
            const initialData = this.mockData.sprints['sprint10'].status;
            this.charts.sprintActual = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Por Hacer', 'En progreso', 'Terminado'],
                    datasets: [{ data: initialData, backgroundColor: [this.colors.red, this.colors.blue, this.colors.green], borderColor: this.colors.white, borderWidth: 4, hoverOffset: 12 }]
                },
                options: { 
                    ...this.getGlobalOptions(), 
                    cutout: '75%',
                    // INTERACTIVIDAD: Hacer clic en una sección (SIN ALERT)
                    onClick: (event, elements, chart) => {
                        if (elements.length > 0) {
                            const clickedIndex = elements[0].index;
                            const label = chart.data.labels[clickedIndex];
                            const value = chart.data.datasets[0].data[clickedIndex];
                            console.log(`Clic en la sección: ${label} (${value}%)`);
                        }
                    }
                }
            });
        },

        createVelocidadChart: function() {
            const ctx = document.getElementById('velocidadChart')?.getContext('2d');
            if (!ctx) return;
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: mockData.velocidad.labels,
                    datasets: [
                        { label: 'Prometido', data: mockData.velocidad.prometido, backgroundColor: colors.grey, borderRadius: 6, originalBackgroundColor: colors.grey, originalBorderColor: colors.grey },
                        { label: 'Completado', data: mockData.velocidad.completado, backgroundColor: colors.green, borderRadius: 6, originalBackgroundColor: colors.green, originalBorderColor: colors.green }
                    ]
                },
                options: { ...globalChartOptions, scales: { ...globalChartOptions.scales, x: { ...globalChartOptions.scales.x, grid: { display: true } } } }
            });
        },

        createDistribucionTareasChart: function() {
            const ctx = document.getElementById('distribucionTareasChart')?.getContext('2d');
            if (!ctx) return;
            new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: mockData.distribucionTareas.labels,
                    datasets: [{
                        data: mockData.distribucionTareas.data,
                        backgroundColor: [ Chart.helpers.color(colors.blue).alpha(0.7).rgbString(), Chart.helpers.color(colors.red).alpha(0.7).rgbString(), Chart.helpers.color(colors.yellow).alpha(0.7).rgbString() ],
                        borderColor: colors.white, borderWidth: 3, hoverOffset: 10
                    }]
                },
                options: { ...globalChartOptions, scales: { r: { grid: { circular: true }, ticks: { display: false } } } }
            });
        },

        createSprintsTerminadosChart: function() {
            const ctx = document.getElementById('sprintsTerminadosChart')?.getContext('2d');
            if (!ctx) return;
            const { terminados, total } = mockData.sprintsTerminados;
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{ data: [terminados, total - terminados], backgroundColor: [colors.green, colors.grey], borderColor: colors.white, borderWidth: 5, hoverOffset: 4, cutout: '60%' }]
                },
                options: { responsive: true, maintainAspectRatio: false, cutout: '80%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }
            });
        },

        updateDashboardHeader: function(sprintKey) {
            const sprint = mockData.sprints[sprintKey];
            document.getElementById('header-sprint-label').innerText = sprint.label;
            document.getElementById('header-sprint-progress').innerText = `Progreso: ${sprint.status[0]}%`;
            document.getElementById('header-sprint-issues').innerText = `Issues: ${sprint.status[1]}`;
            document.getElementById('header-sprint-debt').innerText = `Deuda Técnica: ${sprint.status[2]}`;
        }
    };

    // --- Inicializar Dashboard ---
    dashboard.init();
});