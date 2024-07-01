import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    // Get the access token from local storage only when
    // the component mounts
    const accessToken = localStorage.getItem('accessToken');
    console.log('Access Token is:', accessToken);

    // Send post request to /api/auth/ with auth header
    // set to Bearer <accessToken>
    const authRequest = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          }
        })

        if (response.status == 200) {
          const responseData = await response.json();
          const userName = responseData['username'];
          setUserUsername(userName);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error with api/auth/ route:', error);
      }
    }

    authRequest();
  }, [])

  return (
    <div className="App">
      {/* {isLoggedIn ? <Dashboard /> : <Authentication />} */}
    </div>
  );
}

export default App;
