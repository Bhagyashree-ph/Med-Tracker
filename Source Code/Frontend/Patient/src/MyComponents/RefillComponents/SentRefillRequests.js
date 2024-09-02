import { Box, Button, Card, CardContent, Dialog, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, PrescriptionDetails, PrescriptionMedicationMapping, Role, Status, User, RefillRequest } from "../../Classes/Classes";
import MyTypography from "../../assets/themes/MyTypography";
import React, { useEffect, useState } from "react";
import { PopupForm } from "../Popup/PopupForm";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import RefillForm from "./RefillForm";
import AppBarComponent from "../NavBar/Appbar";

function SentRefillRequests() {

    // data from login
    
    const patient = JSON.parse(localStorage.getItem("patient"));
    console.log("Patient : ", patient);

    // const patient = new Patient('P001', 'ABC0923872', 'Pan Card', 'Bhagyashree', ' P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
    //     new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
    //         new Role('Patient', 'One who is under medication')
    //     )
    // );

    const pharmacy = new Pharmacy(
        "PHARM001",
        'Apollo',
        'Jayanagar, Bnagalore',
        '+91 9283712523',
        new User('U002', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
            new Role('Pharmacy', 'One who is providing medication')
        )
    );

    const [refillRequests, setRefillRequests] = useState([]);

    const [open, setOpen] = useState(false);
    const [openRequests, setOpenRequests] = useState({});

    
    async function fetchData() {
        try {
            await axios.get("http://localhost:9090/patient/fetchAllRequests/" + patient.patientId)
                .then((response) => setRefillRequests(response.data));
            // console.log("Response: ", response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

console.log(refillRequests);

    return (
        <AppBarComponent>
            <div style={{ padding: 10 }}>
                <MyTypography variant='h3'> Sent Refill Requests </MyTypography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="success" onClick={() => setOpen(true)}>
                    <AddIcon /> New Request
                </Button>
            </div>
            <PopupForm
                open={open}
                onClose={() => {setOpen(false); fetchData()}}
            >
                <RefillForm 
                    onClick = {() => {setOpen(false); fetchData();}}
                />
            </PopupForm>
            <div>
                {
                    refillRequests.map((request) => (
                        <>
                            <div onClick={() => setOpenRequests({ ...openRequests, [request.refillRequestId]: true })}>
                                <Card key={request.refillRequestId} style={{ marginTop: "4px", borderColor: "gray", paddingLeft: "10px", cursor: 'pointer' }}>
                                    {
                                        (request.prescriptionDetails) ? (
                                            <CardContent>
                                                <MyTypography variant='subtitle1'> Refill request for {request.prescriptionDetails.prescriptionId || 'Prescription'} has been sent to {request.prescriptionDetails.hospital.hospitalName || 'HealthCare Provider'} for processing. </MyTypography>
                                            </CardContent>
                                        ) : (
                                            <CardContent>
                                                <MyTypography variant='subtitle1'> Refill request for {request.medicationDetails.medicationName || 'Medication'} has been sent to {request.medicationDetails.pharmacies.pharmacyName || 'Pharmacy'} for processing. </MyTypography>
                                            </CardContent>
                                        )
                                    }
                                </Card>
                            </div>
                            <PopupForm
                                open={openRequests[request.refillRequestId]}
                                onClose={() => setOpenRequests({ ...openRequests, [request.refillRequestId]: false })}
                                givenKey={request.refillRequestId}
                            >
                                <RefillRequestContent
                                    onClick={() => setOpenRequests({ ...openRequests, [request.refillRequestId]: false })}
                                    request={request}
                                />
                            </PopupForm>
                        </>
                    ))
                }
            </div>
        </AppBarComponent>
    )
}

export default SentRefillRequests;

function RefillRequestContent({ onClick, request = {} }) {

    const [salutation, setSalutation] = useState('Mr.');

    useEffect(() => {
        if (request.patient.gender === 'Male') {
            setSalutation('Mr.');
        } else {
            setSalutation('Ms.');
        }
    }, []);

    return (
        <div>
            <div style={{ width: 350, height: 330, margin: '0 50px' }}>
                <div style={{ textAlign: 'center', margin: 30 }}>
                    <MyTypography variant="h5"> Refill Details </MyTypography>
                </div>
                {
                    request.prescriptionDetails ? (
                        <Grid container spacing={2} sx={{ lineHeight: '28px' }}>
                            <Grid Item xs={1}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="h6"> Patient ID: </MyTypography> <br />
                                <MyTypography variant="h6"> Prescribed By: </MyTypography> <br />
                                <MyTypography variant="h6"> Ailment:  </MyTypography> <br />
                                <MyTypography variant="h6"> Prescribed On: </MyTypography> <br />
                                <MyTypography variant="h6"> Refill Requested On: </MyTypography> <br />
                                <MyTypography variant="h6"> Fullfilled On: </MyTypography> <br />
                                <MyTypography variant="h6"> Status: </MyTypography> <br />
                                <MyTypography variant="h6"> Comments: </MyTypography> <br />
                                {/* <MyTypography variant="h6"> Prescription: </MyTypography> */}
                            </Grid>
                            <Grid Item xs={1}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="body1"> {request.patient.patientId} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescriptionDetails.doctor.doctorName} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescriptionDetails.ailment} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescriptionDetails.startDate} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.requestedOn} </MyTypography> <br /> 
                                <MyTypography variant="body1"> {request.fulfilledOn ? request.fulfilledOn : '-'} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.status.statusLabel} </MyTypography> <br />
                                <MyTypography variant="body1"> {(request.comments === null) ? '-' : request.comments} </MyTypography> <br />
                                {/* <MyTypography variant="body1"> {request.prescriptionDetails.prescription} </MyTypography> */}
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2} sx={{ lineHeight: '30px' }}>
                            <Grid Item xs={0.7}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="h6"> Requested By: </MyTypography> <br />
                                <MyTypography variant={'h6'}> Refquested for: </MyTypography>
                                <MyTypography variant="h6"> Refill Requested On: </MyTypography> <br />
                                <MyTypography variant="h6"> Fullfilled On: </MyTypography> <br />
                                <MyTypography variant="h6"> Quantity requested for refill: </MyTypography> <br />
                                <MyTypography variant="h6"> Status: </MyTypography> <br />
                                <MyTypography variant="h6"> Comments: </MyTypography>
                            </Grid>
                            <Grid Item xs={1}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="body1">  {salutation} {request.patient.firstName + " " + request.patient.lastName} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.medicationDetails.medicationName} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.requestedOn.split(0, 5)} </MyTypography> <br /> <br />
                                <MyTypography variant="body1"> {request.fulfilledOn ? request.fulfilledOn : '-'} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.refillQuantity} </MyTypography> <br /> 
                                <MyTypography variant="body1"> {request.status.statusLabel} </MyTypography> <br />
                                <MyTypography variant="body1"> {(request.comments === null) ? '-' : request.comments} </MyTypography>
                            </Grid>
                        </Grid>
                    )}
            </div>
            <Button
                sx={{
                    backgroundColor: 'grey.500',
                    '&:hover': {
                        backgroundColor: 'grey.500',
                    },
                    margin: '10px'
                }}
                variant="contained"
                size="small"
                onClick={() => onClick()}
            > Cancel </Button>
        </div>
    );
}