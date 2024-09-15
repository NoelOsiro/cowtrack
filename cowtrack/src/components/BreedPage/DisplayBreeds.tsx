import { IonGrid, IonRow, IonCol, IonButton, IonText } from '@ionic/react';
import { Breed } from '../../constants';
import { useBreedStore } from '../../store/breedStore';
// Import your icons



const DisplayBreeds = ({ onEdit }: { onEdit: (breed: Breed) => void }) => {
  const { breeds } = useBreedStore();


  return (

    <IonGrid>
    <IonRow>
      {breeds.length === 0 ? (
        <IonCol size="12">
          <IonText>No breeds found</IonText>
        </IonCol>
      ) : (
        breeds.map((breed,index) => (
          <IonCol size="6" key={index}>
            <IonButton
              expand="full"
              onClick={() => onEdit(breed)}
              style={{ backgroundColor: '#68e2dc', color: 'white' }}
            >
              <IonText>{breed.name}</IonText>
            </IonButton>
          </IonCol>
        ))
      )}
    </IonRow>
  </IonGrid>
  );
};


export default DisplayBreeds;
