import { Button, Divider, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import profileImg from '../../assets/images/defaultProfile.png'
import { Edit } from "@mui/icons-material";
import MyTypography from "../../assets/themes/MyTypography";

function PatientForm() {

    const [patient, setPatient] = useState({});
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [fullName, setFullName] = useState({
        firstName: '',
        lastName: ''
    });
    const [age, setAge] = useState(1);
    const [buttonValue, setButtonValue] = useState('Admit');
    const [title, setTitle] = useState('Register');

    const handleImageChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        setPatient((prevPatient) => ({ ...prevPatient, image: file }));
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
        if (name === 'firstName' || name === 'lastName') {
            setFullName((prevFullName) => ({ ...prevFullName, [name]: value }));
        } else {
            setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
            if (name === 'dob') {
                const age = calculateAge(value);
                setAge(age);
            }
        }
        if (fullName) {
            setPatient((prevPatient) => ({ ...prevPatient, patientName: (fullName.firstName + " " + fullName.lastName) }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(patient);
        // You can then send the newPatient object to your server-side API
    };

    return (
        <div>
            <div style={{lineHeight: '60px'}}>
            <MyTypography variant="h3"  style={{ margin: 500 }} >
                {title} Patient Details
            </MyTypography>
            </div>
            <Divider></Divider>
            <br />
            <form>
                <Grid container spacing={2} sx={10} >
                    <Grid item xs={2}>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            sx={{ display: "none" }}
                            id="image-input"
                            required
                        />
                        <label htmlFor="image-input">
                            <IconButton component="span" sx={{ position: 'absolute', top: '36%', left: '7%' }}>
                                <Edit fontSize="small" />
                            </IconButton>
                        </label>
                        {imagePreview ? (
                            <img src={imagePreview} alt="Uploaded Image" width='60%' height='40%' />
                        ) : (
                            <img src={profileImg} alt="Default Profile Image" width='60%' height='40%' />
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Govt Id"
                            variant="outlined"
                            name="govtId"
                            fullWidth
                            required
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
                            onChange={handleChange}
                            error={errors.firstName ? true : false}
                            helperText={errors.firstName}
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="Date of Birth"
                            variant="outlined"
                            name="dob"
                            fullWidth
                            required
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
                            onChange={handleChange}
                            error={errors.emailId ? true : false}
                            helperText={errors.emailId}
                            sx={{ marginBottom: 2 }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="idType" required>ID Type</InputLabel>
                            <Select
                                labelId="idType"
                                id="idType"
                                name="idType"
                                label="ID Type"
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
                            defaultValue={1}
                            value={age}
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
                            onChange={handleChange}
                            error={errors.address ? true : false}
                            helperText={errors.contactNo}
                            sx={{ marginBottom: 2 }}
                        />
                    </Grid>
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        sx={{
                            backgroundColor: 'grey.500',
                            '&:hover': {
                                backgroundColor: 'grey.500',
                            },
                        }}
                        variant="contained"
                        size="small"
                    > Cancel </Button>
                    <Button type="submit" variant="contained" size="small" color="primary" onClick={handleSubmit} > {buttonValue} </Button>
                </div>
            </form>
        </div >
    )
}

export default PatientForm;