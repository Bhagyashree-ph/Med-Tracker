import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import ProviderAppBar from "../NavBar/ProviderAppBar";
import MyTypography from '../../assets/themes/MyTypography'
import image1 from '../../assets/images/prov1.jpg'
import image2 from '../../assets/images/prov2.jpg'
import image3 from '../../assets/images/prov3.jpg'
import Carousel from 'react-material-ui-carousel';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import NumberTicker from "../Ticker/NumberTicker";
import review1 from '../../assets/images/Providerhome/Arav.jpg'
import review2 from '../../assets/images/Providerhome/kavya.webp'
import review3 from '../../assets/images/Providerhome/Vihaan.jpeg'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';

export default function ProviderHome() {

  const reviews = [
    {
      name: "Arav Jain",
      image: review1,
      content: "I had an amazing experience at Rainbow Hospital! The doctors and nurses were so caring and attentive. Dr. Varalakshmi and Dr. Tulika Tayal were especially wonderful. They took the time to answer all my questions and made me feel so comfortable. I highly recommend Rainbow Hospital to anyone looking for top-notch care."
    },
    {
      name: "Kavya Reddy",
      image: review2,
      content: "I had a complicated pregnancy, but the team at Rainbow Hospital was with me every step of the way. They were professional, caring, and always available to answer my questions. I felt so supported and cared for, and I couldn't have asked for a better experience. Thank you, Rainbow Hospital!"
    },
    {
      name: "Vihaan Gupta",
      image: review3,
      content: "I was blown away by the level of care my child received at Rainbow Hospital. The pediatric specialists were knowledgeable and compassionate, and the facilities were clean and modern. I felt so confident in the care my child was receiving, and I'm so grateful to have Rainbow Hospital in our community."
    }
  ]

  return (
    <div>
      <ProviderAppBar />
      <div style={{ margin: ' 55px 15px 15px 15px' }}>
        <Grid container spacing={2}>
          <Grid item xs={3.5}>
            <br /><br />
            <Grid container spacing={2}>
              <Grid item xs={2} alignItems={"center"} justifyContent={'center'} display={'flex'}>
                <PhoneAndroidOutlinedIcon fontSize="large" />
              </Grid>
              <Grid item xs={10}>
                <MyTypography variant="h6"> Cutting-Edge Care at Your Fingertips </MyTypography>
                <MyTypography variant="subtitle1"> Imagine having access to the latest medical breakthroughs and innovative treatments at your fingertips. Our platform connects you with clinical trials shaping the future of healthcare.  </MyTypography>
              </Grid>
            </Grid>
            <br /><br />
            <Grid container spacing={2}>
              <Grid item xs={2} alignItems={"center"} justifyContent={'center'} display={'flex'}>
                <ExploreOutlinedIcon fontSize="large" />
              </Grid>
              <Grid item xs={10}>
                <MyTypography variant="h6"> Expert Guidance Every Step of the Way </MyTypography>
                <MyTypography variant="subtitle1">   Our team of experts provides personalized support and guidance throughout the clinical trial process. We'll work with you to understand your unique needs and goals. </MyTypography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5} alignContent={"center"} justifyContent={'center'} display={'flex'}>
            <div style={{ borderRadius: '150px', height: '450px', width: '300px' }}>
              <PatientCards />
            </div>
          </Grid>

          <Grid item xs={3.5}>
            <br /> <br />
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <MyTypography variant="h6">  Empowering Your Health Journey</MyTypography>
                <MyTypography variant="subtitle1">  Take control of your health journey with our clinical trial matching platform. We connect you with innovative treatments and cutting-edge research to transform your life. </MyTypography>
              </Grid>
              <Grid item xs={2} alignItems={"center"} justifyContent={'center'} display={'flex'}>
                <NorthEastOutlinedIcon fontSize="large" />
              </Grid>
            </Grid>
            <br /><br />
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <MyTypography variant="h6"> Unparalleled Support </MyTypography>
                <MyTypography variant="subtitle1">  Our dedicated support team is here to help you every step of the way. From trial matching to participation, we've got your back. </MyTypography>
              </Grid>
              <Grid item xs={2} alignItems={"center"} justifyContent={'center'} display={'flex'}>
                <HandshakeOutlinedIcon fontSize="large" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '100px 50px' }}>
          <Card raised style={{ width: '200px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <NumberTicker id='patients' endValue={100} label={'Happy Patients'} />
          </Card>

          <Card raised style={{ width: '200px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <NumberTicker id='surgery' endValue={500} label={'Successful Surgeries Performed'} />
          </Card>

          <Card raised style={{ width: '200px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <NumberTicker id='years' endValue={50} label={'Years of service'} />
          </Card>

          <Card raised style={{ width: '200px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <NumberTicker id='awards' endValue={28} label={'Prestigious Awards'} />
          </Card>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '50px 20px 80px 20px' }}>
          {/* Reviews */}
          {reviews.map((review) => (
            <Card raised style={{ width: '300px', height: '450px' }}>
              <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', margin: '15px 0 0 0' }}>
                <CardMedia
                  component="img"
                  alt="Arav Jain"
                  height="100"
                  width="20px"
                  image={review.image}
                  style={{ borderRadius: '150px', width: '100px', marginBottom: 5 }}
                />
                <MyTypography variant="h6"> {review.name} </MyTypography>
              </div>
              <CardContent>
                <MyTypography variant="body1">
                  {review.content}
                </MyTypography>
                <br /> <br />
                <div>
                  <TwitterIcon /> <LinkedInIcon /> <FacebookIcon /> <InstagramIcon />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
        {/* Footer */}
        <div style={{marginTop: 50}}>
          <Grid container spacing={1} style={{ backgroundColor: 'whitesmoke', height: '250px' }}>
            <Grid item xs={4} sx={{ textAlign: 'center'}}>
              <MyTypography variant="h4">ABOUT</MyTypography>  <br/> <br/>
              <MyTypography variant="body1"> At Rainbow Hospital, our mission is to provide compassionate, high-quality healthcare to our patients and their families. We are committed to delivering exceptional medical care, promoting health and wellness, and improving the quality of life for our community. 
             </MyTypography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center'}}>
              <MyTypography variant="h4">AROUND THE WEB</MyTypography>  <br/> <br/>
               <GoogleIcon fontSize="large" /> <TwitterIcon fontSize="large" /> <LinkedInIcon fontSize="large" /> <FacebookIcon fontSize="large" /> <InstagramIcon fontSize="large" />
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'center'}}>
              <MyTypography variant="h4">LOCATION</MyTypography>  <br/> <br/>
              <MyTypography variant="body1"> Sabera Tower, SB Temple Rd, beside Goa Hotel, Brhampur, Kalaburagi, Karnataka 585102 </MyTypography>
            </Grid>
          </Grid>
          <div style={{ backgroundColor: 'grey', height: '45px', color: 'white', textAlign: 'center' }}>
            Copyright©rainbow 2024
          </div>
        </div>
    </div>
  )
}

const PatientCards = () => {


  const items = [
    image1,
    image2,
    image3
  ];

  return (
    <Carousel autoPlay={true} interval={2500} indicators={false} IndicatorIcon={false} >
      {items.map((imageUrl, index) => (
        // <></>  
        <img src={imageUrl} alt="Carousel Item" style={{ borderRadius: '150px', height: '450px', width: '300px', border: '5px solid grey' }} />

      ))}
    </Carousel>
  );
}