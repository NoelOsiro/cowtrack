import React, { useState } from 'react'
import './home.css';
import Banner from './Banner';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import AddCategory from './AddCategory';


type Props = {}

const MainPage = (props: Props) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  // Handlers for add and edit actions
  const handleAddCategory = () => {
    setSelectedAction('add');
  };

  const handleEditCategory = () => {
    setSelectedAction('edit');
  };

  return (
    <div id='container'>
        <Banner onAddCategory={handleAddCategory} onEditCategory={handleEditCategory} />
         {/* Conditionally render Add Category card */}
      {selectedAction === 'add' && (
        <AddCategory/>
      )}

      {/* Conditionally render Edit Category card */}
      {selectedAction === 'edit' && (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Edit Category</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {/* Your Edit Category Form/Content goes here */}
            Edit category form or content.
          </IonCardContent>
        </IonCard>
      )}

    </div>
  )
}

export default MainPage