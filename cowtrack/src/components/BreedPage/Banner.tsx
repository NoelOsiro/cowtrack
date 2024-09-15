import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonText, IonButton } from '@ionic/react';
import { home, addCircle, pencil, homeOutline, addCircleOutline, pencilOutline } from 'ionicons/icons';

type BannerProps = {
  onAddBreed: () => void;
};

const Banner = ({ onAddBreed}: BannerProps) => {
  return (
    <IonCard className='banner-card'>
      <IonCardHeader color={'light'} className='banner-card-header'>
        <IonIcon md={home} ios={homeOutline} className='banner-icon' color='primary' size='large' />
        <IonCardTitle className='banner-title'>Breeds</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className='banner-content'>
        <IonText className='banner-date'>Add or edit breeds</IonText>

        {/* Button Section */}
        <div className="button-group">
          <IonButton color="primary" fill="solid" onClick={onAddBreed}>
            <IonIcon slot="start" md={addCircle} ios={addCircleOutline} />
            Add
          </IonButton>

          <IonButton color="secondary" fill="outline" onClick={onAddBreed}>
            <IonIcon slot="start" md={pencil} ios={pencilOutline} />
            Edit
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Banner;
