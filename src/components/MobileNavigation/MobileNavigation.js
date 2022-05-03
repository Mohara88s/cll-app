import { NavLink } from 'react-router-dom';
import styles from './MobileNavigation.module.css';
import { authSelectors } from '../../redux/auth';
import { useSelector } from 'react-redux';

const MobileNavigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <nav className={styles.MobileNavigation}>
      <ul className={styles.MobileNavigationList}>
        <li className={styles.MobileNavigationList__item}>
          <NavLink
            exact
            to="/"
            className={styles.MobileNavigationList__link}
            activeClassName={styles.activeLink}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.MobileNavigationList__item}>
          <NavLink
            exact
            to="/anecdotes-trainings"
            className={styles.MobileNavigationList__link}
            activeClassName={styles.activeLink}
          >
            Anecdotes trainings
          </NavLink>
        </li>
        <li className={styles.MobileNavigationList__item}>
          <NavLink
            exact
            to="/sentences-trainings"
            className={styles.MobileNavigationList__link}
            activeClassName={styles.activeLink}
          >
            Sentences trainings
          </NavLink>
        </li>
        <li className={styles.MobileNavigationList__item}>
          <NavLink
            exact
            to="/q-transcription-trainings"
            className={styles.MobileNavigationList__link}
            activeClassName={styles.activeLink}
          >
            Q-transcription trainings
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className={styles.MobileNavigationList__item}>
            <NavLink
              exact
              to="/u-transcription-trainings"
              className={styles.MobileNavigationList__link}
              activeClassName={styles.activeLink}
            >
              U-transcription trainings
            </NavLink>
          </li>
        )}
        <li className={styles.MobileNavigationList__item}>
          <NavLink
            exact
            to="/info"
            className={styles.MobileNavigationList__link}
            activeClassName={styles.activeLink}
          >
            Info
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
