import {
    collection,
    getDocs
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
const PetContainer = () => {
    const [petData, setPetData] = useState([])
        const fetchPetDetails = async () => {
            const petref = collection(db, 'Pet Details')
            const snapShot = await getDocs(petref)
            const fetchedData = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setPetData(await fetchedData)
        }
        useEffect(() => {
            fetchPetDetails();
        }, []);

        useEffect(() => {
            console.log(petData);
        }, [petData]);
    return ( 
        <div className="pet-container">
            {
                petData.map((pet)=>(
                    <div key={pet.id} className="pet-card">
                        <div className="name">{pet.name}</div>
                        <div className="age">{pet.age} </div>
                        <div className="breed">{pet.breed} </div>
                    </div>
                ))
            }
        </div>
     );
}
 
export default PetContainer;