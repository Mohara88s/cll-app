import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TranscriptionGame from '../TranscriptionGame/TranscriptionGame';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import TranscriptionGameMenu from '../TranscriptionGameMenu/TranscriptionGameMenu';
// import styles from './TranscriptionGamePage.module.css';

export default function TranscriptionGamePage() {
  const [reverseMode, setReverseMode] = useState(false);
  const [original, setOriginal] = useState(false);
  const [solution, setSolution] = useState(false);

  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  const task = useSelector(
    transcriptionTasksSelectors.getRandomTranscriptionTask,
  );

  useEffect(() => {
    if (task && reverseMode) {
      setOriginal(task.eng.toUpperCase());
      setSolution(task.utrn.toUpperCase());
    }
    if (task && !reverseMode) {
      setOriginal(task.utrn.toUpperCase());
      setSolution(task.eng.toUpperCase());
    }
  }, [task, reverseMode]);
  return (
    <div>
      <h2>Transcription Game</h2>
      {!task && (
        <TranscriptionGameMenu
          reverseMode={reverseMode}
          setReverseMode={setReverseMode}
        />
      )}
      {task && (
        <div>
          {!reverseMode && <h3>Transcription: {original}. Guess the word!</h3>}
          {reverseMode && (
            <h3>The word: {original}. Guess the transcription!</h3>
          )}
          <TranscriptionGame solution={solution} />
        </div>
      )}
    </div>
  );
}
