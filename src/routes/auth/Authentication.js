import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../components/general/Button.js';
import Login from './Login.js';
import Register from './Register.js';
import './auth.css';

export default function Authentication({
  setIsLoggedIn,
  setUserUsername,
}) {
  const [_switch, set_switch] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Switches auth form to Login component
  const signinClick = (e) => {
    e.preventDefault();
    set_switch(true);
  }

  // Switches auth form to Register Component
  const signupClick = (e) => {
    e.preventDefault();
    set_switch(false);
  }

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userInput = {
        username: username,
        password: password,
      };
  
      switch (_switch) {
        case true:
          axios.post('http://localhost:8000/api/auth/login', userInput)
            // Parse response as json
            .then(response => {
              if (response.status === 200) {
                return response.data;
              } else {
                throw new Error('Login failed');
              }
            })
            // Store access token in local storage
            .then(data => {
              localStorage.setItem('accessToken', data.accessToken);
              setUserUsername(username);
              setIsLoggedIn(true);
              console.log('Logged In Successfully!');
            })
            .catch(error => {
              console.error('Error during login:', error);
            });
          break;
  
        case false:
          axios.post('http://localhost:8000/api/auth/register', userInput)
            // Parse response as json
            .then(response => {
              if (response.status === 200) {
                return response.data;
              } else {
                throw new Error('Registration failed');
              }
            })
            // Store access token in local storage
            .then(data => {
              localStorage.setItem('accessToken', data.accessToken);
              setUserUsername(username);
              setIsLoggedIn(true);
              console.log('Registered Successfully!');
            })
            .catch(error => {
              console.error('Error during registration:', error);
            });
          break;
  
        default:
          throw new Error('Invalid switch value');
      }
    } catch (error) {
      console.error('An error occurred when logging in or registering:', error);
    }
  };

  // useEffect(() => {
  //   console.log('Switch is:', _switch);
  // }, [_switch]);

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <div className='button-container'>
        <Button
          label='Sign In'
          className={`switch-button ${_switch == true ? 'highlight' : ''}`}
          onClick={signinClick}
        />
        <Button
          label='Sign Up'
          className={`switch-button ${_switch == false ? 'highlight' : ''}`}
          onClick={signupClick}
        />
      </div>
      {_switch == true ? <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      /> : <Register
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />}
    </form>
  )
}