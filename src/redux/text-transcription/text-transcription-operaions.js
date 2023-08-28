import {
  fetchTextTranscriptionRequest,
  fetchTextTranscriptionSuccess,
  fetchTextTranscriptionError,
} from './text-transcription-actions';
import axios from 'axios';

export const fetchTextTranscription = textData => async dispatch => {
  dispatch(fetchTextTranscriptionRequest());
  try {
    const { data } = await axios.post(
      `/text-transcription/trancript-text`,
      textData,
    );
    dispatch(fetchTextTranscriptionSuccess(data.text));
  } catch (error) {
    dispatch(
      fetchTextTranscriptionError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};
