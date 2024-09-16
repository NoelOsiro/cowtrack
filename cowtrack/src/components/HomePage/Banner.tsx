import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonText } from '@ionic/react';
import { home } from 'ionicons/icons';

type Props = {}

const Banner = (props: Props) => {
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return (
        <IonCard className='banner-card' style={{height: '130px'}}>
            <IonCardHeader color={'light'} className='banner-card-header'>
                <IonIcon icon={home} className='banner-icon' color='primary' size='large' />
                <IonCardTitle className='banner-title'>My Farm</IonCardTitle>
            </IonCardHeader>

            <IonCardContent className='banner-content'>
                <IonText className='banner-date'>{date}</IonText>
                <IonText>Farm Summary</IonText>
            </IonCardContent>
        </IonCard>
    );
}

export default Banner;
