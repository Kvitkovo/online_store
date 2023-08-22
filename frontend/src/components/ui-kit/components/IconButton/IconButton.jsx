import React from 'react';
import styles from './IconButton.module.scss';

const IconButton = (props) => {
  const addClassname = () => {
    let classNames = [styles.button];
    if (props.isBorderYellow) classNames.push(styles['icon-border-yellow']);
    if (props.isBorderGreen) classNames.push(styles['icon-border-green']);
    if (props.isRound) classNames.push(styles['icon-round']);
    if (props.isOpacity) classNames.push(styles['icon-opacity']);
    if (props.isBackground) classNames.push(styles['icon-background']);
    if (props.isRectangularWithPadding)
      classNames.push(styles['icon-rectangular-padding']);
    if (props.isRoundGreen) classNames.push(styles['icon-round-green']);
    return classNames.join(' ');
  };

  return (
    <button className={addClassname()} onClick={props.onClick}>
      {props.icon}
    </button>
  );
};

export default IconButton;
