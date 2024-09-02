import { Badge, Box, Button, Card, Grid, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, PrescriptionDetails, PrescriptionMedicationMapping, Role, Status, User } from "../../Classes/Classes";
// import ViewAllTable from "../DynamicTables/Table";
import MyTypography from "../../assets/themes/MyTypography";
import { useEffect, useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import { InfoRounded } from "@mui/icons-material";
import PrescriptionForm from "./PrescriptionForm";
import { PopupForm } from "../Popup/PopupForm";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add'
import axios from "axios";
import AppBarComponent from "../NavBar/Appbar";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AllPrescriptions = () => {

    const navigate = useNavigate();

    // this object id should be from login

    const patient = JSON.parse(localStorage.getItem("patient"));
    console.log("Patient : ", patient);

    const [prescriptions, setPrescriptions] = useState([])

    const pharmacy = new Pharmacy(
        "PHARM001",
        'Apollo',
        'Jayanagar, Bnagalore',
        '+91 9283712523',
        new User('U002', 'Bhagya@123',
            new Role('Pharmacy', 'One who is providing medication')
        )
    );

    const medicationDetails = [];

    const [prescMed, setPrescMed] = useState([]);

    const getTotalMedications = (value) => {
        return prescMed.filter((preMed) => {
            return preMed.prescriptionDetails.prescriptionId.toString().includes(value);
        }).length;
    };

    const [filteredPrescriptions, setFilteredPrescriptions] = useState(prescriptions);

    const handleFilterByDoctor = (value) => {
        setFilteredPrescriptions(
            prescriptions.filter((prescription) => {
                return prescription.doctor.doctorName.toString().toLowerCase().includes(value.toLowerCase());
            }))
    }

    const handleFilterByHospital = (value) => {
        setFilteredPrescriptions(
            prescriptions.filter((prescription) => {
                return prescription.hospital.hospitalName.toString().toLowerCase().includes(value.toLowerCase());
            }))
    }

    const calcColor = (status) => {
        switch (status) {
            case 'Active':
                return 'blue';
            case 'Inactive':
                return 'red';
            default:
                return 'green';
        }
    };

    const [open, setOpen] = useState(false);

    const changeDialogState = (val) => {
        setOpen(val)
    }

    const updateData = (data, type) => {
        if (type === 'presc')
            setPrescriptions(data)
        else
            setPrescMed(data)
    }

    async function fetchData() {
        await axios.get(`http://localhost:9090/patient/fetchAllPrescriptions/${patient.patientId}`)
            .then((resp) => { console.log("Response presc : ", resp.data); updateData(resp.data, 'presc') })
            .catch((error) => console.error(error))
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        setFilteredPrescriptions(prescriptions);
        console.log("Presc Med Mapping : ", prescriptions);
        async function fetchData() {
            await axios.get(`http://localhost:9090/patient/fetchAllMappings/${patient.patientId}`)
                .then((resp) => { console.log("Response premed : ", resp.data); updateData(resp.data, 'preMed') })
                .catch((error) => console.error(error));
        }
        fetchData();
    }, [prescriptions])

    const handleCallBack = (status) => {
        if (status === 200) {
            toast.success(`💊New prescription added and reminders scheduled!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            fetchData();
            setOpen(false);
        } else {
            toast.error(`Some error occured while adding new prescription details.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    return (
        <AppBarComponent>
            <ToastContainer/>
            <div style={{ padding: '0 10px' }}>
                <div style={{ margin: 10 }}>
                    <MyTypography variant='h3'> All Prescriptions </MyTypography>
                    <div
                        style={{ display: 'flex', justifyContent: 'end' }}
                    >
                        <TextField
                            variant="standard"
                            onChange={(event) => handleFilterByDoctor(event.target.value)}
                            placeholder="Filter by Doctor Name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="end">
                                        <FilterListIcon />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ marginRight: 15 }}
                        />
                        <TextField
                            variant="standard"
                            onChange={(event) => handleFilterByHospital(event.target.value)}
                            placeholder="Filter by Hospital Name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="end">
                                        <FilterListIcon />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ marginRight: 15 }}
                        />

                        <Button variant="contained" color="success" size="small" onClick={() => setOpen(true)}>
                            <AddIcon /> Add New
                        </Button>
                    </div>
                </div>

                <PopupForm
                    open={open}
                    onClose={() => changeDialogState(false)}>
                    <PrescriptionForm
                        onClick={() => changeDialogState(false)}
                        formTitle="Register"
                        callBack={handleCallBack}
                    ></PrescriptionForm>
                </PopupForm>

                <TableContainer>
                    <Card>
                        <Table aria-label="collapsible table" style={{ width: "100%", borderWidth: "0px" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    verticalAlign: "center",
                                    backgroundColor: '#008DDA',
                                    marginLeft: 0,
                                    marginTop: '-3px',
                                    paddingTop: '2px',
                                    paddingBottom: '2px',
                                    paddingLeft: '1px',
                                    paddingRight: '1px',
                                    backgroundImage: "linear-gradient('to bottom', '#008DDA', '#0077C5')",
                                    borderRadius: '0.5rem',
                                    boxShadow: '0px 0px 10px rgba(0, 141, 218, 0.5)'
                                }}
                            >
                                <TableRow style={{ width: "100%", borderWidth: "0px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2.3}>
                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                <MyTypography variant="h6" color="white">  Prescription ID </MyTypography>
                                            </TableCell>
                                        </Grid>
                                        <Grid item xs={2.3}>
                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                <MyTypography variant="h6" color="white">  Prescribed By </MyTypography>
                                            </TableCell>
                                        </Grid>
                                        <Grid item xs={2.3}>
                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                <MyTypography variant="h6" color="white">  Prescribed At </MyTypography>
                                            </TableCell>
                                        </Grid>
                                        <Grid item xs={2.3}>
                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                <MyTypography variant="h6" color="white">  Total Medications Given </MyTypography>
                                            </TableCell>
                                        </Grid>
                                        <Grid item xs={2.3}>
                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                <MyTypography variant="h6" color="white">  Status </MyTypography>
                                            </TableCell>
                                        </Grid>
                                    </Grid>
                                </TableRow>
                            </Box>
                            <TableBody style={{ width: "100%" }}>
                                {
                                    filteredPrescriptions.map(prescription => (
                                        <TableRow style={{ width: "500%", borderWidth: "0px" }}>
                                            <Card style={{ marginTop: "4px", borderColor: "gray", paddingLeft: "10px" }}>
                                                <Grid container spacing={2} >
                                                    <Grid item xs={2.3}>
                                                        <TableCell align="center" style={{ borderBottom: "none" }}>
                                                            <MyTypography variant="body1"> {prescription.prescriptionId} </MyTypography>
                                                        </TableCell>
                                                    </Grid>
                                                    <Grid item xs={2.3}>
                                                        <TableCell align="center" style={{ borderBottom: "none" }}>
                                                            <MyTypography variant="body1"> {prescription.doctor.doctorName} </MyTypography>
                                                        </TableCell>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <TableCell align="center" style={{ borderBottom: "none" }}>
                                                            <MyTypography variant="body1"> {prescription.hospital.hospitalName} </MyTypography>
                                                        </TableCell>
                                                    </Grid>
                                                    <Grid item xs={1.8}>
                                                        <TableCell align="center" style={{ borderBottom: "none" }}>
                                                            <MyTypography variant="body1"> {getTotalMedications(prescription.prescriptionId)} </MyTypography>
                                                        </TableCell>
                                                    </Grid>
                                                    <Grid item xs={1.5}>
                                                        <TableCell align="center" style={{ borderBottom: "none" }}>
                                                            <div
                                                                style={{
                                                                    width: '10px',
                                                                    height: '10px',
                                                                    borderRadius: '20px',
                                                                    backgroundColor: calcColor(prescription.status.statusLabel)
                                                                }}
                                                            >
                                                            </div>
                                                        </TableCell>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <IconButton onClick={() => {
                                                            navigate(`/allPrescriptions/${prescription.prescriptionId}`)
                                                        }}>
                                                            <InfoRounded />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </Card>
                </TableContainer>
            </div>
        </AppBarComponent>
    )
}

export default AllPrescriptions;