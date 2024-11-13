import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import OwnDictionaries from '../OwnDictionaries/OwnDictionaries';
import EngUTranscriptionTrainings from '../EngUTranscriptionTrainings/EngUTranscriptionTrainings';
import UEngTranscriptionTrainings from '../UEngTranscriptionTrainings/UEngTranscriptionTrainings';
import { Button } from 'react-bootstrap';
import ownDictionariesSelectors from '../../redux/own-dictionaries/own-dictionaries-selectors';
import styles from './TranscriptionTrainingsPage.module.css';

const trainings = ['english - u-transcription', 'u-transcription - english'];

export default function TranscriptionTrainingsPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  const [ownDictionariesIsOpen, setOwnDictionariesIsOpen] = useState(true);
  const [trainingButtonsIsOpen, setTrainingButtonsIsOpen] = useState(true);
  const [selectedTaining, setSelectedTraining] = useState('');

  const onTrainingButtonClick = ({ currentTarget: { value } }) => {
    setSelectedTraining(value);
    setTrainingButtonsIsOpen(false);
  };

  const onChooseTrainingClick = () => {
    setTrainingButtonsIsOpen(true);
  };

  const currentDictionary = useSelector(
    ownDictionariesSelectors.getCurrentDictionary,
  );

  useEffect(() => {
    if (currentDictionary.ownDictionaryName) setOwnDictionariesIsOpen(false);
  }, [currentDictionary]);

  const onChooseDictionaryClick = () => {
    setOwnDictionariesIsOpen(true);
  };

  const onResolvedTraining = () => {
    setOwnDictionariesIsOpen(true);
    setTrainingButtonsIsOpen(true);
    setSelectedTraining('');
  };
  return (
    <div>
      <h2>Transcription trainings</h2>
      <ul className={styles.optionsButtonsList}>
        <li className={styles.optionsButtonsList__item}>
          {!trainingButtonsIsOpen && (
            <Button
              name="chooseTraining"
              onClick={onChooseTrainingClick}
              variant="primary"
            >
              Choose another training
            </Button>
          )}
        </li>
        <li className={styles.optionsButtonsList__item}>
          {!ownDictionariesIsOpen && (
            <Button
              name="chooseDictionary"
              onClick={onChooseDictionaryClick}
              variant="primary"
            >
              Choose another dictionary
            </Button>
          )}
        </li>
      </ul>

      {trainingButtonsIsOpen && (
        <>
          <h3>Choose type of training:</h3>
          <ul className={styles.trainingButtonsList}>
            {trainings.map(training => (
              <li key={training} className={styles.trainingButtonsList__item}>
                <Button
                  onClick={onTrainingButtonClick}
                  value={training}
                  className={
                    training === selectedTaining
                      ? 'btn btn-primary btn-lg'
                      : 'btn btn-secondary'
                  }
                >
                  {training}
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}

      {ownDictionariesIsOpen && (
        <>
          <h3>Choose own dictionary for training:</h3>
          <OwnDictionaries />
        </>
      )}

      {!ownDictionariesIsOpen &&
        !trainingButtonsIsOpen &&
        currentDictionary.ownDictionaryName &&
        selectedTaining === trainings[0] && (
          <EngUTranscriptionTrainings
            tasksArr={currentDictionary.ownDictionaryTasks}
            onResolvedTraining={onResolvedTraining}
          />
        )}

      {!ownDictionariesIsOpen &&
        !trainingButtonsIsOpen &&
        currentDictionary.ownDictionaryName &&
        selectedTaining === trainings[1] && (
          <UEngTranscriptionTrainings
            tasksArr={currentDictionary.ownDictionaryTasks}
            onResolvedTraining={onResolvedTraining}
          />
        )}
    </div>
  );
}
