import { Box, Button, Card, CardContent, Dialog, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, Prescription, PrescriptionMedicationMapping, Role, Status, User, RefillRequest } from "../../Classes/Classes";
import MyTypography from "../../assets/themes/MyTypography";
import { InfoRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { PopupForm } from "../Popup/PopupForm";
import InnerContainer from "../Container/InnerContainer";


function RecievedRefillRequests() {

    const role = 'PROVIDER';

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
            16427,
            new Prescription(
                19017098,
                new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
                new Doctor("DOC001", "Dr. Niteen Patil", "Cardiology",
                    new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
                new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', 'P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                    new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                        new Role('Patient', 'One who is under medication')
                    )
                ),
                "Fever",
                "2022-01-01",
                "2022-01-31",
                "file",
                new Status("COM", "Completed")
            ),
            null,
            "Prescription",
            1,
            new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', 'P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-01-01",
            null,
            null,
            "Pending",
            ""
        ),
        new RefillRequest(
            287629,
            null,
            new MedicationDetail(
                1, 'Paracetamol', pharmacy, 30, 10
            ),
            "Medication",
            30,
            new Patient('RR13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', 'P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-01-05",
            "Pharmacist 1",
            "2022-01-10",
            "Approved",
            "Refill approved"
        ),
        new RefillRequest(
            30874,
            new Prescription(
                19017098,
                new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
                new Doctor("DOC001", "Dr. Niteen Patil", "Cardiology",
                    new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
                new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', 'P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                    new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                        new Role('Patient', 'One who is under medication')
                    )
                ),
                "Fever",
                "2022-01-01",
                "2022-01-31",
                "file",
                new Status("COM", "Completed")
            ),
            null,
            "Prescription",
            1,
            new Patient('CJ13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', 'P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-01-15",
            "Pharmacist 2",
            "2022-02-05",
            "Approved",
            "Refill Approved"
        ),
        new RefillRequest(
            437983,
            null,
            new MedicationDetail(
                3, 'Amoxicillin', pharmacy, 10, 3
            ),
            "Medication",
            60,
            new Patient('DSP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', 'P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-02-01",
            "Pharmacist 2",
            "2022-02-05",
            "Approved",
            "Refill completed"
        ),
        new RefillRequest(
            586258,
            new Prescription(
                19017098,
                new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
                new Doctor("DOC001", "Dr. Niteen Patil", "Cardiology",
                    new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
                new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', 'P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                    new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                        new Role('Patient', 'One who is under medication')
                    )
                ),
                "Fever",
                "2022-01-01",
                "2022-01-31",
                "file",
                new Status("COM", "Completed")
            ),
            null,
            "Prescription",
            1,
            new Patient('RB13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', 'P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
                new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                    new Role('Patient', 'One who is under medication')
                )
            ),
            "2022-03-01",
            "Pharmacy 3",
            null,
            "Denied",
            "Requested quantity is not in stock."
        )
    ];

    const [open, setOpen] = useState(false);
    const [openRequests, setOpenRequests] = useState({});

    const getSalutation = (gender) => {
        if (gender === 'Male') {
            return ('Mr.');
        } else {
            return ('Ms.');
        }
    }

    const calcColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'orange';
            case 'Denied':
                return 'red';
            default:
                return 'green';
        }
    };

    const [filteredRequests, setFilteredRequests] = useState(refillRequests);

    const handleFilter = (status) => {
        if (status)
            setFilteredRequests(
                refillRequests.filter((request) => {
                    return request.status.toLowerCase().includes(status.toLowerCase())
                })
            )
        else
            setFilteredRequests(refillRequests);
    }

    return (
        <InnerContainer>
            <div>
                <div style={{ textAlign: 'left', margin: 15 }}>
                    <MyTypography variant='h3'> Recieved Refill Requests </MyTypography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 20 }}>
                    <Card raised onClick={() => handleFilter('')} style={{ backgroundColor: 'blue', opacity: 0.7, width: '200px', height: '100px', borderRadius: 10, display: 'inline-block', textAlign: 'center', cursor: 'pointer' }}>
                        <p></p>
                        <Typography variant="h4" color="white"> 8 </Typography>
                        <Typography variant="h6" color="white"> Total Requests </Typography>
                    </Card>
                    <Card raised onClick={() => handleFilter('Pending')} style={{ backgroundColor: 'orange', opacity: 0.7, width: '200px', height: '100px', borderRadius: 10, display: 'inline-block', textAlign: 'center', cursor: 'pointer' }}>
                        <p></p>
                        <Typography variant="h4" color="white"> 8 </Typography>
                        <Typography variant="h6" color="white"> Pending Requests </Typography>
                    </Card>
                    <Card raised onClick={() => handleFilter('Approved')} style={{ backgroundColor: 'green', opacity: 0.7, width: '200px', height: '100px', borderRadius: 10, display: 'inline-block', textAlign: 'center', cursor: 'pointer' }}>
                        <p></p>
                        <Typography variant="h4" color="white"> 8 </Typography>
                        <Typography variant="h6" color="white"> Approved Requests </Typography>
                    </Card>
                    <Card raised onClick={() => handleFilter('Denied')} style={{ backgroundColor: 'red', opacity: 0.7, width: '200px', height: '100px', borderRadius: 10, display: 'inline-block', textAlign: 'center', cursor: 'pointer' }}>
                        <p></p>
                        <Typography variant="h4" color="white"> 8 </Typography>
                        <Typography variant="h6" color="white"> Denied Requests </Typography>
                    </Card>
                </div>
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
                                    backgroundColor: '#CCCCCC',
                                    marginLeft: 0,
                                    marginTop: '-3px',
                                    paddingTop: '2px',
                                    paddingBottom: '2px',
                                    paddingLeft: '1px',
                                    paddingRight: '1px',
                                    backgroundImage: "linear-gradient('to bottom', '#008DDA', '#0077C5')",
                                    borderRadius: '0.5rem',
                                    // boxShadow: '0px 0px 10px rgba(0, 141, 218, 0.5)'
                                    boxShadow: '0 0px 10px rgba(136, 136, 136, 0.5)'
                                }}
                            >
                                {/* #F7F7F7  can be used for alternative columns */}
                                <TableRow style={{ width: "100%", borderWidth: "0px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={0.3}></Grid>
                                        <Grid item xs={1.3}>
                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                <MyTypography variant="h6" >  Request ID </MyTypography>
                                            </TableCell>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TableCell style={{ borderBottom: "none", textAlign: 'left' }}>
                                                <MyTypography variant="h6" >  Request Details </MyTypography>
                                            </TableCell>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                <MyTypography variant="h6" > Refill Status </MyTypography>
                                            </TableCell>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                <MyTypography variant="h6">  Requested On </MyTypography>
                                            </TableCell>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                <MyTypography variant="h6" >  Actions </MyTypography>
                                            </TableCell>
                                        </Grid>
                                    </Grid>
                                </TableRow>
                            </Box>
                            <TableBody style={{ width: "100%" }}>
                                {
                                    filteredRequests.map((request, i) => (
                                        <TableRow key={i} style={{ width: "500%", borderWidth: "0px" }}>
                                            <Card key={request.refillRequestId} style={{ marginTop: "4px", borderColor: "gray", paddingLeft: "10px" }}>
                                                {
                                                    (role === 'PROVIDER') ? (
                                                        // (role === 'PHARMACY') ? (
                                                        (request.prescription) && (
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={0.3}></Grid>
                                                                <Grid item xs={1.24}>
                                                                    <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                        {request.refillRequestId}
                                                                    </TableCell>
                                                                </Grid>
                                                                <Grid item xs={4.3}>
                                                                    <TableCell style={{ borderBottom: "none", textAlign: 'left' }}>
                                                                        <MyTypography variant='subtitle1'> {request.requestedBy.patientId} requested for refill of {request.prescription.prescriptionId}. </MyTypography>
                                                                    </TableCell>
                                                                </Grid>
                                                                <Grid item xs={1.85}>
                                                                    <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                        <div
                                                                            style={{
                                                                                width: '12px',
                                                                                height: '12px',
                                                                                borderRadius: '20px',
                                                                                backgroundColor: calcColor(request.status)
                                                                            }}
                                                                        >
                                                                        </div>
                                                                    </TableCell>
                                                                </Grid>
                                                                <Grid item xs={1.9}>
                                                                    <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                        <MyTypography variant='subtitle1'> {request.requestedOn} </MyTypography>
                                                                    </TableCell>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                        <Button sx={{ height: '20px' }} onClick={() => setOpenRequests({ ...openRequests, [request.refillRequestId]: true })} >
                                                                            <img src="https://img.icons8.com/?size=100&id=FlsRkdk59S9o&format=png&color=000000" alt="Take Action" width="25px" height="25px" />
                                                                        </Button>
                                                                    </TableCell>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    ) : (
                                                        (request.medication) && (
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={0.3}></Grid>
                                                                <Grid item xs={1.4}>
                                                                    <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                        {request.refillRequestId}
                                                                    </TableCell>
                                                                </Grid>
                                                                <Grid item xs={4.2}>
                                                                    <MyTypography variant='subtitle1'> {getSalutation(request.requestedBy.gender)} {request.requestedBy.firstName + " " + request.requestedBy.lastName} requested for refill of {request.medication.medicationName}. </MyTypography>
                                                                </Grid>
                                                                <Grid item xs={1.78}>
                                                                    <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                        <div
                                                                            style={{
                                                                                width: '12px',
                                                                                height: '12px',
                                                                                borderRadius: '20px',
                                                                                backgroundColor: calcColor(request.status)
                                                                            }}
                                                                        >
                                                                        </div>
                                                                    </TableCell>
                                                                </Grid>
                                                                <Grid item xs={1.9}>
                                                                    <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                        <MyTypography variant='subtitle1'> {request.requestedOn} </MyTypography>
                                                                    </TableCell>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                        <Button sx={{ height: '20px' }} onClick={() => setOpenRequests({ ...openRequests, [request.refillRequestId]: true })} >
                                                                            <img src="https://img.icons8.com/?size=100&id=FlsRkdk59S9o&format=png&color=000000" alt="Take Action" width="25px" height="25px" />
                                                                        </Button>
                                                                    </TableCell>
                                                                </Grid>
                                                            </Grid>
                                                        )
                                                    )
                                                }
                                            </Card>
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
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Card>
                </TableContainer>
            </div >
        </InnerContainer>
    )
}

export default RecievedRefillRequests;

function RefillRequestContent({ onClick, request = {} }) {

    const [salutation, setSalutation] = useState('Mr.');

    useEffect(() => {
        if (request.requestedBy.gender === 'Male') {
            setSalutation('Mr.');
        } else {
            setSalutation('Ms.');
        }
    }, []);

    const [refillRequest, setRefillRequest] = useState(request);

    const handleChange = (event) => {
        setRefillRequest((prevRequest) => ({ ...prevRequest, [event.target.name]: event.target.value }))
    }

    const handleDeny = () => {
        setRefillRequest((prevRequest) => ({ ...prevRequest, status: "Denied" }));
        console.log("Denied : ", refillRequest);
    }

    const handleRefill = () => {
        setRefillRequest((prevRequest) => ({ ...prevRequest, status: "Approved" }));
        console.log("Denied : ", refillRequest);
    }

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
                                <MyTypography variant="h6"> Prescription: </MyTypography><br />
                                <MyTypography variant="h6"> Comments: </MyTypography> <br />
                            </Grid>
                            <Grid Item xs={1}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="body1"> {request.requestedBy.patientId} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescription.prescribedBy.doctorName} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescription.ailment} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.prescription.startDate} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.requestedOn} </MyTypography> <br /> <br />
                                <MyTypography variant="body1"> {request.prescription.prescription} </MyTypography><br />
                                <TextField
                                    variant="standard"
                                    requireed
                                    spellCheck
                                    multiline
                                    name="comments"
                                    maxRows={2}
                                    defaultValue={request.comments || ''}
                                    disabled={request.status === 'Approved' || request.status === 'Denied'}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2} sx={{ lineHeight: '30px' }}>
                            <Grid Item xs={0.7}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="h6"> Requested By: </MyTypography> <br />
                                <MyTypography variant={'h6'}> Refquested for: </MyTypography>
                                <MyTypography variant="h6"> Refill Requested On: </MyTypography> <br />
                                <MyTypography variant="h6"> Quantity requested for refill: </MyTypography> <br />
                                <MyTypography variant="h6"> Comments: </MyTypography>
                            </Grid>
                            <Grid Item xs={1}></Grid>
                            <Grid Item xs={5}>
                                <MyTypography variant="body1">  {salutation} {request.requestedBy.firstName + " " + request.requestedBy.lastName} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.medication.medicationName} </MyTypography> <br />
                                <MyTypography variant="body1"> {request.requestedOn} </MyTypography> <br /> <br />
                                <MyTypography variant="body1"> {request.refillQuantity} </MyTypography> <br /> <br />
                                <TextField
                                    variant="standard"
                                    requireed
                                    spellCheck
                                    multiline
                                    name="comments"
                                    maxRows={2}
                                    defaultValue={request.comments || ''}
                                    disabled={request.status === 'Approved' || request.status === 'Denied'}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    )}
            </div>

            <Grid container spacing={2}>
                <Grid Item xs={0.5}> </Grid>
                <Grid Item xs={7.3}>
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
                </Grid>
                <Grid Item xs={2}>
                    <Button type="submit" variant="contained" size="small" color="error" onClick={handleDeny} > Deny </Button>
                </Grid>
                <Grid Item xs={2}>
                    <Button type="submit" variant="contained" size="small" color="primary" onClick={handleRefill} > Refill </Button>
                </Grid>
            </Grid>
        </div>
    );
}