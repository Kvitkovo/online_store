import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LinksList.module.scss';

const LinksList = ({ title, links }) => {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list}>
        {links.map((link) => (
          <li className={styles.item} key={link.route}>
            <NavLink className={styles.links} to={link.route}>
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LinksList;
