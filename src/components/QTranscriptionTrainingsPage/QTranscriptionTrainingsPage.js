import { useEffect } from 'react';
import data from '../../database/matrix.json';
import QTranscriptionTrainings from '../QTranscriptionTrainings/QTranscriptionTrainings';
import styles from './QTranscriptionTrainingsPage.module.css';

const list = [...data]
  .filter(e => e.hasOwnProperty('Eng') && e.hasOwnProperty('Qt'))
  .map((e, id) => {
    return {
      id,
      eng: e.Eng,
      qt: e.Qt,
    };
  })
  .sort(() => {
    return 0.5 - Math.random();
  });

export default function QTranscriptionTrainingsPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  const wordsArr = [...list];
  return (
    <div>
      <h2>Q-transcription trainings</h2>
      {!wordsArr.length && (
        <h3 className={styles.warning}>words are missing from the database</h3>
      )}
      {wordsArr.length && <QTranscriptionTrainings wordsArr={wordsArr} />}
    </div>
  );
}
