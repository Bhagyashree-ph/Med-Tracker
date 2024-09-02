import { Box, Button, Card, CardContent, Dialog, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, PrescriptionDetails, PrescriptionMedicationMapping, Role, Status, User, RefillRequest } from "../../Classes/Classes";
import MyTypography from "../../assets/themes/MyTypography";
import { InfoRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { PopupForm } from "../Popup/PopupForm";
import axios from "axios";
import moment from "moment";
import PharmaAppBar from "../NavBar/PharmaAppBar";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecievedRefillRequests() {

    const pharmacy = {
        "pharmacyId": "PHARM001",
        "pharmacyName": 'Apollo',
        "address": 'Jayanagar, Bnagalore',
        "contactNo": '+91 9283712523',
        "user": {
            "userId": 'U002', "userName": 'Bhagya_ph', "password": 'Bhagya@123', "contactNo": '+91 9483451311', "emailId": 'bhagya@gmail.com',
            "role": { "roleName": 'Pharmacy', "roleDescription": 'One who is providing medication' }
        }
    };

    const [refillRequests, setRefillRequests] = useState([]);

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
                    return request.status.statusLabel.toLowerCase().includes(status.toLowerCase())
                })
            )
        else
            setFilteredRequests(refillRequests);
    }

    const updateRequestList = (data) => {
        setRefillRequests(data);
    }

    async function fetchData() {
        try {
            let response = await axios.get("http://localhost:9091/pharmacy/fetchhAllRequests");
            updateRequestList(response.data);
            console.log("Pharmacy Response: ", response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // console.log("reeeeefilllllll reqqquestsssssssssssss....", refillRequests);
        setFilteredRequests(refillRequests);
    }, [refillRequests])

    const getCount = (type) => {
        let medCount = refillRequests.reduce((count, request) => {
            if (request.status.statusCode === type) {
                return count + 1;
            }
            return count;
        }, 0)
        return medCount;
    }

    const handleCallBack = (status, request) => {
        if (status === 200) {
            toast.success(`Request ID ${request.refillRequestId} has been refilled`, {
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
            setOpenRequests({ ...openRequests, [request.refillRequestId]: false });
        } else {
            toast.error(`Some error occured while processing request ${request.refillRequestId}`, {
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
        <div style={{ margin: '20px 10px' }}>

            <PharmaAppBar />
            <ToastContainer />
            {console.log("Component rendered..")}
            {/* {console.log("refillRequests: ", refillRequests)}
            {console.log("Filtred requests : ", filteredRequests)} */}

            <div style={{ textAlign: 'left', margin: '25px 0' }}>
                <MyTypography variant='h3'> Recieved Refill Requests </MyTypography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 20 }}>
                <Card raised onClick={() => handleFilter('')} style={{ backgroundColor: 'blue', opacity: 0.7, width: '200px', height: '100px', borderRadius: 10, display: 'inline-block', textAlign: 'center', cursor: 'pointer' }}>
                    <p></p>
                    <Typography variant="h4" color="white"> {refillRequests.length} </Typography>
                    <Typography variant="h6" color="white"> Total Requests </Typography>
                </Card>
                <Card raised onClick={() => handleFilter('Pending')} style={{ backgroundColor: 'orange', opacity: 0.7, width: '200px', height: '100px', borderRadius: 10, display: 'inline-block', textAlign: 'center', cursor: 'pointer' }}>
                    <p></p>
                    <Typography variant="h4" color="white"> {getCount('PEND')} </Typography>
                    <Typography variant="h6" color="white"> Pending Requests </Typography>
                </Card>
                <Card raised onClick={() => handleFilter('Approved')} style={{ backgroundColor: 'green', opacity: 0.7, width: '200px', height: '100px', borderRadius: 10, display: 'inline-block', textAlign: 'center', cursor: 'pointer' }}>
                    <p></p>
                    <Typography variant="h4" color="white"> {getCount('APPR')} </Typography>
                    <Typography variant="h6" color="white"> Approved Requests </Typography>
                </Card>
                <Card raised onClick={() => handleFilter('Denied')} style={{ backgroundColor: 'red', opacity: 0.7, width: '200px', height: '100px', borderRadius: 10, display: 'inline-block', textAlign: 'center', cursor: 'pointer' }}>
                    <p></p>
                    <Typography variant="h4" color="white"> {getCount('DENY')} </Typography>
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
                                // backgroundColor: '#CCCCCC',
                                backgroundColor: '#3976ac',
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
                                            <MyTypography variant="h6" color="white" >  Request ID </MyTypography>
                                        </TableCell>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TableCell style={{ borderBottom: "none", textAlign: 'left' }}>
                                            <MyTypography variant="h6" color="white" >  Request Details </MyTypography>
                                        </TableCell>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TableCell align="center" style={{ borderBottom: "none" }}>
                                            <MyTypography variant="h6" color="white" > Refill Status </MyTypography>
                                        </TableCell>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TableCell align="center" style={{ borderBottom: "none" }}>
                                            <MyTypography variant="h6" color="white">  Requested On </MyTypography>
                                        </TableCell>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TableCell align="center" style={{ borderBottom: "none" }}>
                                            <MyTypography variant="h6" color="white" >  Actions </MyTypography>
                                        </TableCell>
                                    </Grid>
                                </Grid>
                            </TableRow>
                        </Box>
                        <TableBody style={{ width: "100%" }}>
                            {
                                filteredRequests.map((request, i) => (
                                    <TableRow key={i} style={{ width: "500%", borderWidth: "0px" }}>
                                        {/* {console.log("Request in the table : ", request.refillRequestId)} */}
                                        <Card key={request.refillRequestId} style={{ marginTop: "4px", borderColor: "gray", paddingLeft: "10px" }}>
                                            {
                                                (request.medicationDetails) ? (
                                                    <Grid container spacing={2} >
                                                        <Grid item xs={0.3}></Grid>
                                                        <Grid item xs={1.4}>
                                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                {request.refillRequestId}
                                                            </TableCell>
                                                        </Grid>
                                                        <Grid item xs={4.2}>
                                                            <MyTypography variant='subtitle1'> {getSalutation(request.patient.gender)} {request.patient.firstName + " " + request.patient.lastName} requested for refill of {request.medicationDetails.medicationName}. </MyTypography>
                                                        </Grid>
                                                        <Grid item xs={1.78}>
                                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                <div
                                                                    style={{
                                                                        width: '12px',
                                                                        height: '12px',
                                                                        borderRadius: '20px',
                                                                        backgroundColor: calcColor(request.status.statusLabel)
                                                                    }}
                                                                >
                                                                </div>
                                                            </TableCell>
                                                        </Grid>
                                                        <Grid item xs={1.9}>
                                                            <TableCell align="center" style={{ borderBottom: "none" }}>
                                                                <MyTypography variant='subtitle1'> {request.requestedOn.slice(0, 10)} </MyTypography>
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
                                                ) : (
                                                    <></>
                                                    // <MyTypography variant="h6"> No Refill Requests </MyTypography>
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
                                                callBack={handleCallBack}
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
    )
}

export default RecievedRefillRequests;

function RefillRequestContent({ onClick, request = {}, callBack }) {

    const [errors, setErrors] = useState(null);
    const [salutation, setSalutation] = useState('Mr.');
    const disableComments = request.status.statusLabel === 'Approved' || request.status.statusLabel === 'Denied';
    const currUser = JSON.parse(localStorage.getItem('pharm'));

    useEffect(() => {
        if (request.patient.gender === 'Male') {
            setSalutation('Mr.');
        } else {
            setSalutation('Ms.');
        }
    }, []);

    const [refillRequest, setRefillRequest] = useState(request);

    const handleChange = (event) => {
        setRefillRequest((prevRequest) => ({ ...prevRequest, [event.target.name]: event.target.value }))
    }

    const updateRequest = () => {
        if (refillRequest.comments === '' && refillRequest.comments === null) {
            setErrors("Comments are mandatory..!")
        }
        console.log("In update : ", refillRequest);
        axios.put("http://localhost:9091/pharmacy/updateRequest", refillRequest)
            .then((resp) => {
                console.log("Request updated..", resp.data);
                callBack(resp.status, refillRequest);
            })
    }

    const formatDate = (dateString) => {
        const date = moment(dateString, 'MM/DD/YYYY, h:mm:ss A');
        console.log(date.toISOString());
        return date.toISOString();
    };

    const handleDeny = () => {
        console.log("clicked");
        const newStatus = {
            statusCode: "DENY",
            statusLabel: "Denied"
        }
        setRefillRequest((prevRequest) => ({ ...prevRequest, user: currUser }));
        setRefillRequest((prevRequest) => ({ ...prevRequest, status: newStatus }));
        setRefillRequest((prevRequest) => ({ ...prevRequest, fulfilledOn: formatDate(new Date().toLocaleString()) }));
        setTimeout(updateRequest(), 2000);
    }

    const handleRefill = () => {
        const newStatus = {
            statusCode: "APPR",
            statusLabel: "Approved"
        }
        setRefillRequest((prevRequest) => ({ ...prevRequest, user: currUser }));
        setRefillRequest((prevRequest) => ({ ...prevRequest, status: newStatus }));
        setRefillRequest((prevRequest) => ({ ...prevRequest, fulfilledOn: formatDate(new Date().toLocaleString()) }));
        setTimeout(updateRequest(), 2000);
    }

    return (
        <div>
            <div style={{ width: 350, height: 330, margin: '0 50px' }}>
                <div style={{ textAlign: 'center', margin: 30 }}>
                    <MyTypography variant="h5"> Refill Details </MyTypography>
                </div>

                <Grid container spacing={2} sx={{ lineHeight: '30px' }}>
                    <Grid Item xs={0.7}></Grid>
                    <Grid Item xs={5}>
                        <MyTypography variant="h6"> Requested By: </MyTypography> <br />
                        <MyTypography variant={'h6'}> Refquested for: </MyTypography>
                        <MyTypography variant="h6"> Refill Requested On: </MyTypography> <br />
                        <MyTypography variant="h6"> Quantity requested for refill: </MyTypography> <br />
                        <MyTypography variant="h6"> Fulfilled Quantity: </MyTypography> <br />
                        <MyTypography variant="h6"> Comments: </MyTypography>
                    </Grid>
                    <Grid Item xs={1}></Grid>
                    <Grid Item xs={5}>
                        <MyTypography variant="body1">  {salutation} {request.patient.firstName + " " + request.patient.lastName} </MyTypography> <br />
                        <MyTypography variant="body1"> {request.medicationDetails.medicationName} </MyTypography> <br />
                        <MyTypography variant="body1"> {request.requestedOn.slice(0, 10)} </MyTypography> <br /> <br />
                        <MyTypography variant="body1"> {request.refillQuantity} </MyTypography> <br /> <br />
                        <TextField
                            variant="standard"
                            requireed
                            multiline
                            required
                            name="fulfilledQuantity"
                            maxRows={2}
                            defaultValue={disableComments ? request.fulfilledQuantity : ''}
                            disabled={disableComments}
                            onChange={handleChange}
                        /><br />
                        <TextField
                            variant="standard"
                            requireed
                            spellCheck
                            multiline
                            required
                            name="comments"
                            maxRows={2}
                            defaultValue={disableComments ? request.comments : ''}
                            disabled={disableComments}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

            </div>

            <MyTypography variant="subititle1" color="red"> {errors} </MyTypography>

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