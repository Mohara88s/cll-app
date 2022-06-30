import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import sentencesTasksSelectors from '../../redux/sentences-tasks/sentences-tasks-selectors';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import { fetchSentencesTasks } from '../../redux/sentences-tasks/sentences-tasks-operaions';
import ChooseLanguages from '../ChooseLanguages/ChooseLanguages';
import SentencesTrainings from '../../components/SentencesTrainings/SentencesTrainings';
import styles from './SentencesTrainingsPage.module.css';

export default function SentencesTrainingsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  const [sentencesList, setSentencesList] = useState([]);
  const originalLanguage = useSelector(jokeTasksSelectors.getOriginalLanguage);
  const translationLanguage = useSelector(
    jokeTasksSelectors.getTranslationLanguage,
  );
  const tasks = useSelector(sentencesTasksSelectors.getSentencesTasks);
  // const error = useSelector(
  //   sentencesTasksSelectors.getSentencesTasksError,
  // );
  // const loading = useSelector(
  //   sentencesTasksSelectors.getSentencesTasksLoading,
  // );

  const onClickTrainButton = () => {
    dispatch(fetchSentencesTasks(originalLanguage, translationLanguage, 20));
    console.log('fetch');
  };

  useEffect(() => {
    setSentencesList(tasks);
  }, [tasks]);

  const onResolvedTraining = () => {
    setSentencesList([]);
  };

  return (
    <div>
      <h2>Sentences trainings</h2>
      {!sentencesList[0] && <ChooseLanguages />}
      {!sentencesList[0] && (
        <Button
          variant="primary"
          onClick={onClickTrainButton}
          className={styles.trainButton}
        >
          Press the button to generate 20 random sentences and practice it
        </Button>
      )}

      {sentencesList[0] && (
        <SentencesTrainings
          sentencesList={sentencesList}
          onResolvedTraining={onResolvedTraining}
        />
      )}
    </div>
  );
}
