import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { authSelectors } from '../../redux/auth';
import { useSelector } from 'react-redux';

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
            to="/anecdotes-trainings"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Anecdotes trainings
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
