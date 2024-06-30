import React from 'react';
import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Input({
  label,
  type,
  className,
  value,
  setValue,
  icon = null,
  inputAttributes = null,
}) {
    const handleInput = (e) => {
      e.preventDefault();
      setValue(e.target.value);
    }

    return (
      <div className='input-container'>
        <div className='input-label-container'>
          {icon && <FontAwesomeIcon icon={icon} className='input-icon'></FontAwesomeIcon>}
          {label && <label className={`input-label ${type == 'number' ? 'number-label' : ''}`}>{label}</label>}
        </div>
        <input
        type={type}
        className={className}
        value={value}
        {...inputAttributes}
        onChange={handleInput}
        >
        </input>
      </div>
    )
  }

  export default Input;