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
const Home = () => {
        const [petData, setPetData] = useState()
        const fetchPetDetails = async () => {
            const petref = collection(db, 'Pet Details')
            const snapShot = await getDocs(petref)
            const fetchedData = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setPetData(await fetchedData)
        }
        // useEffect(() => {
        //     fetchPetDetails();
        // }, []);

        // useEffect(() => {
        //     console.log(petData);
        // }, [petData]);
        return ( <div className = "home-container" >
            
        </div> );
        }

        export default Home;