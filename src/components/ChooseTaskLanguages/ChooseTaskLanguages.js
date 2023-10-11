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
    const language = languages.find(e => e.language_name === value);
    dispatch(setOriginalLanguage(language));
  };

  const onClickButtonTranslationLanguage = e => {
    const { value } = e.currentTarget;
    const language = languages.find(e => e.language_name === value);
    dispatch(setTranslationLanguage(language));
  };

  return (
    <div className={styles.ChooseTaskLanguages}>
      <ul className={styles.ChooseTaskLanguagesList}>
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
    </div>
  );
}
