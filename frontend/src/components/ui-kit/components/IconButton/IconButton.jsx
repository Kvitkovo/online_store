import React from 'react';
import './IconButton.scss';

const IconButtton = (props) => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      className={props.border ? 'icon-border' : 'icon'}
      onClick={onclick}
    />
  );
};

export default IconButtton;
