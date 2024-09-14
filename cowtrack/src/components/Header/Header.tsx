import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon } from "@ionic/react";
import { ellipsisVerticalCircleOutline } from "ionicons/icons";

interface HeaderProps {
    name: string;
    }
const Header=(props:HeaderProps)=> {
    return (<IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{props.name}</IonTitle>
        <IonButtons slot="end">
          <IonIcon slot="icon-only" icon={ellipsisVerticalCircleOutline}></IonIcon>
        </IonButtons>
      </IonToolbar>
    </IonHeader>);
  }
  export default Header;