import React, { useState, useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Chart data
const data = {
  labels: ['Goats', 'Cows', 'Sheep'],
  datasets: [
    {
      label: 'Count',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(99, 255, 177, 0.9)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 207, 86, 0.9)',
      ],
      hoverBackgroundColor: [
        'rgba(99, 255, 177, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 207, 86, 1)',
      ],
      borderColor: [
        'rgba(255, 255, 255, 0.7)',
      ],
      hoverBorderColor: [
        'rgba(255, 255, 255, 1)',
      ],
      borderWidth: 3,
      hoverOffset: 8, // Enlarge segment on hover
    },
  ],
};

// DonutChart component
const DonutChart = () => {
  const chartRef = useRef<any>(null); // To reference the chart instance
  const [centerText, setCenterText] = useState(
    'Total: ' + data.datasets[0].data.reduce((a, b) => a + b, 0)
  );

  // Custom plugin to render text in the center of the doughnut
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: any) => {
      const { width, height, ctx } = chart;

      ctx.save();
      const xCoor = width / 2;
      const yCoor = height / 2;

      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'white' // Dark mode text color
        : 'black'; // Light mode text color
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(centerText, xCoor, yCoor);
      ctx.restore();
    },
  };

  // Handle click event to show the clicked sector's count in the center
  const handleClick = (event: any, elements: any[]) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedValue = data.datasets[0].data[clickedIndex];
      const clickedLabel = data.labels[clickedIndex];

      setCenterText(`${clickedLabel}: ${clickedValue}`);
    } else {
      setCenterText('Total: ' + data.datasets[0].data.reduce((a, b) => a + b, 0));
    }
  };

  // Manually update the chart when centerText changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update(); // Force chart to re-render
    }
  }, [centerText]);

  // Chart options
  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 14,
            family: 'Arial',
            weight: 600,
          },
          color: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'white'
            : 'black', // Change color based on theme
        },
      },
      title: {
        display: true,
        text: 'Livestock Count',
        font: {
          size: 18,
          weight: 600,
        },
        color: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'white'
          : 'black', // Change title color based on theme
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    onClick: handleClick, // Add onClick handler
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '360px',
        width: '360px',
        padding: '20px',
        backgroundColor: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? '#2D2D2D'
          : '#F8F9FA', // Background color depending on theme
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Smooth shadow effect
        transition: 'background-color 0.3s ease', // Smooth transition on theme change
      }}
    >
      <Doughnut
        ref={chartRef} // Attach the chart reference here
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default DonutChart;
