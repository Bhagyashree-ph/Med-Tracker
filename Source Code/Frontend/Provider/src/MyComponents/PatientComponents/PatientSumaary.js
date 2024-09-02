import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Button, CircularProgress, Grid, IconButton, Link } from "@mui/material";
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, PrescriptionDetails, Role, Status, User } from "../../Classes/Classes";
import MyTypography from "../../assets/themes/MyTypography";
import { InfoRounded } from "@mui/icons-material";
import InnerTable from "../DynamicTables/InnerTable";
import MyAvatar from "../Avatar/MyAvatar";
import { PopupForm } from "../Popup/PopupForm";
import PatientForm from "./PatientForm";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProviderAppBar from "../NavBar/ProviderAppBar";

function PatientSummary() {

    const { patientId } = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [openDOc, setOpenDoc] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);

    const handleUpdate = () => {
        changeDialogState(true);
    }

    const changeDialogState = (val) => {
        setOpen(val)
    }

    const handlePrevPage = () => {
        navigate(-1);
    }

    const handlePreMedUpdate = (data) => {
        setPreMedMapping(data);
        console.log("data : ", data);
        const uniquePrescriptions = data.reduce((acc, current) => {
            if (!acc.find(p => p.prescriptionId === current.prescriptionDetails.prescriptionId)) {
                acc.push(current.prescriptionDetails);
            }
            return acc;
        }, []);
        setPrescriptions(uniquePrescriptions);
    }

    const [preMedMapping, setPreMedMapping] = useState([]);

    async function fetchDataa() {
        axios.get(`http://localhost:9093/provider/fetchPatientById/${patientId}`)
            .then((response) => handlePreMedUpdate(response.data))
            .catch(error => {
                if (error.code === 'ERR_NETWORK') {
                    console.error('Network error:', error.message);
                } else {
                    console.error('Error:', error.message);
                }
            });
    }

    useEffect(() => {

        fetchDataa();
        return () => { }
    }, [])

    const fullname = (preMedMapping[0]?.prescriptionDetails?.patient?.firstName + ' ' + preMedMapping[0]?.prescriptionDetails?.patient?.lastName);

    console.log("preMedMapping : ", preMedMapping);

    return (
        <div style={{ marginTop: '45px' }}>
            <ProviderAppBar />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={preMedMapping.length <= 0}
            >
                <CircularProgress size="60px" color="inherit" /> <br/>
                {/* <MyTypography variant="h6" color="white"> LOADING... </MyTypography> */}
            </Backdrop>

            <div>
                <div style={{ marginBottom: 10 }}>
                    <Accordion defaultExpanded>
                        <div style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="text" style={{ fontSize: "small", marginTop: '15px' }} onClick={handlePrevPage} >&#8592; Back </Button>
                            {/* <Button color="primary" size="small" variant="contained" style={{ color: 'whitesmoke', marginTop: '15px' }} onClick={handleUpdate} > Update </Button> */}

                            <PopupForm
                                open={open}
                                onClose={() => changeDialogState(false)}>
                                <PatientForm
                                    onClick={() => changeDialogState(false)}
                                    preMed={preMedMapping}
                                    formTitle="Modify"
                                    btnValue="Update"
                                ></PatientForm>
                            </PopupForm>

                        </div>

                        <AccordionSummary
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <div style={{ display: 'flex' }}>
                                <MyAvatar
                                    name={fullname}
                                    image={preMedMapping[0]?.prescriptionDetails?.patient?.image ? `data:image/jpeg;base64,${preMedMapping[0]?.prescriptionDetails?.patient?.image}` : null}
                                    sx={{ height: 70, width: 70, fontSize: 25 }}
                                /> &nbsp;&nbsp;&nbsp;
                                <MyTypography variant="h3" style={{ marginTop: '25px' }}> #{patientId} </MyTypography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container sx={{ lineHeight: '30px' }} >
                                <Grid item xs={2}>
                                    <MyTypography variant="h6">Govt. ID:</MyTypography> <br />
                                    <MyTypography variant="h6">Patient Name:</MyTypography> <br />
                                    <MyTypography variant="h6">Date Of Birth:</MyTypography> <br />
                                    <MyTypography variant="h6">Contact no.:</MyTypography> <br />
                                    <MyTypography variant="h6" >Address:</MyTypography>
                                </Grid>
                                <Grid item xs={3} >
                                    <MyTypography variant="h6" weight='100' > {preMedMapping[0]?.prescriptionDetails?.patient?.govtId ?? ''} </MyTypography> <br />
                                    <MyTypography variant="h6" weight='100' > {preMedMapping[0]?.prescriptionDetails?.patient?.firstName ?? ''} {preMedMapping[0]?.prescriptionDetails?.patient?.lastName ?? ''} </MyTypography> <br />
                                    <MyTypography variant="h6" weight='100' > {preMedMapping[0]?.prescriptionDetails?.patient?.dob ?? ''} </MyTypography> <br />
                                    <MyTypography variant="h6" weight='100' > {preMedMapping[0]?.prescriptionDetails?.patient?.contactNo ?? ''} </MyTypography> <br />
                                    <MyTypography variant="h6" weight='100' > {preMedMapping[0]?.prescriptionDetails?.patient?.address ?? ''} </MyTypography>
                                </Grid>
                                <Grid item xs={2}>
                                    <MyTypography variant="h6">ID Type:</MyTypography> <br />
                                    <MyTypography variant="h6">Gender:</MyTypography> <br />
                                    <MyTypography variant="h6">Age:</MyTypography> <br />
                                    <MyTypography variant="h6" >Email ID:</MyTypography>
                                </Grid>
                                <Grid Item xs={3}>
                                    <MyTypography variant="h6" weight='100' > {preMedMapping[0]?.prescriptionDetails?.patient?.idType ?? ''} </MyTypography> <br />
                                    <MyTypography variant="h6" weight='100' > {preMedMapping[0]?.prescriptionDetails?.patient?.gender ?? ''} </MyTypography> <br />
                                    <MyTypography variant="h6" weight='100' > {preMedMapping[0]?.prescriptionDetails?.patient?.age ?? ''} </MyTypography> <br />
                                    <MyTypography variant="h6" weight='100' > {preMedMapping[0]?.prescriptionDetails?.patient?.emailId ?? ''} </MyTypography>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel2-content"
                            id="panel2-header"
                            expandIcon={<InfoRounded />}
                        >
                            <MyTypography variant="h4"> Prescription Details </MyTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <InnerTable
                                values={prescriptions}
                                headers={['Prescription ID', 'Prescribed By', 'Ailment', 'Start Date', 'End Date', 'Status']}
                                attrib={['prescriptionId', 'doctor.doctorName', 'ailment', 'startDate', 'endDate', 'status.statusLabel']}
                            />
                            {/* <Button onClick={() => setOpenDoc(true)} > View Prescription </Button> */}

                            <PopupForm
                                open={openDOc}
                                onClose={() => changeDialogState(false)}>
                                <div style={{ width: '500px', height: '500px' }}>
                                    <IconButton aria-label="close" onClick={() => setOpenDoc(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>

                                        <CloseIcon />

                                    </IconButton>
                                    <img src={preMedMapping[0]?.prescriptionDetails?.prescription} alt="Prescription Was not uploaded" />
                                </div>
                            </PopupForm>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel3-content"
                            id="panel3-header"
                            expandIcon={<InfoRounded />}
                        >
                            <MyTypography variant="h4"> Medication Details </MyTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <InnerTable
                                values={preMedMapping}
                                headers={['Prescription ID', 'Medication ID', 'Medication Name', 'Pharmacy Name', 'Quantity Available', 'Refill Threshold']}
                                attrib={['prescriptionDetails.prescriptionId', 'medicationDetails.medicationId', 'medicationDetails.medicationName', 'medicationDetails.pharmacies.pharmacyName', 'medicationDetails.quantity', 'medicationDetails.refillThreshold']}
                            />
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default PatientSummary;