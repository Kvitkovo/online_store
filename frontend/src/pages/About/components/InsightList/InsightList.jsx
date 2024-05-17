import React from 'react';
import styles from './InsightList.module.scss';
import InsightsAnimation from '../InsightsAnimation/InsightsAnimation';
import BlossomItem from '../../../../components/common/BlossomItem/BlossomItem';

const Insightlist = ({ data }) => {
  return (
    <ul className={styles.list}>
      {data.map((item) => {
        const { id, title, description } = item;
        return <BlossomItem title={title} description={description} key={id} />;
      })}
      <InsightsAnimation />
    </ul>
  );
};

export default Insightlist;
