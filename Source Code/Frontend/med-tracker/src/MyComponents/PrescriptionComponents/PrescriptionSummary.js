import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Link } from "@mui/material";
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, Prescription, Role, Status, User } from "../../Classes/Classes";
import MyTypography from "../../assets/themes/MyTypography";
import { InfoRounded } from "@mui/icons-material";
import InnerTable from "../DynamicTables/InnerTable";

function PrescriptionSummary() {

    const patient = new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
        new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
            new Role('Patient', 'One who is under medication')
        )
    );

    const prescription = new Prescription(
        17098,
        new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
        new Doctor("DOC001", "Dr. Ahmed Khan", "Cardiology",
            new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890")),
        patient,
        "Fever",
        new Date("2022-01-01T12:00:00.000Z"),
        new Date("2022-01-31T12:00:00.000Z"),
        "file",
        new Status("ACT", "Active")
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

    const medicationDetails = [
        new MedicationDetail(
            1,
            'Paracetamol',
            prescription,
            pharmacy,
            30, // quantity
            10 // refillThreshold
        ),
        new MedicationDetail(
            2,
            'Ibuprofen',
            prescription,
            pharmacy,
            20, // quantity
            5 // refillThreshold
        ),
        new MedicationDetail(
            3,
            'Amoxicillin',
            prescription,
            pharmacy,
            10, // quantity
            3 // refillThreshold
        ),
    ];

    const handleUpdate = () => {

    }

    return (
        <div>
            <div style={{ marginBottom: 10 }}>
                <Accordion defaultExpanded>
                    <div style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between' }}>
                        <Link to="" style={{ fontSize: "small", marginTop: '15px' }}>&#8592; Back</Link>
                        <Button color="primary" size="small" variant="contained" style={{ color: 'whitesmoke', marginTop: '15px' }} onClick={handleUpdate} > Update </Button>
                    </div>

                    <AccordionSummary
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <MyTypography variant="h4"> Prescription - #{prescription.prescriptionId} </MyTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container sx={{ lineHeight: '30px' }} >
                            <Grid item xs={2}>
                                <MyTypography variant="h6">Prescription ID:</MyTypography> <br />
                                <MyTypography variant="h6">Prescribed At:</MyTypography> <br />
                                <MyTypography variant="h6">Prescribed By:</MyTypography> <br />
                                <MyTypography variant="h6">Patient ID:</MyTypography> <br />
                                <MyTypography variant="h6">Status:</MyTypography>
                            </Grid>
                            <Grid item xs={3} >
                                <MyTypography variant="h6" weight='100' > {prescription.prescriptionId} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.prescribedAt.hospitalName} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.prescribedBy.doctorName} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.patientId.patientName} </MyTypography> <br />
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
                                <MyTypography variant="h6" weight='100'> {prescription.startDate.toLocaleDateString()} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.endDate.toLocaleDateString()} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.prescription} </MyTypography> <br />
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
                        <MyTypography variant="h4"> Medication Details </MyTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <InnerTable
                            values={medicationDetails}
                            headers={['Medication ID', 'Medication Name', 'Pharmacy Name', 'Quantity Available', 'Refill Threshold']}
                            attrib={['medicationId', 'medicationName', 'pharmacy.pharmacyName', 'quantity', 'refillThreshold']}
                        />
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default PrescriptionSummary;