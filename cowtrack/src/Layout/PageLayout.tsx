import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Header from '../components/Header/Header';


interface LayoutProps {
  name: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ name, children }) => {
  return (
    <IonPage>
      <Header name={name} />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default Layout;
