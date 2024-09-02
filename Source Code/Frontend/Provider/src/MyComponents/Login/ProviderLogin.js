import { Button, Card, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../assets/images/Login Images/hospLogin.webp';
import logo from '../../assets/images/logos/hosp.jpg'

export default function ProviderLogin() {
  const [userId, setuserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId.trim() === '' && password.trim() === '') {
      setError('User ID and password are required');
    } else if (password.trim() === '') {
      setError('Password is required');
    } else if (userId.trim() === '') {
      setError('userId is required');
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters');
    } else {
      await axios.get("http://localhost:9093/provider/fetchProvider/" + userId)
        .then((resp) => {
          const currUser = resp.data.user;
          if (userId === currUser.userId && password === currUser.password) {
            localStorage.setItem('provider', JSON.stringify(resp.data));
            navigate('/providerHome');
            console.log('Login successfull', resp.data);
          } else {
            setError('Invalid Password..!')
          }
          console.log(resp.data);
        })
        .catch((error) => { setError('Invalid User ID or Password'); console.error(error) })
    }
  };

  console.log("Password :", password);
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '600px',
      backgroundImage: `url(${bgImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
       }}>
      <Card raised style={{ width: 400, height: 350, textAlign: 'center', borderRadius: 10, marginLeft: '-700px' }}>
        <img src={logo} alt='Login' height='100px' style={{margin: '10px 0'}} />
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="User ID"
            value={userId}
            onChange={(e) => setuserId(e.target.value)}
          />
          <br /> <br/>
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /> <br/>
          {error && <div style={{ color: 'ed' }}>{error}</div>}
          <Button type="submit" variant='contained'>Login</Button>
        </form>
      </Card>
    </div>
  );
}
