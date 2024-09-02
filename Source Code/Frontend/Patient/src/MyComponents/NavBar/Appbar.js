import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Card, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import logo from '../../assets/images/logos/medTracker.png'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  height: '40px',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),

);

const StyledToggleButton = styled(ToggleButton)`
  && {
    transition: background-color 0.2s ease-in-out;
    border-radius: 1px;
    margin: 10px 0;
    color: black;
    border: none;
  }
  &&:hover {
    background-color: #c1c2c9;
    color: black;
  }
  &&.Mui-selected {
    background-color: #085598;
    color: white;
  }
  &&.Mui-selected:hover {
    background-color: #085598;
    color: white;
  }
`;

export default function AppBarComponent({ children }) {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [alignment, setAlignment] = React.useState(() => {
    const storedAlignment = localStorage.getItem('alignment');
    return storedAlignment || 'dash';
  });

  React.useEffect(() => {
    localStorage.setItem('alignment', alignment);
  }, [alignment]);

  const handleChange = (event, newAlignment) => {
    if(newAlignment === 'signOut') {
      setAlignment('dash');
      localStorage.setItem('alignment', 'dash');
      localStorage.removeItem("patient");
      // localStorage.removeItem('alignment')
    }
    setAlignment(newAlignment);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{ height: '50px' }} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Med Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      {/* , backgroundImage: `url(${bgImg2})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", opacity: 0.8  */}
      <Drawer variant="permanent" open={open}>
        <Card raised style={{ width: "100%", height: "100%"}}>
          <DrawerHeader>
            <IconButton
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              
              <img src={logo} alt='Login' height='65px' style={{ borderRadius: 50 }} />
            </IconButton>
            <Typography sx={{ opacity: open ? 1 : 0 }}> Med Tracker </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <ToggleButtonGroup
            value={alignment}
            orientation="vertical"
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ width: "100%", padding: 0, display: 'block' }}
          >

            <StyledToggleButton value="dash" onClick={() => navigate("/patientHome")}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2,
                width: open ? '100%' : 'auto'
              }}
            >
              <IconButton
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <DashboardOutlinedIcon />
              </IconButton>
              <Typography sx={{ opacity: open ? 1 : 0 }}> Dashboard </Typography>
            </StyledToggleButton>

            <br />

            <StyledToggleButton value="presc" onClick={() => navigate("/allPrescriptions")} sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2,
              width: open ? '100%' : 'auto'
            }}
            >
              <IconButton
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <PostAddOutlinedIcon />
              </IconButton>
              <Typography sx={{ opacity: open ? 1 : 0 }}>
                Prescriptions
              </Typography>
            </StyledToggleButton>

            <br />

            <StyledToggleButton value="refill" onClick={() => navigate("/sentRefill")} sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2,
              width: open ? '100%' : 'auto'
            }}
            >
              <IconButton
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <UpdateOutlinedIcon />
              </IconButton>
              <Typography sx={{ opacity: open ? 1 : 0 }}>
                Refill
              </Typography>
            </StyledToggleButton>

            <br />
            {/* <StyledToggleButton value="notify" onClick={() => navigate("")} sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2,
              width: open ? '100%' : 'auto'
            }}
            >
              <IconButton
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <NotificationsOutlinedIcon />
              </IconButton>
              <Typography sx={{ opacity: open ? 1 : 0 }}>
                Notifications
              </Typography>
            </StyledToggleButton> */}
{/* 
            <br /> */}

            <StyledToggleButton value="profile" onClick={() => navigate("/userProfile")} sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2,
              width: open ? '100%' : 'auto'
            }}
            >
              <IconButton
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <AccountCircleOutlinedIcon />
              </IconButton>
              <Typography sx={{ opacity: open ? 1 : 0 }}>
                Profile
              </Typography>
            </StyledToggleButton>

            <br />

            <StyledToggleButton value="signOut" onClick={() => navigate("/login")} sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2,
              width: open ? '100%' : 'auto'
            }}
            >
              <IconButton
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ExitToAppOutlinedIcon />
              </IconButton>
              <Typography sx={{ opacity: open ? 1 : 0 }}>
                Sign Out
              </Typography>
            </StyledToggleButton>
          </ToggleButtonGroup>
        </Card>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
