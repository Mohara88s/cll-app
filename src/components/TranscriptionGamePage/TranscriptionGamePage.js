import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TranscriptionGame from '../TranscriptionGame/TranscriptionGame';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import TranscriptionGameMenu from '../TranscriptionGameMenu/TranscriptionGameMenu';
// import styles from './TranscriptionGamePage.module.css';

export default function TranscriptionGamePage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  const task = useSelector(
    transcriptionTasksSelectors.getRandomTranscriptionTask,
  );

  useEffect(() => {
    console.log(task);
  }, [task]);
  return (
    <div>
      <h2>Transcription Game</h2>
      {!task && <TranscriptionGameMenu />}
      {task && (
        <TranscriptionGame
          original={task.eng.toUpperCase()}
          solution={task.eng.toUpperCase()}
        />
      )}
    </div>
  );
}
