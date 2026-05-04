import { Box, Button, Card, InputAdornment, TextField, Typography, IconButton, Link, Snackbar, Alert } from '@mui/material'
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import axios from '../services/axiosConfig';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [emailValid, setemailVaild] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState(false);
    const [formData, setformData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    // let pattern=new RegExp("^/d")

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    // data pasing to backend

    const LoginData = async () => {
        setError(false); // Reset error state before trying
        setLoading(true)

        var pattern = new RegExp(/^[a-z A-Z]{0,1}[a-z]+\d{1,20}(@gmail["."]com)$/)

        try {
            if (pattern.test(formData.email)) {

                setemailVaild(false)
                // 1. Use the full path that your backend is listening on
                const response = await axios.post('/login', formData); 

                // 2. Store the token
                localStorage.setItem('token', response.data.token);

                // 3. Navigate based on role (Match your backend's case-sensitive 'Success')
                if (response.data.status === "Success") {
                    if (response.data.role === 'admin') {
                        navigate('/Admin/page');
                    } else {
                        // If you have a user page, navigate there
                        navigate('/user/dashboard');
                    }
                    setSuccess(true);
                }
            } else {
                setError(true)
                setemailVaild(true)
                setTimeout(() => {
                    (emailValid ? setemailVaild(true) : setemailVaild(false))
                    setSuccess(false)
                    setError(false)
                    setLoading(false)
                }, 2000)

            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
        }
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
                        label='Email '
                        size="small"
                        margin="dense"
                        name='email'
                        sx={{ width: '80%' }}
                        onChange={handleValue}
                    />

                    <TextField
                        label='Password'
                        size="small"
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
                        <Link
                            component="button"
                            onClick={() => navigate('/forgot-password')}
                            underline="none"
                            sx={{ fontSize: '0.8rem' }}
                        >
                            Forgot Password?
                        </Link>
                    </Box>

                    <Button variant='contained' onClick={LoginData} fullWidth sx={{ width: '80%', mt: 3, borderRadius: 2 }}>
                        Log in
                    </Button>
                    <p>srikarsan@gmail.com</p>
                    <p>Srkasa@2005</p>
                </Card>
            </Box>
        )
    }

export default Login