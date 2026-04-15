import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Skymap from './pages/Skymap/Skymap.jsx'
import Galaxy from './pages/simulation/galaxy.jsx'
import Simulation from './pages/simulation/simulation.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path = "/Skymap" element={<Skymap/>} />
        <Route path = "/Sim" element={<Simulation/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
