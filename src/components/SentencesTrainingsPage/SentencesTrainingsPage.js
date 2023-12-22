import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import sentencesTasksSelectors from '../../redux/sentences-tasks/sentences-tasks-selectors';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import {
  fetchSentencesTasks,
  fetchSentencesTasksByJokeTaskId,
} from '../../redux/sentences-tasks/sentences-tasks-operations';
import JokesList from '../JokesList/JokesList';
import ChooseLanguages from '../ChooseLanguages/ChooseLanguages';
import SentencesTrainings from '../../components/SentencesTrainings/SentencesTrainings';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './SentencesTrainingsPage.module.css';

export default function SentencesTrainingsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  const [sentencesList, setSentencesList] = useState([]);
  const [random, setRandom] = useState(false);
  const originalLanguage = useSelector(jokeTasksSelectors.getOriginalLanguage);
  const translationLanguage = useSelector(
    jokeTasksSelectors.getTranslationLanguage,
  );
  const tasks = useSelector(sentencesTasksSelectors.getSentencesTasks);
  const error = useSelector(sentencesTasksSelectors.getSentencesTasksError);
  const loading = useSelector(sentencesTasksSelectors.getSentencesTasksLoading);

  const onClickTrainButton = () => {
    dispatch(
      fetchSentencesTasks(
        originalLanguage.language_name,
        translationLanguage.language_name,
        20,
      ),
    );
  };

  useEffect(() => {
    setSentencesList(tasks);
  }, [tasks]);

  const onResolvedTraining = () => {
    setSentencesList([]);
  };

  const trainTask = task => {
    dispatch(
      fetchSentencesTasksByJokeTaskId(
        task._id,
        originalLanguage.language_name,
        translationLanguage.language_name,
        random,
      ),
    );
  };

  return (
    <div>
      <h2>Sentences trainings</h2>
      {!sentencesList[0] && (
        <>
          <ChooseLanguages />
          <Button
            variant="primary"
            onClick={onClickTrainButton}
            className={styles.trainButton}
          >
            {!loading && (
              <span>
                Press the button to generate 20 random sentences and practice it
              </span>
            )}
            {loading && <Spinner animation="border" as="span" size="sm" />}
          </Button>
          <Form.Check // prettier-ignore
            type="checkbox"
            checked={random}
            onChange={() => setRandom(!random)}
            label="Sentences in the task are random"
          />
          <JokesList passUpTask={trainTask} />
        </>
      )}

      {sentencesList[0] && (
        <SentencesTrainings
          sentencesList={sentencesList}
          onResolvedTraining={onResolvedTraining}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
