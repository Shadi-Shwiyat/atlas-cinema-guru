import React from 'react';
import './general.css';

export default function SelectInput({
  label,
  options,
  className,
  value,
  setValue,
}) {
    const handleSelect = (e) => {
      // console.log(value);
      e.preventDefault();
      setValue(e.target.value);
      // console.log(e.target.value);
    }

    return (
      <div className='select-input-container'>
        {label && <label>{label}</label>}
        <select className={className} value={value} onChange={handleSelect}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
}