import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react'
import React, { useState } from 'react'
import CategoryForm from './Form/CategoryForm'
import DisplayCategories from './DisplayCategories'
import { Category } from '../../constants'
import { updateDataToFile } from '../../uitls/updateDataToFile'
import { deleteDataFromFile } from '../../uitls/deleteDataToFile'
import { useHistory } from 'react-router-dom'

type Props = {}

const EditCategory = (props: Props) => {
  const history = useHistory();
  const [editingCategory, setEditingCategory] = useState<Category>(
    {
      id: '',
      name: '',
      icon: '',
      color: '',
      type: ''
    }
  );
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDisplayForm(true);
  };
  const handleSubmit = async (values: any) => {
    console.log('Form Submitted', values);
    // construct category data
    let data : Category = {
      id: editingCategory?.id || '',
      name: values.name,
      icon: values.icon,
      color: values.color,
      type: editingCategory?.type || ''
    };
    setEditingCategory(data);
    await updateDataToFile(data);
    setDisplayForm(false);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
    setEditingCategory(prevData => ({
      ...prevData, // Preserve existing data
      [name]: value // Update only the specific field
    }));
  };
  const handleDelete = async () => {
    console.log('Form Submitted');
    // construct category data
    let id  = editingCategory.id;
    await deleteDataFromFile(id);
    setDisplayForm(false);
    history.push('/folder/Home')
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
        <IonCardContent className='form-content'>
          <CategoryForm 
            onSubmit={handleSubmit} 
            onChange={handleFormChange} 
            values={{
            name: editingCategory.name,
            icon: editingCategory.icon,
            color: editingCategory.color,
          }}
          deleteCategory={handleDelete}  />
        </IonCardContent>
      )}
    </IonCard>
  )
}

export default EditCategory