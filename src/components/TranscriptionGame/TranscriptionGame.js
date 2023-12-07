import { useEffect, useState } from 'react';

import useTranscriptionGame from '../../hooks/useTranscriptionGame';

import Grid from '../Grid/Grid';
import Keypad from '../Keypad/Keypad';
import AlertComponent from '../AlertComponent/AlertComponent';
import GameModal from '../GameModal/GameModal';

import styles from './TranscriptionGame.module.css';

export default function TranscriptionGame({ solution }) {
  const {
    warning,
    setWarning,
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
  } = useTranscriptionGame(solution);
  const [showModal, setShowModal] = useState(false);

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
