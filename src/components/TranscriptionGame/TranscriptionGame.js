import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import Grid from '../Grid/Grid';
import Keypad from '../Keypad/Keypad';
import AlertComponent from '../AlertComponent/AlertComponent';
import GameModal from '../GameModal/GameModal';

import styles from './TranscriptionGame.module.css';

export default function TranscriptionGame({ solution }) {
  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState('');
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'grey', b: 'green', c: 'yellow'} etc

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'warning'}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map(l => {
      return { key: l, color: 'secondary' };
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'success';
        solutionArray[i] = null;
      }
    });

    // find any warning letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'success') {
        formattedGuess[i].color = 'warning';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = formattedGuess => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory(prevHistory => {
      return [...prevHistory, currentGuess];
    });
    setTurn(prevTurn => {
      return prevTurn + 1;
    });
    setUsedKeys(prevUsedKeys => {
      formattedGuess.forEach(l => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === 'success') {
          prevUsedKeys[l.key] = 'success';
          return;
        }
        if (l.color === 'warning' && currentColor !== 'success') {
          prevUsedKeys[l.key] = 'warning';
          return;
        }
        if (
          l.color === 'secondary' &&
          currentColor !== ('success' || 'warning')
        ) {
          prevUsedKeys[l.key] = 'secondary';
          return;
        }
      });

      return prevUsedKeys;
    });
    setCurrentGuess('');
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  // eslint-disable-next-line
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less than 5
      if (turn > 5) {
        setWarning('You used all your guesses!');
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        setWarning('You already tried that word.');
        return;
      }
      // check word is 5 chars
      if (currentGuess.length !== solution.length) {
        setWarning('The word must be longer.');
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z'-]$/.test(key)) {
      if (currentGuess.length < solution.length) {
        setCurrentGuess(prev => {
          return prev + key.toUpperCase();
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    if (isCorrect) {
      window.removeEventListener('keyup', handleKeyup);
      setTimeout(() => setShowModal(true), 2000);
    }
    if (turn > 5) {
      window.removeEventListener('keyup', handleKeyup);
      setTimeout(() => setShowModal(true), 2000);
    }
    return () => window.removeEventListener('keyup', handleKeyup);
    // eslint-disable-next-line
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div className={styles.transcriptionGame}>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        turn={turn}
        solutionLength={solution.length}
      />
      <Keypad
        usedKeys={usedKeys}
        handleKeyup={handleKeyup}
        isCorrect={isCorrect}
      />
      {warning && (
        <AlertComponent
          className={styles.AlertComponent}
          alertClose={() => setWarning('')}
          message={warning}
        />
      )}
      {showModal && (
        <GameModal
          modalShow={showModal}
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
        />
      )}
    </div>
  );
}
