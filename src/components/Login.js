import {  useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../style/login.css'
import AdminConsole from "./AdminConsole";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin,setAdmin] = useState(false)
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const username = 'tomjohny2003'
    const Password = 'veryverysupersecretpassword852'
    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    };
    const checkCredentials = ()=>{
        if((username===email) && (password===Password)){
            alert('Login Successfull')
            setAdmin(true)
        }else{
            alert('Get lost you are not an Admin')
        }
    }
    return (
        admin?(<AdminConsole/>):(
            <div className="login-container">
            <div className="login-components">
                <div className="image-container">
                    <div className="gradient">
                        <h1>Login</h1>
                        <h2>Welcome Back</h2>
                    </div>
                </div>
                <div className="login-input-container">
                    <input type="text" value={email} onChange={handleEmailInput} placeholder="username..." />
                    <div className="wrapper">
                        <input type={`${passwordVisibility ? "text" : "password"}`} placeholder="Password..." value={password} onChange={handlePasswordInput} />
                        {
                            passwordVisibility ? (
                                <FaEye size={20} className="icon" onClick={() => {
                                    setPasswordVisibility(!passwordVisibility);
                                }} />
                            ) : (
                                <FaEyeSlash className="icon" size={20} onClick={() => {
                                    setPasswordVisibility(!passwordVisibility);
                                }} />
                            )
                        }
                    </div>
                    <input type="button" value="Login" onClick={() => { checkCredentials(email); }} />
                </div>
            </div>
        </div>
        )
    );
};

export default Login;
