import React from 'react';
import './Button.scss';

const Button = ({ label, variant, icon, onClick }) => {
  const buttonClass = ['button'];

  if (variant === 'primary') {
    buttonClass.push('primary');
  } else if (variant === 'secondary') {
    buttonClass.push('secondary');
  }

  return (
    <button className={buttonClass.join(' ')} onClick={onClick}>
      {label}{' '}
      {icon && (
        <span className="icon">
          {' '}
          <img src={icon} alt="icon" />{' '}
        </span>
      )}
    </button>
  );
};

export default Button;
