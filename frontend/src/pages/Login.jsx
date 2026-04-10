import { Box, Button, Card, InputAdornment, TextField, Typography, IconButton, Link } from '@mui/material'
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import axios from '../axiosConfig';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import React, { useState } from 'react'

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });

    const LoginData = () => {
        console.log(formData)
        axios.post('/login', formData)
            .then(response => {
                console.log('Login successful:', response.data);
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleValue = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{
                width: 450,
                bgcolor: '#e5e7e8',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                borderRadius: 5,
                boxShadow: 3
            }}>
                <Typography variant="h5" sx={{ padding: 2, fontWeight: 'bold' }}>
                    Login
                </Typography>

                <TextField
                    label='Email / Username'
                    size="small"
                    margin="dense"
                    name='email'
                    sx={{ width: '80%' }}
                    onChange={handleValue}
                />

                <TextField
                    label='Password'
                    size="small"
                    margin="dense"
                    name='password'
                    onChange={handleValue}
                    type={showPassword ? 'text' : 'password'} // Change type dynamically
                    sx={{ width: '80%', mt: 2 }}
                    // Using slotProps for latest MUI compatibility
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOffSharpIcon /> : <VisibilitySharpIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                />

                <Box sx={{ width: '80%', display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                    <Link href="#" underline="none" sx={{ fontSize: '0.8rem', fontFamily: 'Arial' }}>
                        Forgot Password?
                    </Link>
                </Box>

                <Button variant='contained' onClick={LoginData} fullWidth sx={{ width: '80%', mt: 3, borderRadius: 2 }}>
                    Log in
                </Button>
            </Card>
        </Box>
    )
}

export default Login