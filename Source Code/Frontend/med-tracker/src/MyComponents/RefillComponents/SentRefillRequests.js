import { Box, Button, Card, CardContent, Dialog, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, Prescription, PrescriptionMedicationMapping, Role, Status, User, RefillRequest } from "../../Classes/Classes";
import MyTypography from "../../assets/themes/MyTypography";
import { InfoRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { PopupForm } from "../Popup/PopupForm";

function SentRefillRequests() {

    const pharmacy = new Pharmacy(
        "PHARM001",
        'Apollo',
        'Jayanagar, Bnagalore',
        '+91 9283712523',
        new User('U002', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
            new Role('Pharmacy', 'One who is providing medication')
        )
    );

    const refillRequests = [
        new RefillRequest(
            1,
            new Prescription(
                19017098,
                new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
                new Doctor("DOC001", "Dr. Niteen Patil", "Cardiology",
                    new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
                new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree','P',  '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                    new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                        new Role('Patient', 'One who is under medication')
                    )
                ),
                "Fever",
                "2022-01-0",
                "2022-01-31",
                "file",
                new Status("COM", "Completed")
            ),
            null,
            "Prescription",
            1,
            new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree','P',  '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-01-01",
            null,
            null,
            "Pending",
            "Initial request"
        ),
        new RefillRequest(
            2,
            null,
            new MedicationDetail(
                1, 'Paracetamol', pharmacy, 30, 10
            ),
            "Medication",
            30,
            new Patient('RR13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree','P',  '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-01-05",
            "Pharmacist 1",
            "2022-01-10",
            "Fulfilled",
            "Refill approved"
        ),
        new RefillRequest(
            3,
            new Prescription(
                19017098,
                new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
                new Doctor("DOC001", "Dr. Niteen Patil", "Cardiology",
                    new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
                new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree','P',  '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                    new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                        new Role('Patient', 'One who is under medication')
                    )
                ),
                "Fever",
                "2022-01-0",
                "2022-01-31",
                "file",
                new Status("COM", "Completed")
            ),
            null,
            "Prescription",
            1,
            new Patient('CJ13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree','P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-01-15",
            null,
            null,
            "Pending",
            "Awaiting approval"
        ),
        new RefillRequest(
            4,
            null,
            new MedicationDetail(
                3, 'Amoxicillin', pharmacy, 10, 3
            ),
            "Medication",
            60,
            new Patient('DSP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree','P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-02-01",
            "Pharmacist 2",
            "2022-02-05",
            "Fulfilled",
            "Refill completed"
        ),
        new RefillRequest(
            5,
            new Prescription(
                19017098,
                new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
                new Doctor("DOC001", "Dr. Niteen Patil", "Cardiology",
                    new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
                new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree','P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                    new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                        new Role('Patient', 'One who is under medication')
                    )
                ),
                "Fever",
                "2022-01-0",
                "2022-01-31",
                "file",
                new Status("COM", "Completed")
            ),
            null,
            "Prescription",
            1,
            new Patient('RB13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-03-01",
            null,
            null,
            "Pending",
            "Initial request"
        )
    ];

    const [open, setOpen] = useState(false);
    const [openRequests, setOpenRequests] = useState({});

    return (
        <div>
            <div>
                <MyTypography variant='h3'> Sent Refill Requests </MyTypography>
            </div>
            {
                refillRequests.map((request) => (
                    <>
                        <div onClick={() => setOpenRequests({ ...openRequests, [request.refillRequestId]: true })}>
                            <Card key={request.refillRequestId} style={{ marginTop: "4px", borderColor: "gray", paddingLeft: "10px", cursor: 'pointer' }}>
                                {
                                    (request.prescription) ? (
                                        <CardContent>
                                            <MyTypography variant='subtitle1'> {request.prescription.prescriptionId || 'Prescription'} refill sent to {request.prescription.prescribedAt.hospitalName || 'HealthCare Provider'} for processing. </MyTypography>
                                        </CardContent>
                                    ) : (
                                        <CardContent>
                                            <MyTypography variant='subtitle1'> {request.medication.medicationName || 'Medication'} refill sent to {request.medication.pharmacy.pharmacyName || 'Pharmacy'} for processing. </MyTypography>
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
        </div >
    )
}

export default SentRefillRequests;

function RefillRequestContent({ onClick, request = {} }) {

    const [salutation, setSalutation] = useState('Mr.');

    useEffect(() => {
        if (request.requestedBy.gender === 'Male') {
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
                    request.prescription ? (
                        <Grid container spacing={2} sx={{ lineHeight: '28px' }}>
                            <Grid Item xs={1}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="h6"> Patient ID: </MyTypography> <br />
                                <MyTypography variant="h6"> Prescribed By: </MyTypography> <br />
                                <MyTypography variant="h6"> Ailment:  </MyTypography> <br />
                                <MyTypography variant="h6"> Prescribed On: </MyTypography> <br />
                                <MyTypography variant="h6"> Refill Requested On: </MyTypography> <br />
                                <MyTypography variant="h6"> Fullfilled On: </MyTypography> <br />
                                <MyTypography variant="h6"> Status: </MyTypography> <br/>
                                <MyTypography variant="h6"> Comments: </MyTypography> <br />
                                <MyTypography variant="h6"> Prescription: </MyTypography>
                            </Grid>
                            <Grid Item xs={1}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="body1"> {request.requestedBy.patientId} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescription.prescribedBy.doctorName} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescription.ailment} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescription.startDate} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.requestedOn} </MyTypography> <br /> <br />
                                <MyTypography variant="body1"> {request.fulfilledOn ? request.fulfilledOn : '-'} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.status} </MyTypography> <br/>
                                <MyTypography variant="body1"> {request.comments} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescription.prescription} </MyTypography>
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
                                <MyTypography variant="h6"> Status: </MyTypography> <br/>
                                <MyTypography variant="h6"> Comments: </MyTypography>
                            </Grid>
                            <Grid Item xs={1}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="body1">  {salutation} {request.requestedBy.firstName + " " + request.requestedBy.lastName} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.medication.medicationName} </MyTypography> <br/>
                                <MyTypography variant="body1"> {request.requestedOn} </MyTypography> <br /> <br />
                                <MyTypography variant="body1"> {request.fulfilledOn ? request.fulfilledOn : '-'} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.refillQuantity} </MyTypography> <br/> <br/>
                                <MyTypography variant="body1"> {request.status} </MyTypography> <br/>
                                <MyTypography variant="body1"> {request.comments} </MyTypography>
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