import { Route, Routes } from 'react-router-dom';
import logo from '../src/logo.svg';
import PharmacyLogin from './MyComponents/Login/PharmacyLogin';
import RecievedRefillRequests from './MyComponents/RefillComponents/RecievedRefillRequests'

function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<PharmacyLogin />} />
        <Route path='/recievedRefill' element={<RecievedRefillRequests />} />
      </Routes>

    </div>
  );
}

export default App;
