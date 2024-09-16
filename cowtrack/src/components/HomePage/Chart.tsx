import React, { useState, useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { IonItem } from '@ionic/react';
import { createChartData } from '../../uitls/chart/dataFactory';
import { createChartOptions } from '../../uitls/chart/optionsFactory';
import { useHomepageStore } from '../../store/homepageStore';


// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  labels: string[];
  datasetData: number[];
}

const DonutChart: React.FC<DonutChartProps> = ({ labels, datasetData }) => {
  const chartRef = useRef<any>(null);
  // Get the setSelectedData function from the store
  const { setSelectedData } = useHomepageStore();
  const [centerText, setCenterText] = useState(
    'Total: ' + datasetData.reduce((a, b) => a + b, 0)
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
        ? 'white'
        : 'black';
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
      const clickedValue = datasetData[clickedIndex];
      const clickedLabel = labels[clickedIndex];

      setCenterText(`${clickedLabel}: ${clickedValue}`);
      // Update the store with the selected data
      setSelectedData({ label: clickedLabel, value: clickedValue });
    } else {
      setCenterText('Total: ' + datasetData.reduce((a, b) => a + b, 0));
    }
  };

  // Manually update the chart when centerText changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [centerText]);

  // Inject dynamic data and options
  const data = createChartData(labels, datasetData);
  const options = createChartOptions(handleClick);

  return (
    <div
      style={{
        position: 'relative',
        height: '500px',
        width: '380px',
        padding: '20px',
        backgroundColor: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? '#2D2D2D'
          : '#F8F9FA',
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <IonItem>
        <div style={{ textAlign: 'center', width: '100%', marginBottom: '10px' }}>
          <h3>{centerText}</h3>
        </div>
      </IonItem>
      <Doughnut
        ref={chartRef}
        data={data}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </div>
  );
};

export default DonutChart;
