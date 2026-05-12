import React from 'react'
import './App.css'
import ForgotPassword from './components/ForgotPassword'
import Login from './pages/Login'
import Body from './components/Body'
import Forgot from './pages/Forgot'
import Admin from './pages/Admin'
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Typography,Box, Button,Drawer,List,Divider,ListItem,ListItemButton,ListItemIcon,ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



function App() {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor:'black'}}>
          <IconButton sx={{color:'white', m:2}}>
              <MenuIcon/>
              
          </IconButton >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Finance Company
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Admin/page' element={<Admin/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter> */}
    <Admin/>
    </>
  )
}

export default App