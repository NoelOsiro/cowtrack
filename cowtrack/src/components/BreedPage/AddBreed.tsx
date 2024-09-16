import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import BreedForm from './Form/BreedForm';
import { useBreedStore } from '../../store/breedStore';
import { saveBreed } from '../../uitls/saveBreed';


const AddBreed: React.FC = () => {
  const { addBreed } = useBreedStore();
  const [showToast, setShowToast] = useState(false);
  const [breedData, setBreedData] = useState({ name: '', categoryId: 0});

  const handleSubmit = async (values: any) => {
    setBreedData(values);
    try {
      const savedBreed = await  saveBreed(values)
      addBreed(savedBreed); // Assuming this updates the state or UI
      setShowToast(true);  // Show success toast or feedback
    } catch (error:any) {
      console.error('Error saving category:', error.message || error);
      // Handle error (e.g., show a toast notification or alert)
    }
  
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
