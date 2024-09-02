import { Patient, Role, User } from "../../Classes/Classes"
import MyAvatar from "../Avatar/MyAvatar";
import { Avatar, Button, Grid, InputAdornment, TableContainer, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import { PopupForm } from "../Popup/PopupForm";
import PatientForm from "./PatientForm";
import MyTypography from "../../assets/themes/MyTypography"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import ProviderAppBar from "../NavBar/ProviderAppBar";
import CircularProgress from '@mui/material/CircularProgress';
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AllPatients() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [patients, setPatients] = useState([]);

  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    setFilteredPatients(
      patients.filter((patient) => patient.patientId.toString().includes(value))

    );
  };

  const changeDialogState = (val) => {
    setOpen(val)
  }

  const showPatientSummary = (id) => {
    navigate(`/allPatients/${id}`)
  }

  async function fetchData() {
    await axios.get("http://localhost:9093/provider/fetchAllPatients")
      .then(response => { console.log(response.data); return setPatients(response.data) })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetchData();
  }, []
  )

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients])

  const handleCallBack = (status, data) => {
    if (status === 200) {
      toast.success(`New patient details has been added with id ${data[0].prescriptionDetails.patient.patientId}`, {
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
      setOpen(false);
    } else {
      toast.error(`Some error occured while adding new patient details.`, {
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
    <div style={{ margin: '40px 10px', padding: '10px 15px' }}>
      <ProviderAppBar />
      <ToastContainer/>
      {console.log("All patients screen launched..")}
      <div>
        <MyTypography variant='h3'> Available Patients </MyTypography>
        <div
          style={{ display: 'flex', justifyContent: 'end' }}>
          <TextField
            value={filterValue}
            variant="standard"
            onChange={handleFilterChange}
            placeholder="Filter by Patient ID"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <FilterListIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 40, marginTop: 30 }}>

        <div style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
          <Avatar sx={{ height: 80, width: 80, fontSize: 60 }} > + </Avatar>
          <MyTypography variant="body2">
            New Patient
          </MyTypography>
        </div>

        <PopupForm
          open={open}
          onClose={() => changeDialogState(false)}>
          <PatientForm
            onClick={() => changeDialogState(false)}
            formTitle="Register"
            btnValue="Admit"
            callBack={handleCallBack}
          ></PatientForm>
        </PopupForm>

        {
          (patients.length < 1) ? (
            <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress size="50px" /> <br />
              <MyTypography variant="h6"> LOADING... </MyTypography>
            </div>
          ) : (
            <>
              {
                filteredPatients.map((patient) => (
                  <div style={{ cursor: 'pointer' }} onClick={() => showPatientSummary(patient.patientId)} >
                    <Tooltip title={patient.patientId} placement="top-end">
                      <MyAvatar
                        name={patient.firstName + ' ' + patient.lastName}
                        image={patient.image ? `data:image/jpeg;base64,${patient.image}` : null}
                        sx={{ height: 80, width: 80, fontSize: 25 }}
                      />
                    </Tooltip>
                    <MyTypography variant="body2">
                      {patient.firstName + ' ' + patient.lastName}
                    </MyTypography>
                  </div>
                ))
              }
            </>
          )
        }
      </div>

    </div>
  )
}

export default AllPatients;
