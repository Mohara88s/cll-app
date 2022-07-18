import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <>
      <ul className={styles.AuthNav__list}>
        <li className={styles.AuthNav__item}>
          <NavLink
            to="/register"
            exact
            className={styles.AuthNav__link}
            activeClassName={styles.activeLink}
          >
            Registration
          </NavLink>
        </li>
        <li className={styles.AuthNav__item}>
          <NavLink
            to="/login"
            exact
            className={styles.AuthNav__link}
            activeClassName={styles.activeLink}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </>
  );
}
