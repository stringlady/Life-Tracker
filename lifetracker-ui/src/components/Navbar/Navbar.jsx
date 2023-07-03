import './Navbar.css'

export default function Navbar() {
    return (
        <div>
            <div className='Navbar'>
                <a href="/"><img id="logo" src='codepath.svg'/></a>
                <a href="/activity"><p id="word">Activity</p></a>
                <a href='/exercise'><p id="word">Excercise</p></a>
                <a href='/nutrition'><p id="word">Nutrition</p></a>
                <a href="/sleep"><p id="word">Sleep</p></a>
                <a href="/login"><p id="sign">Sign In</p></a>
                <a href="/register"><p id="reg">Register</p></a>
            </div>
        </div>
    )
}