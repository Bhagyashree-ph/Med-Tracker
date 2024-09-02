import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Card, CardContent, FormControl, InputLabel, OutlinedInput, CardActionArea, InputAdornment, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import MyTypography from '../../assets/themes/MyTypography'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import image1 from '../../assets/images/Login Images/DailyPills.jpg'
import image3 from '../../assets/images/Login Images/pills.webp'
import image4 from '../../assets/images/Login Images/pharmacy.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/images/logos/medTracker.png'


const LoginPage = () => {

    
  const items = [
    image1,
    image3,
    image4
];

return (
    <Grid container >
        <Grid Item xs={8.5}>
    <Carousel autoPlay={true} interval={2500} indicators={false}>
        {items.map((imageUrl, index) => (
            <Item key={index} imageUrl={imageUrl} index={index} />
        ))}
    </Carousel>
    </Grid>
    <Grid Item xs={3.5}>
        <LoginForm />
        </Grid>
     </Grid>
);
}

function Item({ imageUrl, index }) {

  const contents = [
    "Take Control of Your Medication: Easily track your prescriptions, dosages, and reminders in one place, ensuring you never miss a dose again.",
    "Stay on Top of Your Health: Input your prescription details and let our tool do the rest, providing you with customizable reminders and notifications to keep you on track.",
    "Peace of Mind: With our Medication-Management-Tool, you'll never have to worry about missing a dose or running out of medication again, giving you peace of mind and improving your overall well-being.",
    "Manage Your Medication, Simplified: Our tool integrates with pharmacy systems, allowing you to access real-time updates and stay connected with your healthcare providers and pharmacies.",
    "Simplify Your Health: Our Medication-Management-Tool streamlines your medication schedule, sending you timely reminders and alerts to refill your prescriptions.",
  ];

const content = contents[index];

return (
    <Paper
        style={{
            width: "100%",
            height: "600px",
            display: "flex",
            justifyContent: "space-between",
        }}
    >
        <img src={imageUrl} alt="Carousel Item" style={{ width: "200%", height: "100%" }} />
        <div
        id='content'
            style={{
                width: "73%",
                position: "absolute",
                top: "70%",
                left: "10%",
                transform: "translate('-50 %', '-50 %')",
                textAlign: "center",
                color: "black",
                background: "rgba(255, 255, 255, 0.6)",
                padding: "20px",
                borderRadius: "20px",
            }}
        >
            <MyTypography variant="h5" style={{ color: "#45474B" }}>
                {content}
            </MyTypography>
        </div>
    </Paper>
);
}

