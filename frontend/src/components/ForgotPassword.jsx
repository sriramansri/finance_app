import React, { useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import axios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({ email: '', otp: '', newPassword: '' });
    const navigate = useNavigate();

    const handleSendOTP = () => {
        axios.post('/send-otp', { email: data.email })
            .then(() => { alert("OTP Sent!"); setStep(2); })
            .catch(() => alert("Error sending OTP"));
    };

    const handleReset = () => {
        axios.post('/reset-password', data)
            .then(() => {
                alert("Password Updated!");
                navigate('/');
            })
            .catch(() => alert("Invalid OTP"));
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ width: 400, padding: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Reset Password</Typography>
                
                {step === 1 ? (
                    <>
                        <TextField fullWidth label="Enter Email" sx={{ mb: 2 }} 
                            onChange={(e) => setData({...data, email: e.target.value})} />
                        <Button variant="contained" onClick={handleSendOTP}>Send OTP</Button>
                    </>
                ) : (
                    <>
                        <TextField fullWidth label="Enter OTP" sx={{ mb: 2 }}
                            onChange={(e) => setData({...data, otp: e.target.value})} />
                        <TextField fullWidth label="New Password" type="password" sx={{ mb: 2 }}
                            onChange={(e) => setData({...data, newPassword: e.target.value})} />
                        <Button variant="contained" color="success" onClick={handleReset}>Update Password</Button>
                    </>
                )}
            </Card>
        </Box>
    );
}

export default ForgotPassword;