import {
  fetchSentencesTasksRequest,
  fetchSentencesTasksSuccess,
  fetchSentencesTasksError,
  fetchSentencesTasksByJokeTaskIdRequest,
  fetchSentencesTasksByJokeTaskIdSuccess,
  fetchSentencesTasksByJokeTaskIdError,
} from './sentences-tasks-actions';
import axios from 'axios';

export const fetchSentencesTasks =
  (originalLanguage, translationLanguage, limit = 20) =>
  async dispatch => {
    dispatch(fetchSentencesTasksRequest());
    try {
      const { data } = await axios.get(
        `/sentences-tasks?limit=${limit}&original_language=${originalLanguage}&translation_language=${translationLanguage}`,
      );
      dispatch(fetchSentencesTasksSuccess(data.tasks));
    } catch (error) {
      dispatch(
        fetchSentencesTasksError(
          error.response ? error.response.data.message : error.message,
        ),
      );
    }
  };

export const fetchSentencesTasksByJokeTaskId =
  (jokeTaskId, originalLanguage, translationLanguage, random) =>
  async dispatch => {
    dispatch(fetchSentencesTasksByJokeTaskIdRequest());
    try {
      const { data } = await axios.get(
        `/sentences-tasks/${jokeTaskId}?original_language=${originalLanguage}&translation_language=${translationLanguage}${
          random ? `&random=${random}` : ``
        }`,
      );
      dispatch(fetchSentencesTasksByJokeTaskIdSuccess(data.tasks));
    } catch (error) {
      dispatch(
        fetchSentencesTasksByJokeTaskIdError(
          error.response ? error.response.data.message : error.message,
        ),
      );
    }
  };
