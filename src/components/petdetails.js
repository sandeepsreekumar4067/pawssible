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
    const [isAdmin,setIsAdmin] = useState(localStorage.getItem('admin'))
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
            setIsAdmin(localStorage.getItem('admin'))
        }, []);

        useEffect(() => {
            console.log(isAdmin);
            setIsAdmin(localStorage.getItem('admin'))
        }, [petData]);
    return ( 
        <div className="pet-container">
            {
                petData.map((pet)=>(
                    <div key={pet.id} className="pet-card">
                        <div className="pet-image">

                        </div>
                        <div className="pet-details">

                        </div>
                        <div className="delete-button">
                            delete
                        </div>
                    </div>
                ))
            }
        </div>
     );
}
 
export default PetContainer;