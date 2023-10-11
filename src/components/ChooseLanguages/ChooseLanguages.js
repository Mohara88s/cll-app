import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import { fetchJokeTasksLanguages } from '../../redux/joke-tasks/joke-tasks-operaions';
import {
  setOriginalLanguage,
  setTranslationLanguage,
} from '../../redux/joke-tasks/joke-tasks-actions';
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
                <li key={elem._id + 1}>
                  <Button
                    variant="primary"
                    onClick={onClickButtonOriginalLanguage}
                    value={elem.language_name}
                    className={
                      elem.language_name === originalLanguage.language_name
                        ? 'btn btn-primary btn-lg'
                        : 'btn btn-primary'
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
                <li key={elem._id + 2}>
                  <Button
                    variant="primary"
                    onClick={onClickButtonTranslationLanguage}
                    value={elem.language_name}
                    className={
                      elem.language_name === translationLanguage.language_name
                        ? 'btn btn-primary btn-lg'
                        : 'btn btn-primary'
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
