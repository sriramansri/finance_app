import React from 'react';
import { 
  Grid, Card, Typography, Container, Box, 
  CardActionArea, Badge, Paper 
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PercentIcon from '@mui/icons-material/Percent';

const Admin = () => {
  const menuItems = [
    { title: "Staff Create", icon: <PeopleIcon fontSize="large" />, color: 'linear-gradient(135deg, #667eea 0%, #c5c21f 100%)'},
    { title: "Loan Approval", icon: <AssignmentTurnedInIcon fontSize="large" />, color: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)' },
   
  ];

  return (
    // Outer Box takes full viewport height and width
    <Box sx={{ 
      backgroundColor: '#e7e9eb', 
      minHeight: '100vh', 
      width: '100%',
      pt: 4 
    }}>
      {/* maxWidth={false} is the key to full width */}
      <Container  sx={{ px: {xs: 2, md: 5 , height:'100vh' ,backgroundColor:'#ffffff' ,} }}>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{p:5, fontWeight: 800, color: '#000000' ,alignContent:'center'}}>
            Admin Dashboard
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {menuItems.map((item, index) => (
            // Desktop-la items nalla spread aaga md={3} correct-ah irukum
            <Grid item xs={12} sm={6} md={4} key={index} sx={{}}>
              <Card 
                sx={{
                  borderRadius: 4,
                  background: item.color,
                  // color: 'white',
                  height: '80%',
                  width :'28vw',

                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}
              >
                <CardActionArea sx={{ p: 5, height: '100%' }}>
                  {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {item.icon}
                    {item.count > 0 && <Badge badgeContent={item.count} color="error" />}
                  </Box> */}
                  <Typography variant="h5" sx={{ mt: 0, fontWeight: 700,display: 'flex',gap:2, alignContent:'center',justifyContent:'center'}}>
                    {item.icon} {item.title}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 2, 
                borderRadius: 4, 
                border: '1px solid #e0e0e0',
                minHeight: '60vh', 
                width:'55vw',
               
              }}
            >
              <Typography variant="h6" color="#5467">
                Repo
                <hr />
              </Typography>
            </Paper>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
};

export default Admin;