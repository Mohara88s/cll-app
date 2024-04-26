import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import useI18n from '../../hooks/useI18n';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';
import { languages } from '../../i18n';

const Navigation = () => {
  const { i18n, setLanguage } = useI18n()
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
            {i18n.navigation.home}
          </NavLink>
        </li>
        <li className={styles.NavigationList__item}>
          <NavLink
            exact
            to="/jokes-trainings"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            {i18n.navigation.jokesTrainings}
          </NavLink>
        </li>
        <li className={styles.NavigationList__item}>
          <NavLink
            exact
            to="/sentences-trainings"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            {i18n.navigation.sentencesTrainings}
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
              {i18n.navigation.transcriptionTrainings}
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
              {i18n.navigation.textTranscription}
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
              {i18n.navigation.transcriptionGame}
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
            {i18n.navigation.info}
          </NavLink>
        </li>
        <li className={styles.NavigationList__item}>
          <LanguageDropdown
            options={languages}
            value={i18n._language}
            onChange={setLanguage} />
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
