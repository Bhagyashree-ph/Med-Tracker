import NavbarComponent from '../NavBar/Navbar'

export default function OuterContainer({ children }) {

    return(
        <div style={{backgroundColor: '#f1f1f1'}}>
        <div style={{backgroundColor: '#f1f1f1', width: '100%', height: '100%'}}>
            {/* <div>hey</div> */}
            <NavbarComponent/>
        </div>
        </div>
    )
}