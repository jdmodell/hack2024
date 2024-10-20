import {useState} from "react"

const AllergenForm =({allergens, updateCallback}) => {
    const [name, setName] = useState("")
    
    const onSubmit = async(e) => {
        e.preventDefault();
        const data ={ name};

        const url ="http://127.0.0.1:5000/" + ("create_allergen")
        const options ={
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if(response.status !==201 && response.status !== 200){
            const data= await response.json()
            alert(data.message)
        }
        else{
            updateCallback();
            setName("");
        }
    }

    const handleDelete = async (e, allergenId) => {
        e.preventDefault(); // Prevent form submission
        const url = `http://127.0.0.1:5000/delete_allergen/${allergenId}`;
        const options = {
            method: "DELETE",
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                updateCallback(); // Refresh the allergen list
            } else {
                const data = await response.json();
                alert(data.message); // Alert the specific error message
            }
        } catch (error) {
            console.error("Error deleting allergen:", error);
            alert("An error occurred while deleting the allergen.");
        }
    };


    return (
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="name">Allergen name:</label>
            <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <button type="submit">{"Add allergen"}</button>
        <p>Allergen list</p>
        <ul>
          {allergens.slice().reverse().map(allergen => (
            <li key={allergen.id}>{allergen.name}
            <button type="button" onClick={(e) => handleDelete(e,allergen.id)}> x </button></li>
          ))}
          </ul>
    </form>
)}

export default AllergenForm