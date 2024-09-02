import * as React from 'react';
import MyTypography from '../../assets/themes/MyTypography';
import axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PopupForm } from '../Popup/PopupForm';
import AddUser from './addUser';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAppBar from '../NavBar/AdminAppBar';

export default function ViewUser() {

  const columns = ['Sl No.', 'User ID', 'First Name', 'Last Name', 'Password', 'Role', 'Update', 'Delete'];

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState({});
  const [filteredRows, setFilteredRows] = React.useState(rows);

  async function fetchData() {
    await axios.get("http://localhost:9094/admin/fetchAllPatients")
      .then((response) => { setRows(response.data); console.log(response.data); })
      .catch(error => console.error(error))
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  React.useEffect(() => {
    setFilteredRows(rows);
  }, [rows])

  const handleCallBack = (status) => {
    if (status === 200) {
      toast.success(`User details updated successfully!`, {
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
      toast.error(`Some error occured while updating user details.`, {
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

  const handleDelete = async (userId) => {

    // await axios.delete("http://localhost:9094/admin/deleteUser/"+userId)
    //   .then((response) => {
    setFilteredRows(rows.filter((row) => {
      if (row.user.userId === userId)
        console.log("Row :", row.user.userId);
      return row.user.userId !== userId
    }));
    console.log(userId);
    // if (response.status === 200) {
    toast.success(`User details deleted successfully!`, {
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
    //     fetchData();
    //     setOpen(false);
    //   } else {
    //     toast.error(`Some error occured while deleting user details.`, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //       transition: Bounce,
    //     });
    //   }
    // })
    // .catch(error => console.error(error))

  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <AdminAppBar />
      <ToastContainer />
      <div style={{ marginTop: 50 }}>
        <div style={{ margin: '20px auto', textAlign: 'center' }}>
          <MyTypography style={{ textAlign: "center" }} variant="h4">View Users</MyTypography>
        </div>
        <Paper >
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {
                    columns.map(column => (
                      <TableCell align="center" style={{ backgroundColor: '#a3c8ed' }}>
                        <MyTypography variant="h6" color="#4c4c4c"> {column} </MyTypography>
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody style={{ height: '300px', overflow: 'auto' }}>
                {
                  (filteredRows.length > 0) ? (
                    filteredRows.map((patient, i) => (
                      <TableRow>
                        <TableCell align="center" width='100px'>
                          <MyTypography variant="subtitle1"> {i + 1} </MyTypography>
                        </TableCell>
                        <TableCell align="center" width='100px'>
                          <MyTypography variant="subtitle1"> {patient.user.userId} </MyTypography>
                        </TableCell>
                        <TableCell align="center" width='100px'>
                          <MyTypography variant="subtitle1"> {patient.firstName} </MyTypography>
                        </TableCell>
                        <TableCell width='100px' align="center">
                          <MyTypography variant="subtitle1"> {patient.lastName} </MyTypography>
                        </TableCell>
                        <TableCell width='100px' align="center">
                          <MyTypography variant="subtitle1"> {patient.user.password} </MyTypography>
                        </TableCell>
                        <TableCell width='100px' align="center">
                          <MyTypography variant="subtitle1"> {patient.user.role.roleName} </MyTypography>
                        </TableCell>
                        <TableCell width='100px' align="center">
                          <MyTypography variant="subtitle1">
                            <Button variant='text' onClick={() => setOpen({ ...open, [patient.patientId]: true })}> <ModeEditIcon color='primary' fontSize='medium' /> </Button>
                          </MyTypography>
                        </TableCell>

                        <TableCell width='100px' align="center">
                          <MyTypography variant="subtitle1">
                            <Button onClick={() => handleDelete(patient.user.userId)}>
                              <DeleteIcon color='error' fontSize='medium' />
                            </Button>
                          </MyTypography>
                        </TableCell>


                        <PopupForm
                          open={open[patient.patientId]}
                          onClose={() => setOpen({ ...open, [patient.patientId]: false })}
                        >
                          <AddUser
                            onClick={() => setOpen({ ...open, [patient.patientId]: false })}
                            user={patient.user}
                            callBack={handleCallBack}
                          />
                        </PopupForm>

                      </TableRow>
                    ))
                  ) : (
                    <MyTypography variant='body1'>No data available..</MyTypography>
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}