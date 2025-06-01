import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function CurrencyChart({ data }) {
    if (!data || !data.dates || !data.rates) {
        return <p className="text-white text-center mt-4">No data available</p>;
    }

    const chartData = {
        labels: data.dates,
        datasets: [
            {
                label: 'Exchange Rate',
                data: data.rates,
                borderColor: '#FFA500', // 🔥 Orange Line
                borderWidth: 2,
                pointRadius: 0, // Remove points on the line
                pointHoverRadius: 0, // Remove hover points
                fill: false,
                tension: 0.3, // Smooth curve
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index', // Hover effect for the entire x-axis
            intersect: false, // Ensure smooth hover tracking
        },
        plugins: {
            legend: { display: false }, // Hide legend
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderWidth: 1,
                borderColor: '#FFA500', // Orange Tooltip Border
                padding: 10,
                displayColors: false,
                callbacks: {
                    label: (context) => `Exchange Rate: ${context.raw}`,
                    title: (tooltipItems) => tooltipItems[0].label, // Show date in tooltip
                },
            },
        },
        scales: {
            x: {
                display: false, // Hide x-axis labels
                grid: { display: false },
            },
            y: {
                ticks: { color: '#fff' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                beginAtZero: false,
            },
        },
        elements: {
            line: {
                borderWidth: 2, // Line thickness
            },
        },
        hover: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            tooltip: {
                enabled: true,
                intersect: false,
            },
            crosshair: {
                line: {
                    color: '#FFA500', 
                    width: 1,
                    dashPattern: [5, 5], // Dotted line effect
                },
                sync: {
                    enabled: false,
                },
            },
        },
    };

    return (
        <>
            

            <div className="w-[450px] h-[350px] md:h-[225px] p-4 bg-transparent opacity-[1] rounded-lg shadow-lg">
                {/* Buttons for selecting timeframes */}


                {/* Line Chart */}
                <Line data={chartData} options={chartOptions} />
            </div>
        </>

    );
}

export default CurrencyChart;
