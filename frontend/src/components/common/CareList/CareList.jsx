import React, { useState, useRef, useEffect } from 'react';
import styles from './CareList.module.scss';

import data from '../../../data/careListData';
import CareItem from './CareItem/CareItem';

export default function CareList() {
  const [selected, setSelected] = useState([]);

  const contentRefs = useRef([]);

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
        <CareItem
          item={item}
          setSelected={setSelected}
          selected={selected}
          contentRefs={contentRefs}
          key={item.id}
        />
      ))}
    </ul>
  );
}
