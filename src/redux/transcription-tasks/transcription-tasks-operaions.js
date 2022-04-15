import {
  fetchTranscriptionTasksRequest,
  fetchTranscriptionTasksSuccess,
  fetchTranscriptionTasksError,
} from './transcription-tasks-actions';
import axios from 'axios';
export const fetchTranscriptionTasks = () => async dispatch => {
  dispatch(fetchTranscriptionTasksRequest());
  try {
    const { data } = await axios.get(`/contacts`);
    dispatch(fetchTranscriptionTasksSuccess(data));
  } catch (error) {
    dispatch(fetchTranscriptionTasksError(error.message));
  }
};
