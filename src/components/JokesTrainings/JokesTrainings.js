import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import styles from './JokesTrainings.module.css';
import PropTypes from 'prop-types';
// import { throttle } from 'lodash';

export default function JokesTrainings({ jokesList }) {
  const [actualId, setActualId] = useState(0);
  const [losts, setLosts] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [jokeId, setJokeId] = useState(0);
  const [originalArray, setOriginalArray] = useState([]);
  const [mixedArray, setMixedArray] = useState([]);
  const [resolvedArray, setResolvedArray] = useState([]);

  useEffect(() => {
    if (jokesList[jokeId].translation) {
      setOriginalArray([
        ...jokesList[jokeId].translation
          .match(/[^.?!]+[.!?]+[\])'"`’”]*|.+/g)
          .map(e => (e[0] === ' ' ? e.slice(1) : e)),
      ]);
    }
  }, [jokeId, jokesList]);

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
    if (jokeId >= jokesList.length - 1) {
      setJokeId(0);
    } else {
      setJokeId(prevState => prevState + 1);
    }
    setActualId(0);
    setLosts(0);
    setAttempts(0);
    setResolved(false);
    setResolvedArray([]);
  };

  return (
    <div className={styles.JokesTrainings}>
      <h3>Joke in original language</h3>
      {!jokesList[jokeId].original && (
        <h3 className={styles.warning}>no original available</h3>
      )}
      <p>{jokesList[jokeId].original}</p>

      <h3>Joke in translation language</h3>
      <ul className={styles.jokeFealdsList}>
        <li className={styles.jokeFealdsList__item}>
          <h4 className={styles.jokeFealdHeader}>Unresolved joke</h4>
          {!jokesList[jokeId].translation && (
            <h3 className={styles.warning}>no translation available</h3>
          )}
          <ul className={styles.listTags}>
            {mixedArray.map((elem, id) => (
              <li key={id} className={styles.listTags__item}>
                <Button
                  variant="primary"
                  data-id={id}
                  // onClick={throttle(onClickButton, 500)}
                  onClick={onClickSentenceButton}
                  value={elem}
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
        <li className={styles.jokeFealdsList__item}>
          <h4 className={styles.jokeFealdHeader}>Resolved joke</h4>
          <ul className={styles.listTags}>
            {resolvedArray.map((elem, id) => (
              <li key={id} className={styles.listTags__item}>
                <Button variant="primary">{elem}</Button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

JokesTrainings.propTypes = {
  jokesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired,
    }),
  ),
};
