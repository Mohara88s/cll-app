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
    dispatch(addJokeTaskError(error.message));
  }
};

export const deleteJokeTask = id => async dispatch => {
  dispatch(deleteJokeTaskRequest());
  try {
    await axios.delete(`/joke-tasks/${id}`);
    dispatch(deleteJokeTaskSuccess(id));
  } catch (error) {
    dispatch(
      deleteJokeTaskError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};
