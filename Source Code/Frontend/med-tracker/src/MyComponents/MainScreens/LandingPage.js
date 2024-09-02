import MainAppBar from "../NavBar/MainAppBar";
import bgImg from '../../assets/images/LandingPage/landingPage.png'
import MyTypography from "../../assets/themes/MyTypography";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import LocalPharmacyOutlinedIcon from '@mui/icons-material/LocalPharmacyOutlined';
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import count from '../../assets/images/LandingPage/Count.jpg'

export default function LandingPage() {

    return (
        <div>
            <div style={{ backgroundImage: `url(${bgImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '600px' }}>
                <MainAppBar />
            </div>

            <div style={{ height: '300px' }}>
                <div style={{ textAlign: 'center', margin: '50px 0' }}>
                    <MyTypography variant="h3"> How does it work </MyTypography> <br />
                    <MyTypography variant="subtitle1"> Simplifying Medication Management, One Step at a Time </MyTypography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                    <div style={{ width: '250px', height: '400px', textAlign: 'center' }}>
                        <MedicationOutlinedIcon fontSize="large" color="success" /> <br />
                        <MyTypography variant='h5'> Step 1 </MyTypography> <br />
                        {/* "Input Your Prescription Details" <br /> */}
                        <MyTypography variant='body1'>Easily input your prescription details, including medication name, dosage, and instructions
                        </MyTypography>
                        {/* Icon: (e.g., a pill icon) */}
                    </div>

                    <div><RedoOutlinedIcon fontSize="large" /></div>

                    <div style={{ width: '250px', height: '400px', textAlign: 'center' }}>
                        <AlarmOnIcon fontSize="large" color="primary" /> <br />
                        <MyTypography variant='h5'> Step 2 </MyTypography> <br />
                        {/* Step 2: "Set Customizable Reminders" */}
                        <MyTypography variant='body1'> Set reminders for your medication doses and receive notifications when it's time to take them
                        </MyTypography>
                        {/* Icon: (e.g., a clock icon) */}
                    </div>

                    <div><RedoOutlinedIcon fontSize="large" /></div>

                    <div style={{ width: '250px', height: '400px', textAlign: 'center' }}>
                        <MarkChatUnreadOutlinedIcon fontSize="large" color="warning" /> <br />
                        <MyTypography variant='h5'> Step 3 </MyTypography> <br />
                        {/* Step 3: "Track Your Progress" */}
                        <MyTypography variant='body1'> Track your medication doses and receive alerts when it's time to refill your prescriptions
                        </MyTypography>
                        {/* Icon: (e.g., a chart icon) */}
                    </div>

                    <div><RedoOutlinedIcon fontSize="large" /></div>

                    <div style={{ width: '250px', height: '400px', textAlign: 'center' }}>
                        <LocalPharmacyOutlinedIcon fontSize="large" /> <br />
                        <MyTypography variant='h5'> Step 4 </MyTypography> <br />
                        {/* Step 4: "Integrate with Your Pharmacy" */}
                        <MyTypography variant='body1'> Integrate with your pharmacy systems for real-time updates and easy refills
                        </MyTypography>
                        {/* Icon: (e.g., a pharmacy icon) */}
                    </div>
                </div>
            </div>
            <br/>
            <div>
                <MyTypography variant="h4"> Benefits for Healthcare Providers </MyTypography> <br /> <br />
                <br/>
                <div style={{ display: 'flex' }}>
                    <img src={count} height='250px' />
                    <div>
                        <div>
                            <MyTypography variant="h6">Improved Patient Adherence </MyTypography> <br />
                            <MyTypography variant="body1"> Our tool helps patients stay on track with their medication schedules, leading to improved health outcomes"
                            </MyTypography>
                            {/* Icon: (e.g., a checkmark icon) */}
                        </div>

                        <div style={{margin: '50px 0'}}>
                            <MyTypography variant="h6">Enhanced Patient Engagement </MyTypography> <br />
                            <MyTypography variant="body1">Our tool empowers patients to take an active role in their healthcare, leading to better engagement and communication </MyTypography>
                            {/* Icon: (e.g., a conversation icon) */}
                        </div>
                        <div>
                            <MyTypography variant="h6">Streamlined Communication</MyTypography> <br />
                            <MyTypography variant="body1">Our tool allows for seamless communication between patients, healthcare providers, and pharmacies</MyTypography>
                            {/* Icon: (e.g., a phone icon) */}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 50, }}>
                <div style={{ backgroundColor: "#36a4bd", display: 'grid', justifyContent: 'center', padding: 15 }}>
                    <div style={{ width: '400px', textAlign: 'center' }}>
                        <MyTypography color="black" variant="h3">Med Tracker</MyTypography> <br />
                        <MyTypography color="black" variant="subtitle1">Simplify your medication routine with our easy-to-use tool. Track your medications, set reminders, and receive notifications to ensure you never miss a dose</MyTypography>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <GoogleIcon fontSize="large" /> <TwitterIcon fontSize="large" /> <LinkedInIcon fontSize="large" /> <FacebookIcon fontSize="large" /> <InstagramIcon fontSize="large" />
                    </div>
                </div>
                <div style={{ backgroundColor: '#2b8397', height: '45px', color: 'white', textAlign: 'center', paddingTop: 10 }}>
                    Copyright©medtracker 2024
                </div>
            </div>
        </div>
    )
}