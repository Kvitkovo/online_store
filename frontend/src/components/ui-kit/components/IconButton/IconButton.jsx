import React from 'react';
import './IconButton.scss';

const IconButton = (props) => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      className={`${props.isBorder ? 'icon-border' : 'icon'}
        ${props.isRound ? 'icon-round' : ''}
        ${props.isOpacity ? 'icon-opacity' : ''}
        ${props.isRoundWithPadding ? 'icon-round-padding' : ''}
        ${props.isBackground ? 'icon-background' : ''}
        `}
      onClick={onclick}
    />
  );
};

export default IconButton;
