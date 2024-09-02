import { CardContent } from "@mui/material";
import { Card } from "react-bootstrap";
import MyTypography from "../../assets/themes/MyTypography";
import { Link } from "react-router-dom";

export default function NavbarComponent() {

    const navList = [
        { name: 'Patients', value: '' },
        { name: 'Prescriptions', value: '' },
        { name: 'Patients', value: '' },
    ]

    // #f1f1f1 for body background 
    // #037fff for active tab

    // dark mode sidenav: #191d2b, body bg: #10121b, active tab:  #037fff
    return (
        <div>
            <Card raised style={{ width: '200px', height: '540px', margin: '30px 15px', borderRadius: '15px', backgroundColor: '#e4e4e4', opacity: 0.7 }}>
                <CardContent>
                    <MyTypography variant="h4" color="black"> Med Tracker </MyTypography>
                    {/* { */}
                        {/* navList.map(tab => ( */}

                            <Link to='/allPatients'> Patients </Link> 
                            <br/>
                            <Link to='/recievedRefill'> Recieved Refill </Link> 
                            <br/>
                            <Link to='/allPrescriptions'> Prescriptions </Link> 
                            <br/>
                            <Link to='/allPrescriptions'> Remainders </Link> 
                            <br/>
                            <Link to='/sentRefill'> Refill </Link> 
                            
                        {/* // )) */}
                    {/* } */}
                </CardContent>
            </Card>
        </div>
    )
}