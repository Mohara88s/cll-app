import {
  fetchOwnDictionariesRequest,
  fetchOwnDictionariesSuccess,
  fetchOwnDictionariesError,
  addOwnDictionaryRequest,
  addOwnDictionarySuccess,
  addOwnDictionaryError,
  deleteOwnDictionaryRequest,
  deleteOwnDictionarySuccess,
  deleteOwnDictionaryError,
  fetchOwnDictionaryRequest,
  fetchOwnDictionarySuccess,
  fetchOwnDictionaryError,
} from './own-dictionaries-actions';
import axios from 'axios';

export const fetchOwnDictionaries = () => async dispatch => {
  dispatch(fetchOwnDictionariesRequest());
  try {
    const { data } = await axios.get(`/own-dictionaries`);
    dispatch(fetchOwnDictionariesSuccess(data.ownDictionaries));
  } catch (error) {
    dispatch(fetchOwnDictionariesError(error.response.data.message));
  }
};

export const addOwnDictionary = wordsSet => async dispatch => {
  dispatch(addOwnDictionaryRequest());
  try {
    const { data } = await axios.patch(`/own-dictionaries`, wordsSet);
    dispatch(addOwnDictionarySuccess(data.ownDictionary));
  } catch (error) {
    dispatch(addOwnDictionaryError(error.response.data.message));
  }
};

export const deleteOwnDictionary = dictionaryId => async dispatch => {
  dispatch(deleteOwnDictionaryRequest());
  try {
    const { data } = await axios.delete(`/own-dictionaries/${dictionaryId}`);
    dispatch(deleteOwnDictionarySuccess(data.ownDictionary));
  } catch (error) {
    dispatch(deleteOwnDictionaryError(error.response.data.message));
  }
};

export const fetchOwnDictionary = dictionaryId => async dispatch => {
  dispatch(fetchOwnDictionaryRequest());
  try {
    const { data } = await axios.get(`/own-dictionaries/${dictionaryId}`);
    dispatch(fetchOwnDictionarySuccess(data.ownDictionary));
  } catch (error) {
    dispatch(fetchOwnDictionaryError(error.response.data.message));
  }
};
