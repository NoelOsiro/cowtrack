import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';


import './Page.css';
import Header from '../../components/Header/Header';
import MainPage from '../../components/CategoryPage';





const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <Header name={name}></Header>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MainPage/>
      </IonContent>
    </IonPage>
  );
};

export default Page;
