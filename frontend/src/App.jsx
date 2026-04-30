import React from 'react'
import './App.css'
import ForgotPassword from './components/ForgotPassword'
import Login from './pages/Login'
import Body from './components/Body'
import Forgot from './pages/Forgot'
import Admin from './pages/Admin'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Typography } from '@mui/material'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Admin/page' element={<Admin/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App