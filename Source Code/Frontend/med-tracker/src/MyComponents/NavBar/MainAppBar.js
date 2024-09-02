import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import MyTypography from '../../assets/themes/MyTypography';
import logo from '../../assets/images/logos/medTracker.png'

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function MainAppBar(props) {

    const navigate = useNavigate();

    const [headerValue, setHeaderValue] = React.useState(() => {
        const storedHeaderValue = localStorage.getItem('headerValue');
        return storedHeaderValue || 'home';
    });

    React.useEffect(() => {
        localStorage.setItem('headerValue', headerValue);
    }, [headerValue]);

    const handleChange = (event, newHeaderValue) => {
        if (newHeaderValue === "signOut") {
            setHeaderValue("home");
        } else {
            setHeaderValue(newHeaderValue);
        }
    };

    return (
        <div style={{ height: '35px' }}>
            {/* <React.Fragment> */}
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar sx={{ backgroundColor: 'transparent' }}>
                    <Toolbar>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div>
                            <img src={logo} alt='Login' height='55px' style={{ borderRadius: 50 }} />
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <a href="http://localhost:3003/login" target="_blank" style={{ textDecoration: 'none' }}>
                                    <Button color='inherit' variant='contained' size='size'> <b> Provider Login </b> </Button>
                                </a>
                                &nbsp; &nbsp;
                                <a href="http://localhost:3001/login" target="_blank" style={{ textDecoration: 'none' }}>
                                    <Button color='inherit' variant='contained' size='size'> <b>Patient Login  </b></Button>
                                </a>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            {/* </React.Fragment> */}
        </div>
    );
}
