import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TranscriptionGame from '../TranscriptionGame/TranscriptionGame';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import TranscriptionGameMenu from '../TranscriptionGameMenu/TranscriptionGameMenu';

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
      setOriginal(task.eng);
      setSolution(task.utrn);
    }
    if (task && !reverseMode) {
      setOriginal(task.utrn);
      setSolution(task.eng);
    }
  }, [task, reverseMode]);
  return (
    <div>
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
