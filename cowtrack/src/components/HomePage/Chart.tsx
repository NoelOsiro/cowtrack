import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {}

// Chart data
const data = {
  labels: ['Goats', 'Cows', 'Sheep'],
  datasets: [{
    label: 'Count',
    data: [12, 19, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)'
    ],
    borderWidth: 1
  }]
};

// Chart options
const options = {
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart'
    }
  },
  responsive: true,
  maintainAspectRatio: false,
};

const DonutChart = (props: Props) => {
  return (
    <div style={{ position: 'relative', height: '300px', width: '300px' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DonutChart;
