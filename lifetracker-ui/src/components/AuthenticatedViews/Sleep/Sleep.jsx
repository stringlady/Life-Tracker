import Navbar from '../../Navbar/Navbar'
import './Sleep.css'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';

export default function Sleep() {
    const [form, setForm] = useState(false);
    const btnclass = form ? 'hidden' : '';
    const fClass = form ? '' : 'hidden';
    const [name, setName] = useState('');
    const [hours, setHours] = useState('');
    const [sleep, setSleep] = useState([]);
    const [fetching, setIsFetching] = useState(false);
    const [err, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const authUser = async () => {
          setIsFetching(true);
    
          try {
            const res = await axios.get("http://localhost:3001/sleep/user/" + userId);
            if (res?.data) {
              setSleep([res.data])
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
            const response = await axios.post('http://localhost:3001/sleep', {
                userId: localStorage.getItem('userId'),
                name: name,
                hours: hours,
            })
            console.log(response.data);
            
            const newSleep = [...sleep, response.data.sleep]
            setSleep(newSleep)
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
                <p>Sleep</p>
            </div>
            <div id="btn" className={btnclass}>
                <button onClick={() => {setForm(true)}}>Record Sleep</button>
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
                        <input id="input" size={65} value={hours} type='number' min={0}  placeholder='hours' onChange={(e) => {setHours(e.target.value)}} />
                        </div>
                        <br/>
                        <br/>
                        <button id="login" type="submit">Record Sleep</button>
                    </form>
                    
                </div>
                </div>
                
        </div>
        <div id="cards">
        {sleep[1]?.map((n, idx) => (
                        <div id="card" key={idx}>
                        <SleepCard name={n.name} hours={n.hours} date={n.createdat}/>
                        </div>
                    ))}
        </div>
        </div>
    )
}

export function SleepCard({name, hours, date}) {
    return (
        <div>
            <p>{name}</p>
            <p>{hours}</p>
            <p>{date}</p>
        </div>
    )
}