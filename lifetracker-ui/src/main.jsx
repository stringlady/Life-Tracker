import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import SignIn from './components/SignIn/SignIn'
import Registration from './components/Registration/Registration'
import ActivityPage from './components/ActivityPage/ActivityPage'
import SleepPage from './components/SleepPage/SleepPage'
import NutritionPage from './components/NutritionPage/NutritionPage'
import ExercisePage from './components/ExercisePage/ExercisePage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}/>
    <Route path="/login" element={<SignIn />}/>
    <Route path="/register" element={<Registration />}/>
    <Route path="/activity" element={<ActivityPage />}/>
    <Route path="/sleep" element={<SleepPage />}/>
    <Route path="/nutrition" element={<NutritionPage />}/>
    <Route path="/exercise" element={<ExercisePage />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
