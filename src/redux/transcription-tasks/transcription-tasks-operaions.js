import {
  fetchTranscriptionTasksRequest,
  fetchTranscriptionTasksSuccess,
  fetchTranscriptionTasksError,
  fetchRandomTranscriptionTaskRequest,
  fetchRandomTranscriptionTaskSuccess,
  fetchRandomTranscriptionTaskError,
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
    dispatch(
      fetchTranscriptionTasksError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const fetchRandomTranscriptionTask =
  numberOfSymbols => async dispatch => {
    dispatch(fetchRandomTranscriptionTaskRequest());
    try {
      const { data } = await axios.get(
        `/transcription-tasks/random?numberofsymbols=${numberOfSymbols}`,
      );
      dispatch(fetchRandomTranscriptionTaskSuccess(data.task));
    } catch (error) {
      dispatch(
        fetchRandomTranscriptionTaskError(
          error.response ? error.response.data.message : error.message,
        ),
      );
    }
  };
