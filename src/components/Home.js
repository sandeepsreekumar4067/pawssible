import { useNavigate } from 'react-router-dom';
import dog from '../assets/dog.png';
import logo from '../assets/pawssible.png';
import PetContainer from './petdetails';
import { useEffect, useState } from 'react';
import AdminConsole from './AdminConsole';

const Home = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminConsole, setAdminConsole] = useState(false);

    useEffect(() => {
        const adminStatus = localStorage.getItem('admin') === 'true';
        setIsAdmin(adminStatus);
    }, []);

    const handleLogout = () => {
        localStorage.setItem('admin', 'false');
        setIsAdmin(false);
        setAdminConsole(false);
    };

    return (
        <div className="home-container">
            {!adminConsole ? (
                <>
                    <div className="navbar-title">
                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="navbar-main-title">
                            Pawssible
                        </div>
                        <div className="login-button">
                            {isAdmin ? (
                                <>
                                    <input type="button" value="Logout" onClick={handleLogout} />
                                    <input type="button" value="Admin Console" onClick={() => setAdminConsole(true)} />
                                </>
                            ) : (
                                <input type="button" value="Admin Login" onClick={() => navigate('/login')} />
                            )}
                        </div>
                    </div>
                    <div className="image-and-title-container">
                        <div className="title">
                            <div className="main-title">
                                Find your Best Friend
                            </div>
                            <div className="sub-title">
                                Here at Pawssible
                            </div>
                        </div>
                        <div className="blob">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill="#3FA2F6"
                                    d="M45.6,-58C60.2,-52.2,73.8,-40.3,80.1,-25.1C86.4,-9.8,85.3,8.8,77.6,23C70,37.3,55.7,47.2,41.7,56.9C27.7,66.6,13.8,76,-2.2,79C-18.2,82,-36.4,78.6,-46.5,67.6C-56.7,56.7,-58.8,38.2,-65.4,20.6C-72,3,-83,-13.8,-79.2,-25.8C-75.4,-37.9,-56.9,-45.3,-41.2,-50.8C-25.5,-56.4,-12.8,-60,1.4,-61.9C15.5,-63.8,31,-63.9,45.6,-58Z"
                                    transform="translate(100 100)"
                                />
                            </svg>
                        </div>
                        <div className="image">
                            <img src={dog} alt="" />
                        </div>
                    </div>
                    <PetContainer />
                </>
            ) : (
                <AdminConsole />
            )}
        </div>
    );
};

export default Home;
