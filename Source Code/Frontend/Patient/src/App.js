import logo from '../src/logo.svg';
// import './App.css';
import PatientHome from './MyComponents/Dashboards/PatientHome';
import LoginPage from './MyComponents/Login/Login';
import AllPrescriptions from './MyComponents/PrescriptionComponents/AllPrescriptions';
import PrescriptionSummary from './MyComponents/PrescriptionComponents/PrescriptionSummary';
import ProfilePage from './MyComponents/Profile/Profile';
import SentRefillRequests from './MyComponents/RefillComponents/SentRefillRequests';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RegisterUser from './MyComponents/UserComponents/RegisterUser';

function App() {
  return (
    <div>
      {/* <PharmacyLogin/> */}

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/patientHome' element={<PatientHome />} />
        <Route path='/allPrescriptions' element={<AllPrescriptions />} />
        <Route path='/allPrescriptions/:prescriptionId' element={<PrescriptionSummary />} />
        <Route path='/sentRefill' element={<SentRefillRequests />} />
        <Route path='/userProfile' element={<ProfilePage />} />
        <Route path='/register' element={<RegisterUser />} />
      </Routes>

    </div>
  );
}

export default App;
