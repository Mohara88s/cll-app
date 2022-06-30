import {
  fetchJokeTasksRequest,
  fetchJokeTasksSuccess,
  fetchJokeTasksError,
  fetchJokeTasksLanguagesRequest,
  fetchJokeTasksLanguagesSuccess,
  fetchJokeTasksLanguagesError,
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
      dispatch(fetchJokeTasksError(error.response.data.message));
    }
  };

export const fetchJokeTasksLanguages = () => async dispatch => {
  dispatch(fetchJokeTasksLanguagesRequest());
  try {
    const { data } = await axios.get(`/joke-tasks/languages`);
    dispatch(fetchJokeTasksLanguagesSuccess(data.languages));
  } catch (error) {
    dispatch(fetchJokeTasksLanguagesError(error.response.data.message));
  }
};
