import { Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import AppBarComponent from "../NavBar/Appbar";
import MyTypography from "../../assets/themes/MyTypography";
import React, { useEffect, useState } from "react";
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import axios from "axios";
import Notifications from "../ReminderComponents/Notifications";

export default function PatientHome() {

    const patient = JSON.parse(localStorage.getItem('patient'));
    // console.log("patient : ", patient);

    const [providers, setProviders] = useState([]);
    const [presc, setPresc] = useState([]);
    const [actPresc, setActPresc] = useState([]);
    const [refillRate, setRefillRate] = useState(0);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:9090/patient/fetchAllProviders")
                .then((resp) => { setProviders(resp.data);  })
                .catch((err) => console.error(err))

            await axios.get("http://localhost:9090/patient/fetchAllPrescriptions/" + patient.patientId)
                .then((resp) => {
                    setPresc(resp.data);
                    const actives = resp.data.filter(p => p.status.statusLabel.toLowerCase() === 'active');
                    setActPresc(actives);
                })
                .catch((err) => console.error(err))

            await axios.get("http://localhost:9090/patient/fetchAllRequests/" + patient.patientId)
                .then((resp) => {
                    const requests = resp.data;
                    const succRequests = requests.filter(req => req.status.statusLabel.toLowerCase() === 'approved');
                    console.log("Requests : ", requests, "Success : ", succRequests);
                    setRefillRate(Math.ceil((succRequests.length / requests.length) * 100));
                })
                .catch((err) => console.error(err))
        }
        fetchData();
    }, [])

    // console.log("providers : ", providers);

    return (
        <AppBarComponent>
            <div>
                <Grid container spacing={2} height='100%' >

                    <Grid item xs={9} sx={{ margin: '20px 0px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Card raised style={{ width: '200px', height: '120px' }}>
                                <CardContent>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <PostAddOutlinedIcon fontSize="large" />
                                        <div style={{ textAlign: 'center' }}>
                                            <MyTypography variant="h6">Total Prescriptions</MyTypography> <br />
                                            <MyTypography variant="h3"> {presc.length} </MyTypography>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card raised style={{ width: '200px', height: '120px' }}>
                                <CardContent>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <MedicationOutlinedIcon fontSize="large" color="success" />
                                        <div style={{ textAlign: 'center' }}>
                                            <MyTypography variant="h6">Active Medications</MyTypography> <br />
                                            <MyTypography variant="h3"> {actPresc.length} </MyTypography>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card raised style={{ width: '200px', height: '120px' }}>
                                <CardContent>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <UpdateOutlinedIcon fontSize="large" />
                                        <div style={{ textAlign: 'center' }}>
                                            <MyTypography variant="h6">Refill Sussess Rate</MyTypography> <br />
                                            <MyTypography variant="h3"> {refillRate}% </MyTypography>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div style={{ height: '400px', margin: '20px 10px 0 20px' }} >
                            <Paper sx={{ height: '360px', overflow: 'auto', display: 'block' }}>
                                <TableContainer>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" style={{ backgroundColor: '#a3c8ed' }}>
                                                    <MyTypography variant="h6" color="#4c4c4c"> Sl no. </MyTypography>
                                                </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a3c8ed' }}>
                                                    <MyTypography variant="h6" color="#4c4c4c">Provider Name</MyTypography>
                                                </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a3c8ed' }}>
                                                    <MyTypography variant="h6" color="#4c4c4c">Contact No.</MyTypography>
                                                </TableCell>
                                                <TableCell align="center" style={{ backgroundColor: '#a3c8ed' }}>
                                                    <MyTypography variant="h6" color="#4c4c4c">Address</MyTypography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                (providers.length > 0) ? (
                                                    providers.map((provider, i) => (
                                                        <TableRow>
                                                            <TableCell align="center">
                                                                <MyTypography variant="subtitle1"> {i + 1} </MyTypography>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <MyTypography variant="subtitle1"> {provider.HOSPITALNAME} </MyTypography>
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <MyTypography variant="subtitle1"> {provider.CONTACTNO} </MyTypography>
                                                            </TableCell>
                                                            <TableCell style={{ width: '300px' }} align="center">
                                                                <MyTypography variant="subtitle1"> {provider.ADDRESS} </MyTypography>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <MyTypography variant='body1'>No data available..</MyTypography>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={providers.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div style={{ height: '100%' }}>
                            <Card raised style={{ height: '520px', width: '100%', borderRadius: 10 }}  >
                                <CardContent>
                                    <Notifications />
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </AppBarComponent>
    )
}