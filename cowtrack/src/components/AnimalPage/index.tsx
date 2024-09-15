import React, { useState } from 'react'
import './home.css';
import Banner from './Banner';
import AddAnimal from './AddAnimal';
import EditAnimal from './EditAnimal';


type Props = {}

const MainPage = (props: Props) => {
  const [selectedAction, setSelectedAction] = useState<boolean>(false);
  // Handlers for add and edit actions
  const handleAddCategory = () => {
    setSelectedAction(!selectedAction);
  };



  return (
    <div id='container'>
        <Banner onAddCategory={handleAddCategory} />
         {/* Conditionally render Add Category card */}
      {selectedAction ? (
        <AddAnimal/>
      ):(
        <EditAnimal/>)}


    </div>
  )
}

export default MainPage