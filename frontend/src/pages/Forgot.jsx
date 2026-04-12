import React from 'react'
import { Box, Button, Card, TextField, Typography } from '@mui/material'

function Forgot() {
  return (
    <>
      <Box sx={{
        width: '99vw',
        height: '98vh',
        bgcolor: '#09041c',
        background: 'cover',
        justifyItems: 'center',
        alignContent: 'center'
      }}>
        <Typography variant='h2' sx={{ color: 'whitesmoke',marginTop:-5,padding:6, fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}>
          Reset your Password
        </Typography>
        <Card
          sx={{
            height:250,
            width: 400,
            bgcolor: '#e5e7e8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            borderRadius: 5
          }}>
          <Typography variant='h5' className='title'>
            ForgotPassword
          </Typography>
          <Typography
          variant='p' sx={{padding:3, fontFamily:'sans-serif', color:'#595858'}}>
            To reset your password enter your emailaddress below
          </Typography>
          <TextField
            label='Enter your emailaddress'
            size="small"
            margin="dense"
            name='email'
            sx={{ width: '80%' }}
          />
          <Button variant='contained' sx={{margin:3}}>
            Reset my Password
          </Button>
        </Card>
      </Box>
    </>
  )
}

export default Forgot