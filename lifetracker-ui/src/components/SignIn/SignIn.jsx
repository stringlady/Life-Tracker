import './SignIn.css'
import Navbar from '../Navbar/Navbar'

export default function SignIn() {
    const onSubmit = (event) => {
        event.preventDefault();
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
                        <input id="input" size={65} type='text' placeholder='Email'/>
                        </div>
                        <br/>
                        <div>
                        <input id="input" size={65} type='text' placeholder='Password'/>
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