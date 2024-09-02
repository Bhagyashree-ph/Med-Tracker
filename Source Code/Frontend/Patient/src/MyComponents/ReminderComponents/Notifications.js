import { useEffect, useState } from "react";
import MyTypography from "../../assets/themes/MyTypography";
import { Accordion, AccordionActions, AccordionSummary, Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Notifications() {

    const patient = JSON.parse(localStorage.getItem('patient'));
    // console.log("patient : ", patient);
    const [notifications, setNotifications] = useState([]);
    const [refillQuantity, setRefillQuantity] = useState(0);
    const [showField, setShowField] = useState(false);
    const [error, setError] = useState('');

    async function fetchData() {
        await axios.get("http://localhost:9090/patient/fetchAllNotifications/" + patient.patientId)
            .then((resp) => { setNotifications(resp.data); console.log("Notifications", resp.data); })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        fetchData();
    }, [])

    const formatDate = (dateString) => {
        const date = moment(dateString, 'MM/DD/YYYY, h:mm:ss A');
        console.log(date.toISOString());
        return date.toISOString();
    };

    const handleFilter = (id) => {
        console.log("notification id : ", id);
        setNotifications(
            notifications.filter((notify) => 
                notify.notificationId !== id
            )
        )
    }

    const handleRefill = async (type, data, id) => {
        if (refillQuantity <= 0 && (type.toLowerCase() === 'medication')) {
            setError("Quantity is mandatory");
        } else {
            const refill = {
                "refillRequestId": '',
                "comments": "",
                "fulfilledOn": null,
                "refillQuantity": refillQuantity,
                "requestedOn": formatDate(new Date().toLocaleString()),
                "requestType": type,
                "medicationDetails": (type.toLowerCase() === 'prescription') ? null : data,
                "status": {
                    "statusCode": "PEND",
                    "statusLabel": "Pending"
                },
                "prescriptionDetails": (type.toLowerCase() === 'prescription') ? data : null,
                "user": null,
                "patient": patient
            }
            console.log("refill : ", refill);
            await axios.post("http://localhost:9090/patient/sendRequest", refill)
                .then((res) => {
                    console.log(res.data);
                    if (res.data !== null) {
                        console.log("refill submitted..!");
                        axios.delete(`http://localhost:9090/patient/deleteNotification/${id}`)
                            .then((resp) => {
                                console.log("Notification deleted..");
                                if (resp.status === 200) {
                                    toast.success(`Refill request for ${type} has been sent.`, {
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
                                    handleFilter(id);
                                } else {
                                    toast.error(`Some error occured while processing request.`, {
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
                            });
                    }
                })
                .catch((error) => console.error(error))
        }
    }

    const handleMedUpdate = async (notify) => {
        console.log("Notification of medication : ", notify);
        await axios.put("http://localhost:9090/patient/updateMedication", notify)
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    console.log("Medication taken..!");
                    toast.success(`🎉 Great job! You're staying on track with your medication schedule.`, {
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
                    handleFilter(notify.notificationId);
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
                    })
                }
            }
            )
    }

    return (
        <div>
            <ToastContainer />
            {
                (notifications.length > 0) ? (
                    <>
                        <MyTypography variant="h3">Notifications</MyTypography> <br />
                        <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                            {
                                notifications.map((notify) => (
                                    <>
                                        <div style={{ display: 'flex', marginBottom: 6, }}>
                                            <div style={{ backgroundColor: 'blue', width: '2px' }}></div>
                                            <Accordion style={{ marginBottom: 2 }}>
                                                <AccordionSummary style={{ height: '55px' }} >
                                                    {/* {console.log("Inside card : ", notify)} */}
                                                    <div style={{ padding: '5px' }}>
                                                        <MyTypography variant="subtitle1"> {notify.message} </MyTypography> <br />
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {
                                                        (notify.notificationType.toLowerCase() === 'medication refill') ? (
                                                            <>
                                                                {
                                                                    (showField) ? (
                                                                        <>
                                                                            <TextField variant="outlined" required label="Quantity" size="small" error={error} onChange={(e) => { setRefillQuantity(e.target.value); setError('') }} />
                                                                            <Button onClick={() => handleRefill('medication', notify.medication, notify.notificationId)}> SEND </Button>
                                                                        </>
                                                                    ) : (
                                                                        <Button onClick={() => setShowField(true)}> REFILL </Button>
                                                                    )
                                                                }
                                                            </>
                                                        ) : (notify.notificationType.toLowerCase() === 'prescription refill') ? (
                                                            <Button onClick={() => handleRefill('prescription', notify.prescription, notify.notificationId)}> REFILL </Button>
                                                        ) : (
                                                            <Button onClick={() => handleMedUpdate(notify)}> CONFIRM </Button>
                                                        )
                                                    }
                                                </AccordionActions>
                                                {error ?? (<Typography variant="body1" color="red">{error}</Typography>)}
                                            </Accordion>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <MyTypography variant="h6">No notifications</MyTypography>
                )
            }
        </div>
    )
}