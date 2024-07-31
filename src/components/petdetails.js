import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore';
import '../style/home.css'
import {
    db
} from './firebaseAuth';
import {
    useEffect,
    useState
} from 'react';
import '../style/petcontainer.css'
import { MdDelete } from "react-icons/md";
const PetContainer = () => {
    const [petData, setPetData] = useState([])
    const [isAdmin,setIsAdmin] = useState(false)
        const fetchPetDetails = async () => {
            const petref = collection(db, 'Pet Details')
            const snapShot = await getDocs(petref)
            const fetchedData = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setPetData(await fetchedData)
        }
        const handleDeletePet = async(id,name) =>{
            if(window.confirm(`Do you want to delete ${name}? Once done, it cannot be undone.`)){
                try{
                    const petref = doc(db,'Pet Details',id)
                    await deleteDoc(petref)
                    fetchPetDetails()
                    alert(`${name}'s details has been deleted`)
                }catch(e){
                    alert(e)
                }
            }  
        }
        useEffect(() => {
            fetchPetDetails();
            const adminStatus = localStorage.getItem('admin') === 'true';
            setIsAdmin(adminStatus)
        }, []);
    return ( 
        <div className="pet-container">
            {
                petData.map((pet)=>(
                    <div key={pet.id} className="pet-card">
                        <div className="pet-image">

                        </div>
                        <div className="pet-details">
                            <div className="name">
                                {pet.name}
                            </div>
                            <div className="age">
                                {pet.age}
                            </div>
                            <div className="breed">
                                {pet.breed}
                            </div>
                        </div>
                        <div className={`delete-button ${isAdmin?'active':''}`} onClick={()=>{handleDeletePet(pet.id,pet.name)}}>
                            <MdDelete size={40}/>
                        </div>
                    </div>
                ))
            }
        </div>
     );
}
 
export default PetContainer;