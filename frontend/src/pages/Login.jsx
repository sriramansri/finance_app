import { Box, Button, Card, InputAdornment, TextField, Typography, IconButton, Link, Snackbar, Alert } from '@mui/material'
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import axios from '../axiosConfig';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import React, { useState } from 'react'


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [Error, setError] = useState(false);
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });

    const handleClose = (event, reason) => {
        console.log(reason)
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    // data pasing to backend

    const LoginData = () => {
        console.log(formData)
        axios.post('/login', formData)
            .then(response => {
<<<<<<< HEAD
                setSuccess(true)
            })
            .catch(error => {
                setError(true)
=======
                alert('Login successful:', response.data.Status);
            })
            .catch(error => {
                alert('Login failed:', error);
>>>>>>> 807adaec566be50b02cd27770d3c7a92bfa93a33
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

            <Snackbar
                open={success}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity='success' sx={{ width: '100%' }} onClose={handleClose}>
                    Login successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={Error}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity='error' sx={{ width: '100%' }} onClose={handleClose}>
                    Login Failed!
                </Alert>
            </Snackbar>

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
                <Typography variant="h5" sx={{ padding: 2, fontWeight: 'bold', fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}>
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