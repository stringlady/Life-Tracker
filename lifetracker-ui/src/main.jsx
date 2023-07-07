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
import Activity from './components/AuthenticatedViews/Activity/Activity'
import Sleep from './components/AuthenticatedViews/Sleep/Sleep'
import Exercise from './components/AuthenticatedViews/Exercise/Exercise'
import Nutrition from './components/AuthenticatedViews/Nutrition/Nutrition'

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
    <Route path="/activity/a" element={<Activity/>}/>
    <Route path="/sleep/a" element={<Sleep/>}/>
    <Route path="/nutrition/a" element={<Nutrition/>}/>
    <Route path="/exercise/a" element={<Exercise/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
