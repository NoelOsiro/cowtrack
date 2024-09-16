import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import BreedForm from './Form/BreedForm';
import { useBreedStore } from '../../store/breedStore';
import { saveBreed } from '../../uitls/saveBreed';


const AddBreed: React.FC = () => {
  const { addBreed } = useBreedStore();
  const [showToast, setShowToast] = useState(false);
  const [breedData, setBreedData] = useState({ name: '', categoryId: ''});

  const handleSubmit = async (values: any) => {
    console.log('Form Submitted', values);
    setBreedData(values);
    addBreed(values)
    await saveBreed(values)
    .catch((error) => {
      setShowToast(false);
    });
    setShowToast(true);
  
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setBreedData(prevData => ({ ...prevData, [name]: value }));
  };


  return (
    <IonCard className='form-card'>
      <IonCardHeader className='form-card-header'>
        <IonCardTitle className='form-card-title'>Add Breed</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className='form-content'>
        <BreedForm 
          onSubmit={handleSubmit} 
          onChange={handleFormChange}
          values={breedData}
        />
      </IonCardContent>
      {showToast && (
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Category Added Successfully"
          duration={2000}
        />
      )}
    </IonCard>
  );
};

export default AddBreed;
