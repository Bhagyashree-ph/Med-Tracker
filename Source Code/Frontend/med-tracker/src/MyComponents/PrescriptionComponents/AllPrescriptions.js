import { Badge, Box, Card, Grid, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, Prescription, PrescriptionMedicationMapping, Role, Status, User } from "../../Classes/Classes";
import ViewAllTable from "../DynamicTables/Table";
import MyTypography from "../../assets/themes/MyTypography";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import { InfoRounded } from "@mui/icons-material";
import PrescriptionForm from "./PrescriptionForm";
import { PopupForm } from "../Popup/PopupForm";

const AllPrescriptions = () => {

    const prescription = new Prescription(
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
        new Date("2022-01-01T12:00:00.000Z"),
        new Date("2022-01-31T12:00:00.000Z"),
        "file",
        new Status("ACT", "Active")
    );

    const prescriptions = [
        prescription,
        new Prescription(
            1708901,
            new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
            new Doctor("DOC001", "Dr. Praveen Kumar", "Cardiology",
                new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
            new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "Fever",
            new Date("2022-01-01T12:00:00.000Z"),
            new Date("2022-01-31T12:00:00.000Z"),
            "file",
            new Status("INACT", "Inactive")
        ),
        new Prescription(
            19017098,
            new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
            new Doctor("DOC001", "Dr. Niteen Patil", "Cardiology",
                new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
            new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "Fever",
            new Date("2022-01-01T12:00:00.000Z"),
            new Date("2022-01-31T12:00:00.000Z"),
            "file",
            new Status("COM", "Completed")
        )
    ]

    const pharmacy = new Pharmacy(
        "PHARM001",
        'Apollo',
        'Jayanagar, Bnagalore',
        '+91 9283712523',
        new User('U002', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
            new Role('Pharmacy', 'One who is providing medication')
        )
    );

    const medicationDetails = [
        new MedicationDetail(
            1, 'Paracetamol', pharmacy, 30, 10
        ),
        new MedicationDetail(
            2, 'Ibuprofen', pharmacy, 20, 5
        ),
        new MedicationDetail(
            3, 'Amoxicillin', pharmacy, 10, 3
        ),
    ];

    const [prescMed, setPrescMed] = useState([
        new PrescriptionMedicationMapping(1234, prescription, medicationDetails),
        new PrescriptionMedicationMapping(2345, prescription, medicationDetails),
        new PrescriptionMedicationMapping(3456, prescription, medicationDetails),
        new PrescriptionMedicationMapping(4567, prescriptions[1], medicationDetails),
        new PrescriptionMedicationMapping(5678, prescriptions[1], medicationDetails),
        new PrescriptionMedicationMapping(6789, prescriptions[2], medicationDetails),
    ]);

    const getTotalMedications = (value) => {
        return prescMed.filter((preMed) => {
            return preMed.prescription.prescriptionId.toString().includes(value);
        }).length;
    };

    const [filteredPrescriptions, setFilteredPrescriptions] = useState(prescriptions);

    const handleFilterByDoctor = (value) => {
        setFilteredPrescriptions(
            prescriptions.filter((prescription) => {
                return prescription.prescribedBy.doctorName.toString().toLowerCase().includes(value.toLowerCase());
            }))
    }

    const handleFilterByHospital = (value) => {
        setFilteredPrescriptions(
            prescriptions.filter((prescription) => {
                return prescription.prescribedAt.hospitalName.toString().toLowerCase().includes(value.toLowerCase());
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

    return (
        <div>
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

                    <IconButton
                        style={{ fontSize: 20, backgroundColor: '#5cb85c', height: 27, width: 27, color: 'whitesmoke' }}
                        onClick={() => setOpen(true)}
                    >
                        +
                    </IconButton>
                </div>
            </div>

            <PopupForm
                open={open}
                onClose={() => changeDialogState(false)}>
                <PrescriptionForm
                    onClick={() => changeDialogState(false)}
                    formTitle="Register"
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
                                                        <MyTypography variant="body1"> {prescription.prescribedBy.doctorName} </MyTypography>
                                                    </TableCell>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TableCell align="center" style={{ borderBottom: "none" }}>
                                                        <MyTypography variant="body1"> {prescription.prescribedAt.hospitalName} </MyTypography>
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
                                                    <IconButton onClick={() => { 'navidate to prescription summary' }}>
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
    )
}

export default AllPrescriptions;