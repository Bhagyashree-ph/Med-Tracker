import { Patient, Role, User } from "../../Classes/Classes"
import MyAvatar from "../Avatar/MyAvatar"
import profile from '../../profile.png'
import { Avatar, Grid, InputAdornment, TableContainer, TextField, Tooltip, Typography } from "@mui/material"
import { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';

function AllPatients() {

  const patients = [
    new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
      new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
        new Role('Patient', 'One who is under medication')
      )
    ),
    new Patient('RB13071205', 'DEF0928972', 'Pan Card', 'Reddirani B', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
      new User('U002', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
        new Role('Patient', 'One who is under medication')
      )
    ),
    new Patient('RC13071215', 'POWEDN821', 'Pan Card', 'Roshan C', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
      new User('U003', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
        new Role('Patient', 'One who is under medication')
      )
    ),
    new Patient('DS13071216', 'POWEDN821', 'Pan Card', 'Dhivyaa Sankari', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
      new User('U003', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
        new Role('Patient', 'One who is under medication')
      )
    ),
    new Patient('KM13071217', 'POWEDN821', 'Pan Card', 'Komal MC', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
      new User('U003', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
        new Role('Patient', 'One who is under medication')
      )
    ),
  ]

  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    setFilteredPatients(
      patients.filter((patient) => patient.patientId.toString().includes(value))

    );
  };


  return (
    <div>
      <div>
        <Typography variant='h4'> Available Patients </Typography>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 40, marginLeft: 60, marginTop: 30 }}>
        <div>
          <Avatar sx={{ height: 80, width: 80, fontSize: 60 }} > + </Avatar>
          <Typography variant="body2">
            New Patient
          </Typography>
        </div>
        {
          filteredPatients.map((patient) => (
            <div>
              <Tooltip title={patient.patientId} placement="top-end" disableFocusListener disableTouchListener>
              <MyAvatar
                name={patient.patientName}
                image={patient.image}
                sx={{ height: 80, width: 80, fontSize: 25 }}
              />
              </Tooltip>
              <Typography variant="body2">
                {patient.patientName}
              </Typography>
            </div>
          )
          )
        }
      </div>

    </div>
  )
}

export default AllPatients;
