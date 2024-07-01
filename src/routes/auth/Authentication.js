import React, { useState, useEffect } from 'react';
import Button from '../../components/general/Button.js';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import './auth.css';
;

export default function Authentication({
  setIsLoggedIn,
  setUserUsername,
}) {
  const [_switch, set_switch] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signinClick = (e) => {
    e.preventDefault();
    set_switch(true);
  }

  const signupClick = (e) => {
    e.preventDefault();
    set_switch(false);
  }

  // useEffect(() => {
  //   console.log('Switch is:', _switch);
  // }, [_switch]);

  return (
    <form className='auth-form'>
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
    </form>
  )
}