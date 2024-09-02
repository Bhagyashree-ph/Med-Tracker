import { Button, Card, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function ProviderLogin() {
  const [userId, setuserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim() === '' && password.trim() === '') {
      setError('User ID and password are required');
    } else if(password.trim() === '') {
      setError('Password is required');
    } else if(userId.trim() === '') {
        setError('userId is required');
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters');
    } else {
      // Call API or perform login logic here
      console.log('Login successful!');
    }
  };

  console.log("Password :", password);
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px'}}>
    <Card raised style={{width: 400, height: 350, textAlign: 'center', borderRadius: 10}}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="User ID"
            value={userId}
            onChange={(e) => setuserId(e.target.value)}
          />
        <br />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <br />
        {error && <div style={{ color: 'ed' }}>{error}</div>}
        <Button type="submit" variant='contained'>Login</Button>
      </form>
    </Card>
    </div>
  );
}
