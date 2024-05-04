import React, { useState, useRef, useEffect } from 'react';
import styles from './QuestionList.module.scss';

import QuestionItem from './CareItem/QuestionItem';

const QuestionList = ({ data }) => {
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
        <QuestionItem
          item={item}
          setSelected={setSelected}
          selected={selected}
          contentRefs={contentRefs}
          key={item.id}
        />
      ))}
    </ul>
  );
};

export default QuestionList;
