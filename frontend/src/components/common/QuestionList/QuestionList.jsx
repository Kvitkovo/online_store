import React, { useState } from 'react';
import styles from './QuestionList.module.scss';

import QuestionItem from './CareItem/QuestionItem';

const QuestionList = ({ data, ...props }) => {
  const [selected, setSelected] = useState([]);

  return (
    <ul className={styles.list}>
      {data.map((item) => (
        <QuestionItem
          {...props}
          item={item}
          setSelected={setSelected}
          selected={selected}
          key={item.id}
        />
      ))}
    </ul>
  );
};

export default QuestionList;
