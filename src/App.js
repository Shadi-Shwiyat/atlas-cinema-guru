import React, { useState } from 'react';
import './App.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons'
import Input from './components/general/Input.js';
import SelectInput from './components/general/SelectInput.js';
import Button from './components/general/Button.js';
import SearchBar from './components/general/SearchBar.js';

function App() {
  const [value, setValue] = useState('');
  const [numValue, setNumValue] = useState(1970);
  const [selectValue, setSelectValue] = useState('default');
  const [title, setTitle] = useState('');

  const onClick = (e) => {
    e.preventDefault();
    console.log('Button has been clicked!');
  }
  return (
    <div className="App">
      <Input 
      label='Username:'
      type='text'
      className='text-input'
      value={value}
      setValue={setValue}
      icon={faUser}
       />
      <p>{'\n\n'}</p>
      <Input 
      label='Min Date:'
      type='number'
      className='date-input'
      value={numValue}
      setValue={setNumValue}
      inputAttributes={{min: '1970', max: '2024'}}
       />
      <p>{'\n\n'}</p>
      <SelectInput
      label='Sort:'
      options={[{label: 'default', value: 'default'}, {label: 'latest', value: 'latest'}]}
      className={'select-input'}
      value={selectValue}
      setValue={setSelectValue}
       />
      <p>{'\n\n'}</p>
      <Button
      label='Load More...'
      className='button'
      onClick={onClick}
       />
      <p>{'\n\n'}</p>
      <Button
      label='Sign In'
      className='sign-on-button'
      onClick={onClick}
      icon={faKey}
       />
      <p>{'\n\n'}</p>
      <SearchBar
      title={title}
      setTitle={setTitle} />
    </div>
  );
}

export default App;
