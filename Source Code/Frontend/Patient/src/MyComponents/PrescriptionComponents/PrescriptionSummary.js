import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, IconButton } from "@mui/material";
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, PrescriptionDetails, PrescriptionMedicationMapping, Role, Status, User } from "../../Classes/Classes";
import MyTypography from "../../assets/themes/MyTypography";
import { InfoRounded } from "@mui/icons-material";
import InnerTable from "../DynamicTables/InnerTable";
import { useEffect, useState } from "react";
import PrescriptionForm from "./PrescriptionForm";
import { PopupForm } from "../Popup/PopupForm";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import AppBarComponent from "../NavBar/Appbar";

function PrescriptionSummary({ prescriptionDetails }) {

    const { prescriptionId } = useParams();

    const [openDOc, setOpenDoc] = useState(false);

    // data from login
    const patient = new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', ' P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
        new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
            new Role('Patient', 'One who is under medication')
        )
    );

    const [prescription, setPrescription] = useState(
        { "prescriptionId": 1678, "ailment": "Fever", "endDate": "2022-01-10", "prescription": null, "startDate": "2022-01-01", "status": { "statusCode": "ACT", "statusLabel": "Active" }, "patient": { "patientId": "P001", "govtId": "G001", "idType": "Aadhar Card", "firstName": "John", "lastName": "Doe", "dob": "1990-01-01", "age": 32, "gender": "Male", "image": null, "contactNo": "123-456-7890", "emailId": "johndoe@example.com", "address": "123 Main St", "user": { "userId": "U0014", "password": "password123", "role": { "roleName": "PATIENT", "roleDescription": "One who is under medication" } } }, "hospital": { "address": "Delhi", "contactNo": "011-23456789", "hospitalId": "H001", "hospitalName": "Apollo Hospital" }, "doctor": { "doctorId": "D001", "doctorName": "Dr. Rohan Patel", "specialization": "Cardiologist", "hospital": { "address": "Delhi", "contactNo": "011-23456789", "hospitalId": "H001", "hospitalName": "Apollo Hospital" } } }
    );

    const pharmacy = new Pharmacy(
        "PHARM001", // pharmacyId
        'Apollo', // pharmacyName
        'Jayanagar, Bnagalore', // address
        '+91 9283712523', // contactNo
        new User('U002', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
            new Role('Pharmacy', 'One who is providing medication')
        )
    );

    const [prescMed, setPrescMed] = useState([
        new PrescriptionMedicationMapping(1234, prescription,
            new MedicationDetail(
                1, 'Paracetamol', pharmacy, 30, 10
            )),
        new PrescriptionMedicationMapping(2345, prescription,
            new MedicationDetail(
                2, 'Ibuprofen', pharmacy, 20, 5
            )),
        new PrescriptionMedicationMapping(3456, prescription,
            new MedicationDetail(
                3, 'Amoxicillin', pharmacy, 10, 3
            ))
    ]);

    const [open, setOpen] = useState(false);

    const handleUpdate = () => {
        setOpen(true);
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:9090/patient/fetchPrescMedDetails/" + prescriptionId)
                .then((resp) => { setPrescMed(resp.data); setPrescription(resp.data[0].prescriptionDetails) })
                .catch((error) => console.error(error))
        }
        fetchData();
    }, [])

    console.log("updated prescmed : ", prescMed);

    return (
        <AppBarComponent>
            <div style={{ margin: '0 10px' }}>
                <Accordion defaultExpanded>
                    <div style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between' }}>
                        <Link to="/allPrescriptions" style={{ fontSize: "small", marginTop: '15px', textDecoration: 'none' }}>&#8592; Back</Link>
                        {/* <Button color="primary" size="small" variant="contained" style={{ color: 'whitesmoke', marginTop: '15px' }} onClick={handleUpdate} > Update </Button> */}
                    </div>
                    <PopupForm
                        open={open}
                        onClose={() => setOpen(false)}>
                        <PrescriptionForm
                            onClick={() => setOpen(false)}
                            formTitle="Register"
                            prescriptionDetails={prescription}
                            preMed={prescMed}
                        ></PrescriptionForm>
                    </PopupForm>

                    <AccordionSummary
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <MyTypography variant="h4"> Prescription - #{prescriptionId} </MyTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container sx={{ lineHeight: '30px' }} >
                            <Grid item xs={2}>
                                <MyTypography variant="h6">Prescription ID:</MyTypography> <br />
                                <MyTypography variant="h6">Prescribed At:</MyTypography> <br />
                                <MyTypography variant="h6">Prescribed By:</MyTypography> <br />
                                {/* <MyTypography variant="h6">Patient Name:</MyTypography> <br /> */}
                                <MyTypography variant="h6">Status:</MyTypography>
                            </Grid>
                            <Grid item xs={3} >
                                <MyTypography variant="h6" weight='100' > {prescription.prescriptionId} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.hospital.hospitalName} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.doctor.doctorName} </MyTypography> <br />
                                {/* <MyTypography variant="h6" weight='100'> {prescription.patient.patientName} </MyTypography> <br /> */}
                                <MyTypography variant="h6" weight='100'> {prescription.status.statusLabel} </MyTypography>
                            </Grid>
                            <Grid item xs={2}>
                                <MyTypography variant="h6">Ailment:</MyTypography> <br />
                                <MyTypography variant="h6">Start Date:</MyTypography> <br />
                                <MyTypography variant="h6">End Date:</MyTypography> <br />
                                <MyTypography variant="h6">Prescription:</MyTypography> <br />
                            </Grid>
                            <Grid Item xs={3}>
                                <MyTypography variant="h6" weight='100'> {prescription.ailment} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.startDate} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.endDate} </MyTypography> <br />
                                <Button onClick={() => setOpenDoc(true)} > View Prescription </Button>
                            </Grid>
                        </Grid>
                        <PopupForm
                            open={openDOc}
                            onClose={() => setOpen(false)}>
                            <div>
                                <IconButton aria-label="close" onClick={() => setOpenDoc(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
                                    {/* <CloseIcon color="error" /> */}
                                    <CancelSharpIcon color="error" fontSize="large" />
                                </IconButton>
                                {
                                    (prescription.prescription) ? (
                                        <img src={`data:image/jpeg;base64,${prescription.prescription}`} alt="Prescription Was not uploaded" width="600px" height="600px" />
                                    ) : (
                                        <div style={{width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                        <MyTypography variant="h3">Prescription Was not uploaded</MyTypography>
                                        </div>
                                    )
                            }
                            </div>
                        </PopupForm>
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
                        <MyTypography variant="h4"> Medication Details </MyTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <InnerTable
                            values={prescMed}
                            headers={['Medication ID', 'Medication Name', 'Pharmacy Name', 'Quantity Available', 'Refill Threshold']}
                            attrib={['medicationDetails.medicationId', 'medicationDetails.medicationName', 'medicationDetails.pharmacies.pharmacyName', 'medicationDetails.quantity', 'medicationDetails.refillThreshold']}
                        />
                    </AccordionDetails>
                </Accordion>
            </div>
        </AppBarComponent>
    )
}

export default PrescriptionSummary;