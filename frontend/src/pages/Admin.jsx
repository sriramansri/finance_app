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
    { title: "Staff Create", icon: <PeopleIcon fontSize="large" />, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'},
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
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 5 } }}>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a203e' }}>
            Admin Dashboard
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {menuItems.map((item, index) => (
            // Desktop-la items nalla spread aaga md={3} correct-ah irukum
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card 
                sx={{
                  borderRadius: 4,
                  background: item.color,
                  color: 'white',
                  height: '50%',
                  width :'100%',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}
              >
                <CardActionArea sx={{ p: 4, height: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {item.icon}
                    {item.count > 0 && <Badge badgeContent={item.count} color="error" />}
                  </Box>
                  <Typography variant="h5" sx={{ mt: 3, fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}

          {/* This section will now stretch across the full screen width
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 5, 
                borderRadius: 4, 
                border: '1px solid #e0e0e0',
                minHeight: '60vh', // Takes more vertical space on full page
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6" color="textSecondary">
                 Main Dashboard Content Area (Full Width)
              </Typography>
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Admin;