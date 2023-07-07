import './Navbar.css'
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';

export default function Navbar() {
    // Check if a valid token exists
    const token = localStorage.getItem('token');
    const isAuthenticated = token && jwt_decode(token);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    }
    return (
        <div>
            {isAuthenticated ? 
            <div className='Navbar'>
                <a href="/"><Logo/></a>
                <a href='/activity/a'><p id="word">Activity</p></a>
                <a href='/exercise/a'><p id="word">Exercise</p></a>
                <a href='/nutrition/a'><p id="word">Nutrition</p></a>
                <a href='/sleep/a'><p id="word">Sleep</p></a>
                <a onClick={handleSignOut}><p id="sign">Sign Out</p></a>
            </div>
        :
            <div className='Navbar'>
                <a href="/"><Logo/></a>
                <a href='/activity'><p id="word">Activity</p></a>
                <a href='/exercise'><p id="word">Exercise</p></a>
                <a href='nutrition'><p id="word">Nutrition</p></a>
                <a href='sleep'><p id="word">Sleep</p></a>
                <a href="/login"><p id="sign">Sign In</p></a>
                <a href="/register"><p id="reg">Register</p></a>
            </div> 
        }
        </div>
    )
}