import React, { useState } from 'react';
import { db } from './firebaseAuth';
import { collection, addDoc } from 'firebase/firestore';
import '../style/adminconsole.css'
const AdminConsole = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [image,setImage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!image){
            alert('please upload a cover image')
            return
        }
        try {
            await addDoc(collection(db, 'Pet Details'), {
                name,
                age,
                breed
            });
            alert('Pet details added successfully');
            setName('');
            setAge('');
            setBreed('');
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Failed to add pet details');
        }
    };
    const handleImage = (e) =>{
        if(e.target.file[0]){
            setImage(e.target.files[0])
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
                    <input type="file" required onChange={handleImage}/>
                </div>
                <button type="submit">Add Pet</button>
            </form>
        </div>
    );
};

export default AdminConsole;
