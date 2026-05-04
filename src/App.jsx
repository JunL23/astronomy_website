import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Skymap from './pages/Skymap/Skymap.jsx'
import Simulation from './pages/simulation/simulation.jsx'
import Sign_in from './pages/sign_in_sign_up/signin.jsx'
import Signup from './pages/sign_in_sign_up/signup.jsx'
import Gallery from './pages/Gallery/gallery.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Sign_in/>} />
        <Route path = "/Home" element={<Home/>} />
        <Route path = "/Skymap" element={<Skymap/>} />
        <Route path = "/Sim" element={<Simulation/>} />
        <Route path = "/sign_up" element={<Signup/>} />
        <Route path = "/Gallery" element={<Gallery/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
