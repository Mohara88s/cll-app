import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './UTranscriptionTrainings.module.css';

export default function UTranscriptionTrainings({ wordsArr }) {
  const [actualId, setActualId] = useState(0);
  const [losts, setLosts] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [wordId, setWordId] = useState(0);
  const [originalArray, setOriginalArray] = useState([]);
  const [mixedArray, setMixedArray] = useState([]);
  const [resolvedArray, setResolvedArray] = useState([]);
  const [qTranscriptionOn, setQTranscriptionOn] = useState(false);

  useEffect(() => {
    setOriginalArray([...wordsArr[wordId].utrn]);
  }, [wordsArr]);

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
      mixedArray.splice(id, 1);
      resolvedArray.push(value);
      button.classList.remove('btn-success');
      button.classList.add('btn-primary');
      setActualId(prevState => prevState + 1);
    }, 300);
  };

  const onPositiveTrainingResult = () => {
    setTimeout(() => {
      setResolved(true);
    }, 300);
  };

  const onClickButtonNext = () => {
    if (wordId >= wordsArr.length - 1) {
      setWordId(0);
    } else {
      setWordId(prevState => prevState + 1);
    }
    setActualId(0);
    setLosts(0);
    setAttempts(0);
    setResolved(false);
    setResolvedArray([]);
  };

  return (
    <div className={styles.UTranscriptionTrainings}>
      <h3>English word:</h3>
      {!wordsArr[wordId].eng && (
        <h3 className={styles.warning}>no available</h3>
      )}
      <p className={styles.trainingWord}>{wordsArr[wordId].eng}</p>
      <h3>Translation:</h3>
      {!wordsArr[wordId].rus && (
        <h3 className={styles.warning}>no available</h3>
      )}
      <p className={styles.trainslation}>{wordsArr[wordId].rus}</p>

      <h3>Select U-transcription for the following english word:</h3>
      <ul className={styles.fealdsList}>
        <li className={styles.fealdsList__item}>
          <h4 className={styles.fealdHeader}>Unresolved field</h4>
          {!wordsArr[wordId].utrn && (
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
            <div className={styles.congratulations}>
              <h3>Congratulations, you're great!!!</h3>
              <p>Are you ready for a new test?</p>
              <p>Then press NEXT!</p>
              <Button variant="warning" onClick={onClickButtonNext}>
                NEXT
              </Button>
              <div className={styles.statistics}>
                <h5>Сurrent statistics:</h5>
                <p>Attempts: {attempts}</p>
                <p>Losts: {losts}</p>
              </div>
            </div>
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
    </div>
  );
}

UTranscriptionTrainings.propTypes = {
  wordsArr: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      eng: PropTypes.string.isRequired,
      utrn: PropTypes.string.isRequired,
      rus: PropTypes.string.isRequired,
    }),
  ),
};
