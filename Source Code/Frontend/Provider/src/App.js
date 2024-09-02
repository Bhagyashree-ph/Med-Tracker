import logo from '../src/logo.svg';
// import './App.css';
import ProviderLogin from './MyComponents/Login/ProviderLogin';
import AllPatients from './MyComponents/PatientComponents/AllPatients';
import PatientSummary from './MyComponents/PatientComponents/PatientSumaary';
import RecievedRefillRequests from './MyComponents/RefillComponents/RecievedRefillRequests';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProviderHome from './MyComponents/Dashboards/ProviderHome';


function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<ProviderLogin />} />
        <Route path='/login' element={<ProviderLogin />} />
        <Route path='/providerHome' element={<ProviderHome />} />
        <Route path='/allPatients' element={<AllPatients />} />
        <Route path='/allPatients/:patientId' element={<PatientSummary />} />
        <Route path='/recievedRefill' element={<RecievedRefillRequests />} />
      </Routes>

    </div>
  );
}

export default App;
