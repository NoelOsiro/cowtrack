import React, { useEffect, useState } from 'react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonText } from '@ionic/react';
import { Animal, categoryIcons } from '../../constants';
import { useStore } from '../../store/categoryStore';
import { useAnimalStore } from '../../store/animalStore';
// Import your icons



const DisplayCategories = ({ onEdit }: { onEdit: (animal: Animal) => void }) => {
 const { animals } = useAnimalStore();


  return (

    <IonGrid>
    <IonRow>
      {animals.length === 0 ? (
        <IonCol size="12">
          <IonText>No categories found</IonText>
        </IonCol>
      ) : (
        animals.map((animal) => (
          <IonCol size="6" key={animal.id}>
            <IonButton
              expand="full"
              onClick={() => onEdit(animal)}
              style={{ backgroundColor: 'blue', color: 'white' }}
            >
              
              <IonText>{animal.name}</IonText>
            </IonButton>
          </IonCol>
        ))
      )}
    </IonRow>
  </IonGrid>
  );
};


export default DisplayCategories;
