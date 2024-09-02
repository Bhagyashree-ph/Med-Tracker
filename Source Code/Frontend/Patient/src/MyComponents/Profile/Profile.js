import { Box, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Tooltip } from '@mui/material';
import MyAvatar from '../Avatar/MyAvatar';
import MyTypography from '../../assets/themes/MyTypography'
import React, { useEffect, useState } from 'react';
import TabPanel from '@mui/lab/TabPanel';
import { TabContext, TabList } from '@mui/lab';
import AppBarComponent from '../NavBar/Appbar';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import PlaceIcon from '@mui/icons-material/Place';

function ProfilePage() {

    const [errors, setErrors] = useState({});

    const [age, setAge] = useState(1);

    // const patient = localStorage.getItem("patient");
    const currPat =
        (localStorage.getItem("patient"))

    const [patient, setPatient] = useState(
        JSON.parse(localStorage.getItem("patient"))
    )

    console.log("patient : ", (patient), typeof patient);

    const [value, setValue] = React.useState(1);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
        if (name === 'dob') {
            const age = calculateAge(value);
            setAge(age);
        }

    };

    return (
        <AppBarComponent>
            <div style={{ padding: '10px' }}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Card raised style={{ width: '250px', height: '500px', borderRadius: '15px', marginLeft: 20 }}>
                            <CardContent>
                                <div style={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <MyAvatar
                                            name={patient.firstName + ' ' + patient.lastName}
                                            image={patient.image ? `data:image/jpeg;base64,${patient.image}` : null}
                                            sx={{ height: 80, width: 80, fontSize: 25 }}
                                        />
                                    </div>
                                    <MyTypography variant="body2" style={{ margin: 10 }} >
                                        {patient.firstName + ' ' + patient.lastName}
                                    </MyTypography>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '30px', marginTop: '15px' }}>
                                    <MyTypography variant="h6" weight='100' > <PhoneIcon/> &nbsp; {patient.contactNo} </MyTypography>
                                    <MyTypography variant="h6" weight='100' > <MailIcon/> &nbsp; {patient.emailId} </MyTypography>
                                    <MyTypography variant="h6" weight='100' > <PlaceIcon/> &nbsp; {patient.address} </MyTypography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card raised style={{ width: '850px', height: '500px', borderRadius: '15px' }}>
                            <CardContent>
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                            <Tab label="User Details" value={1} />
                                            {/* <Tab label="Reports" value={2} /> */}
                                        </TabList>
                                    </Box>
                                    <TabPanel value={1}>
                                        <Grid container spacing={2} sx={10} >
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Govt Id"
                                                    variant="outlined"
                                                    name="govtId"
                                                    fullWidth
                                                    required
                                                    disabled
                                                    defaultValue={patient.govtId}
                                                    onChange={handleChange}
                                                    error={errors.govtId ? true : false}
                                                    helperText={errors.govtId}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                                <TextField
                                                    label="First Name"
                                                    variant="outlined"
                                                    name="firstName"
                                                    fullWidth
                                                    required
                                                    disabled
                                                    defaultValue={patient.firstName}
                                                    onChange={handleChange}
                                                    error={errors.firstName ? true : false}
                                                    helperText={errors.firstName}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                                <TextField
                                                    label="Date of Birth"
                                                    variant="outlined"
                                                    name="dob"
                                                    type="date"
                                                    fullWidth
                                                    required
                                                    disabled
                                                    defaultValue={patient.dob || '2024-07-17'}
                                                    onChange={handleChange}
                                                    error={errors.dob ? true : false}
                                                    helperText={errors.dob}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                                    <InputLabel id="gender" required>Gender</InputLabel>
                                                    <Select
                                                        labelId="gender"
                                                        id="gender"
                                                        name="gender"
                                                        label="Gender"
                                                        disabled
                                                        defaultValue={patient.gender}
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value={'Male'}>Male</MenuItem>
                                                        <MenuItem value={'Female'}>Female</MenuItem>
                                                        <MenuItem value={'Other'}>Other</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    label="Email"
                                                    variant="outlined"
                                                    name="emailId"
                                                    fullWidth
                                                    required
                                                    disabled
                                                    defaultValue={patient.emailId}
                                                    onChange={handleChange}
                                                    error={errors.emailId ? true : false}
                                                    helperText={errors.emailId}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                                    <InputLabel id="idType" required>ID Type</InputLabel>
                                                    <Select
                                                        labelId="idType"
                                                        id="idType"
                                                        name="idType"
                                                        label="ID Type"
                                                        disabled
                                                        defaultValue={patient.idType}
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value={'Aadhar card'}>Aadhar card</MenuItem>
                                                        <MenuItem value={'Pan Card'}>Pan Card</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    label="Last Name"
                                                    variant="outlined"
                                                    name="lastName"
                                                    fullWidth
                                                    disabled
                                                    defaultValue={patient.lastName}
                                                    onChange={handleChange}
                                                    error={errors.lastName ? true : false}
                                                    helperText={errors.lastName}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                                <TextField
                                                    label="Age"
                                                    variant="outlined"
                                                    name="age"
                                                    fullWidth
                                                    required
                                                    disabled
                                                    defaultValue={patient.age}
                                                    onChange={handleChange}
                                                    error={errors.age ? true : false}
                                                    helperText={errors.age}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                                <TextField
                                                    label="Contact Number"
                                                    variant="outlined"
                                                    name="contactNo"
                                                    fullWidth
                                                    required
                                                    disabled
                                                    defaultValue={patient.contactNo}
                                                    onChange={handleChange}
                                                    error={errors.contactNo ? true : false}
                                                    helperText={errors.contactNo}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                                <TextField
                                                    label="Address"
                                                    variant="outlined"
                                                    name="address"
                                                    fullWidth
                                                    required
                                                    multiline
                                                    spellCheck
                                                    maxRows={4}
                                                    disabled
                                                    defaultValue={patient.address}
                                                    onChange={handleChange}
                                                    error={errors.address ? true : false}
                                                    helperText={errors.contactNo}
                                                    sx={{ marginBottom: 2 }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={2}>
                                        Item Two
                                    </TabPanel>
                                </TabContext>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </AppBarComponent>
    )
}

export default ProfilePage;