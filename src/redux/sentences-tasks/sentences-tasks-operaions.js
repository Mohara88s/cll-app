import {
  fetchSentencesTasksRequest,
  fetchSentencesTasksSuccess,
  fetchSentencesTasksError,
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
      dispatch(fetchSentencesTasksError(error.response.data.message));
    }
  };
