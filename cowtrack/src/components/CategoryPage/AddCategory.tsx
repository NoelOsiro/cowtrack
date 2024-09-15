import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import CategoryForm from './Form/CategoryForm';
import { saveDataToFile } from '../../uitls/saveDataToFile';
import { useStore } from '../../store/categoryStore';


const AddCategory: React.FC = () => {
  const { addCategory } = useStore();
  const [categoryData, setCategoryData] = useState({ name: '', icon: '', color: '' });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (values: any) => {
    console.log('Form Submitted', values);
    setCategoryData(values);
    addCategory(values)
    await saveDataToFile(values)
    .then(() => {
      setShowToast(true); 
    })
    .catch((error) => {
      console.error('Error saving data', error);
    });
  
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCategoryData(prevData => ({ ...prevData, [name]: value }));
  };


  return (
    <IonCard className='form-card'>
      <IonCardHeader className='form-card-header'>
        <IonCardTitle className='form-card-title'>Add Category</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className='form-content'>
        <CategoryForm 
          onSubmit={handleSubmit} 
          onChange={handleFormChange}
          values={categoryData}
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
