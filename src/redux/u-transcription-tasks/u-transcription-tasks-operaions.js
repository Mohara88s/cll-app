import {
  fetchUTranscriptionTasksRequest,
  fetchUTranscriptionTasksSuccess,
  fetchUTranscriptionTasksError,
} from './u-transcription-tasks-actions';
import axios from 'axios';

export const fetchUTranscriptionTasks = query => async dispatch => {
  dispatch(fetchUTranscriptionTasksRequest());
  try {
    const { data } = await axios.get(
      `/u-transcription-tasks?page=1&limit=10&query=${query}`,
    );
    dispatch(fetchUTranscriptionTasksSuccess(data.tasks));
  } catch (error) {
    dispatch(fetchUTranscriptionTasksError(error.response.data.message));
  }
};
