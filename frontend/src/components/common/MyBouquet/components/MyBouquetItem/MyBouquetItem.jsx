import React from 'react';

// import CountBlock from '../../../Cart/components/CountBlock';
import Divider from '../../../../ui-kit/components/Divider';
import IconButton from '../../../../ui-kit/components/IconButton';

import styles from './MyBouqetItem.module.scss';
import { ICONS } from '../../../../ui-kit/icons';

const MyBouquetItem = ({ items, count }) => {
  return (
    <div className={styles.itemsBlock}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={styles.item}>
            <div className={styles.leftBlock}>
              <IconButton icon={<ICONS.CloseIcon />} />
              <div className={styles.blockImg}>
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </div>
            </div>
            <div className={styles.rightBlock}>
              {/* <CountBlock count={count} /> */}
              {count}
              <div className={styles.price}>
                <b>{item.price}</b>
                <span>грн</span>
              </div>
            </div>
          </div>
          {index < items.length - 1 && (
            <div className={styles.divider}>
              <Divider />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MyBouquetItem;
