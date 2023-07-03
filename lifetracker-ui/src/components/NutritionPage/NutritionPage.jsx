import Navbar from "../Navbar/Navbar"
import "./NutritionPage.css"

export default function NutritionPage() {
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