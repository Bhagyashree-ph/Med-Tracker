import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Autocomplete,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Doctor, Hospital, Patient, Prescription, Role, Status, User } from '../../Classes/Classes';
import MyTypography from '../../assets/themes/MyTypography';

const PrescriptionForm = () => {

  const [title, setTitle] = useState('Register');
  const [patientId, setPatientId] = useState('');
  const [ailment, setAilment] = useState('');
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString());
  const [selectedHospital, setSelectedHospital] = React.useState(null);
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);

  const [hospitals, setHospitals] = useState([
    new Hospital("HOS001", "Apollo Hospital", "123 Main St", "1234567890"),
    new Hospital("HOS002", "Satya Hospital", "123 Main St", "1234567890"),
    new Hospital("HOS003", "Rainbow Hospital", "123 Main St", "1234567890"),
    new Hospital("HOS004", "Suguna Hospital", "123 Main St", "1234567890"),
  ]);

  // after api call of finding doctors by hospital id
  const [doctors, setDoctors] = useState([
    new Doctor("DOC001", "Dr. Ahmed Khan", "Cardiology",
      new Hospital("HOS003", "Apollo Hospital", "123 Main St", "1234567890")),
    new Doctor("DOC002", "Dr. Niteen Kumar", "Cardiology",
      new Hospital("HOS003", "Apollo Hospital", "123 Main St", "1234567890")),
  ]);

  const [prescription, setPrescription] = useState('');

  const handleUploadPrescription = (event) => {
    setPrescription(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    const prescriptionDetails = new Prescription(
      170234,
      selectedHospital,
      doctors[0],
      new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
        new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
          new Role('Patient', 'One who is under medication')
        )
      ),
      ailment,
      startDate || new Date(),
      endDate || new Date(),
      prescription,
      new Status("Active", "Active")
    );
    console.log(prescriptionDetails);
  };

  return (
    <Box sx={{ p: 2 }}>
      <div style={{ lineHeight: '40px' }}>
        <MyTypography variant="h3" style={{ margin: 450 }} >
          {title} Prescription Details
        </MyTypography>
      </div>
      <TextField
        label="Patient ID"
        value={patientId}
        fullWidth
        required
        onChange={(event) => setPatientId(event.target.value)}
        margin="normal"
        sx={{ marginBottom: 2 }}
      />

      <Autocomplete
        disablePortal
        id="hospital"
        options={hospitals}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField required {...params} label="Prescribed At" />}
        getOptionLabel={(option) => option.hospitalName}
        value={selectedHospital}
        onChange={(event, newValue) => {
          setSelectedHospital(newValue);
        }}
        renderOption={(props, option) => (
          <li {...props}>
            {option.hospitalName}
          </li>
        )}
      />


      <Autocomplete
        disablePortal
        id="hospital"
        options={doctors}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} required label="Prescribed By" />}
        getOptionLabel={(option) => option.doctorName}
        value={selectedDoctor}
        onChange={(event, newValue) => {
          setSelectedDoctor(newValue);
        }}
        renderOption={(props, option) => (
          <li {...props}>
            {option.doctorName}
          </li>
        )}
      />

      <TextField
        label="Ailment"
        value={ailment}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        onChange={(event) => setAilment(event.target.value)}
      />

      <TextField
        label="Start Date"
        value={startDate}
        onChange={(event) => setStartDate(event.target.value)}
        type="date"
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="End Date"
        value={endDate}
        onChange={(event) => setEndDate(event.target.value)}
        type="date"
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ marginBottom: 2 }}
      >
        Upload Prescription
        <input
          type="file"
          hidden
          onChange={handleUploadPrescription}
        />
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={handleSubmit} color='info'>
          Submit
        </Button>
      </Box>
    </Box>

  );
};

export default PrescriptionForm;

