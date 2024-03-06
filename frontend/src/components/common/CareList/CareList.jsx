import React, { useState, useRef, useEffect } from 'react';
import styles from './CareList.module.scss';
import clsx from 'clsx';

import data from '../../../data/careListData';

export default function CareList() {
  const [selected, setSelected] = useState([]);
  const contentRefs = useRef([]);
  const toggle = (id) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  useEffect(() => {
    selected.forEach((id) => {
      const contentRef = contentRefs.current[id];
      if (contentRef) {
        const contentHeight = contentRef.scrollHeight;
        contentRef.style.maxHeight = contentHeight + 'px';
      }
    });
  }, [selected]);

  return (
    <ul className={styles.list}>
      {data.map((item) => (
        <li className={styles.item} key={item.id}>
          <div
            className={clsx(styles.wrapper, {
              [styles.selected]: selected.includes(item.id),
            })}
            onClick={() => toggle(item.id)}
          >
            <div className={styles.titleWrapper}>
              <div
                className={clsx(styles.numberWrapper, {
                  [styles.selected]: selected.includes(item.id),
                })}
              >
                <span className={styles.number}>{item.id}</span>
              </div>
              <p
                className={clsx(styles.title, {
                  [styles.selected]: selected.includes(item.id),
                })}
              >
                {item.title}
              </p>
            </div>
            <p
              style={
                selected.includes(item.id)
                  ? {
                      height: contentRefs.current[item.id]?.scrollHeight,
                    }
                  : { height: '0px' }
              }
              ref={(el) => (contentRefs.current[item.id] = el)}
              className={clsx(styles.content, {
                [styles.expanded]: selected.includes(item.id),
              })}
            >
              {item.content}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
