import React, { memo, useMemo } from 'react';
import styles from './IconButton.module.scss';

const IconButton = memo((props) => {
  const calculateClassNames = useMemo(() => {
    let newClassNames = [styles.button];
    if (props.isBorderYellow) newClassNames.push(styles['icon-border-yellow']);
    if (props.isBorderGreen) newClassNames.push(styles['icon-border-green']);
    if (props.isRound) newClassNames.push(styles['icon-round']);
    if (props.isOpacity) newClassNames.push(styles['icon-opacity']);
    if (props.isBackground) newClassNames.push(styles['icon-background']);
    if (props.isRectangularWithPadding)
      newClassNames.push(styles['icon-rectangular-padding']);
    if (props.isRoundGreen) newClassNames.push(styles['icon-round-green']);
    if (props.isShadow) newClassNames.push(styles['icon-shadow']);
    return newClassNames.join(' ');
  }, [
    props.isBorderYellow,
    props.isBorderGreen,
    props.isRound,
    props.isOpacity,
    props.isBackground,
    props.isRectangularWithPadding,
    props.isRoundGreen,
    props.isShadow,
  ]);

  return (
    <button
      className={calculateClassNames}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon}
      <div>{props.children}</div>
    </button>
  );
});

export default IconButton;
