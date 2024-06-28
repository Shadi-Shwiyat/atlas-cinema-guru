import React from 'react';
import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Input({
  label,
  type,
  className,
  value,
  setValue,
  icon,
  inputAttributes,}) {
    const handleInput = (e) => {
      e.preventDefault();
      setValue(e.target.value);
    }

    return (
      <>
        {label && <label>{label}</label>}
        <div className='input-container'>
          {icon && <FontAwesomeIcon icon={icon} className='input-icon'></FontAwesomeIcon>}
          <input
          type={type}
          className={className}
          value={value}
          {...inputAttributes}
          onChange={handleInput}
          >
          </input>
        </div>
      </>
    )
  }
  