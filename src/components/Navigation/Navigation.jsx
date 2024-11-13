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
            to="/"
            className={({ isActive }) =>
							isActive ? styles.activeLink : styles.link
						}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.NavigationList__item}>
          <NavLink
            to="/jokes-trainings"
            className={({ isActive }) =>
							isActive ? styles.activeLink : styles.link
						}
          >
            Jokes trainings
          </NavLink>
        </li>
        <li className={styles.NavigationList__item}>
          <NavLink
            to="/sentences-trainings"
            className={({ isActive }) =>
							isActive ? styles.activeLink : styles.link
						}
          >
            Sentences trainings
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className={styles.NavigationList__item}>
            <NavLink
              to="/transcription-trainings"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Transcription trainings
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.NavigationList__item}>
            <NavLink
              to="/text-transcription"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Text transcription
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li className={styles.NavigationList__item}>
            <NavLink
              to="/transcription-game"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Transcription game
            </NavLink>
          </li>
        )}
        <li className={styles.NavigationList__item}>
          <NavLink
            to="/info"
            className={({ isActive }) =>
							isActive ? styles.activeLink : styles.link
						}
          >
            Info
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
