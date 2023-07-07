import './SignIn.css'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import jwt_decode from 'jwt-decode';

export default function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", {
                password: password,
                email: email
            });
            const { token } = response.data;

            // Store the token in local storage
            localStorage.setItem('token', token);

            // Decode the token to get user data if needed
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);
            localStorage.setItem('userId', response.data.user.id);
            
            navigate('/activity/a');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Navbar/>
            <div id="form">
                <div id="welcome">
                    <h1>Welcome</h1>
                </div>
                <div id="actual">
                    <form onSubmit={onSubmit}>
                        <div>
                        <input id="input" size={65} type='text' value={email} placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        <br/>
                        <div>
                        <input id="input" size={65} type='password' value={password} placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>
                        <br/>
                        <button id="login" type="submit"> Login</button>
                    </form>
                </div>
                <div>
                    <p>New to us? <a href="/register"><span id="up">Sign Up</span></a></p>
                </div>
            </div>
        </div>
    )
}