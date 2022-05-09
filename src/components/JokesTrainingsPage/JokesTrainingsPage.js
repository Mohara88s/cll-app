import data from '../../database/jokes.json';
import { useState, useEffect } from 'react';
import JokesTrainings from '../JokesTrainings/JokesTrainings';
import ChooseLanguages from '../ChooseLanguages/ChooseLanguages';
import styles from './JokesTrainingsPage.module.css';

export default function JokesTrainingsPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  const languages = ['english', 'ukrainian', 'russian'];
  const [jokesList, setJokesList] = useState([]);

  const onLanguageChange = (originalLanguage, translationLanguage) => {
    const list = [...data]
      .map(e => {
        return {
          id: e.id,
          original: e[`${originalLanguage}`],
          translation: e[`${translationLanguage}`],
        };
      })
      .sort(() => {
        return 0.5 - Math.random();
      });
    setJokesList([...list]);
  };

  return (
    <div>
      <h2>Jokes trainings</h2>
      {!languages.length && (
        <h3 className={styles.warning}>No language found</h3>
      )}
      {languages.length && (
        <ChooseLanguages
          languages={languages}
          onLanguageChange={onLanguageChange}
        />
      )}

      {!jokesList.length && (
        <h3 className={styles.warning}>Jokes are missing from the database</h3>
      )}
      {jokesList.length && <JokesTrainings jokesList={jokesList} />}
    </div>
  );
}
