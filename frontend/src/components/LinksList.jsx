import React from 'react';
import styles from './Footer/Footer.module.scss';
import { NavLink } from 'react-router-dom';

const LinksList = ({ title, links }) => {
  return (
    <section>
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
