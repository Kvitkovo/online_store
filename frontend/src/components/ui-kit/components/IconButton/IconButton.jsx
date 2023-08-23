import React, { useEffect, useState } from 'react';
import styles from './IconButton.module.scss';

const IconButton = (props) => {
  let [classNames, setClassNames] = useState([]);

  const calculateClassNames = (props) => {
    let newClassNames = [styles.button];
    if (props.isBorderYellow) newClassNames.push(styles['icon-border-yellow']);
    if (props.isBorderGreen) newClassNames.push(styles['icon-border-green']);
    if (props.isRound) newClassNames.push(styles['icon-round']);
    if (props.isOpacity) newClassNames.push(styles['icon-opacity']);
    if (props.isBackground) newClassNames.push(styles['icon-background']);
    if (props.isRectangularWithPadding)
      newClassNames.push(styles['icon-rectangular-padding']);
    if (props.isRoundGreen) newClassNames.push(styles['icon-round-green']);
    return newClassNames.join(' ');
  };

  useEffect(() => {
    setClassNames(calculateClassNames(props));
  }, [props]);

  return (
    <button className={classNames} onClick={props.onClick}>
      {props.icon}
    </button>
  );
};

export default IconButton;
