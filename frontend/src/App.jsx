import { useState, useEffect } from 'react'
import AllergyList from './AllergyList'
import './App.css'
import AllergyForm from './AllergyForm'
import AllergenForm from './AllergenForm'
import Graph from './Graph'
import Facts from './Facts'

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


    const [selectedKind, setSelectedKind] = useState('Food');

    const allergyKinds = ['Food', 'Seasonal', 'Skin', 'Medicine', 'Animals', 'Other'];

    const handleKindClick = (kind) => {
        setSelectedKind(kind);
    };
  



  return (
    <>
    <main>
      <AllergyList allergies={allergies} updateAllergy={openEditModal} updateCallback={onUpdate}/>
     <div id="rxnbuttons">
      <button onClick={openCreateModal}>Add a Reaction</button>
      <button onClick={openAddAllergenModal}>Add Allergens</button>
      </div>
      <div id="graph">
      <Graph />
      </div>
      <h2>Your Allergy Facts</h2>
      <div className="button-container">
                {allergyKinds.map(kind => (
                    <button
                        key={kind}
                        onClick={() => handleKindClick(kind)}
                        className={selectedKind === kind ? 'active' : ''}
                    >
                        {kind}
                    </button>
                ))}
            </div>

            {/* Render the facts based on selected kind */}
            {selectedKind && <Facts allergyKind={selectedKind} allergies ={allergies}/>}



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
     </main>
    </>
  )
  
}

export default App
