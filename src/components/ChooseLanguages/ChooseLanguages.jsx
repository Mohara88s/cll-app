import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import { fetchJokeTasksLanguages } from '../../redux/joke-tasks/joke-tasks-operations';
import {
  setOriginalLanguage,
  setTranslationLanguage,
} from '../../redux/joke-tasks/joke-tasks-actions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './ChooseLanguages.module.css';

export default function ChooseLanguages() {
  const dispatch = useDispatch();

  const languages = useSelector(jokeTasksSelectors.getJokeTasksLanguages);
  const languagesError = useSelector(
    jokeTasksSelectors.getJokeTasksLanguagesError,
  );
  // const languagesLoading = useSelector(
  //   jokeTasksSelectors.getJokeTasksLanguagesLoading,
  // );
  const originalLanguage = useSelector(jokeTasksSelectors.getOriginalLanguage);
  const translationLanguage = useSelector(
    jokeTasksSelectors.getTranslationLanguage,
  );

  useEffect(() => {
    dispatch(fetchJokeTasksLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (originalLanguage === null) dispatch(setOriginalLanguage(languages[0]));
    if (translationLanguage === null)
      dispatch(setTranslationLanguage(languages[languages.length - 1]));
    // eslint-disable-next-line
  }, [dispatch, languages]);

  const onClickButtonOriginalLanguage = e => {
    const { value } = e.currentTarget;
    const language = languages.find(e => e.language_name === value);
    dispatch(setOriginalLanguage(language));
  };

  const onClickButtonTranslationLanguage = e => {
    const { value } = e.currentTarget;
    const language = languages.find(e => e.language_name === value);
    dispatch(setTranslationLanguage(language));
  };

  return (
    <div className={styles.ChooseLanguages}>
      <ul className={styles.ChooseLanguagesList}>
        <li>
          <h3>Choose original language:</h3>
          {originalLanguage && (
            <ul className={styles.languagesList}>
              {languages.map(elem => (
                <li key={elem._id + 1} className={styles.languagesList__item}>
                  <Button
                    variant={
                      elem.language_name === originalLanguage.language_name
                        ? 'primary'
                        : 'secondary'
                    }
                    size={
                      elem.language_name === originalLanguage.language_name
                        ? 'lg'
                        : ''
                    }
                    onClick={onClickButtonOriginalLanguage}
                    value={elem.language_name}
                    className={
                      elem.language_name === originalLanguage.language_name
                        ? styles.languagesList__activeButton
                        : styles.languagesList__button
                    }
                  >
                    {elem.language_name}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <h3>Choose translation language:</h3>
          {translationLanguage && (
            <ul className={styles.languagesList}>
              {languages.map(elem => (
                <li key={elem._id + 2} className={styles.languagesList__item}>
                  <Button
                    variant={
                      elem.language_name === translationLanguage.language_name
                        ? 'primary'
                        : 'secondary'
                    }
                    size={
                      elem.language_name === translationLanguage.language_name
                        ? 'lg'
                        : ''
                    }
                    onClick={onClickButtonTranslationLanguage}
                    value={elem.language_name}
                    className={
                      elem.language_name === translationLanguage.language_name
                        ? styles.languagesList__ActiveButton
                        : styles.languagesList__Button
                    }
                  >
                    {elem.language_name}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
      {languagesError && <ErrorMessage message={languagesError} />}
    </div>
  );
}
