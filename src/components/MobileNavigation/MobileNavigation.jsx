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
            to="/"
            className={({ isActive }) => isActive ? styles.MobileNavigationList__activeLink : styles.MobileNavigationList__link}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.MobileNavigationList__item}>
          <NavLink
            to="/jokes-trainings"
            className={({ isActive }) => isActive ? styles.MobileNavigationList__activeLink : styles.MobileNavigationList__link}
          >
            Jokes trainings
          </NavLink>
        </li>
        <li className={styles.MobileNavigationList__item}>
          <NavLink
            to="/sentences-trainings"
            className={({ isActive }) => isActive ? styles.MobileNavigationList__activeLink : styles.MobileNavigationList__link}
          >
            Sentences trainings
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className={styles.MobileNavigationList__item}>
            <NavLink
              to="/transcription-trainings"
              className={({ isActive }) => isActive ? styles.MobileNavigationList__activeLink : styles.MobileNavigationList__link}
              >
              Transcription trainings
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.MobileNavigationList__item}>
            <NavLink
              to="/text-transcription"
              className={({ isActive }) => isActive ? styles.MobileNavigationList__activeLink : styles.MobileNavigationList__link}
            >
              Text transcription
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.MobileNavigationList__item}>
            <NavLink
              to="/transcription-game"
              className={({ isActive }) => isActive ? styles.MobileNavigationList__activeLink : styles.MobileNavigationList__link}
            >
              Transcription game
            </NavLink>
          </li>
        )}
        <li className={styles.MobileNavigationList__item}>
          <NavLink
            to="/info"
            className={({ isActive }) => isActive ? styles.MobileNavigationList__activeLink : styles.MobileNavigationList__link}
          >
            Info
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
