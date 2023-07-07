import Navbar from '../../Navbar/Navbar'
import './Exercise.css'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function Exercise() {
    const [form, setForm] = useState(false);
    const btnclass = form ? 'hidden' : '';
    const fClass = form ? '' : 'hidden';
    const [name, setName] = useState('');
    const [hours, setHours] = useState('');
    const [exercise, setExercise] = useState([]);
    const [fetching, setIsFetching] = useState(false);
    const [err, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const authUser = async () => {
          setIsFetching(true);
          try {
            const res = await axios.get("http://localhost:3001/exercise/user/" + userId);
            if (res?.data.exercise) {
              setExercise([res.data]);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setForm(false);
        try {
            const response = await axios.post('http://localhost:3001/exercise', {
                userId: localStorage.getItem('userId'),
                name: name,
                hours: hours,
            })
            console.log(response.data);
            
            const newexercise = [...exercise, response.data.exercise]
            setExercise(newexercise)
        } 
        catch(err) {
            console.log(err);
        }
    }
    return (
        <div>
        <div id="nut">
            <Navbar/>
            <div id="bg">
                <p>Exercise</p>
            </div>
            <div id="btn" className={btnclass}>
                <button onClick={() => {setForm(true)}}>Record Exercise</button>
            </div>
            <br/>
            <br/>
            <div className={fClass}>
            <div id="actual1">
                    <form onSubmit={handleSubmit}>
                        <div>
                        <input id="input" size={65} value={name} type='text' placeholder='Name' onChange={(e) => {setName(e.target.value)}}/>
                        </div>
                        <br/>
                        <div>
                        <input id="input" size={65} value={hours} type='number' min={0}  placeholder='Hours' onChange={(e) => {setHours(e.target.value)}} />
                        </div>
                        <br/>
                        <br/>
                        <button id="login" type="submit"> Record Exercise</button>
                    </form>
                    
                </div>
                </div>
                
        </div>
        <div id="cards">
        {exercise[1]?.map((n, idx) => (
                        <div id="card" key={idx}>
                        <ExerciseCard name={n.name} hours={n.hours} date={n.createdat}/>
                        </div>
                    ))}
        </div>
        </div>
    )
}

export function ExerciseCard({name, hours, date}) {
    return (
        <div>
            <p>{name}</p>
            <p>{hours}</p>
            <p>{date}</p>
        </div>
    )
}