import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonToast } from '@ionic/react'
import React, { useState } from 'react'
import DisplayCategories from './DisplayCategories'
import { Animal } from '../../constants'
import { updateAnimal } from '../../uitls/updateAnimal'
import { useAnimalStore } from '../../store/animalStore'
import { deleteAnimal } from '../../uitls/deleteAnimal'
import AnimalForm from './Form/AnimalForm'

type Props = {}

const EditAnimal = (props: Props) => {
  const { editAnimal, removeAnimal } = useAnimalStore();
  const [editingAnimal, setEditingAnimal] = useState<Animal>(
    {
      id: 0,
      name: '',
      breedId: 0,
      count: 0,
      location: '',
    }
  );
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setDisplayForm(true);
  };
  const handleSubmit = async (values: any) => {
    console.log('Form Submitted', values);
    // construct category data
    let data : Animal = {
      id: editingAnimal?.id || 0,
      name: values.name,
      breedId: values.breedId,
      count: values.count,
      location: values.location,
    };
    setEditingAnimal(data);
    try {
      const updatedAnimal = await updateAnimal(data);
      
      editAnimal(data); // Assuming this updates the state or UI
      setShowToast(true); 
      setDisplayForm(false); // Show success toast or feedback
    } catch (error:any) {
      console.error('Error saving category:', error.message || error);
      // Handle error (e.g., show a toast notification or alert)
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
    setEditingAnimal(prevData => ({
      ...prevData, // Preserve existing data
      [name]: value // Update only the specific field
    }));
  };
  const handleDelete = async () => {
    console.log('Form Submitted');
    // construct category data
    let id  = editingAnimal.id;
    await deleteAnimal(id)
    .catch((error) => {
      console.error('Error deleting data', error);
    });
    removeAnimal(id);
    setDisplayForm(false);
  }
  
  return (
    <IonCard className='form-card'>
      <IonCardHeader className='form-card-header'>
        <IonCardTitle className='form-card-title'>Edit Animals</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className='form-content'>
        <DisplayCategories onEdit={handleEdit} />
      </IonCardContent>
      {displayForm && (
        renderAnimalForm(handleSubmit, handleFormChange, editingAnimal, handleDelete)
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

export default EditAnimal

function renderAnimalForm(handleSubmit: (values: any) => Promise<void>, handleFormChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, editingAnimal: Animal, handleDelete: () => Promise<void>): React.ReactNode {
  return <IonCardContent className='form-content'>
    <AnimalForm
      onSubmit={handleSubmit}
      onChange={handleFormChange}
      values={{
        name: editingAnimal.name,
        breedId: editingAnimal.breedId,
        count: editingAnimal.count,
        location: editingAnimal.location,
      }}
      deleteAnimal={handleDelete} />
  </IonCardContent>
}
