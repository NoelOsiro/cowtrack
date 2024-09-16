import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast } from '@ionic/react'
import React, { useState } from 'react'
import CategoryForm from './Form/CategoryForm'
import DisplayCategories from './DisplayCategories'
import { Category } from '../../constants'
import { updateCategory } from '../../uitls/data/updateCategory'
import { deleteCategory } from '../../uitls/data/deleteCategory'
import { useHistory } from 'react-router-dom'
import { useCategoryStore } from '../../store/categoryStore'

type Props = {}

const EditCategory = (props: Props) => {
  const { editCategory, removeCategory } = useCategoryStore();
  const [editingCategory, setEditingCategory] = useState<Category>(
    {
      id: 0,
      name: '',
      icon: '',
      color: '',
    }
  );
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);


  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDisplayForm(true);
  };
  const handleSubmit = async (values: any) => {
    // construct category data
    let data : Category = {
      id: editingCategory?.id || 0,
      name: values.name,
      icon: values.icon,
      color: values.color,
    };
    setEditingCategory(data);
    try {
      const updatedCategory = await updateCategory(data);
      
      editCategory(data); // Assuming this updates the state or UI
      setShowToast(true); 
      setDisplayForm(false); // Show success toast or feedback
    } catch (error:any) {
      console.error('Error saving category:', error.message || error);
      // Handle error (e.g., show a toast notification or alert)
    }
    
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
    setEditingCategory(prevData => ({
      ...prevData, // Preserve existing data
      [name]: value // Update only the specific field
    }));
  };
  const handleDelete = async () => {
    // construct category data
    let id  = editingCategory.id;
    await deleteCategory(id)
    .then(() => {
      removeCategory(id);
    setDisplayForm(false);
    })
    .catch((error) => {
      console.error('Error deleting data', error);
      
    });
    
  }
  
  return (
    <IonCard className='form-card'>
      <IonCardHeader className='form-card-header'>
        <IonCardTitle className='form-card-title'>Edit Category</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className='form-content'>
        <DisplayCategories onEdit={handleEdit} />
      </IonCardContent>
      {displayForm && (
        renderFormContent(handleSubmit, handleFormChange, editingCategory, handleDelete)
      )}
      {showToast && (
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Category Added Successfully"
          duration={2000}
        />
      )}
    </IonCard>
  )
}

export default EditCategory

function renderFormContent(handleSubmit: (values: any) => Promise<void>, handleFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, editingCategory: Category, handleDelete: () => Promise<void>): React.ReactNode {
  return <IonCardContent className='form-content'>
    <CategoryForm
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      values={{
        name: editingCategory.name,
        icon: editingCategory.icon,
        color: editingCategory.color,
      }}
      deleteCategory={handleDelete} />
      
  </IonCardContent>
}
