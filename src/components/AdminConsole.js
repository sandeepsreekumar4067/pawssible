import React, { useState } from 'react';
import { db ,storage } from './firebaseAuth';
import { collection, addDoc } from 'firebase/firestore';
import '../style/adminconsole.css'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
const AdminConsole = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [image,setImage] = useState('')
    const [imageURL, setImageURL] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!image){
            alert('please upload a cover image')
            return
        }
        try {
            const imageRef = ref(storage,`images/${image.name}`)
            await uploadBytes(imageRef,image)
            const url = await getDownloadURL(imageRef)
            await addDoc(collection(db, 'Pet Details'), {
                name,
                age,
                breed,
                url
            });
            alert('Pet details added successfully');
            setName('');
            setAge('');
            setBreed('');
            setImage(null)
            setImageURL(null)
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Failed to add pet details');
        }
    };
    const handleImage = (e) =>{
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setImageURL(URL.createObjectURL(file)); // Optionally, set a preview URL
        } else {
            alert('Please select a valid image file');
        }
    }
    return (
        <div className="admin-console">
            <h1>Admin Console</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input 
                        type="text" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Breed:</label>
                    <input 
                        type="text" 
                        value={breed} 
                        onChange={(e) => setBreed(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" accept="image/*" required onChange={handleImage} />
                    {imageURL && <img src={imageURL} alt="Selected" style={{width: '100px', height: '100px'}} />} {/* Optional image preview */}
                </div>
                <button type="submit">Add Pet</button>
            </form>
        </div>
    );
};

export default AdminConsole;
