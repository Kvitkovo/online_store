import React from 'react';
import styles from './IconButton.module.scss';

const IconButton = (props) => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      className={`${
        props.isBorder ? `${styles['icon-border']}` : `${styles.icon}`
      }
        ${props.isRound && `${styles['icon-round']}`}
        ${props.isOpacity && `${styles['icon-opacity']}`}
        ${props.isRoundWithPadding && `${styles['icon-round-padding']}`}
        ${props.isBackground && `${styles['icon-background']}`}
        ${
          props.isRectangularWithPadding &&
          `${styles['icon-rectangular-padding']}`
        }
        `}
      onClick={onclick}
    />
  );
};

export default IconButton;
