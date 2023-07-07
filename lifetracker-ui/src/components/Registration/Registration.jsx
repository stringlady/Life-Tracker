import Navbar from "../Navbar/Navbar";
import "./Registration.css"
import axios from 'axios';
//import { isAuthenticated } from "../../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';


export default function Registration() {
    const navigate = useNavigate();
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/register", {
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email
            });
            console.log(response.data);
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
                    <h1>Create an Account</h1>
                </div>
                <div id="a">
                    <form onSubmit={onSubmit}>
                        <div>
                        <input id="input" className="for" value={email} size={65} type='text' placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        <br/>
                        <div>
                        <input id="input" size={65} type='text' placeholder='Username'/>
                        </div>
                        <br/>
                        <div className="name">
                        <input id="input" className="first" value={firstName} size={31} type='text' placeholder='First Name' onChange={(e) => {setFirst(e.target.value)}}/>
                        <input id="input" className="last" value={lastName} size={31} type='text' placeholder='Last Name' onChange={(e) => {setLast(e.target.value)}}/>
                        </div>
                        <br/>
                        <div>
                        <input id="input" className="password" size={65} type='password' placeholder='Password'/>
                        </div>
                        <br/>
                        <div>
                        <input id="input" value={password} className="confirm" size={65} type='password' placeholder='Confirm Password' onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>
                        <br/>
                        <button id="register" type="submit"> Register</button>
                    </form>
                </div>
                <div>
                    <p>Already have an account? <a href="/login"><span id="up">Log In</span></a></p>
                </div>
            </div>
        </div>
    )
}