function LoginForm() {
    
    const navigate = useNavigate();

// const[controller,dispatch] = useCPMContext();
const [userId, setUserId] = React.useState('');
const [password, setPassword] = React.useState('');
const [errors, setErrors] = React.useState({
    userId: null,
    password: null,
    userObj: null
});

const [showPassword, setShowPassword] = React.useState(false);

const handleClickShowPassword = () => setShowPassword((show) => !show);

const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

const handleSubmit = async (event) => {

    event.preventDefault();
    if (!userId){
        setErrors({userId: 'Required'});
    }
    else if(!password) {
        setErrors({ password: 'Required' });
    }
    else {
        console.log('Form submitted successfully!');
        const returnedObj = await axios.get(`http://localhost:9090/patient/fetchPatientByUserId/${userId}`)
                                .then((resp) => {return resp.data})
                                .catch((error) => {console.error(error)});
        if(returnedObj!==null){
            let user = returnedObj.user;
            if(user.password === password){
                localStorage.setItem("patient", JSON.stringify(returnedObj));
                navigate('/patientHome');
            } else {
                setErrors({password: "Invalid password..!"});
            }
        } else {
            setErrors({ userObj: "User Not found"});
        }

    }
}

return (

    <Card sx={{ width: '100%', height: '100%', borderRadius: 0 }}>
        <CardContent sx={{ margin: '40% 0' }}>
          <div style={{ lineHeight: '40px', textAlign: 'center' }}>
          <img src={logo} alt='Login' height='65px' style={{ borderRadius: 50 }} /> <br/>
            <MyTypography variant="h5" style={{ color: '#45474B' }}>Welcome back!</MyTypography>
            </div>
            <br/>
            <TextField
                id="userId"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                error={errors.userId !== null}
                helperText={errors.userId}
                label="User ID"
                required
                fullWidth
            />

            <FormControl sx={{ width: '100%', margin: '20px 0' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password required"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                error={errors.password !== null}
                helperText={errors.password}
                
                    fullWidth
                />
            </FormControl>

            <MyTypography variant="body1">Don't have an account? 
                <Button variant='text' onClick={(() => navigate("/register"))}>Click here!</Button>
            </MyTypography>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button type="submit" 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    style={{ color: 'whitesmoke' }} 
                    onClick={handleSubmit} 
                >
                    Login
                </Button>
            </div>
        </CardContent>
    </Card>

);

};

export default LoginPage;

// import React, { useEffect, useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { CardActionArea, CardHeader, Paper } from '@mui/material';
 
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import MDTypography from 'components/MDTypography';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import image1 from '../../assets/images/loginImages/policy.png';
// import image2 from '../../assets/images/loginImages/family.png';
// import image3 from '../../assets/images/loginImages/patient.png';
// import { useCPMContext } from 'context';
// import { setRole } from 'context';
// import { useNavigate } from 'react-router-dom';
 
// function LoginPage() {
//     const items = [
//         image1,
//         image2,
//         image3
//     ];
 
//     return (
//         <Carousel autoPlay={true} interval={2500} indicators={false}>
//             {items.map((imageUrl, index) => (
//                 <Item key={index} imageUrl={imageUrl} index={index} />
//             ))}
//         </Carousel>
//     );
// }
 
// function Item({ imageUrl, index }) {
 
//     const contents = [
//         "Get Paid Faster: Submit claims in minutes and get reimbursed in days, not weeks. Our Claim Processing System makes it easy to manage your claims and maximize your benefits.",
//         "Say Goodbye to Paperwork: Ditch the hassle of paperwork and phone calls. Our system streamlines the claims process, so you can focus on what matters most - your health and well-being.",
//         "Maximize Your Benefits: Our Claim Processing System ensures you get the most out of your insurance policy. Get accurate reimbursements, fast, and take control of your claims.",
//         "Your Claims, Simplified: No more waiting on hold or dealing with paperwork. Our system makes it easy to submit, track, and manage your claims, so you can get back to living your life.",
//         "Take Control of Your Claims: With our Claim Processing System, you're in charge. Submit claims online, track your status, and get reimbursed fast. It's that easy.",
//     ];
 
//     const content = contents[index];
 
//     return (
//         <Paper
//             style={{
//                 width: "100%",
//                 height: "600px",
//                 display: "flex",
//                 justifyContent: "space-between",
//             }}
//         >
//             <img src={imageUrl} alt="Carousel Item" style={{ width: "200%", height: "100%" }} />
//             <div
//                 style={{
//                     width: "60%",
//                     position: "absolute",
//                     top: "70%",
//                     left: "3%",
//                     transform: "translate('-50 %', '-50 %')",
//                     textAlign: "center",
//                     color: "black",
//                     background: "rgba(255, 255, 255, 0.6)",
//                     padding: "20px",
//                     borderRadius: "20px",
//                 }}
//             >
//                 <MDTypography variant="inherit" style={{ color: "black" }}>
//                     {content}
//                 </MDTypography>
//             </div>
//             <LoginForm />
//         </Paper>
//     );
// }
 
// function LoginForm() {
 
//     const[controller,dispatch] = useCPMContext();
//     const [userId, setUserId] = React.useState('');
//     const [password, setPassword] = React.useState('');
//     const [errors, setErrors] = React.useState({
//         userId: null,
//         password: null,
//     });
 
//     const handleUserId = (event) => {
//         const { value } = event.target;
//         setUserId(value);
//     };
 
//     const handlePassword = (event) => {
//         const { value } = event.target;
//         setPassword(value);
//     };
 
//     const handleSubmit = (event) => {
 
//         event.preventDefault();
//         if (!userId){
//             setErrors({userId: 'Required'});
//         }
//         else if(!password) {
//             setErrors({ password: 'Required' });
//         }
//         else {
//             console.log('Form submitted successfully!');
//             setRole(dispatch,"INSURANCE");
//         }
//     }
         
 
//     const [showPassword, setShowPassword] = React.useState(false);
 
//     const handleClickShowPassword = () => setShowPassword((show) => !show);
 
//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };
 
//     return (
 
//         <Card sx={{ width: '100%', height: '100%', borderRadius: 0 }}>
//             <CardContent sx={{ margin: '40% 0' }}>
//                 <MDTypography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>Login</MDTypography>
//                 <MDTypography style={{ marginBottom: '10px' }}>Login in to your account</MDTypography>
 
//                 <TextField
//                     id="userId"
//                     value={userId}
//                     onChange={handleUserId}
//                     error={errors.userId !== null}
//                     helperText={errors.userId}
//                     label="User ID"
//                     required
//                     fullWidth
//                 />
 
//                 <FormControl sx={{ width: '100%', margin: '20px 0' }} variant="outlined">
//                     <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//                     <OutlinedInput
//                         id="outlined-adornment-password required"
//                         type={showPassword ? 'text' : 'password'}
//                         endAdornment={
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                     edge="end"
//                                 >
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         }
//                         label="Password"
//                         required
//                         value={password}
//                     onChange={handlePassword}
//                     error={errors.password !== null}
//                     helperText={errors.password}
                    
//                         fullWidth
//                     />
//                 </FormControl>
//                 <CardActionArea style={{ display: 'flex', justifyContent: 'space-around' }}>
//                     <Button type="submit" variant="contained" size="medium" color="primary" style={{ color: 'whitesmoke' }} onClick={handleSubmit} >
//                         Login
//                     </Button>
//                 </CardActionArea>
//             </CardContent>
//         </Card>
 
//     );
// }
 
// export default LoginPage;