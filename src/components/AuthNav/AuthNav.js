import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';
import useI18n from '../../hooks/useI18n';

export default function AuthNav() {
  const { i18n, setLanguage } = useI18n()
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
            {i18n.authNav.registration}
          </NavLink>
        </li>
        <li className={styles.AuthNav__item}>
          <NavLink
            to="/login"
            exact
            className={styles.AuthNav__link}
            activeClassName={styles.activeLink}
          >
            {i18n.authNav.login}
          </NavLink>
        </li>
      </ul>
    </>
  );
}