<Box sx={{ width: '100%' }}>
  <Stepper activeStep={activeStep} sx={{ height: '50px' }}>
    {steps.map((label, index) => {
      const stepProps = {};
      const labelProps = {};
      return (
        <Step key={label} {...stepProps}>
          <StepLabel {...labelProps}>{label}</StepLabel>
        </Step>
      );
    })}
  </Stepper>
  {activeStep === 0 ? (
    <Grid container xs={20}>
      <br />
      <Grid container columnSpacing={10} sx={{ marginBottom: 2.5, marginTop: 2.5 }}>
        <Grid item>
          <MDTypography variant="h6"> Customer ID: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{customer.customerId}</MDTypography>
        </Grid>
      </Grid> <br />
      <Grid container columnSpacing={6.5} sx={{ marginBottom: 2.5 }}>
        <Grid item>
          <MDTypography variant="h6"> Customer Name: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{customer.customerName}</MDTypography>
        </Grid> <br />
      </Grid>
      <Grid container columnSpacing={17.5} sx={{ marginBottom: 2.5 }}>
        <Grid item>
          <MDTypography variant="h6"> Age: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{customer.age}</MDTypography>
        </Grid>
      </Grid> <br />
      <Grid container columnSpacing={14.5} sx={{ marginBottom: 2.5 }}>
        <Grid item>
          <MDTypography variant="h6"> Gender: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{customer.gender}</MDTypography>
        </Grid>
      </Grid> <br />
      <Grid container columnSpacing={10.6} sx={{ marginBottom: 2.5 }}>
        <Grid item>
          <MDTypography variant="h6"> Contact No: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{customer.phone}</MDTypography>
        </Grid>
      </Grid> <br />
      <Grid container columnSpacing={13.5} sx={{ marginBottom: 2.5 }}>
        <Grid item>
          <MDTypography variant="h6"> Address: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{customer.address}</MDTypography>
        </Grid>
      </Grid>
    </Grid>
  ) : activeStep === 1 ? (
    <Grid container xs={20}>
      <br />
      <Grid container columnSpacing={10} sx={{ marginBottom: 1, marginTop: 1.5 }}>
        <Grid item>
          <MDTypography variant="h6"> Bill Number: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{bill.billNumber}</MDTypography>
        </Grid>
      </Grid> <br />
      <Grid container columnSpacing={10} sx={{ marginBottom: 1 }}>
        <Grid item>
          <MDTypography variant="h6"> Invoice On: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{bill.invoicedOn}</MDTypography>
        </Grid>
      </Grid> <br />
      <Grid container columnSpacing={10} sx={{ marginBottom: 1.5 }}>
        <Grid item>
          <MDTypography variant="h6"> Total Bill Amount: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{bill.totalInvoicedAmount}</MDTypography>
        </Grid>
      </Grid> <br />
      <Grid container columnSpacing={10} sx={{ marginBottom: 1.5 }}>
        <Grid item>
          <MDTypography variant="h6"> Adjusted Bill Amount: </MDTypography>
        </Grid>
        <Grid item>
          <MDTypography variant="h6" fontWeight="light">{bill.adjustedBillAmount}</MDTypography>
        </Grid>
      </Grid> <br />
      <Grid item style={{ overflow: 'auto', height: 160 }}>
        <InnerTable
          values={billItems}
          headers={["Bill Item", "Expense Type", "Invoiced Amount", "Invoiced On"]}
          attrib={["billItemNumber", "expenseType", "invoicedAmount", "invoicedOn"]}
        />
      </Grid>
    </Grid>
  ) : (
    <div style={{ marginTop: '20px', height: '300px' }}>
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        zoomMode="fit"
        headerFixed={true}
        style={{ maxHeight: "100%", maxWidth: "100%", overflow: "auto" }}
      />
    </div>
  )}
  {activeStep === steps.length ? (
    <React.Fragment>
      <MDTypography sx={{ mt: 2, mb: 1 }} variant="h6">
        Verification is Complete!
      </MDTypography>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          style={{ fontSize: '14px' }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext} style={{ fontSize: '14px' }} color="inherit">
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </React.Fragment>
  )}
</Box>