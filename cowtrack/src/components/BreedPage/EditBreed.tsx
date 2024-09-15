import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react'
import React, { useState } from 'react'
import CategoryForm from './Form/BreedForm'
import DisplayCategories from './DisplayBreeds'
import { Breed } from '../../constants'
import { useHistory } from 'react-router-dom'
import { updateBreedDataToFile } from '../../uitls/updateBreedToFile'
import { deleteBreedFromFile } from '../../uitls/deleteBreedToFile'

type Props = {}

const EditBreed = (props: Props) => {
  const history = useHistory();
  const [editingBreed, setEditingBreed] = useState<Breed>(
    {
      id: '',
      name: '',
      categoryId: '',
    }
  );
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const handleEdit = (breed: Breed) => {
    setEditingBreed(breed);
    setDisplayForm(true);
  };

  const handleSubmit = async (values: any) => {
    console.log('Form Submitted', values);
    // construct breed data
    let data : Breed = {
      id: editingBreed?.id || '',
      name: values.name,
      categoryId: values.categoryId,
    };
    setEditingBreed(data);
    await updateBreedDataToFile(data);
    setDisplayForm(false);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
    setEditingBreed(prevData => ({
      ...prevData, // Preserve existing data
      [name]: value // Update only the specific field
    }));
  };
  const handleDelete = async () => {
    console.log('Form Submitted');
    // construct category data
    let id  = editingBreed.id;
    await deleteBreedFromFile(id);
    setDisplayForm(false);
    history.push('/folder/Breeds')
  }
  
  return (
    <IonCard className='form-card'>
      <IonCardHeader className='form-card-header'>
        <IonCardTitle className='form-card-title'>Edit Breed</IonCardTitle>
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
            name: editingBreed.name,
            categoryId: editingBreed.categoryId,
          }}
          deleteBreed={handleDelete}  />
        </IonCardContent>
      )}
    </IonCard>
  )
}

export default EditBreed