import {
  fetchOwnDictionarysRequest,
  fetchOwnDictionarysSuccess,
  fetchOwnDictionarysError,
  addOwnDictionaryRequest,
  addOwnDictionarySuccess,
  addOwnDictionaryError,
  deleteOwnDictionaryRequest,
  deleteOwnDictionarySuccess,
  deleteOwnDictionaryError,
} from './own-dictionarys-actions';
import axios from 'axios';

export const fetchOwnDictionarys = () => async dispatch => {
  dispatch(fetchOwnDictionarysRequest());
  try {
    const { data } = await axios.get(`/own-dictionarys`);
    dispatch(fetchOwnDictionarysSuccess(data.ownDictionarys));
  } catch (error) {
    dispatch(fetchOwnDictionarysError(error.response.data.message));
  }
};

export const addOwnDictionary = wordsSet => async dispatch => {
  dispatch(addOwnDictionaryRequest());
  try {
    const { data } = await axios.patch(`/own-dictionarys`, wordsSet);
    dispatch(addOwnDictionarySuccess(data.ownDictionarys));
  } catch (error) {
    dispatch(addOwnDictionaryError(error.response.data.message));
  }
};

export const deleteOwnDictionary = dictionaryId => async dispatch => {
  dispatch(deleteOwnDictionaryRequest());
  try {
    const { data } = await axios.delete(`/own-dictionarys/${dictionaryId}`);
    dispatch(deleteOwnDictionarySuccess(data.ownDictionarys));
  } catch (error) {
    dispatch(deleteOwnDictionaryError(error.response.data.message));
  }
};
