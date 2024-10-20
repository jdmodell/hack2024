import React from "react"

const AllergyList = ({allergies, updateAllergy, updateCallback}) => {
  
  const onDelete = async(id) =>{
    try{
        const options={
            method: "DELETE"
        }
        const response = await fetch(`http://127.0.0.1:5000/delete_allergy/${id}`, options)
        if (response.status ===200) {
            updateCallback()
        }
        else{
            console.error("Failed to Delete")
        }
     } catch (error){
            alert(error)
        }
  }
  
  
  return <div id="reactions">
        <h2>Reactions</h2>
        <div id="table">
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Kind</th>
                    <th>Product</th>
                    <th>Allergen</th>
                    <th>Reaction</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allergies.slice().reverse().map((allergy) => (
                    <tr key={allergy.id}>
                        <td>{allergy.date}</td>
                        <td>{allergy.kind}</td>
                        <td>{allergy.food}</td>
                        <td>{allergy.allergen}</td>
                        <td>{allergy.reaction}</td>
                        <td id ="actions">
                            <button onClick={() => updateAllergy(allergy)}>Update</button>
                            <button onClick={() => onDelete(allergy.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
}

export default AllergyList