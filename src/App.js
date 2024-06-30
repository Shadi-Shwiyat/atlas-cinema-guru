import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    // Get the access token from local storage only when
    // the component mounts
    const accessToken = localStorage.getItem('accessToken');

    // Send post request to /api/auth/ with auth header 
    // with accessToken
    

  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
