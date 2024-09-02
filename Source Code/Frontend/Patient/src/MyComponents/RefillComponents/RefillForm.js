import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Patient, Prescription, RefillRequest, Role, User } from "../../Classes/Classes";
import { useEffect, useState } from "react";
import MyTypography from "../../assets/themes/MyTypography";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import moment from "moment";

function RefillForm({ onClick }) {


    const patient = JSON.parse(localStorage.getItem("patient"));
    console.log("Patient : ", patient);

    const [errors, setErrors] = useState({
        refillType: '',
        medicationName: '',
        refillQuantity: '',
        prescriptionId: '',
    });

    const [selectedType, setSelectedType] = useState("Prescription")
    const [showMedField, setShowMedField] = useState(false);
    const [prescriptions, setPrescriptions] = useState([
        { "prescriptionId": 1354, "ailment": "Fever", "endDate": "2022-01-10", "prescription": null, "startDate": "2022-01-01", "status": { "statusCode": "ACT", "statusLabel": "Active" }, "patient": { "patientId": "P001", "govtId": "G001", "idType": "Aadhar Card", "firstName": "John", "lastName": "Doe", "dob": "1990-01-01", "age": 32, "gender": "Male", "image": null, "contactNo": "123-456-7890", "emailId": "johndoe@example.com", "address": "123 Main St", "user": { "userId": "U0014", "password": "password123", "role": { "roleName": "PATIENT", "roleDescription": "One who is under medication" } } }, "hospital": { "address": "Delhi", "contactNo": "011-23456789", "hospitalId": "H001", "hospitalName": "Apollo Hospital" }, "doctor": { "doctorId": "D001", "doctorName": "Dr. Rohan Patel", "specialization": "Cardiologist", "hospital": { "address": "Delhi", "contactNo": "011-23456789", "hospitalId": "H001", "hospitalName": "Apollo Hospital" } } }
    ])
    const [selectedPrescription, setSelectedPrescription] = useState(null)
    const [selectedMedication, setSelectedMedication] = useState(null)
    const [preMed, setPreMed] = useState([
        { "mappingId": 1368, "medicationDetails": { "medicationId": 1, "medicationName": "Paracetamol", "quantity": 100, "refillThreshold": 20, "pharmacies": { "address": "Delhi", "contactNo": "011-23456789", "pharmacyId": "P001", "pharmacyName": "MedPlus Pharmacy", "users": { "userId": "U004", "password": "password123", "role": { "roleName": "PHARMACIST", "roleDescription": "One who refills medication" } } } }, "prescriptionDetails": { "prescriptionId": 1, "ailment": "Fever", "endDate": "2022-01-10", "prescription": null, "startDate": "2022-01-01", "status": { "statusCode": "ACT", "statusLabel": "Active" }, "patient": { "patientId": "P001", "govtId": "G001", "idType": "Aadhar Card", "firstName": "John", "lastName": "Doe", "dob": "1990-01-01", "age": 32, "gender": "Male", "image": null, "contactNo": "123-456-7890", "emailId": "johndoe@example.com", "address": "123 Main St", "user": { "userId": "U0014", "password": "password123", "role": { "roleName": "PATIENT", "roleDescription": "One who is under medication" } } }, "hospital": { "address": "Delhi", "contactNo": "011-23456789", "hospitalId": "H001", "hospitalName": "Apollo Hospital" }, "doctor": { "doctorId": "D001", "doctorName": "Dr. Rohan Patel", "specialization": "Cardiologist", "hospital": { "address": "Delhi", "contactNo": "011-23456789", "hospitalId": "H001", "hospitalName": "Apollo Hospital" } } } }
    ]);

    const handleRefillTypeChange = (event) => {
        setErrors((prevErrors) => ({ ...prevErrors, refillType: '' }));
        const { value } = event.target;
        setSelectedType(value);
        if (value === 'Medication')
            setShowMedField(true)
        else
            setShowMedField(false)
    }

    const [prescriptionId, setPrescriptionId] = useState(0);
    const [medicationId, setMedicationId] = useState(0);
    const [refillQuantity, setRefillQuantity] = useState(1);

    const formatDate = (dateString) => {
        const date = moment(dateString, 'MM/DD/YYYY, h:mm:ss A');
        console.log(date.toISOString());
        return date.toISOString();
    };

    const sendRequest = async () => {
        const refill = {
            "refillRequestId": '',
            "comments": "",
            "fulfilledOn": null,
            "refillQuantity": refillQuantity,
            "requestedOn": formatDate(new Date().toLocaleString()),
            "requestType": selectedType,
            "medicationDetails": selectedMedication,
            "status": {
                "statusCode": "PEND",
                "statusLabel": "Pending"
            },
            "prescriptionDetails": selectedPrescription,
            "user": null,
            "patient": patient
        }
        console.log("refill : ", refill);
        await axios.post("http://localhost:9090/patient/sendRequest", refill)
            .then((res) => {
                console.log(res.data);
                if (res.data !== null)
                    onClick();
            })
            .catch((error) => console.error(error))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValid = true;
        if (!selectedType) {
            setErrors((prevErrors) => ({ ...prevErrors, refillType: 'Please select a refill type.' }));
            isValid = false;
        }

        if (showMedField) {
            if (!selectedMedication) {
                setErrors((prevErrors) => ({ ...prevErrors, medicationName: 'Please select a medication.' }));
                isValid = false;
            }
            if (!refillQuantity || refillQuantity <= 0) {
                setErrors((prevErrors) => ({ ...prevErrors, refillQuantity: 'Please enter a valid refill quantity.' }));
                isValid = false;
            }
        } else {
            if (!selectedPrescription) {
                setErrors((prevErrors) => ({ ...prevErrors, prescriptionId: 'Please select a prescription.' }));
                isValid = false;
            }
        }
        if (isValid) {
            sendRequest();
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get("http://localhost:9090/patient/fetchAllMappings/" + patient.patientId)
                    .then((response) => setPreMed(response.data))
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        setPrescriptions([...new Set(preMed.map(item => JSON.stringify(item.prescriptionDetails)))].map(item => JSON.parse(item)))
    }, [preMed]);

    console.log("preMed", preMed);
    console.log("Presc : ", prescriptions);

    return (
        <div style={{ width: 400 }}>
            <div style={{ padding: 10 }}>
                <div style={{ lineHeight: '60px', textAlign: 'center' }}>
                    <MyTypography variant="h3" >
                        Request Refill
                    </MyTypography>
                </div>

                <form>
                    <TextField
                        disabled
                        fullWidth
                        required
                        label='Patient ID'
                        name="patientId"
                        defaultValue={patient.patientId}
                        sx={{ marginBottom: 2 }}
                    />
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel required> Refill Type </InputLabel>
                        <Select
                            id="refillType"
                            name="refillType"
                            fullWidth
                            required
                            label="Refill Type"
                            defaultValue="Prescription"
                            onChange={handleRefillTypeChange}
                        >
                            <MenuItem value={'Prescription'}> Prescription </MenuItem>
                            <MenuItem value={'Medication'}> Medication  </MenuItem>
                        </Select>
                        {errors.refillType && <MyTypography variant="body1" color="red"> {errors.refillType} </MyTypography>}
                    </FormControl>
                    {
                        showMedField ? (
                            <>

                                <Autocomplete
                                    disablePortal
                                    id="premed"
                                    options={preMed}
                                    fullWidth
                                    required
                                    sx={{ marginBottom: 2 }}
                                    renderInput={(params) => <TextField required {...params} label="Medicatoin Name" />}
                                    getOptionLabel={(option) => option.medicationDetails?.medicationId}
                                    value={selectedMedication}
                                    onChange={(event, newValue) => {
                                        setSelectedMedication(newValue?.medicationDetails);
                                        setErrors((prevErrors) => ({ ...prevErrors, medicationName: '.' }));
                                    }}
                                    renderOption={(props, option) => (
                                        <li {...props}>
                                            {option.medicationDetails.medicationId} - {option.medicationDetails.medicationName}
                                        </li>
                                    )}
                                />
                                {errors.medicationName && <MyTypography variant="body1" color="red"> {errors.medicationName} </MyTypography>}
                                <TextField
                                    fullWidth
                                    required
                                    label='Refill Quantity'
                                    name="refillQuantity"
                                    defaultValue={refillQuantity}
                                    sx={{ marginBottom: 2 }}
                                    onChange={(event) => {
                                        setRefillQuantity(event.target.value)
                                        setErrors((prevErrors) => ({ ...prevErrors, refillQuantity: '' }));
                                    }}
                                />
                                {errors.refillQuantity && <MyTypography variant="body1" color="red"> {errors.refillQuantity} </MyTypography>}
                            </>
                        ) : (
                            <>
                                <Autocomplete
                                    disablePortal
                                    id="prescription"
                                    options={prescriptions}
                                    fullWidth
                                    required
                                    sx={{ marginBottom: 2 }}
                                    renderInput={(params) => <TextField required {...params} label="Prescription ID" />}
                                    getOptionLabel={(option) => option.prescriptionId}
                                    value={selectedPrescription}
                                    onChange={(event, newValue) => {
                                        setSelectedPrescription(newValue);
                                        setErrors((prevErrors) => ({ ...prevErrors, prescriptionId: '' }));
                                    }}
                                    renderOption={(props, option) => (
                                        <li {...props}>
                                            {option.prescriptionId} - {option.doctor.doctorName}
                                        </li>
                                    )}
                                />
                                {errors.prescriptionId && <MyTypography variant="body1" color="red"> {errors.prescriptionId} </MyTypography>}
                            </>
                        )
                    }
                    <TextField
                        disabled
                        fullWidth
                        required
                        label='Status'
                        name="status"
                        defaultValue="Pending"
                        sx={{ marginBottom: 2 }}
                    />
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
                            onClick={() => { onClick() }}
                        > Cancel </Button>
                        <Button type="submit" variant="contained" size="small" color="primary" onClick={handleSubmit}
                            endIcon={<SendIcon />}
                        > send </Button>
                    </div>
                </form>
            </div>
            {console.log("Selected details : ", selectedMedication, selectedPrescription)}
        </div>
    )
}

export default RefillForm;