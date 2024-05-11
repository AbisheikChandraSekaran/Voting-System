// OrganizerDashboard.js
import React, { useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; 
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'; 
import EnrollVoterForm from './EnrollVoterForm'; 
import EnrollPartyForm from './EnrollPartyForm'; 
import ViewPartyPage from './ViewPartyPage'; 
import ViewVoterPage from './ViewVoterPage'; 

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledList = styled(List)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9933',
    },
    secondary: {
      main: '#138808',
    },
  },
});

export default function OrganizerDashboard() {
  const [open, setOpen] = useState(false);
  const [showEnrollVoterForm, setShowEnrollVoterForm] = useState(false);
  const [showEnrollPartyForm, setShowEnrollPartyForm] = useState(false);
  const [showViewPartyPage, setShowViewPartyPage] = useState(false);
  const [showViewVotersPage, setShowViewVotersPage] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleEnrollVoterClick = () => {
    setShowEnrollVoterForm(true);
    setShowEnrollPartyForm(false);
    setShowViewPartyPage(false);
    setShowViewVotersPage(false)
  };

  const handleEnrollPartyClick = () => {
    setShowEnrollPartyForm(true);
    setShowEnrollVoterForm(false);
    setShowViewPartyPage(false);
    setShowViewVotersPage(false)
  };

  const handleViewPartyClick = () => {
    setShowViewPartyPage(true);
    setShowEnrollVoterForm(false);
    setShowEnrollPartyForm(false);
    setShowViewVotersPage(false);
  };

  const handleViewVotersClick = () => {
    setShowViewVotersPage(true)
    setShowViewPartyPage(false);
    setShowEnrollVoterForm(false);
    setShowEnrollPartyForm(false);
  };

  const handleCloseEnrollForms = () => {
    setShowEnrollVoterForm(false);
    setShowEnrollPartyForm(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" color="white">
              Organizer Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  }}
  variant="persistent"
  anchor="left"
  open={open}
>
  <DrawerHeader>
    <IconButton onClick={handleDrawerClose} color='white'>
      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  </DrawerHeader>
  <Divider />
  <StyledList>
    <ListItemButton onClick={handleEnrollVoterClick}
      sx={{
        '&:hover': {
          backgroundColor: theme.palette.secondary.main, // Green background on hover
          color: 'white', // White text color on hover
        },
      }}
    >
      <StyledListItemIcon>
        <PersonAddIcon 
        sx={{
          '&:hover': {
            backgroundColor: theme.palette.secondary.main, // Green background on hover
            color: 'white', // White text color on hover
          },
        }}/>
      </StyledListItemIcon>
      <ListItemText primary="Enroll Voter" />
    </ListItemButton>
    <ListItemButton onClick={handleEnrollPartyClick}
      sx={{
        '&:hover': {
          backgroundColor: theme.palette.secondary.main, // Green background on hover
          color: 'white', // White text color on hover
        },
      }}
    >
      <StyledListItemIcon>
        <GroupAddIcon 
        sx={{
          '&:hover': {
            backgroundColor: theme.palette.secondary.main, // Green background on hover
            color: 'white', // White text color on hover
          },
        }}/>
      </StyledListItemIcon>
      <ListItemText primary="Enroll Party" />
    </ListItemButton>
    <ListItemButton onClick={handleViewVotersClick}
      sx={{
        '&:hover': {
          backgroundColor: theme.palette.secondary.main, // Green background on hover
          color: 'white', // White text color on hover
        },
      }}
    >
      <StyledListItemIcon>
        <PeopleAltIcon 
        sx={{
          '&:hover': {
            backgroundColor: theme.palette.secondary.main, // Green background on hover
            color: 'white', // White text color on hover
          },
        }}/>
      </StyledListItemIcon>
      <ListItemText primary="View Voters" />
    </ListItemButton>
    <ListItemButton onClick={handleViewPartyClick}
      sx={{
        '&:hover': {
          backgroundColor: theme.palette.secondary.main, // Green background on hover
          color: 'white', // White text color on hover
        },
      }}
    >
      <StyledListItemIcon>
        <FormatListBulletedIcon 
        sx={{
          '&:hover': {
            backgroundColor: theme.palette.secondary.main, // Green background on hover
            color: 'white', // White text color on hover
          },
        }}/>
      </StyledListItemIcon>
      <ListItemText primary="View Parties" />
    </ListItemButton>
  </StyledList>
</Drawer>

        <Main open={open}>
          <DrawerHeader />
          <Typography paragraph>Welcome to the Organizer Dashboard. Here you can enroll voters and parties for the upcoming election.</Typography>
          {showEnrollVoterForm && <EnrollVoterForm onClose={handleCloseEnrollForms} />}
          {showEnrollPartyForm && <EnrollPartyForm onClose={handleCloseEnrollForms} />}
          {showViewPartyPage && <ViewPartyPage />}
          {showViewVotersPage && <ViewVoterPage />}
        </Main>
      </Box>
    </ThemeProvider>
  );
}
