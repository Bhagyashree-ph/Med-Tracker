import React, { useState } from 'react';
import MyTypography from '../../assets/themes/MyTypography';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';

function UpdateRole({ onClick, inpRole, callBack }) {
    const [role, setRole] = useState(inpRole || {});
    const [errors, setErrors] = useState({
        roleName: null,
        roleDescription: null,
    });

    console.log(role);

    const handleUpdate = async (event) => {
        event.preventDefault();
        // if (!roleName || !roleDesc) {
        //     setErrors({
        //         ...errors,
        //         roleName: 'Required',
        //         roleDescription: 'Required',
        //     });
        //     return;
        // } else if (Object.values(errors).some((error) => error !== null)) {
        //     return;
        // }
        // user.password = password;
        // console.log(user);

        console.log("Role : ", role);
        await axios.put("http://localhost:9094/admin/updateRole", role)
            .then((response) => {
                console.log("response :", response.data);
                callBack(response.status)
            })
            .catch(error => console.error(error))
    };

    return (
        <div style={{ marginTop: "10px", padding: "15px", width: '400px' }}>
            <center>
                <MyTypography variant="h4">Update Role</MyTypography>
            </center>
            <br />
            <div>

                <TextField placeholder="Role Name" name='roleName'
                 label="Role Name" variant="outlined" fullWidth required
                    onChange={(e) => {
                        setRole((prev) => ({ ...prev, [e.target.name]: e.target.value }));
                    }}
                    error={errors.roleName !== null}
                    helperText={errors.roleName}
                    sx={{ marginBottom: 2 }}
                    defaultValue={role.roleName}
                />

                <TextField
                    label="Role Description"
                    variant="outlined"
                    fullWidth
                    required
                    name='roleDescription'
                    onChange={(e) =>{
                        setRole((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                    }}
                    error={errors.roleDescription !== null}
                    helperText={errors.roleDescription}
                    style={{ marginBottom: 2 }}
                    defaultValue={role.roleDescription}
                />

                <br />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        sx={{
                            backgroundColor: 'grey.500',
                            '&:hover': {
                                backgroundColor: 'grey.500',
                            },
                            margin: '10px'
                        }}
                        variant="contained"
                        size="small"
                        onClick={() => onClick()}
                    > Cancel </Button>

                    {/* <Button
                    variant="contained"
                    size="small"
                    onClick={handleCreate}
                    sx={{ margin: '10px' }}
                > Register </Button> */}

                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleUpdate}
                        sx={{ margin: '10px' }}
                    > Update </Button>
                </div>
            </div>
        </div>
    );
}

export default UpdateRole;

