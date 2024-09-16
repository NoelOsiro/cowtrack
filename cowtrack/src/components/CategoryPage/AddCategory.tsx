import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import CategoryForm from './Form/CategoryForm';
import { useCategoryStore } from '../../store/categoryStore';
import { saveCategory } from '../../uitls/data/saveCategory';
import { Category } from '../../constants';


const AddCategory: React.FC = () => {
  const { addCategory } = useCategoryStore();
  const [categoryData, setCategoryData] = useState({ name: '', icon: '', color: '' });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (values: Category) => {
    
    setCategoryData(values);
  
    try {
      const savedCategory = await saveCategory(values);
      
      addCategory(savedCategory); // Assuming this updates the state or UI
      setShowToast(true);  // Show success toast or feedback
    } catch (error:any) {
      console.error('Error saving category:', error.message || error);
      // Handle error (e.g., show a toast notification or alert)
    }
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
