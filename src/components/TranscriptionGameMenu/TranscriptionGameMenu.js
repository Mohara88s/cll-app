import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spinner, Form, InputGroup } from 'react-bootstrap';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import { fetchRandomTranscriptionTask } from '../../redux/transcription-tasks/transcription-tasks-operaions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TranscriptionGameMenu.module.css';

export default function TranscriptionGameMenu() {
  const dispatch = useDispatch();
  const [numberOfSymbols, setNumberOfSymbols] = useState(5);

  const onDecreaseClick = () => {
    if (numberOfSymbols > 5) setNumberOfSymbols(numberOfSymbols - 1);
  };
  const onIncreaseClick = () => {
    if (numberOfSymbols < 10) setNumberOfSymbols(numberOfSymbols + 1);
  };

  const onStartGameClick = () => {
    dispatch(fetchRandomTranscriptionTask(numberOfSymbols));
  };
  const error = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksError,
  );
  const loading = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksLoading,
  );

  return (
    <div className={styles.transcriptionGameMenu}>
      <InputGroup className={styles.inputGroup}>
        <Button
          className={styles.inputGroup__button}
          variant="outline-secondary"
          onClick={onDecreaseClick}
        >
          Decrease
        </Button>
        <Form.Control
          placeholder={numberOfSymbols}
          className={styles.inputGroup__control}
          disabled
        />
        <Button
          className={styles.inputGroup__button}
          variant="outline-secondary"
          onClick={onIncreaseClick}
        >
          Increase
        </Button>
      </InputGroup>
      <Button
        className={styles.startButton}
        variant="primary"
        onClick={onStartGameClick}
      >
        {!loading && 'Start the game'}
        {loading && <Spinner animation="border" variant="light" size="sm" />}
      </Button>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
