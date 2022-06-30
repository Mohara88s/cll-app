import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import TaskCongratulation from '../TaskCongratulation/TaskCongratulation';
import TrainingCongratulation from '../TrainingCongratulation/TrainingCongratulation';

import styles from './SentencesTrainings.module.css';

export default function SentencesTrainings({
  sentencesList,
  onResolvedTraining,
}) {
  const [actualId, setActualId] = useState(0);
  const [losts, setLosts] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [sentenceId, setSentenceId] = useState(0);
  const [originalArray, setOriginalArray] = useState([]);
  const [mixedArray, setMixedArray] = useState([]);
  const [resolvedArray, setResolvedArray] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (sentencesList[sentenceId].translation) {
      setOriginalArray([
        ...sentencesList[sentenceId].translation
          .split(' ')
          .filter(e => e.length),
      ]);
    }
  }, [sentenceId, sentencesList]);

  useEffect(() => {
    setMixedArray([
      ...[...originalArray].sort(() => {
        return 0.5 - Math.random();
      }),
    ]);
    setResolvedArray([]);
  }, [originalArray]);

  const onClickSentenceButton = e => {
    const buttonValue = e.currentTarget.getAttribute('value');
    const id = Number.parseInt(e.currentTarget.getAttribute('data-id'));

    if (buttonValue === originalArray[actualId]) {
      onRightButtonClick(e.currentTarget, id, buttonValue);
    } else {
      onWrongButtonClick(e.currentTarget);
    }
    setAttempts(prevState => prevState + 1);
    if (actualId >= originalArray.length - 1) {
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
      button.disabled = true;
      button.style.color = 'transparent';
      button.style.background = 'transparent';
      button.style.borderColor = 'transparent';
      button.classList.remove('btn-success');
      button.classList.add('btn-primary');
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
    if (sentenceId >= sentencesList.length - 1) {
      setModalShow(true);
    } else {
      setSentenceId(prevState => prevState + 1);
    }
    setActualId(0);
    setLosts(0);
    setAttempts(0);
    setResolved(false);
    setResolvedArray([]);
  };

  const onCloseModal = () => {
    setModalShow(false);
    onResolvedTraining();
  };

  return (
    <div className={styles.SentencesTrainings}>
      <h3>Sentence in original language</h3>
      {!sentencesList[sentenceId].original && (
        <h3 className={styles.warning}>no original available</h3>
      )}
      <p className={styles.originalSentence}>
        {sentencesList[sentenceId].original}
      </p>

      <h3>Sentence in translation language</h3>
      <ul className={styles.fealdsList}>
        <li className={styles.fealdsList__item}>
          <h4 className={styles.fealdHeader}>Unresolved sentence</h4>
          {!sentencesList[sentenceId].translation && (
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
            <TaskCongratulation
              attempts={attempts}
              losts={losts}
              onClickButtonNext={onClickButtonNext}
            />
          )}
        </li>
        <li className={styles.fealdsList__item}>
          <h4 className={styles.fealdHeader}>Resolved sentence </h4>
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
        onClick={onClickButtonNext}
        className={styles.skipButton}
      >
        Skip task
      </Button>
      <TrainingCongratulation
        modalShow={modalShow}
        onHandleClose={onCloseModal}
        congratulationText="Congratulations! You have practiced this set of sentences."
      />
    </div>
  );
}
