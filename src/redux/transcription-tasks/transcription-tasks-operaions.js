import {
  fetchTranscriptionTasksRequest,
  fetchTranscriptionTasksSuccess,
  fetchTranscriptionTasksError,
} from './transcription-tasks-actions';
import axios from 'axios';

export const fetchTranscriptionTasks = query => async dispatch => {
  dispatch(fetchTranscriptionTasksRequest());
  try {
    const { data } = await axios.get(
      `/transcription-tasks?page=1&limit=10&query=${query}`,
    );
    dispatch(fetchTranscriptionTasksSuccess(data.tasks));
  } catch (error) {
    dispatch(fetchTranscriptionTasksError(error.response.data.message));
  }
};
