import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Patient, Prescription, RefillRequest, Role, User } from "../../Classes/Classes";
import { useState } from "react";
import MyTypography from "../../assets/themes/MyTypography";
import SendIcon from '@mui/icons-material/Send';

function RefillForm() {

    const patient = new Patient('BP13071158', 'ABC0923872', 'Pan Card', 'Bhagyashree', 'P', '12-01-2002', 22, 'Female', '', '+91 9483451311', 'bhagya@gmail.com', 'Indiranagar, Bangalore',
        new User('U001', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
            new Role('Patient', 'One who is under medication')
        )
    );

    const [selectedType, setSelectedType] = useState("prescption")
    const [showMedField, setShowMedField] = useState(false);

    const handleRefillTypeChange = (event) => {
        const { value } = event.target;
        setSelectedType(value);
        if (value === 'medication')
            setShowMedField(true)
        else 
            setShowMedField(false)
    }

    const [prescriptionId, setPrescriptionId] = useState(0);
    const [medicationId, setMedicationId] = useState(0);
    const [refillQuantity, setRefillQuantity] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        const prescription = prescriptionId === 0 ? null : prescriptionId; //get prescription details
        const medication = medicationId === 0 ? null : medicationId; //get medication details
        const refill = new RefillRequest(
            'REF001',
            prescription,
            medication,
            'medication',
            refillQuantity,
            new User('U002', 'Bhagya_ph', 'Bhagya@123', '+91 9483451311', 'bhagya@gmail.com',
                new Role('Pharmacy', 'One who is providing medication')
            ),
            new Date().toLocaleDateString(),
            'null',
            '',
            'Pending',
            'Sent for refill.'
        )
        console.log(refill);
    }

    return (
        <div>
            <div style={{ lineHeight: '60px', textAlign: 'center' }}>
                <MyTypography variant="h3" >
                    Request Refill
                </MyTypography>
            </div>

            <form>
                <TextField
                    disabled
                    fullWidth
                    required
                    label='Patient ID'
                    name="patientId"
                    defaultValue={patient.patientId}
                    sx={{ marginBottom: 2 }}
                />
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel required> Refill Type </InputLabel>
                    <Select
                        id="refillType"
                        name="refillType"
                        fullWidth
                        required
                        label="Refill Type"
                        defaultValue="prescription"
                        onChange={handleRefillTypeChange}
                    >
                        <MenuItem value={'prescription'}> Prescription </MenuItem>
                        <MenuItem value={'medication'}> Medication  </MenuItem>
                    </Select>
                </FormControl>
                {
                    showMedField ? (
                        <>
                        <TextField
                            fullWidth
                            required
                            label='Medication ID'
                            name="medicationId"
                            sx={{ marginBottom: 2 }}
                            onChange={(event) => setMedicationId(event.target.value)}
                        />
                        <TextField
                            fullWidth
                            required
                            label='Refill Quantity'
                            name="refillQuantity"
                            defaultValue={refillQuantity}
                            sx={{ marginBottom: 2 }}
                            onChange={(event) => setRefillQuantity(event.target.value)}
                        />
                        </>
                    ) : (
                        <TextField
                            fullWidth
                            required
                            label='Prescription ID'
                            name="prescriptionId"
                            sx={{ marginBottom: 2 }}
                            onChange={(event) => setPrescriptionId(event.target.value)}
                        />)
                }
                <TextField
                    disabled
                    fullWidth
                    required
                    label='Status'
                    name="status"
                    defaultValue="Pending"
                    sx={{ marginBottom: 2 }}
                />
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
                        onClick={() => { }}
                    > Cancel </Button>
                    <Button type="submit" variant="contained" size="small" color="primary" onClick={handleSubmit}
                        endIcon={<SendIcon />}
                    > send </Button>
                </div>
            </form>
        </div>
    )
}

export default RefillForm;