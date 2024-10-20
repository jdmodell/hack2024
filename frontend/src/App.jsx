import { useState, useEffect } from 'react'
import AllergyList from './AllergyList'
import './App.css'
import AllergyForm from './AllergyForm'
import AllergenForm from './AllergenForm'
import Graph from './Graph'

function App() {
  const [allergies, setAllergies] = useState([])
  const [allergens, setAllergens] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAllergenModalOpen, setIsAllergenModalOpen]= useState(false)
  const [currentAllergy, setCurrentAllergy] =useState({})

  useEffect(() =>{
    fetchAllergies();
    fetchAllergens();
  }, [])



  const fetchAllergies = async () => {
    const response = await fetch("http://127.0.0.1:5000/allergies")
    const data = await response.json()
    setAllergies(data.allergies)
    console.log(data.allergies)
  };

  const fetchAllergens = async () => {
    const response = await fetch("http://127.0.0.1:5000/allergens")
    const data = await response.json();
    setAllergens(data.allergens);
    console.log(data.allergens);
  };

  const closeModal =() =>{
    setIsModalOpen(false)
    setCurrentAllergy({})
  }

  const closeAllergenModal =() =>{
    setIsAllergenModalOpen(false)
  }


  const openCreateModal =() =>{
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal =(allergy)=>{
    if (isModalOpen) return
    setCurrentAllergy(allergy)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchAllergies()
  }

  const onUpdateAllergen = () => {
    fetchAllergens()
  }

  const openAddAllergenModal = () => {
    setIsAllergenModalOpen(true);
  };


  return (
    <>
      <AllergyList allergies={allergies} updateAllergy={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Add a Reaction</button>
      <button onClick={openAddAllergenModal}>Add Allergens</button>
      <div id="graph">
      <Graph />
      </div>


      { isModalOpen && (
        <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <AllergyForm existingAllergy={currentAllergy} updateCallback={onUpdate} allergens={allergens}/>
        </div>
      </div>
      )}

      {isAllergenModalOpen && ( 
          <div className="modal">
          <div className="modal-content">
              <span className="close" onClick={closeAllergenModal}>&times;</span>
                  <AllergenForm allergens={allergens} updateCallback={onUpdateAllergen} />
                </div>
              </div>
            )}
     
    </>
  )
  
}

export default App
