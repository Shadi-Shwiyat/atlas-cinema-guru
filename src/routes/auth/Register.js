import React from 'react';
import Input from '../../components/general/Input.js';
import Button from '../../components/general/Button.js';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import './auth.css';

export default function Login({
  username,
  password,
  setUsername,
  setPassword,
}) {
  const handleSignUp = (e) => {
    e.preventDefault();
    // console.log('Sign Up clicked!');
    // console.log('Username Value is:', username);
    // console.log('Password Value is:', password);
  }

  return (
    <>
      <p className='sign-on-header'>Create a new account</p>
      <div className='sign-on-input-container'>
        <Input
        label='Username:'
        type='text'
        className='username-input'
        value={username}
        setValue={setUsername}
        icon={faUser}
        />
        <Input
        label='Password:'
        type='text'
        className='password-input'
        value={password}
        setValue={setPassword}
        icon={faKey}
        />
      </div>
      <div className='sign-on-container'>
        <Button
          label='Sign Up'
          className='sign-on-button'
          onClick={handleSignUp}
          icon={faPlus}
        />
      </div>
    </>
  )
}