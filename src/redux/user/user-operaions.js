import {
  fetchOwnUDictionaryRequest,
  fetchOwnUDictionarySuccess,
  fetchOwnUDictionaryError,
  addToOwnUDictionaryRequest,
  addToOwnUDictionarySuccess,
  addToOwnUDictionaryError,
} from './user-actions';
import axios from 'axios';

export const fetchOwnUDictionary = () => async dispatch => {
  dispatch(fetchOwnUDictionaryRequest());
  try {
    const { data } = await axios.get(`/users/own-u-dictionary`);
    dispatch(fetchOwnUDictionarySuccess(data.ownUDictionary));
  } catch (error) {
    dispatch(fetchOwnUDictionaryError(error.response.data.message));
  }
};

export const addToOwnUDictionary = wordsSet => async dispatch => {
  dispatch(addToOwnUDictionaryRequest());
  try {
    const { data } = await axios.patch(`/users/own-u-dictionary`, wordsSet);
    dispatch(addToOwnUDictionarySuccess(data.ownUDictionary));
  } catch (error) {
    dispatch(addToOwnUDictionaryError(error.response.data.message));
  }
};
