import {
  fetchJokeTasksRequest,
  fetchJokeTasksSuccess,
  fetchJokeTasksError,
  fetchJokeTasksLanguagesRequest,
  fetchJokeTasksLanguagesSuccess,
  fetchJokeTasksLanguagesError,
  addJokeTaskRequest,
  addJokeTaskSuccess,
  addJokeTaskError,
  deleteJokeTaskRequest,
  deleteJokeTaskSuccess,
  deleteJokeTaskError,
  updateJokeTaskRequest,
  updateJokeTaskSuccess,
  updateJokeTaskError,
} from './joke-tasks-actions';
import axios from 'axios';

export const fetchJokeTasks =
  (query, originalLanguage, translationLanguage, page = 1, limit = 20) =>
  async dispatch => {
    dispatch(fetchJokeTasksRequest());
    try {
      const { data } = await axios.get(
        `/joke-tasks?page=${page}&limit=${limit}&query=${query}&original_language=${originalLanguage}&translation_language=${translationLanguage}`,
      );
      dispatch(fetchJokeTasksSuccess(data.tasks));
    } catch (error) {
      dispatch(
        fetchJokeTasksError(
          error.response ? error.response.data.message : error.message,
        ),
      );
    }
  };

export const fetchJokeTasksLanguages = () => async dispatch => {
  dispatch(fetchJokeTasksLanguagesRequest());
  try {
    const { data } = await axios.get(`/joke-tasks/languages`);
    dispatch(fetchJokeTasksLanguagesSuccess(data.languages));
  } catch (error) {
    dispatch(
      fetchJokeTasksLanguagesError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const addJokeTask = task => async dispatch => {
  dispatch(addJokeTaskRequest());
  try {
    const { data } = await axios.post(`/joke-tasks`, task);
    dispatch(addJokeTaskSuccess(data));
  } catch (error) {
    dispatch(
      addJokeTaskError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const deleteJokeTask = taskId => async dispatch => {
  dispatch(deleteJokeTaskRequest());
  try {
    const { data } = await axios.delete(`/joke-tasks/${taskId}`);
    dispatch(deleteJokeTaskSuccess(data));
  } catch (error) {
    dispatch(
      deleteJokeTaskError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const updateJokeTask =
  ({ taskId, update }) =>
  async dispatch => {
    dispatch(updateJokeTaskRequest());
    try {
      const { data } = await axios.put(`/joke-tasks/${taskId}`, update);
      dispatch(updateJokeTaskSuccess(data));
    } catch (error) {
      dispatch(
        updateJokeTaskError(
          error.response ? error.response.data.message : error.message,
        ),
      );
    }
  };
