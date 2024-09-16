// optionsFactory.ts
export const createChartOptions = (handleClick: (event: any, elements: any[]) => void) => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    return {
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            font: {
              size: 14,
              family: 'Arial',
              weight: 600,
            },
            color: prefersDarkMode ? 'white' : 'black', // Dynamic theme color
          },
        },
        title: {
          display: true,
          text: 'Livestock Count',
          font: {
            size: 18,
            weight: 600,
          },
          color: prefersDarkMode ? 'white' : 'black', // Dynamic theme color
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      onClick: handleClick, // Pass the click handler
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    };
  };
  