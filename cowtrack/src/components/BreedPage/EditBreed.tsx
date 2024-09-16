import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast } from '@ionic/react'
import React, { useState } from 'react'
import CategoryForm from './Form/BreedForm'
import DisplayCategories from './DisplayBreeds'
import { Breed } from '../../constants'
import { updateBreed } from '../../uitls/updateBreed'
import { deleteBreed} from '../../uitls/deleteBreed'
import { useBreedStore } from '../../store/breedStore'

type Props = {}

const EditBreed = (props: Props) => {
  const { editBreed, removeBreed } = useBreedStore();
  const [showToast, setShowToast] = useState(false);
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
    try {
      const updatedBreed = await updateBreed(data);
      
      editBreed(data); // Assuming this updates the state or UI
      setShowToast(true); 
      setDisplayForm(false); // Show success toast or feedback
    } catch (error:any) {
      console.error('Error saving category:', error.message || error);
      // Handle error (e.g., show a toast notification or alert)
    }
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
    await deleteBreed(id)
    .catch((error) => {
      console.error('Error deleting data', error);
      
    });
    removeBreed(id);
    setDisplayForm(false);
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
        renderBreedForm(handleSubmit, handleFormChange, editingBreed, handleDelete)
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

export default EditBreed

function renderBreedForm(handleSubmit: (values: any) => Promise<void>, handleFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, editingBreed: Breed, handleDelete: () => Promise<void>): React.ReactNode {
  return <IonCardContent className='form-content'>
    <CategoryForm
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      values={{
        name: editingBreed.name,
        categoryId: editingBreed.categoryId,
      }}
      deleteBreed={handleDelete} />
  </IonCardContent>
}
