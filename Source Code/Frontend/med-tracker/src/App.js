import RoleDecision from './MyComponents/MainScreens/RoleDescision';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './MyComponents/MainScreens/LandingPage';
import ViewUser from './MyComponents/UserComponents/viewUser';
import ViewRole from './MyComponents/RoleComponents/ViewRoles';
import AdminLogin from './MyComponents/Login/AdminLogin';


function App() {
  return (
    <div>

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/role' element={<RoleDecision />} />
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/users' element={<ViewUser />} />
        <Route path='/roles' element={<ViewRole />} />
      </Routes>
      
    </div>
  );
}

export default App;
