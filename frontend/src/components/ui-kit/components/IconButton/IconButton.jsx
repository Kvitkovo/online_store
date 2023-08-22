import React from 'react';
import styles from './IconButton.module.scss';

const IconButton = (props) => {
  return (
    <button
      className={`${styles.button} ${
        props.isBorderYellow && `${styles['icon-border-yellow']}`
      } ${props.isBorderGreen && `${styles['icon-border-green']}`} ${
        props.isRound && `${styles['icon-round']}`
      } ${props.isOpacity && `${styles['icon-opacity']}`} ${
        props.isRoundWithPadding && `${styles['icon-round-padding']}`
      } ${props.isBackground && `${styles['icon-background']}`} ${
        props.isRectangularWithPadding &&
        `${styles['icon-rectangular-padding']}`
      } ${props.isRoundGreen && `${styles['icon-round-green']}`}
        `}
      onClick={onclick}
    >
      {props.icon}
    </button>
  );
};

export default IconButton;
