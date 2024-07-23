import React from 'react';

import { ICONS } from '../../../../components/ui-kit/icons';

import styles from './GoogleMap.module.scss';

const GoogleMap = ({ href, language = 'uk' }) => {
  return (
    <>
      <a
        href={href}
        className={styles.location}
        target="_blank"
        rel="noopener noreferrer"
      >
        місто:
        <span>
          <ICONS.location /> Київ
        </span>
      </a>
      <div className={styles.gMap}>
        <div className={styles.gMapCanvas}>
          <iframe
            // eslint-disable-next-line max-len
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.9623584901133!2d30.54657677695061!3d50.44180178798602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cfa592b6919d%3A0xc6cb9d15524f6ff4!2z0YPQuy4g0JjQstCw0L3QsCDQnNCw0LfQtdC_0YssIDExLCDQmtC40LXQsiwgMDIwMDA!5e0!3m2!1sru!2sua!4v1721016674684!5m2!1s${language}!2sua`}
            className={styles.gMapIFrame}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
};

export default GoogleMap;
