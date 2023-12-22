import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';

const Navigation = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <nav className={styles.Navigation}>
      <ul className={styles.NavigationList}>
        <li className={styles.NavigationList__item}>
          <NavLink
            exact
            to="/"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.NavigationList__item}>
          <NavLink
            exact
            to="/jokes-trainings"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Jokes trainings
          </NavLink>
        </li>
        <li className={styles.NavigationList__item}>
          <NavLink
            exact
            to="/sentences-trainings"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Sentences trainings
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className={styles.NavigationList__item}>
            <NavLink
              exact
              to="/transcription-trainings"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Transcription trainings
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.NavigationList__item}>
            <NavLink
              exact
              to="/text-transcription"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Text transcription
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.NavigationList__item}>
            <NavLink
              exact
              to="/transcription-game"
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Transcription game
            </NavLink>
          </li>
        )}
        <li className={styles.NavigationList__item}>
          <NavLink
            exact
            to="/info"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Info
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
