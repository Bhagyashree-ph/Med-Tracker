import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

export default function ProviderAppBar(props, {children}) {

    const navigate = useNavigate();

    const [alignment, setAlignment] = React.useState(() => {
        const storedAlignment = localStorage.getItem('alignment');
        return storedAlignment || 'home';
    });

    React.useEffect(() => {
        localStorage.setItem('alignment', alignment);
    }, [alignment]);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <div  style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h6" component="div">
                            Rainbow Hospital
                        </Typography>

                        <ToggleButtonGroup value={alignment}  exclusive onChange={handleChange} aria-label="Platform" sx={{ width: "100%", padding: 0 }}>
                        
                        <StyledToggleButton value="home" onClick={() => navigate("/providerHome")}>
                            Dashboard
                        </StyledToggleButton>

                        <StyledToggleButton value="patient" onClick={() => navigate("/allPatients")}>
                            Patients
                        </StyledToggleButton>

                        <StyledToggleButton value="refill" onClick={() => navigate("/recievedRefill")}>
                            Refill
                        </StyledToggleButton>

                        <StyledToggleButton value="signOut" onClick={() => navigate("/providerlogin")}>
                            Sign Out
                        </StyledToggleButton>
                    </ToggleButtonGroup>
                    </div>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            {/* <Container> */}
                {children}
            {/* </Container> */}
        </React.Fragment>
    );
}
