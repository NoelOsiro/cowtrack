import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import { useAnimalStore } from '../../store/animalStore';
import { Animal } from '../../constants';
import BreedForm from '../BreedPage/Form/BreedForm';
import { saveAnimalToFile } from '../../uitls/saveAnimalToFile';


const AddCategory: React.FC = () => {
  const { addAnimal } = useAnimalStore();
  const [showToast, setShowToast] = useState(false);
  const [animalData, setAnimalData] = useState<Animal>({ name: '', breedId: '', categoryId: '',count:0,id:'' });

  const handleSubmit = async (values: any) => {
    console.log('Form Submitted', values);
    setAnimalData(values);
    addAnimal(values)
    await saveAnimalToFile(values)
    .then(() => {
      setShowToast(true); 
    })
    .catch((error:any) => {
      console.error('Error saving data', error);
    });
  
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setAnimalData(prevData => ({ ...prevData, [name]: value }));
  };


  return (
    <IonCard className='form-card'>
      <IonCardHeader className='form-card-header'>
        <IonCardTitle className='form-card-title'>Add Category</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className='form-content'>
        <BreedForm 
          onSubmit={handleSubmit} 
          onChange={handleFormChange}
          values={animalData}
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

export default AddCategory;
