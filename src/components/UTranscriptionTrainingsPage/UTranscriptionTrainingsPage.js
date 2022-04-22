import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UTranscriptionTrainings from '../UTranscriptionTrainings/UTranscriptionTrainings';
import UTranscriptionDictionary from '../UTranscriptionDictionary/UTranscriptionDictionary';
import ownUDictionarySelectors from '../../redux/user/user-selectors';
import { fetchOwnUDictionary } from '../../redux/user/user-operaions';

// import styles from './UTranscriptionTrainingsPage.module.css';

export default function UTranscriptionTrainingsPage() {
  const dispatch = useDispatch();
  const ownUDictionary = useSelector(ownUDictionarySelectors.getOwnUDictionary);
  useEffect(() => {
    dispatch(fetchOwnUDictionary());
  }, [dispatch]);

  useEffect(() => {
    console.log(ownUDictionary);
  }, [ownUDictionary]);
  return (
    <div>
      <h2>U-transcription trainings</h2>
      <UTranscriptionDictionary />
      {ownUDictionary.length && (
        <UTranscriptionTrainings tasksArr={ownUDictionary} />
      )}
    </div>
  );
}
