import '../../Navbar/Navbar'
import Navbar from '../../Navbar/Navbar'
import './Activity.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Activity() {
    const [cals, setCals] = useState('');
    const [dur, setDur] = useState('');
    const [hours, setHours] = useState('');
    const [nut, setNut] = useState([]);
    const [ex, setEx] = useState([]);
    const [sl, setSl] = useState([]);
    const [fetching, setIsFetching] = useState(false);
    const [err, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const authUser = async () => {
          setIsFetching(true);
          
          try {
            const calories = await axios.get("http://localhost:3001/activity/calories/" + userId);
            const durations = await axios.get("http://localhost:3001/activity/duration/" + userId);
            const hourss = await axios.get("http://localhost:3001/activity/hours/" + userId);

            const sleep = await axios.get("http://localhost:3001/sleep/user/" + userId);
            const exercise = await axios.get("http://localhost:3001/exercise/user/" + userId);
            const nutrition = await axios.get("http://localhost:3001/nutrition/user/" + userId);

            if (calories?.data && durations?.data && hourss?.data) {
                setCals(calories.data.avg[0].avg);
                setDur(durations.data.avg[0].avg);
                setHours(hourss.data.avg[0].avg);
            } else {
              setError("Error fetching products.");
            }

            if (sleep?.data && exercise?.data && nutrition?.data) {
                setNut(nutrition.data.nutrition);
                setEx(exercise.data.exercise);
                setSl(sleep.data.sleep);
            } else {
              setError("Error fetching products.");
            }


          } catch (err) {
            console.log(err);
            const message = err?.response?.data?.error?.message;
            setError(message ?? String(err));
          } finally {
            setIsFetching(false);
          }
        };
    
        authUser();
      }, []);

    return (
        <div>
            <Navbar/>
            <div id="bg">
                <p>Activity</p>
            </div>
            <div id="big">
                <div>
                    <p>Average Calories</p>
                    <h4>{parseFloat(cals).toFixed(2)}</h4>
                </div>
                <div>
                    <p>Average Duration</p>
                    <h4>{parseFloat(dur).toFixed(2)}</h4>
                </div>
                <div>
                    <p>Average Hours</p>
                    <h4>{parseFloat(hours).toFixed(2)}</h4>
                </div>
            </div>

            <div className='summer'>
                <div id="fall">
                    <h1>Nutrition</h1>
                    {nut.map((n, idx) => (
                        <div key={idx} className='pop'>
                            <p>Name: {n.name}</p>
                            <p>Calories: {n.calories}</p>
                            <p>Category: {n.category}</p>
                        </div>
                    ))}
                </div>

                <div id="fall">
                    <h1>Exercise</h1>
                    {ex.map((n, idx) => (
                        <div key={idx} className='pop'>
                            <p>Name: {n.name}</p>
                            <p>Duration: {n.duration}</p>
                            <p>Intensity: {n.intensity}</p>
                        </div>
                    ))}
                </div>

                <div id="fall">
                    <h1>Sleep</h1>
                    {sl.map((n, idx) => (
                        <div key={idx} className='pop'>
                            <p>Name: {n.name}</p>
                            <p>Start Time: {n.starttime}</p>
                            <p>End Time: {n.endtime}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}