import Navbar from "../Navbar/Navbar"
import './ExercisePage.css'

export default function ExercisePage() {
    return(
        <div>
            <Navbar/>
            <div id="content">
                <div id="message">
                    <p>Log in to see data</p>
                </div>
            </div>
        </div>
    )
}