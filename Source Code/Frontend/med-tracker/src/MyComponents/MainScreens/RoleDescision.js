import { Card, CardContent, Grid } from "@mui/material";
import MyTypography from "../../assets/themes/MyTypography";
import { useNavigate } from "react-router-dom";

export default function RoleDecision() {

    const navigate = useNavigate();

    const patientPoints = [
        'Track multiple medications in one place',
        'Set personalized reminders',
        'Receive real-time notifications',
        'Integrate with pharmacy systems',
        'Improve medication adherence',
        'Send refill requests for medications'
    ];

    const providerPoints = [
        'Manage patient prescriptions',
        'Receive real-time updates on patient adherence',
        'Set customizable alerts and reminders',
        'Encourage patient engagement',
        'Manage patient profiles',
        'Receive medication refill alerts'
    ]

    const navigateTohospLogin = () => {
        console.log("hospital");
        navigate('/providerlogin');
    }

    const navigateToPatientLogin = () => {
        console.log("Patients");
        navigate('/login');
    }

    return (
        <div style={{ marginTop: 80, }}>
            <Grid container spacing={2} >
                <Grid item xs={1.5}>
                </Grid>
                <Grid item xs={5}>
                    <a href="http://localhost:3003/login" target="_blank" style={{ textDecoration: 'none' }}>
                        <Card raised style={{ width: '400px', height: '450px', borderRadius: '20px' }}>
                            <CardContent>
                                {/* Prescription Management: Easily manage patient prescriptions, including medication names, dosages, and instructions. Real-time Updates: Receive real-time updates on patient medication adherence and potential issues. Alerts and Reminders: Set customizable alerts and reminders for patients to ensure they take their medication as prescribed. Patient Engagement: Encourage patient engagement through personalized notifications and reminders. Patient Profile Management: Store important information about patients, including their medication history and healthcare providers. Medication Refill Alerts: Receive alerts when patients need to refill their prescriptions, ensuring timely interventions. */}
                                <div style={{ marginTop: '60px', textAlign: 'center' }}>
                                    <MyTypography variant="h2">For </MyTypography><MyTypography variant="h3" color="black">Providers</MyTypography> <br /> <br />
                                </div>
                                <ul style={{ lineHeight: '35px' }}>
                                    {providerPoints.map((point, index) => (
                                        <li key={index}> <MyTypography variant="subtitle1"> {point} </MyTypography> </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </a>
                </Grid>
                <Grid item xs={5}>
                    <a href="http://localhost:3001/login" target="_blank" style={{ textDecoration: 'none' }}>
                        <Card raised style={{ width: '400px', height: '450px', borderRadius: '20px' }}>
                            <CardContent>
                                <div style={{ marginTop: '60px', textAlign: 'center' }}>
                                    <MyTypography variant="h2">For </MyTypography><MyTypography variant="h3" color="black">Customers</MyTypography> <br /> <br />
                                </div>
                                <ul style={{ lineHeight: '35px' }}>
                                    {patientPoints.map((point, index) => (
                                        <li key={index}> <MyTypography variant="subtitle1"> {point} </MyTypography> </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </a>
                </Grid>
            </Grid>
        </div>
    )
}