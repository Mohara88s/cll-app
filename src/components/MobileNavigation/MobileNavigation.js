import { NavLink } from 'react-router-dom';
import styles from './MobileNavigation.module.css';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';

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
            to="/jokes-trainings"
            className={styles.MobileNavigationList__link}
            activeClassName={styles.activeLink}
          >
            Jokes trainings
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
        {isLoggedIn && (
          <li className={styles.MobileNavigationList__item}>
            <NavLink
              exact
              to="/transcription-trainings"
              className={styles.MobileNavigationList__link}
              activeClassName={styles.activeLink}
            >
              Transcription trainings
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.MobileNavigationList__item}>
            <NavLink
              exact
              to="/text-transcription"
              className={styles.MobileNavigationList__link}
              activeClassName={styles.activeLink}
            >
              Text transcription
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.MobileNavigationList__item}>
            <NavLink
              exact
              to="/transcription-game"
              className={styles.MobileNavigationList__link}
              activeClassName={styles.activeLink}
            >
              Transcription game
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
