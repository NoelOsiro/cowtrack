import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { v4 as uuidv4 } from 'uuid'; // Install uuid library for generating unique IDs
import BreedForm from './Form/BreedForm';
import { Category } from '../../constants';
import { saveDataToFile } from '../../uitls/saveDataToFile';


const AddBreed: React.FC = () => {
  const [categoryData, setCategoryData] = useState({ name: '', icon: '', color: '' });

  const handleSubmit = async (values: any) => {
    console.log('Form Submitted', values);
    setCategoryData(values);
    await saveDataToFile(values);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCategoryData(prevData => ({ ...prevData, [name]: value }));
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
          values={categoryData}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default AddBreed;
