import { Button, Card, Divider, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import profileImg from '../../assets/images/defaultProfile.png'
import { Edit } from "@mui/icons-material";
import MyTypography from "../../assets/themes/MyTypography";
import { Patient, Role, User } from "../../Classes/Classes";
import axios from "axios";
import { PopupForm } from "../Popup/PopupForm";
import { useNavigate } from 'react-router-dom';

export default function RegisterUser({ onClick, patientDetails = {}, formTitle, btnValue }) {

    console.log("Patient details : ", patientDetails);
    const navigate = useNavigate();
    const [patient, setPatient] = useState({});
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [age, setAge] = useState(patientDetails.age || 1);
    const [buttonValue, setButtonValue] = useState(btnValue || 'Admit');
    const [title, setTitle] = useState(formTitle || 'Register');
    const [open, setOpen] = useState(false);

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

        setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
        if (name === 'dob') {
            const age = calculateAge(value);
            setAge(age);
            setPatient((prevPatient) => ({ ...prevPatient, age: age }));
        }

    };

    function imageToByteArray(file) {
        // const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const byteArray = new Uint8Array(reader.result);
            //   console.log("byteArray : ", byteArray);
            return byteArray;
        };
        reader.onerror = () => {
            throw new Error('Error reading file');
        };
        reader.readAsArrayBuffer(file);
        return reader.onload;
    }

    const [user, setUser] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("patient: ", patient);
        let newPatient = {
            "patientId": "",
            "govtId": patient.govtId,
            "idType": patient.idType,
            "firstName": patient.firstName,
            "lastName": patient.lastName,
            "dob": patient.dob,
            "age": patient.age,
            "gender": patient.gender,
            "image": null,
            "contactNo": patient.contactNo,
            "emailId": patient.emailId,
            "address": patient.address,
            "user": {
                "userId": "",
                "password": Math.random() + "@1234",
                "role": {
                    "roleName": "PATIENT",
                    "roleDescription": "One who is under medication"
                }
            }
        }
        console.log("New Patient: ", newPatient);

        await axios.post("http://localhost:9090/patient/addPatient", newPatient)
            .then((response) => { console.log(response.data); setUser(response.data.user);; setOpen(true) });
    };

    const handleCancel = () => {
        onClick();
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <Card raised style={{ width: 700 }}>
                <div style={{ lineHeight: '60px', textAlign: 'center' }}>
                    <MyTypography variant="h3" >
                        {title} User
                    </MyTypography>
                </div>
                <br />

                <PopupForm
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Card>
                        User : {user.userId}
                        Password : {user.password}
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </Card>
                </PopupForm>

                <form>
                    <Grid container spacing={2} sx={10} >
                        <Grid item xs={3}>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                sx={{ display: "none" }}
                                id="image-input"
                                required
                            />
                            <label htmlFor="image-input">
                                <IconButton component="span" sx={{ position: 'absolute', top: '35%', left: '30%' }}>
                                    <Edit fontSize="small" />
                                </IconButton>
                            </label>
                            {imagePreview ? (
                                <img src={imagePreview} alt="Uploaded Image" width='90%' height='40%' />
                            ) : (
                                <img src={profileImg || patientDetails.image} alt="Default Profile Image" width='90%' height='40%' />
                            )}
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Govt Id"
                                variant="outlined"
                                name="govtId"
                                fullWidth
                                required
                                defaultValue={patientDetails.govtId}
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
                                defaultValue={patientDetails.firstName}
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
                                defaultValue={patientDetails.dob || '2024-07-17'}
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
                                    defaultValue={patientDetails.gender}
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
                                defaultValue={patientDetails.emailId}
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
                                    defaultValue={patientDetails.idType}
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
                                defaultValue={patientDetails.lastName}
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
                                value={age}
                                // defaultValue={patientDetails.age}
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
                                defaultValue={patientDetails.contactNo}
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
                                defaultValue={patientDetails.address}
                                onChange={handleChange}
                                error={errors.address ? true : false}
                                helperText={errors.contactNo}
                                sx={{ marginBottom: 2 }}
                            />
                        </Grid>
                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
                        <Button
                            sx={{
                                backgroundColor: 'grey.500',
                                '&:hover': {
                                    backgroundColor: 'grey.500',
                                },
                            }}
                            variant="contained"
                            size="small"
                            onClick={() => navigate("/login")}
                        > back </Button>
                        <Button type="submit" variant="contained" size="small" color="primary" onClick={handleSubmit} > Register </Button>
                    </div>
                </form>
            </Card >
        </div>
    )
}