import React from 'react';
 // Import the homepage store
import { IonCard, IonCardContent, IonCardTitle } from '@ionic/react';
import { useHomepageStore } from '../../store/homepageStore';

const DataCard = () => {
  const { selectedData } = useHomepageStore(); // Get the selected data from the store

  return (
    <IonCard style={{ marginTop: '60px', width:'100%',padding:'10px',height:'400px' }}>
      <IonCardTitle style={{ textAlign: 'center' }}>
        {selectedData ? selectedData.label : 'Select a chart segment'}
      </IonCardTitle>
      <IonCardContent>
        {selectedData ? (
          <div style={{ textAlign: 'center' }}>
            <p>Value: {selectedData.value}</p>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No data selected.</p>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default DataCard;
