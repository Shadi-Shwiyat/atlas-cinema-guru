import React from 'react';
import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button({
  label,
  className,
  onClick,
  icon = null,
}) {
  return (
    <button className={className} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className='button-icon'></FontAwesomeIcon>}
      {label}
    </button>
  )
}
