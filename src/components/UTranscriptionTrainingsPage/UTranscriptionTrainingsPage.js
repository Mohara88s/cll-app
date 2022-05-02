import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import OwnDictionarys from '../OwnDictionarys/OwnDictionarys';
import UTranscriptionTrainings from '../UTranscriptionTrainings/UTranscriptionTrainings';
import { Button } from 'react-bootstrap';

import ownDictionarysSelectors from '../../redux/own-dictionarys/own-dictionarys-selectors';

export default function UTranscriptionTrainingsPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  const [ownDictionarysIsOpen, setOwnDictionarysIsOpen] = useState(true);
  const currentDictionary = useSelector(
    ownDictionarysSelectors.getCurrentDictionary,
  );

  useEffect(() => {
    if (currentDictionary.ownDictionaryName) setOwnDictionarysIsOpen(false);
  }, [currentDictionary]);

  const onChooseBtnClick = () => {
    setOwnDictionarysIsOpen(true);
  };
  return (
    <div>
      <h2>U-transcription trainings</h2>
      {!ownDictionarysIsOpen && (
        <Button name="chooseBtn" onClick={onChooseBtnClick} variant="primary">
          Choose another dictionary for training
        </Button>
      )}
      {ownDictionarysIsOpen && (
        <>
          <h3>Choose own dictionary for training:</h3>
          <OwnDictionarys />
        </>
      )}
      {currentDictionary.ownDictionaryName && (
        <UTranscriptionTrainings
          tasksArr={currentDictionary.ownDictionaryTasks}
        />
      )}
    </div>
  );
}
