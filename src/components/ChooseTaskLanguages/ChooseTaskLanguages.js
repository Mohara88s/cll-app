import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import {
  setOriginalLanguage,
  setTranslationLanguage,
} from '../../redux/joke-tasks/joke-tasks-actions';
import styles from './ChooseTaskLanguages.module.css';

export default function ChooseTaskLanguages({ languages }) {
  const dispatch = useDispatch();
  const originalLanguage = useSelector(jokeTasksSelectors.getOriginalLanguage);
  const translationLanguage = useSelector(
    jokeTasksSelectors.getTranslationLanguage,
  );

  const onClickButtonOriginalLanguage = e => {
    const { value } = e.currentTarget;
    dispatch(setOriginalLanguage(value));
  };

  const onClickButtonTranslationLanguage = e => {
    const { value } = e.currentTarget;
    dispatch(setTranslationLanguage(value));
  };

  return (
    <div className={styles.ChooseTaskLanguages}>
      <ul className={styles.ChooseTaskLanguagesList}>
        <li>
          <h3>Choose original language:</h3>
          <ul className={styles.languagesList}>
            {languages.map(elem => (
              <li key={elem + 1}>
                <Button
                  variant="primary"
                  onClick={onClickButtonOriginalLanguage}
                  value={elem}
                  className={
                    elem === originalLanguage
                      ? 'btn btn-primary btn-lg'
                      : 'btn btn-primary'
                  }
                >
                  {elem}
                </Button>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h3>Choose translation language:</h3>
          <ul className={styles.languagesList}>
            {languages.map(elem => (
              <li key={elem + 2}>
                <Button
                  variant="primary"
                  onClick={onClickButtonTranslationLanguage}
                  value={elem}
                  className={
                    elem === translationLanguage
                      ? 'btn btn-primary btn-lg'
                      : 'btn btn-primary'
                  }
                >
                  {elem}
                </Button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
