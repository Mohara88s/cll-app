import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import TaskCongratulation from '../TaskCongratulation/TaskCongratulation';
import TrainingCongratulation from '../TrainingCongratulation/TrainingCongratulation';
import PropTypes from 'prop-types';
import styles from './UEngTranscriptionTrainings.module.css';

export default function UEngTranscriptionTrainings({
  tasksArr,
  onResolvedTraining,
}) {
  const [actualId, setActualId] = useState(0);
  const [losts, setLosts] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [originalArray, setOriginalArray] = useState([]);
  const [mixedArray, setMixedArray] = useState([]);
  const [resolvedArray, setResolvedArray] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setOriginalArray([...tasksArr[taskId].eng]);
  }, [taskId, tasksArr]);

  useEffect(() => {
    setMixedArray([
      ...[...originalArray].sort(() => {
        return 0.5 - Math.random();
      }),
    ]);
  }, [originalArray]);

  const onClickCharButton = e => {
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
    if (taskId >= tasksArr.length - 1) {
      setModalShow(true);
    } else {
      setTaskId(prevState => prevState + 1);
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
    <>
      <h3>U-transcription:</h3>
      {!tasksArr[taskId].utrn && (
        <h3 className={styles.warning}>no available</h3>
      )}
      <p className={styles.trainingWord}>{tasksArr[taskId].utrn}</p>
      <h3>Translation:</h3>
      {!tasksArr[taskId].rus && (
        <h3 className={styles.warning}>no available</h3>
      )}
      <p className={styles.trainslation}>
        {tasksArr[taskId].rus.split('/')[0]}
      </p>

      <h3>Make a word from the letters according to this U-transcription:</h3>
      <ul className={styles.fealdsList}>
        <li className={styles.fealdsList__item}>
          <h4 className={styles.fealdHeader}>Unresolved field</h4>
          {!tasksArr[taskId].eng && (
            <h3 className={styles.warning}>no available</h3>
          )}
          <ul className={styles.listTags}>
            {mixedArray.map((elem, id) => (
              <li key={id} className={styles.listTags__item}>
                <Button
                  variant="primary"
                  data-id={id}
                  onClick={onClickCharButton}
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
          <h4 className={styles.fealdHeader}>Resolved field</h4>
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
      />
    </>
  );
}

UEngTranscriptionTrainings.propTypes = {
  tasksArr: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      eng: PropTypes.string.isRequired,
      utrn: PropTypes.string.isRequired,
      rus: PropTypes.string.isRequired,
    }),
  ),
};
