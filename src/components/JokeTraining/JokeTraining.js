import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import styles from './JokeTraining.module.css';
import { fetchSentencesTasksByJokeTaskId } from '../../redux/sentences-tasks/sentences-tasks-operations';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import ChooseTaskLanguages from '../ChooseTaskLanguages/ChooseTaskLanguages';
import TaskCongratulation from '../TaskCongratulation/TaskCongratulation';
import { useHistory } from 'react-router-dom';

export default function JokeTraining({ jokeTask, onResolvedTraining }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const [taskLanguages, setTaskLanguages] = useState([]);
  const [originalLanguageJoke, setOriginalLanguageJoke] = useState('');
  const [translationArray, setTranslationArray] = useState([]);
  const [mixedArray, setMixedArray] = useState([]);
  const [resolvedArray, setResolvedArray] = useState([]);
  const [actualId, setActualId] = useState(0);
  const [losts, setLosts] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);

  const originalLanguage = useSelector(jokeTasksSelectors.getOriginalLanguage);
  const translationLanguage = useSelector(
    jokeTasksSelectors.getTranslationLanguage,
  );
  useEffect(() => {
    setTaskLanguages(jokeTask.languages);
  }, [jokeTask]);

  useEffect(() => {
    setOriginalLanguageJoke(
      jokeTask.translations.find(
        translation =>
          translation.language.language_name === originalLanguage.language_name,
      ).text,
    );

    setMixedArray([]);
    setResolvedArray([]);
    setActualId(0);
    setLosts(0);
    setAttempts(0);

    setTranslationArray([
      ...jokeTask.translations
        .find(
          translation =>
            translation.language.language_name ===
            translationLanguage.language_name,
        )
        .text.match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g)
        .map(e => (e[0] === ' ' ? e.slice(1) : e)),
    ]);
  }, [jokeTask, originalLanguage, translationLanguage]);

  useEffect(() => {
    setMixedArray([
      ...[...translationArray].sort(() => {
        return 0.5 - Math.random();
      }),
    ]);
  }, [translationArray]);

  const onClickSentenceButton = e => {
    const buttonValue = e.currentTarget.getAttribute('value');
    const id = Number.parseInt(e.currentTarget.getAttribute('data-id'));

    if (buttonValue === translationArray[actualId]) {
      onRightButtonClick(e.currentTarget, id, buttonValue);
    } else {
      onWrongButtonClick(e.currentTarget);
    }
    setAttempts(prevState => prevState + 1);
    if (actualId >= translationArray.length - 1) {
      onPositiveTrainingResult();
    }
  };

  const onWrongButtonClick = button => {
    setLosts(prevState => prevState + 1);
    button.classList.remove('btn-primary');
    button.classList.add('btn-danger');
    setTimeout(() => {
      button.classList.remove('btn-danger');
      button.classList.add('btn-primary');
    }, 300);
  };

  const onRightButtonClick = (button, id, value) => {
    button.classList.remove('btn-primary');
    button.classList.add('btn-success');
    setTimeout(() => {
      resolvedArray.push(value);
      button.classList.remove('btn-success');
      button.classList.add('btn-primary');
      button.disabled = true;
      button.style.color = 'transparent';
      button.style.background = 'transparent';
      button.style.borderColor = 'transparent';
      setActualId(prevState => prevState + 1);
    }, 300);
  };

  const onPositiveTrainingResult = () => {
    setTimeout(() => {
      setMixedArray([]);
      setResolved(true);
    }, 300);
  };
  const onClickButtonNext = () => {
    onResolvedTraining();
  };

  const onClickSkipButton = () => {
    onResolvedTraining();
  };
  const onClickJokeSentencesTraningsButton = e => {
    const taskId = e.currentTarget.getAttribute('value');
    dispatch(
      fetchSentencesTasksByJokeTaskId(
        taskId,
        originalLanguage.language_name,
        translationLanguage.language_name,
      ),
    );
    history.push('/sentences-trainings');
  };
  return (
    <div className={styles.JokesTrainings}>
      {taskLanguages && <ChooseTaskLanguages languages={taskLanguages} />}
      <h3>Joke in original language</h3>
      {!originalLanguageJoke && (
        <h3 className={styles.warning}>no original available</h3>
      )}
      <p className={styles.originalLanguageJoke}>{originalLanguageJoke}</p>

      <h3>Joke in translation language</h3>
      <ul className={styles.jokeFealdsList}>
        <li className={styles.jokeFealdsList__item}>
          <h4 className={styles.jokeFealdHeader}>Unresolved joke</h4>
          {!translationArray && !mixedArray && (
            <h3 className={styles.warning}>no translation available</h3>
          )}
          <ul className={styles.listTags}>
            {mixedArray.map((elem, id) => (
              <li key={id} className={styles.listTags__item}>
                <Button
                  variant="primary"
                  data-id={id}
                  onClick={onClickSentenceButton}
                  value={elem}
                  className={styles.listTags__button}
                >
                  {elem}
                </Button>
              </li>
            ))}
          </ul>
          {resolved && (
            <div className={styles.CongratulationBox}>
              <TaskCongratulation
                attempts={attempts}
                losts={losts}
                onClickButtonNext={onClickButtonNext}
              />
              <Button
                variant="warning"
                onClick={onClickJokeSentencesTraningsButton}
                value={jokeTask._id}
              >
                Practice joke sentences in sentences trainings
              </Button>
            </div>
          )}
        </li>
        <li className={styles.jokeFealdsList__item}>
          <h4 className={styles.jokeFealdHeader}>Resolved joke</h4>
          <ul className={styles.listTags}>
            {resolvedArray.map((elem, id) => (
              <li key={id} className={styles.listTags__item}>
                <Button variant="primary" className={styles.listTags__button}>
                  {elem}
                </Button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <Button
        variant="primary"
        onClick={onClickSkipButton}
        className={styles.skipButton}
      >
        Skip task
      </Button>
    </div>
  );
}
