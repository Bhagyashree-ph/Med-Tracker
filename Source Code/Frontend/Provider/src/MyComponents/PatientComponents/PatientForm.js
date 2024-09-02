import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Box, OutlinedInput, InputAdornment, IconButton, Autocomplete, Stepper, Step, StepLabel,
    TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Input, FormControl, Select, MenuItem,
    Chip,
    Grid,
    InputLabel,
    Backdrop,
    CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Doctor, Hospital, MedicationDetail, Patient, PrescriptionDetails, Reminder, Role, Status, User } from '../../Classes/Classes';
import MyTypography from '../../assets/themes/MyTypography';
import { Cancel } from '@mui/icons-material';
import profileImg from '../../assets/images/defaultProfile.png'
import { Edit } from "@mui/icons-material";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

const PatientForm = ({ onClick, preMed = [], formTitle, callBack }) => {

    const provider = JSON.parse(localStorage.getItem("provider"));
    console.log("Provider : ", provider);

    const [preMedDetails, setpreMedDetails] = useState(preMed || []);
    // console.log('preMed :', preMed);
    const [title, setTitle] = useState(formTitle || 'Register');
    const [patientDetails, setPatientDetails] = useState(preMed[0]?.prescriptionDetails?.patient || {});
    // console.log('patientDetails :', patientDetails);
    // const [patientId, setPatientId] = useState(preMed[0]?.prescriptionDetails?.patient?.patientId ?? '');
    const [ailment, setAilment] = useState(preMed[0]?.prescriptionDetails?.ailment ?? '');
    const [startDate, setStartDate] = useState(preMed[0]?.prescriptionDetails?.startDate ?? new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(preMed[0]?.prescriptionDetails?.endDate ?? new Date().toISOString().slice(0, 10));
    const [selectedHospital, setSelectedHospital] = React.useState(null);
    const [selectedDoctor, setSelectedDoctor] = React.useState(null);
    const steps = ['Patient Details', 'Prescription Details', 'Medication Details'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [patient, setPatient] = useState(patientDetails || {});
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [age, setAge] = useState(patientDetails.age || 1);
    const [presDoc, setPresDoc] = useState(null);
    const [docName, setDocName] = useState("Document");
    const [errors, setErrors] = useState({
        govtId: '', idType: '', firstName: '', lastName: '', dob: '', gender: '', contactNo: '', emailId: '', address: '',
        doctor: null, ailment: '', startDate: '', endDate: '', prescription: '',
        medicationName: '', quantity: '', refillThreshold: '', dosageTime: ''
    });
    const [begin, setbegin] = useState(false);

    const handleImageChange = (event, type) => {
        setErrors((prevErrors) => ({ ...prevErrors, prescription: `` }));
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (type === 'profile') {
                setImagePreview(reader.result);
                setImage(reader.result.split(',')[1]);
                setPatient((prevPatient) => ({ ...prevPatient, image: reader.result.split(',')[1] }));
            } else if (type === 'presc') {
                setPresDoc(reader.result.split(',')[1]);
                setDocName(file.name);
            }
        };
        reader.readAsDataURL(file);
    };
    // console.log("imagePreview : ", imagePreview);

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
        const { name, value } = event.target;

        setPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        if (name === 'dob') {
            const age = calculateAge(value);
            setAge(age);
            setPatient((prevPatient) => ({ ...prevPatient, age: age }));
        }

    };

    const [hospitals, setHospitals] = useState([]);

    // after api call of finding doctors by hospital id
    const [doctors, setDoctors] = useState([]);

    const handleHospitalUpdate = (data) => {
        setHospitals(data);
    }

    const handleDoctorUpdate = (data) => {
        setDoctors(data);
    }

    useEffect(() => {
        async function fetchDataa() {
            await axios.get("http://localhost:9093/provider/fetchAllHospitals")
                .then((response) => handleHospitalUpdate(response.data))
                .then(
                    await axios.get("http://localhost:9093/provider/fetchAllDoctors")
                        .then((res) => handleDoctorUpdate(res.data))
                        .catch(error => { console.error(error) })
                ).catch(error => {
                    console.error(error)
                }
                )
        }
        fetchDataa();
    }, [])

    const [prescription, setPrescription] = useState(
        preMed[0]?.prescriptionDetails ||
        new PrescriptionDetails(
            1709812,
            new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
            new Doctor("DOC001", "Dr. Ahmed Khan", "Cardiology",
                new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
            new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "Fever",
            "2022-01-01",
            "2022-01-31",
            "file",
            new Status("ACT", "Active")
        ));

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const validate = () => {
        let isValid = true;
        console.log("Validate..");
        if (activeStep === 0) {
            if (patient.idType) {
                if (patient.idType === 'Pan Card') {
                    if (patient.govtId) {
                        if (patient.govtId.length < 10) {
                            setErrors((prevErrors) => ({ ...prevErrors, govtId: `${patient.idType} cannot be less than 10 characters.` }));
                            isValid = false;
                        } else if (patient.govtId.length > 10) {
                            setErrors((prevErrors) => ({ ...prevErrors, govtId: `${patient.idType} cannot be more than 10 characters.` }));
                            isValid = false;
                        } else if ((new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).test(patient.govtId) == false)) {
                            setErrors((prevErrors) => ({ ...prevErrors, govtId: `${patient.idType} Should contain 5 letters 4 numbers and 1 letter.` }));
                            isValid = false;
                        }
                    } else {
                        setErrors((prevErrors) => ({ ...prevErrors, govtId: `Please enter Govt. ID` }));
                        isValid = false;
                    }
                } else {
                    if (patient.govtId) {
                        if (patient.govtId.length < 14) {
                            setErrors((prevErrors) => ({ ...prevErrors, govtId: `${patient.idType} cannot be less than 14 characters.` }));
                            isValid = false;
                        } else if (patient.govtId.length > 14) {
                            setErrors((prevErrors) => ({ ...prevErrors, govtId: `${patient.idType} cannot be more than 14 characters.` }));
                            isValid = false;
                        } else if ((new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/).test(patient.govtId) == false)) {
                            setErrors((prevErrors) => ({ ...prevErrors, govtId: `${patient.idType} Should contain 12 numbers in the format "XXXX XXXX XXXX"` }));
                            isValid = false;
                        }
                    } else {
                        setErrors((prevErrors) => ({ ...prevErrors, govtId: `Please enter Govt. ID` }));
                        isValid = false;
                    }
                }
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, idType: `Please select id type` }));
                isValid = false;
            }
            if (!patient.firstName) {
                setErrors((prevErrors) => ({ ...prevErrors, firstName: `Please Enter your firstname` }));
                isValid = false;
            }
            if (!patient.gender) {
                setErrors((prevErrors) => ({ ...prevErrors, gender: `Please choose your gender.` }));
                isValid = false;
            }
            if (!patient.contactNo || (new RegExp(/^\+91\s\d{10}$/).test(patient.contactNo) == false)) {
                setErrors((prevErrors) => ({ ...prevErrors, contactNo: `Please enter a valid mobile Number(Ex: +91 XXXXXXXXXX).` }));
                isValid = false;
            }
            if (!patient.emailId || (new RegExp(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(patient.emailId) == false)) {
                setErrors((prevErrors) => ({ ...prevErrors, emailId: `Please enter a valid EmailId(Ex: abc@gmail.com).` }));
                isValid = false;
            }
            if (!patient.address) {
                setErrors((prevErrors) => ({ ...prevErrors, address: `Please enter your address.` }));
                isValid = false;
            }
        } else if (activeStep === 1) {
            if (!selectedDoctor) {
                setErrors((prevErrors) => ({ ...prevErrors, doctor: `Please select doctor name` }));
                isValid = false;
            }
            if (!ailment) {
                setErrors((prevErrors) => ({ ...prevErrors, ailment: `Please enter the ailment` }));
                isValid = false;
            }
            if (!startDate) {
                setErrors((prevErrors) => ({ ...prevErrors, startDate: `Please select start date` }));
                isValid = false;
            }
            if (!endDate) {
                setErrors((prevErrors) => ({ ...prevErrors, endDate: `Please select end date` }));
                isValid = false;
            }
            if (!presDoc) {
                setErrors((prevErrors) => ({ ...prevErrors, prescription: `Please select a file` }));
                isValid = false;
            }
        }
        return isValid;
    }

    const handleNext = () => {
        const isValid = validate();
        console.log("Is valid..", isValid);
        if (isValid) {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [times, setTimes] = useState([
        {
            id: 1,
            value: '2022-07-25T08:00:00.000-05:00',
            label: '8:00:00 AM'
        },
        {
            id: 2,
            value: '2022-07-25T12:00:00.000-05:00',
            label: '12:00:00 PM'
        },
        {
            id: 3,
            value: '2022-07-25T16:00:00.000-05:00',
            label: '4:00:00 PM'
        },
        {
            id: 4,
            value: '2022-07-25T20:00:00.000-05:00',
            label: '8:00:00 PM'
        }
    ]);

    const [selectedTimes, setSelectedTimes] = useState([]);

    const handleSelectChange = (event, index) => {
        const { value } = event.target;
        setErrors((prevErrors) => ({ ...prevErrors, dosageTime: `` }));
        setTableData((prevData) => {
            const newRow = { ...prevData[index] };
            newRow.dosageTime = [...newRow.dosageTime, value];
            return [...prevData.slice(0, index), newRow, ...prevData.slice(index + 1)];
        });

    };

    const handleDelete = (timeId, rowIndex) => {
        setTableData((prevData) => {
            const newRow = { ...prevData[rowIndex] };
            newRow.dosageTime = newRow.dosageTime.filter((time) => time.id !== timeId);
            return [...prevData.slice(0, rowIndex), newRow, ...prevData.slice(rowIndex + 1)];
        });
    };

    const handleCancel = () => {
        onClick();
    }

    const [tableData, setTableData] = useState([
        { medicationName: '', pharmacyName: '', quantity: 0, refillThreshold: 0, dosageTime: [] }
    ]);

    const handleTextFieldChange = (event, index, columnName) => {
        setErrors((prevErrors) => ({ ...prevErrors, [event.target.name]: `` }));
        const { value } = event.target;
        setTableData((prevData) => {
            const newRow = { ...prevData[index] };
            newRow[columnName] = value;
            return [...prevData.slice(0, index), newRow, ...prevData.slice(index + 1)];
        });
    };

    // console.log("patient : ", patient);
    const createPreMed = async () => {
        setbegin(true);
        console.log("Create premed");
        const preMedArray = new Array();
        tableData.map((data, i) => {
            preMedArray.push(
                {
                    "mappingId": 321341 + i,
                    "medicationDetails": {
                        "medicationId": 94420,
                        "medicationName": data.medicationName,
                        "quantity": data.quantity,
                        "refillThreshold": data.refillThreshold,
                        "pharmacies": {
                            "address": "Delhi",
                            "contactNo": "011-23456789",
                            "pharmacyId": "P001",
                            "pharmacyName": "Aarogya Pharmacy",
                            "users": {
                                "userId": "U002",
                                "password": "password@123",
                                "role": {
                                    "roleName": "PHARMACIST",
                                    "roleDescription": "One who refills medication"
                                }
                            }
                        }
                    },
                    "prescriptionDetails": {
                        "prescriptionId": 198359,
                        "ailment": ailment,
                        "endDate": endDate,
                        "prescription": presDoc,
                        "startDate": startDate,
                        "status": {
                            "statusCode": "ACT",
                            "statusLabel": "Active"
                        },
                        "patient": {
                            "patientId": "",
                            "govtId": patient.govtId,
                            "idType": patient.idType,
                            "firstName": patient.firstName,
                            "lastName": patient.lastName,
                            "dob": patient.dob,
                            "age": patient.age,
                            "gender": patient.gender,
                            "image": patient.image,
                            "contactNo": patient.contactNo,
                            "emailId": patient.emailId,
                            "address": patient.address,
                            "user": {
                                "userId": "",
                                "password": patient.firstName + "@1234",
                                "role": {
                                    "roleName": "PATIENT",
                                    "roleDescription": "One who is under medication"
                                }
                            }
                        },
                        "doctor": selectedDoctor,
                        "hospital": provider.hospitalId
                    }
                }
            )

            if (preMedArray.length >= 1) {
                setpreMedDetails(preMedArray);
            }

        })


        console.log("preMedDetails.. : ", preMedArray);

        const reminders = new Array();
        let i = 23456;
        const returnedObj = await axios.post("http://localhost:9093/provider/addPatientDetails", preMedArray)
            .then((response) => {
                console.log("Returned premed : ", response.data);
                setpreMedDetails(response.data);
                response.data.map((resp) => {
                    tableData.map((data) => {
                        data.dosageTime.map((time) => {
                            if (resp.medicationDetails.medicationName.toLowerCase() === data.medicationName.toLowerCase()) {
                                const newReminder = {
                                    // "reminderId": i+=1,
                                    "medicationDetail": resp.medicationDetails,
                                    "patient": resp.prescriptionDetails.patient,
                                    "remindOn": time.value
                                }
                                reminders.push(newReminder);
                            }
                        })
                    })
                })
                console.log("Inside then of first apii");
                axios.post("http://localhost:9093/provider/setReminders", reminders)
                    .then((resp) => {
                        console.log("Returned reminder : ", resp.data);
                        callBack(resp.status, response.data);
                        setbegin(false);
                        return resp.data;
                    })
                    .catch((error) => console.error(error))

            })
            .catch((error) => console.error(error));
    }

    const handleSubmit = () => {

        console.log("Selected hospital : ", selectedHospital);
        console.log("selected doctor : ", selectedDoctor);

        let isValid = true;
        if (tableData.length > 0) {
            tableData.map((data) => {
                if (!data.medicationName) {
                    setErrors((prevErrors) => ({ ...prevErrors, medicationName: 'Please enter medication name.' }));
                    isValid = false;
                }
                if (!data.pharmacyName) {
                    setErrors((prevErrors) => ({ ...prevErrors, pharmacyName: 'Please enter Pharmacy Name' }));
                    isValid = false;
                }
                if (!data.quantity) {
                    setErrors((prevErrors) => ({ ...prevErrors, quantity: 'Please enter available quantity.' }));
                    isValid = false;
                    // }else if(typeof data.quantity !== 'number') {
                    //     setErrors((prevErrors) => ({ ...prevErrors, quantity: `Please enter valid number` }));
                    //     isValid = false;
                }
                if (!data.refillThreshold) {
                    setErrors((prevErrors) => ({ ...prevErrors, refillThreshold: 'Please enter refill threshold.' }));
                    isValid = false;
                    if (data.quantity < data.refillThreshold) {
                            setErrors((prevErrors) => ({ ...prevErrors, refillThreshold: `Refill Threshold cannot be more than quantity.` }));
                            isValid = false;
                        }
                }
                if (data.dosageTime.length <= 0) {
                    setErrors((prevErrors) => ({ ...prevErrors, dosageTime: 'Please select a dosage time.' }));
                    isValid = false;
                }
            })
        }

        // if (isValid) {
            createPreMed();
        // }
    };

    // console.log("preMed : ", preMed);


    // console.log("Table data : ", tableData);

    return (
        <Box sx={{ p: 1, width: 800, height: 750 }}>
            <div style={{ lineHeight: '40px', textAlign: 'center', position: 'sticky' }}>
                <MyTypography variant="h3" >
                    {title} Patient Details
                </MyTypography>
            </div>

            <Backdrop
                sx={{ color: '#fff', display: 'inline-block', textAlign: 'center', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={begin}
            >
                
                <CircularProgress size="60px" color="inherit" /> <br/>
                <MyTypography variant="h6" color="white"> LOADING... </MyTypography>
            </Backdrop>

            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} sx={{ height: '50px', position: 'sticky' }}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {
                    (activeStep === 0) ? (
                        <div style={{ height: 350 }}>
                            <form>
                                <Grid container spacing={2} sx={10} >
                                    <Grid item xs={3}>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => handleImageChange(event, 'profile')}
                                            sx={{ display: "none" }}
                                            id="image-input"
                                            required
                                        />
                                        <label htmlFor="image-input">
                                            <IconButton component="span" sx={{ position: 'absolute', top: '40%', left: '15%' }}>
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
                                            errors={errors.govtId}
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
                                            defaultValue={patientDetails.dob || new Date().toISOString().slice(0, 10)}
                                            onChange={handleChange}
                                            error={errors.dob ? true : false}
                                            helperText={errors.dob}
                                            sx={{ marginBottom: 2 }}
                                            inputProps={{ min: "1950-01-01", max: new Date().toISOString().slice(0, 10) }}
                                        />
                                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                            <InputLabel id="gender" required>Gender</InputLabel>
                                            <Select
                                                labelId="gender"
                                                id="gender"
                                                name="gender"
                                                label="Gender"
                                                error={errors.gender}
                                                defaultValue={patientDetails.gender}
                                                onChange={handleChange}
                                            >
                                                <MenuItem defaultChecked={patientDetails.gender === 'Male' || ''} value={'Male'}>Male</MenuItem>
                                                <MenuItem defaultChecked={patientDetails.gender === 'Female' || ''} value={'Female'}>Female</MenuItem>
                                                <MenuItem defaultChecked={patientDetails.gender === 'Other' || ''} value={'Other'}>Other</MenuItem>
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
                                                error={errors.idType}
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
                                            helperText={errors.address}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    ) : (activeStep === 1) ? (
                        <div>
                            {/* <TextField
                                label="Patient ID"
                                defaultValue={patientId}
                                fullWidth
                                required
                                onChange={(event) => setPatientId(event.target.value)}
                                margin="normal"
                                sx={{ marginBottom: 2 }}
                            /> */}

                            {/* <Autocomplete
                                disablePortal
                                id="hospital"
                                options={hospitals}
                                fullWidth
                                required
                                sx={{ marginBottom: 2 }}
                                defaultValue={preMed[0]?.prescriptionDetails?.hospital?.hospitalName ?? ''}
                                renderInput={(params) => <TextField required {...params} label="Prescribed At" />}
                                getOptionLabel={(option) => option.hospitalName}
                                value={selectedHospital}
                                onChange={(event, newValue) => {
                                    setSelectedHospital(newValue);
                                }}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        {option.hospitalName}
                                    </li>
                                )}
                            /> */}

                            <Autocomplete
                                disablePortal
                                id="hospital"
                                options={doctors}
                                fullWidth
                                required
                                sx={{ marginBottom: 2 }}
                                onError={errors.doctor}
                                renderInput={(params) => <TextField {...params} required label="Prescribed By" />}
                                getOptionLabel={(option) => option.doctorName}
                                value={selectedDoctor}
                                onChange={(event, newValue) => {
                                    setSelectedDoctor(newValue);
                                    setErrors((prevErrors) => ({ ...prevErrors, doctor: `` }));
                                }}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        {option.doctorName}
                                    </li>
                                )}
                            />
                            <MyTypography variant='body1' color='red'>{errors.doctor}</MyTypography>

                            <TextField
                                label="Ailment"
                                value={ailment}
                                fullWidth
                                required
                                error={errors.ailment ? true : false}
                                helperText={errors.ailment}
                                sx={{ marginBottom: 2 }}
                                onChange={(event) => {
                                    setAilment(event.target.value);
                                    setErrors((prevErrors) => ({ ...prevErrors, ailment: `` }));
                                }}
                            />

                            <TextField
                                label="Start Date"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                                type="date"
                                fullWidth
                                required
                                error={errors.startDate ? true : false}
                                helperText={errors.startDate}
                                sx={{ marginBottom: 2 }}
                                inputProps={{ min: "2024-01-01", max: new Date().toISOString().slice(0, 10) }}
                            />
                            {console.log("startDate : ", startDate)}
                            <TextField
                                label="End Date"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                                type="date"
                                fullWidth
                                required
                                defaultValue={startDate}
                                error={errors.endDate ? true : false}
                                helperText={errors.endDate}
                                sx={{ marginBottom: 2 }}
                                inputProps={{ min: startDate }}
                            />

                            <Button
                                variant="contained"
                                component="label"
                                startIcon={<CloudUploadIcon />}
                                sx={{ marginBottom: 2 }}
                            >
                                Upload Prescription
                                <input
                                    type="file"
                                    hidden
                                    onChange={(event) => handleImageChange(event, 'presc')}
                                    onError={errors.prescription}
                                />
                            </Button> <MyTypography variant="body1" color="red"> {errors.prescription} </MyTypography> <br />
                            {
                                (presDoc) &&
                                <MyTypography variant="body1"> {docName} Uploaded </MyTypography>
                            }

                            {console.log("Presc : ", presDoc)}
                            {console.log("Profile : ", patient.image)}
                        </div>

                    ) : (
                        <div>
                            <IconButton
                                style={{ fontSize: 20, backgroundColor: '#5cb85c', height: 27, width: 27, color: 'whitesmoke' }}
                                onClick={() => { setTableData(prevData => [...prevData, { medicationName: '', pharmacyName: '', quantity: '', refillThreshold: '', dosageTime: [] },]) }}
                            >
                                <AddIcon />
                            </IconButton>

                            <div style={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer style={{ height: '400px' }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sl No</TableCell>
                                                <TableCell>Medication Name</TableCell>
                                                {/* <TableCell>Pharmacy Name</TableCell> */}
                                                <TableCell>Quantity Available</TableCell>
                                                <TableCell>Refill Threshold</TableCell>
                                                <TableCell>Dosage Time</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tableData.map((row, i) => (
                                                <TableRow key={i}>
                                                    <TableCell> {i + 1} </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            name='medicationName'
                                                            variant='standard'
                                                            fullWidth
                                                            error={errors.medicationName ? true : false}
                                                            helperText={errors.medicationName}
                                                            InputProps={{ disableUnderline: true }}
                                                            defaultValue={preMed[i]?.medicationDetails?.medicationName ?? ''}
                                                            onChange={(event) => { handleTextFieldChange(event, i, 'medicationName') }}
                                                        />
                                                        {/* {console.log("Medication name : ", tableData)} */}
                                                    </TableCell>
                                                    {/* <TableCell>
                                                        <TextField
                                                            name='pharmacyName'
                                                            variant='standard'
                                                            fullWidth
                                                            defaultValue={preMed[i]?.medicationDetails?.pharmacies?.pharmacyName ?? ''}
                                                            onChange={(event) => { handleTextFieldChange(event, i, 'pharmacyName') }}
                                                        />
                                                    </TableCell> */}
                                                    <TableCell>
                                                        <TextField
                                                            name='quantity'
                                                            variant='standard'
                                                            fullWidth
                                                            error={errors.quantity ? true : false}
                                                            helperText={errors.quantity}
                                                            InputProps={{ disableUnderline: true }}
                                                            defaultValue={preMed[i]?.medicationDetails?.quantity ?? ''}
                                                            onChange={(event) => { handleTextFieldChange(event, i, 'quantity') }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            name='refillThreshold'
                                                            variant='standard'
                                                            fullWidth
                                                            error={errors.refillThreshold ? true : false}
                                                            helperText={errors.refillThreshold}
                                                            InputProps={{ disableUnderline: true }}
                                                            defaultValue={preMed[i]?.medicationDetails?.refillThreshold ?? ''}
                                                            onChange={(event) => { handleTextFieldChange(event, i, 'refillThreshold') }}
                                                        />
                                                    </TableCell>
                                                    <TableCell width='300px' height='60px'>
                                                        <div style={{ marginBottom: 10 }}>
                                                            <FormControl fullWidth style={{ marginBottom: 10 }}>
                                                                <Select
                                                                    value={row.dosageTime}
                                                                    onChange={(event) => handleSelectChange(event, i)}
                                                                    // onChange={handleSelect}
                                                                    fullWidth
                                                                    style={{ height: 40 }}
                                                                    error={errors.dosageTime ? true : false}
                                                                >
                                                                    {/* {console.log(selected)} */}
                                                                    {times.map((time) => (
                                                                        <MenuItem key={time.id} value={time}>
                                                                            {time.label}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                            {/* {console.log('selectedTimes : ', selectedTimes)} */}
                                                            {row.dosageTime.map((time) => (
                                                                <Chip
                                                                    key={time.id}
                                                                    label={time.label}
                                                                    onDelete={() => handleDelete(time.id, i)}
                                                                    deleteIcon={<Cancel />}
                                                                />
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    )}
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <MyTypography sx={{ mt: 2, mb: 1 }} variant="h6">
                            Prescription has been registered!
                        </MyTypography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                                style={{ fontSize: '14px' }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} style={{ fontSize: '14px' }} disabled={activeStep === steps.length - 1} >
                                {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                                Next
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>

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
                    onClick={handleCancel}
                > Cancel </Button>
                {
                    (activeStep === steps.length - 1) &&
                    <Button type="submit" variant="contained" size="small" color="primary" onClick={handleSubmit} > Prescribe </Button>
                }
            </div>

        </Box>

    );
}

export default PatientForm;
