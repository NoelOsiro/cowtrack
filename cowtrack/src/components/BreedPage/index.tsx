import React, { useState } from 'react'
import './home.css';
import Banner from './Banner';
import AddBreed from './AddBreed';
import EditBreed from './EditBreed';


type Props = {}

const MainPage = (props: Props) => {
  const [selectedAction, setSelectedAction] = useState<boolean>(false);
  // Handlers for add and edit actions
  const handleAddBreed = () => {
    setSelectedAction(!selectedAction);
  };



  return (
    <div id='container'>
        <Banner onAddBreed={handleAddBreed} />
         {/* Conditionally render Add Breed card */}
      {selectedAction ? (
        <AddBreed/>
      ):(
        <EditBreed/>)}


    </div>
  )
}

export default MainPage