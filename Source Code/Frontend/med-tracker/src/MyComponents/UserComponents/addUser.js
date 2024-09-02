import React, { useState } from 'react';
import MyTypography from '../../assets/themes/MyTypography';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import axios from 'axios';

function AddUser({ onClick, user, callBack }) {
    const [userId, setUserId] = useState(user.userId || '');
    const [password, setPassword] = useState(user.password || '');
    const [role, setRole] = useState(user.role || {});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        userId: null,
        password: null,
        confirmPassword: null,
        role: null,
    });

    console.log(user);
    const handleUserIdChange = (event) => {
        const { value } = event.target;
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            setErrors({ ...errors, userId: 'Only letters and numbers are allowed' });
        } else {
            setErrors({ ...errors, userId: null });
        }
        setUserId(value);
    };

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        if (value.length < 8) {
            setErrors({ ...errors, password: 'Password must be at least 8 characters' });
        } else {
            setErrors({ ...errors, password: null });
        }
        setPassword(value);
    };

    const handleConfirmPasswordChange = (event) => {
        const { value } = event.target;
        if (value !== password) {
            setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
        } else {
            setErrors({ ...errors, confirmPassword: null });
        }
        setConfirmPassword(value);
    };

    const handleRoleChange = (event) => {
        const { value } = event.target;
        if (!value) {
            setErrors({ ...errors, role: 'Required' });
        } else {
            setErrors({ ...errors, role: null });
        }
        setRole(value);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (!userId || !password || !role) {
            setErrors({
                ...errors,
                userId: 'Required',
                password: 'Required',
                role: 'Required',
            });
            return;
        } else if (Object.values(errors).some((error) => error !== null)) {
            return;
        }
        user.password = password;
        console.log(user);

        await axios.put("http://localhost:9094/admin/updateUser", user)
            .then((response) => {
                console.log("response :", response.data);
                callBack(response.status)
            })
            .catch(error => console.error(error))
    };

    return (
        <div style={{ marginTop: "10px", padding: "15px", width: '400px' }}>
            <center>
                <MyTypography variant="h4">Update User</MyTypography>
            </center>
            <br />
            <div>
                <TextField placeholder="Enter user ID" label="User ID" variant="outlined" fullWidth required
                    onChange={handleUserIdChange}
                    error={errors.userId !== null}
                    helperText={errors.userId}
                    sx={{ marginBottom: 2 }}
                    defaultValue={user.userId}
                    disabled
                />

                <TextField placeholder="Enter Password" label="Password" variant="outlined" fullWidth required
                    onChange={handlePasswordChange}
                    error={errors.password !== null}
                    helperText={errors.password}
                    sx={{ marginBottom: 2 }}
                    defaultValue={user.password}
                />

                <TextField placeholder="Confirm Password" label="Confirm Password" variant="outlined" fullWidth required
                    onChange={handleConfirmPasswordChange}
                    error={errors.confirmPassword !== null}
                    helperText={errors.confirmPassword}
                    sx={{ marginBottom: 2 }}
                    defaultValue={user.password}
                />

                <TextField
                    label="Role"
                    variant="outlined"
                    fullWidth
                    required
                    disabled
                    onChange={handleRoleChange}
                    error={errors.role !== null}
                    helperText={errors.role}
                    style={{ marginBottom: 2 }}
                    defaultValue={user.role.roleName}
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

export default AddUser;

