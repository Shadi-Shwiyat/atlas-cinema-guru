import React from 'react';
import Input from '../../components/general/Input.js';
import Button from '../../components/general/Button.js';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

import './auth.css';

export default function Login({
  username,
  password,
  setUsername,
  setPassword,
}) {
  const handleSignIn = (e) => {
    // e.preventDefault();
    // console.log('Sign In clicked!');
    // console.log('Username Value is:', username);
    // console.log('Password Value is:', password);
  }

  return (
    <>
      <p className='sign-on-header'>Sign in with your account</p>
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
          label='Sign In'
          className='sign-on-button'
          onClick={handleSignIn}
          icon={faKey}
        />
      </div>
    </>
  )
}