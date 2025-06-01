import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

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
        borderColor: '#FFA500', // Orange line
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        fill: false,
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderWidth: 1,
        borderColor: '#FFA500',
        padding: 10,
        displayColors: false,
        intersect: false,
        callbacks: {
          label: (context) => `Exchange Rate: ${context.raw}`,
          title: (tooltipItems) => tooltipItems[0].label
        }
      },
      crosshair: {
        line: {
          color: '#FFA500',
          width: 1,
          dashPattern: [5, 5]
        },
        sync: {
          enabled: false
        }
      }
    },
    scales: {
      x: {
        display: false,
        grid: { display: false }
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        beginAtZero: false
      }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    }
  };

  return (
    <div className="w-[450px] h-[350px] md:h-[225px] p-4 bg-transparent opacity-[1] rounded-lg shadow-lg">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default CurrencyChart;
