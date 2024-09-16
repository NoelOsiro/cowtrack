// dataFactory.ts
export const createChartData = (labels: string[], datasetData: number[]) => {
    return {
      labels,
      datasets: [
        {
          label: 'Count',
          data: datasetData,
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
  };
  