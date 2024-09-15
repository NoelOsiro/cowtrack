import React, { useState } from 'react'
import './home.css';
import Banner from './Banner';
import AddCategory from './AddBreed';
import EditCategory from './EditCategory';


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
        <AddCategory/>
      ):(
        <EditCategory/>)}


    </div>
  )
}

export default MainPage