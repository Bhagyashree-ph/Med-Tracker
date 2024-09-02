import * as React from 'react';
import MyTypography from '../../assets/themes/MyTypography';
import axios from 'axios';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PopupForm } from '../Popup/PopupForm';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateRole from './UpdateRoles';
import AdminAppBar from '../NavBar/AdminAppBar';

export default function ViewRole() {

    const columns = ['Sl No.', 'Role Name', 'Role Description', 'Update', 'Delete'];

    const [rows, setRows] = React.useState([]);
    const [open, setOpen] = React.useState({});
    const [filteredRows, setFilteredRows] = React.useState(rows);

    async function fetchData() {
        await axios.get("http://localhost:9094/admin/fetchAllRoles")
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
            toast.success(`Role details updated successfully!`, {
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
            toast.error(`Some error occured while updating role details.`, {
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

    const handleDelete = async (roleName) => {

        // await axios.delete("http://localhost:9094/admin/deleteUser/"+userId)
        //   .then((response) => {
        setFilteredRows(rows.filter((row) => {
            if (row.roleName === roleName)
                console.log("Row :", row.roleName);
            return row.roleName !== roleName
        }));
        console.log(roleName);
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
                    <MyTypography style={{ textAlign: "center" }} variant="h4">View Roles</MyTypography>
                </div>
                <Paper style={{ height: 700 }}>
                    <TableContainer style={{ width: '800px', margin: '0 auto' }}>
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
                            <TableBody style={{ height: '360px', overflow: 'auto' }}>
                                {
                                    (filteredRows.length > 0) ? (
                                        filteredRows.map((role, i) => (
                                            <TableRow>
                                                <TableCell align="center" width='100px'>
                                                    <MyTypography variant="subtitle1"> {i + 1} </MyTypography>
                                                </TableCell>
                                                <TableCell align="center" width='100px'>
                                                    <MyTypography variant="subtitle1"> {role.roleName} </MyTypography>
                                                </TableCell>
                                                <TableCell align="center" width='100px'>
                                                    <MyTypography variant="subtitle1"> {role.roleDescription} </MyTypography>
                                                </TableCell>
                                                <TableCell width='100px' align="center">
                                                    <MyTypography variant="subtitle1">
                                                        <Button variant='text' onClick={() => setOpen({ ...open, [role.roleName]: true })}> <ModeEditIcon color='primary' fontSize='medium' /> </Button>
                                                    </MyTypography>
                                                </TableCell>

                                                <TableCell width='100px' align="center">
                                                    <MyTypography variant="subtitle1">
                                                        <Button onClick={() => handleDelete(role.roleName)}>
                                                            <DeleteIcon color='error' fontSize='medium' />
                                                        </Button>
                                                    </MyTypography>
                                                </TableCell>


                                                <PopupForm
                                                    open={open[role.roleName]}
                                                    onClose={() => setOpen({ ...open, [role.roleName]: false })}
                                                >
                                                    <UpdateRole
                                                        onClick={() => setOpen({ ...open, [role.roleName]: false })}
                                                        inpRole={role}
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