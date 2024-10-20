import {useState} from "react"

const AllergyForm =({existingAllergy={}, updateCallback, allergens}) => {
    const [date, setDate] = useState(existingAllergy.date||"")
    const [kind, setKind] = useState(existingAllergy.kind || "")
    const [food, setFood] = useState(existingAllergy.food ||"")
    const [allergen, setAllergen] = useState(existingAllergy.allergen || "")
    const [reaction, setReaction] = useState(existingAllergy.reaction || "")


    const updating = Object.entries(existingAllergy).length !== 0

    const kindOptions=["Food", "Seasonal", "Skin", "Medicine", "Animals", "Other"]
    

    const onSubmit = async(e) => {
        e.preventDefault();
        const data ={
            date,
            kind,
            food,
            allergen,
            reaction
        }

        const url ="http://127.0.0.1:5000/" + (updating ? `update_allergy/${existingAllergy.id}` : "create_allergy")
        const options ={
            method: updating ? "PATCH" : "POST",
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
            closeModal();
        }
    }

    return (
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="date">Date:</label>
            <input 
                type="date" 
                id="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="kind">Kind:</label>
            <select 
                id="kind" 
                value={kind} 
                onChange={(e) => setKind(e.target.value)}>
            <option value="" disabled>Select</option>
            {kindOptions.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
            </select>
        </div>
        <div>
            <label htmlFor="food">Product:</label>
            <input 
                type="text" 
                id="food" 
                value={food} 
                onChange={(e) => setFood(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="allergen">Allergen:</label>       
            <select
                    id="allergen"
                    value={allergen}
                    onChange={(e) => setAllergen(e.target.value)}
                >
                    <option value="" disabled>Select an allergen</option>
                    {allergens.map((a) => (
                        <option key={a.id} value={a.name}>
                            {a.name}
                        </option>
                    ))}
                </select>
        </div>
        <div>
            <label htmlFor="reaction">Reaction:</label>
            <input 
                type="text" 
                id="reaction" 
                value={reaction} 
                onChange={(e) => setReaction(e.target.value)}
            />
        </div>
        <button type="submit">{updating ?"Update" : "Add reaction"}</button>
    </form>
)}

export default AllergyForm




                