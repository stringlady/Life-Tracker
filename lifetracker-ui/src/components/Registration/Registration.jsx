import Navbar from "../Navbar/Navbar";
import "./Registration.css"

export default function Registration() {
    const password = document.querySelector('.password');
    const confirm = document.querySelector('.confirm');
    const match = document.querySelector('#match');
    const email = document.querySelector('#email');
    const forEmail = document.querySelector('.for');

    //For the Email address
    const handleChange = () => {
        if(forEmail.value.includes('@') === false) {
            email.classList.remove('hidden');
        } else {
            email.classList.add('hidden');
        }
    }

    //For the password confirmation
    const handleOnChange = () => {
        if(password.value != confirm.value) {
            match.classList.remove('hidden');
        } else {
            match.classList.add('hidden');
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
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
                        <input id="input" onChange={handleChange} className="for" size={65} type='text' placeholder='Email'/>
                        </div>
                        <br/>
                        <div>
                        <input id="input" size={65} type='text' placeholder='Username'/>
                        </div>
                        <br/>
                        <div className="name">
                        <input id="input" className="first" size={31} type='text' placeholder='First Name'/>
                        <input id="input" className="last" size={31} type='text' placeholder='Last Name'/>
                        </div>
                        <br/>
                        <div>
                        <input id="input" className="password" size={65} type='text' placeholder='Password'/>
                        </div>
                        <br/>
                        <div>
                        <input id="input" className="confirm" onChange={handleOnChange} size={65} type='text' placeholder='Confirm Password'/>
                        </div>
                        <br/>
                        <div id="match" className="hidden">
                        <label id="error">Passwords Do Not Match</label>
                        <br/>
                        <br/>
                        </div>
                        <div id="email" className="hidden">
                        <label id="error">This is not an email address</label>
                        <br/>
                        <br/>
                        </div>
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