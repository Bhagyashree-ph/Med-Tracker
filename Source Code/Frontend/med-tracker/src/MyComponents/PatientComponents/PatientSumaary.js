import { Step, Stepper, StepLabel, StepContent, Grid, Typography, Button, StepButton, Box, Link } from '@mui/material';
import { Doctor, Hospital, MedicationDetail, Patient, Pharmacy, Prescription, Role, Status, User } from '../../Classes/Classes';
import MyTypography from '../../assets/themes/MyTypography';
import InnerTable from '../DynamicTables/InnerTable';
import React, { useState } from 'react';
import MyAvatar from '../Avatar/MyAvatar';
import imageUrl from '../../assets/images/profile.png'

function PatientSummary() {
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

    const steps = ['Patient Details', 'Prescription Details', 'Medication Details'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [viewPrescription, setViewPrescription] = useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleUpdate = () => {

    }

    return (
        <div>

            <div style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between' }}>
                <Link to="" style={{ fontSize: "small", marginTop: '15px' }}>&#8592; Back</Link>
                <Button color="primary" size="small" variant="contained" style={{ color: 'whitesmoke', marginTop: '15px' }} onClick={handleUpdate} > Update </Button>
            </div>

            <div style={{ display: 'flex', margin: 10 }}>
                <MyAvatar
                    name={patient.patientName}
                    image={patient.image}
                    sx={{ height: 80, width: 80, fontSize: 25 }}
                /> &nbsp;&nbsp;&nbsp;
                <MyTypography variant="h3" style={{ marginTop: '25px' }}> #{patient.patientId} </MyTypography>
            </div>

            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>

            {activeStep === 0 && (
                <Grid container spacing={3} xs={12} sx={{ margin: '10px 0', lineHeight: '33px' }}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                        <MyTypography variant="h6">Govt. ID:</MyTypography> <br />
                        <MyTypography variant="h6">ID Type:</MyTypography> <br />
                        <MyTypography variant="h6">Patient Name:</MyTypography> <br />
                        <MyTypography variant="h6">Date Of Birth:</MyTypography> <br />
                        <MyTypography variant="h6">Age:</MyTypography> <br />
                        <MyTypography variant="h6">Gender:</MyTypography> <br />
                        <MyTypography variant="h6">Contact no.:</MyTypography> <br />
                        <MyTypography variant="h6" >Email ID:</MyTypography> <br />
                        <MyTypography variant="h6" >Address:</MyTypography>
                    </Grid>
                    <Grid item xs={3}>
                        <MyTypography variant="h6" weight='100' > {patient.govtId} </MyTypography> <br />
                        <MyTypography variant="h6" weight='100'> {patient.idType} </MyTypography> <br />
                        <MyTypography variant="h6" weight='100'> {patient.patientName} </MyTypography> <br />
                        <MyTypography variant="h6" weight='100'> {patient.dob} </MyTypography> <br />
                        <MyTypography variant="h6" weight='100'> {patient.age} years </MyTypography> <br />
                        <MyTypography variant="h6" weight='100'> {patient.gender} </MyTypography> <br />
                        <MyTypography variant="h6" weight='100'> {patient.contactNo} </MyTypography> <br />
                        <MyTypography variant="h6" weight='100'> {patient.emailId} </MyTypography> <br />
                        <MyTypography variant="h6" weight='100'> {patient.address} </MyTypography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            )}
            {activeStep === 1 && (
                <Grid container spacing={1} xs={12} height={'380px'}>
                    <Grid item xs={6}>
                        <Grid container spacing={1} width="100%" sx={{ margin: '10px 0', lineHeight: '33px' }}>
                            <Grid item ></Grid>
                            <Grid item xs={6}>
                                <MyTypography variant="h6">Prescription ID:</MyTypography> <br />
                                <MyTypography variant="h6">Prescribed At:</MyTypography> <br />
                                <MyTypography variant="h6">Prescribed By:</MyTypography> <br />
                                <MyTypography variant="h6">Patient ID:</MyTypography> <br />
                                <MyTypography variant="h6">Status:</MyTypography> <br />
                                <MyTypography variant="h6">Ailment:</MyTypography> <br />
                                <MyTypography variant="h6">Start Date:</MyTypography> <br />
                                <MyTypography variant="h6">End Date:</MyTypography> <br />
                                <MyTypography variant="h6">Prescription:</MyTypography> <br />
                            </Grid>
                            <Grid item xs={5}>
                                <MyTypography variant="h6" weight='100' > {prescription.prescriptionId} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.prescribedAt.hospitalName} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.prescribedBy.doctorName} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.patientId.patientName} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.status.statusLabel} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.ailment} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.startDate.toLocaleDateString()} </MyTypography> <br />
                                <MyTypography variant="h6" weight='100'> {prescription.endDate.toLocaleDateString()} </MyTypography> <br />
                                <Button onClick={() => setViewPrescription(true)} > View Prescription </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ overflow: 'auto' }}>
                        {
                            viewPrescription && (
                                <img src={prescription.prescription} alt='Proof for prescription was not provided' width={"100%"} height={'380px'} ></img>
                            )}
                    </Grid>
                </Grid>
            )}
            {activeStep === 2 && (
                <div style={{ margin: '10px 0' }}>
                    <InnerTable
                        values={medicationDetails}
                        headers={['Medication ID', 'Medication Name', 'Pharmacy Name', 'Quantity Available', 'Refill Threshold']}
                        attrib={['medicationId', 'medicationName', 'pharmacy.pharmacyName', 'quantity', 'refillThreshold']}
                    />
                </div>
            )}

            <div>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "space-between" }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                        disabled={activeStep === steps.length - 1}
                        onClick={handleNext} sx={{ mr: 1 }}
                    >
                        Next
                    </Button>
                </Box>
            </div>
        </div>
    );
}

export default PatientSummary;