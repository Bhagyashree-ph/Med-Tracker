import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Box, OutlinedInput, InputAdornment, IconButton, Autocomplete, Stepper, Step, StepLabel,
  TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Input, FormControl, Select, MenuItem,
  Chip, Grid, InputLabel,
  Backdrop,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Doctor, Hospital, MedicationDetail, Patient, PrescriptionDetails, Reminder, Role, Status, User } from '../../Classes/Classes';
import MyTypography from '../../assets/themes/MyTypography';
import { Cancel } from '@mui/icons-material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

const PrescriptionForm = ({ onClick, preMed = [], formTitle, callBack }) => {

  console.log("Local storage : ", localStorage.getItem("patient"));

  const patient = JSON.parse(localStorage.getItem("patient"));
  const [errors, setErrors] = useState({
    hospital: '',
    doctor: '',
    ailment: '',
    startDate: '',
    endDate: '',
    prescription: '',
    medicationName: '',
    pharmacyName: '',
    quantity: '',
    refillThreshold: '',
    dosageTime: '',
  });

  const [preMedDetails, setpreMedDetails] = useState(preMed || []);
  const [title, setTitle] = useState(formTitle || 'Register');
  const [ailment, setAilment] = useState(preMed[0]?.prescriptionDetails?.ailment ?? '');
  const [startDate, setStartDate] = useState(preMed[0]?.prescriptionDetails?.startDate ?? new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(preMed[0]?.prescriptionDetails?.endDate ?? new Date().toISOString().slice(0, 10));
  const [selectedHospital, setSelectedHospital] = React.useState(null);
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);
  const steps = ['Prescription Details', 'Medication Details'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [presDoc, setPresDoc] = useState(null);
  const [docName, setDocName] = useState("Document");
  const [begin, setBegin] = useState(false);

  const handleImageChange = (event) => {
    setErrors((prevErrors) => ({ ...prevErrors, prescription: '' }));
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPresDoc(reader.result.split(',')[1]);
      setDocName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const [hospitals, setHospitals] = useState([]);

  // after api call of finding doctors by hospital id
  const [doctors, setDoctors] = useState([]);

  const handleHospitalUpdate = (data) => {
    setHospitals(data);
  }

  const handleDoctorUpdate = (data) => {
    setDoctors(data);
  }

  useEffect(() => {
    async function fetchDataa() {
      await axios.get("http://localhost:9090/patient/fetchAllHospitals")
        .then((response) => handleHospitalUpdate(response.data))
        .catch((error) => console.error(error))
        .then(
          await axios.get("http://localhost:9090/patient/fetchAllDoctors")
            .then((res) => handleDoctorUpdate(res.data))
        ).catch(error => {
          console.error(error)
        }
        )
    }
    fetchDataa();
  }, [])

  const [prescription, setPrescription] = useState(
    preMed[0]?.prescriptionDetails || null
  );


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let isValid = true;
    if (!selectedHospital) {
      setErrors((prevErrors) => ({ ...prevErrors, hospital: 'Please select a hospital.' }));
      isValid = false;
    }

    if (!selectedDoctor) {
      setErrors((prevErrors) => ({ ...prevErrors, doctor: 'Please select a doctor.' }));
      isValid = false;
    }

    if (!ailment) {
      setErrors((prevErrors) => ({ ...prevErrors, ailment: 'Please enter an ailment.' }));
      isValid = false;
    }

    if (!startDate) {
      setErrors((prevErrors) => ({ ...prevErrors, ailment: 'Please select an start date.' }));
      isValid = false;
    }
    if (!endDate) {
      setErrors((prevErrors) => ({ ...prevErrors, endDate: 'Please select an end date.' }));
      isValid = false;
    }
    if (!presDoc) {
      setErrors((prevErrors) => ({ ...prevErrors, prescription: 'Please upload prescription.' }));
      isValid = false;
    }
    if (isValid) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [times, setTimes] = useState([
    {
      id: 1,
      value: '2022-07-25T08:00:00.000-05:00',
      label: '8:00:00 AM'
    },
    {
      id: 2,
      value: '2022-07-25T12:00:00.000-05:00',
      label: '12:00:00 PM'
    },
    {
      id: 3,
      value: '2022-07-25T16:00:00.000-05:00',
      label: '4:00:00 PM'
    },
    {
      id: 4,
      value: '2022-07-25T20:00:00.000-05:00',
      label: '8:00:00 PM'
    }
  ]);

  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleSelect = (event) => {
    const selectedTime = event.target.value;
    setSelectedTimes((prevTimes) => [...prevTimes, selectedTime]);
    console.log("Selected time : ", selectedTime);
  };

  const handleSelectChange = (event, index) => {
    setErrors((prevErrors) => ({ ...prevErrors, dosageTime: [] }));
    const { value } = event.target;
    setTableData((prevData) => {
      const newRow = { ...prevData[index] };
      newRow.dosageTime = [...newRow.dosageTime, value];
      return [...prevData.slice(0, index), newRow, ...prevData.slice(index + 1)];
    });
    console.log("Selected time : ", value.value);

  };

  const handleDelete = (timeId, rowIndex) => {
    setTableData((prevData) => {
      const newRow = { ...prevData[rowIndex] };
      newRow.dosageTime = newRow.dosageTime.filter((time) => time.id !== timeId);
      return [...prevData.slice(0, rowIndex), newRow, ...prevData.slice(rowIndex + 1)];
    });
  };

  const handleCancel = () => {
    onClick();
  }

  const [tableData, setTableData] = useState([
    { medicationName: '', pharmacyName: '', quantity: '', refillThreshold: '', dosageTime: [] }
  ]);

  const handleTextFieldChange = (event, index, columnName) => {
    const { value } = event.target;
    setTableData((prevData) => {
      const newRow = { ...prevData[index] };
      newRow[columnName] = value;
      return [...prevData.slice(0, index), newRow, ...prevData.slice(index + 1)];
    });
  };

  const createPreMed = async () => {
    setBegin(true);
    // console.log("Selected hospital : ", selectedHospital);
    // console.log("selected doctor : ", selectedDoctor);

    const preMedArray = new Array();

    tableData.map((data, i) => {
      preMedArray.push(
        {
          "mappingId": 321341 + i,
          "medicationDetails": {
            "medicationId": 94420,
            "medicationName": data.medicationName,
            "quantity": data.quantity,
            "refillThreshold": data.refillThreshold,
            "pharmacies": {
              "address": "Delhi",
              "contactNo": "011-23456789",
              "pharmacyId": "P001",
              "pharmacyName": "Aarogya Pharmacy",
              "users": {
                "userId": "U002",
                "password": "password@123",
                "role": {
                  "roleName": "PHARMACIST",
                  "roleDescription": "One who refills medication"
                }
              }
            }
          },
          "prescriptionDetails": {
            "prescriptionId": 198359,
            "ailment": ailment,
            "endDate": endDate,
            "prescription": presDoc,
            "startDate": startDate,
            "status": {
              "statusCode": "ACT",
              "statusLabel": "Active"
            },
            "patient": patient,
            "doctor": selectedDoctor,
            "hospital": selectedHospital
          }
        }
      )

      if (preMedArray.length >= 1) {
        setpreMedDetails(preMedArray);
      }
    })

    console.log("preMedDetails.. : ", preMedArray);
    const reminders = new Array();
    let i = 23456;
    const returnedObj = await axios.post("http://localhost:9090/patient/AddPreMedDetails", preMedArray)
      .then((response) => {
        console.log("Returned premed : ", response.data);
        setpreMedDetails(response.data);
        response.data.map((resp) => {
          tableData.map((data) => {
            data.dosageTime.map((time) => {
              if (resp.medicationDetails.medicationName.toLowerCase() === data.medicationName.toLowerCase()) {
                const newReminder = {
                  // "reminderId": i+=1,
                  "medicationDetail": resp.medicationDetails,
                  "patient": patient,
                  "remindOn": time.value
                }
                reminders.push(newReminder);
              }
            })
          })
        })
        console.log("Inside then of first apii");
        axios.post("http://localhost:9090/patient/setReminders", reminders)
          .then((resp) => {
            console.log("Returned reminder : ", resp.data);
            callBack(resp.status);
            setBegin(false);
            return resp.data
          })
          .catch((error) => console.error(error))

      })
      .catch((error) => console.error(error))

    console.log("returnedPreMed :", preMedDetails);

  };

  const handleSubmit = () => {
    let isValid = true;
    if (tableData.length > 0) {
      tableData.map((data) => {
        if (!data.medicationName) {
          setErrors((prevErrors) => ({ ...prevErrors, medicationName: 'Please enter medication name.' }));
          isValid = false;
        }
        //if (!data.pharmacyName) {
         // setErrors((prevErrors) => ({ ...prevErrors, pharmacyName: 'Please enter Pharmacy Name' }));
         // isValid = false;
      //  }
        if (!data.quantity) {
          setErrors((prevErrors) => ({ ...prevErrors, quantity: 'Please enter available quantity.' }));
          isValid = false;
        }
        if (!data.refillThreshold) {
          setErrors((prevErrors) => ({ ...prevErrors, refillThreshold: 'Please enter refill threshold.' }));
          isValid = false;
        }
        if (data.dosageTime.length <= 0) {
          setErrors((prevErrors) => ({ ...prevErrors, dosageTime: 'Please select a dosage time.' }));
          isValid = false;
        }
      })
    }

    if (isValid) {
      createPreMed();
    }
  }

  return (
    <Box sx={{ p: 1, width: 800, height: 750 }}>
      <div style={{ lineHeight: '40px', textAlign: 'center', position: 'sticky' }}>
        <MyTypography variant="h3" >
          {title} Prescription Details
        </MyTypography>
      </div>
      <Backdrop
        sx={{ color: '#fff', display: 'inline-block', textAlign: 'center', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={begin}
      >

        <CircularProgress size="60px" color="inherit" /> <br />
        <MyTypography variant="h6" color="white"> LOADING... </MyTypography>
      </Backdrop>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} sx={{ height: '50px', position: 'sticky' }}>
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
        {
          (activeStep === 0) ? (
            <div>
              <Autocomplete
                disablePortal
                id="hospital"
                options={hospitals}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
                defaultValue={preMed[0]?.prescriptionDetails?.hospital?.hospitalName}
                renderInput={(params) => <TextField required {...params} label="Prescribed At" />}
                getOptionLabel={(option) => option.hospitalName}
                value={selectedHospital}
                onChange={(event, newValue) => {
                  setSelectedHospital(newValue);
                  setErrors((prevErrors) => ({ ...prevErrors, hospital: '' }));
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.hospitalName}
                  </li>
                )}
              />
              <MyTypography variant="body1" color="red">{errors.hospital ?? errors.hospital}</MyTypography>

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
                  setErrors((prevErrors) => ({ ...prevErrors, doctor: '' }));
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.doctorName}
                  </li>
                )}
              />
              <MyTypography variant="body1" color="red">{errors.doctor ?? errors.doctor}</MyTypography>

              <TextField
                label="Ailment"
                value={ailment}
                fullWidth
                required
                error={errors.ailment}
                sx={{ marginBottom: 2 }}
                onChange={(event) => {
                  setAilment(event.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, ailment: '' }));
                }}
              />
              <MyTypography variant="body1" color="red">{errors.ailment ?? errors.ailment}</MyTypography>

              <TextField
                label="Start Date"
                value={startDate}
                onChange={(event) => {
                  setStartDate(event.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, startDate: '' }));
                }}
                type="date"
                fullWidth
                required
                error={errors.startDate}
                helperText={errors.startDate}
                sx={{ marginBottom: 2 }}
                inputProps={{ min: new Date().toISOString().slice(0, 10) }}
              />
              {/* <MyTypography variant="body1" color="red">{errors.startDate ?? errors.startDate}</MyTypography> */}

              <TextField
                label="End Date"
                value={endDate}
                onChange={(event) => {
                  setEndDate(event.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, endDate: '' }));
                }}
                type="date"
                fullWidth
                required
                error={errors.endDate}
                helperText={errors.endDate}
                sx={{ marginBottom: 2 }}
                inputProps={{ min: startDate }}
              />
              <MyTypography variant="body1" color="red">{errors.endDate ?? errors.endDate}</MyTypography>

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
                  onChange={handleImageChange}
                />
              </Button>
              <MyTypography variant="body1" color="red">{errors.prescription ?? errors.prescription}</MyTypography>
              <br />
              {
                (presDoc) &&
                <MyTypography variant="body1"> {docName} Uploaded </MyTypography>
              }

            </div>

          ) : (
            <div>
              <IconButton
                style={{ fontSize: 20, backgroundColor: '#5cb85c', height: 27, width: 27, color: 'whitesmoke' }}
                onClick={() => { setTableData(prevData => [...prevData, { medicationName: '', pharmacyName: '', quantity: '', refillThreshold: '', dosageTime: [] },]) }}
              >
                <AddIcon />
              </IconButton>

              <div style={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer style={{ height: '400px' }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Sl No</TableCell>
                        <TableCell>Medication Name</TableCell>
                       
                        <TableCell>Quantity Available</TableCell>
                        <TableCell>Refill Threshold</TableCell>
                        <TableCell>Dosage Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell> {i + 1} </TableCell>
                          <TableCell>
                            <TextField
                              name='medicationName'
                              variant='standard'
                              fullWidth
                              InputProps={{
                                disableUnderline: true
                              }}
                              defaultValue={preMed[i]?.medicationDetails?.medicationName ?? ''}
                              onChange={(event) => {
                                handleTextFieldChange(event, i, 'medicationName');
                                setErrors((prevErrors) => ({ ...prevErrors, medicationName: '' }));
                              }}
                            />
                            <MyTypography variant="body1" color="red">{errors.medicationName ?? errors.medicationName}</MyTypography>
                            {/* {console.log("Medication name : ", tableData)} */}
                          </TableCell>
                       
                          <TableCell>
                            <TextField
                              name='quantity'
                              variant='standard'
                              fullWidth
                              InputProps={{
                                disableUnderline: true
                              }}
                              defaultValue={preMed[i]?.medicationDetails?.quantity ?? ''}
                              onChange={(event) => {
                                handleTextFieldChange(event, i, 'quantity');
                                setErrors((prevErrors) => ({ ...prevErrors, quantity: '' }));
                              }}
                            />
                            <MyTypography variant="body1" color="red">{errors.quantity ?? errors.quantity}</MyTypography>
                          </TableCell>
                          <TableCell>
                            <TextField
                              name='refillThreshold'
                              variant='standard'
                              fullWidth
                              InputProps={{
                                disableUnderline: true
                              }}
                              defaultValue={preMed[i]?.medicationDetails?.refillThreshold ?? ''}
                              onChange={(event) => {
                                handleTextFieldChange(event, i, 'refillThreshold');
                                setErrors((prevErrors) => ({ ...prevErrors, refillThreshold: '' }));
                              }}
                            />
                            <MyTypography variant="body1" color="red">{errors.refillThreshold ?? errors.refillThreshold}</MyTypography>
                          </TableCell>
                          <TableCell style={{width: '200px'}}>
                            <div style={{ marginBottom: 10 }}>
                              <FormControl fullWidth style={{ marginBottom: 10 }}>
                                <Select
                                  defaultValue={times[0]}
                                  value={row.dosageTime}
                                  onChange={(event) => handleSelectChange(event, i)}
                                  // onChange={handleSelect}
                                  fullWidth
                                  style={{ height: 40 }}
                                >
                                  {/* {console.log(selected)} */}
                                  {times.map((time) => (
                                    <MenuItem key={time.id} value={time}>
                                      {time.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              {/* {console.log('selectedTimes : ', selectedTimes)} */}
                              {row.dosageTime.map((time) => (
                                <Chip
                                  key={time.id}
                                  label={time.label}
                                  onDelete={() => handleDelete(time.id, i)}
                                  deleteIcon={<Cancel />}
                                />
                              ))}
                            </div>
                            <MyTypography variant="body1" color="red">{errors.dosageTime ?? errors.dosageTime}</MyTypography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          )}
        {activeStep === steps.length ? (
          <React.Fragment>
            <MyTypography sx={{ mt: 2, mb: 1 }} variant="h6">
              Prescription has been registered!
            </MyTypography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                style={{ fontSize: '14px' }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} style={{ fontSize: '14px' }} disabled={activeStep === steps.length - 1} >
                {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>

      <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
        <Button
          sx={{
            backgroundColor: 'grey.500',
            '&:hover': {
              backgroundColor: 'grey.500',
            },
          }}
          variant="contained"
          size="small"
          onClick={handleCancel}
        > Cancel </Button>
        {
          (activeStep === steps.length - 1) &&
          <Button type="submit" variant="contained" size="small" color="primary" onClick={handleSubmit} > Prescribe </Button>
        }
      </div>

    </Box>

  );
};

export default PrescriptionForm;
