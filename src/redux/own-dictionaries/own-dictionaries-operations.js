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
  updateOwnDictionaryRequest,
  updateOwnDictionarySuccess,
  updateOwnDictionaryError,
} from './own-dictionaries-actions';
import axios from 'axios';

export const fetchOwnDictionaries = () => async dispatch => {
  dispatch(fetchOwnDictionariesRequest());
  try {
    const { data } = await axios.get(`/own-dictionaries`);
    dispatch(fetchOwnDictionariesSuccess(data.ownDictionaries));
  } catch (error) {
    dispatch(
      fetchOwnDictionariesError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const addOwnDictionary = dictionary => async dispatch => {
  dispatch(addOwnDictionaryRequest());
  try {
    const { data } = await axios.patch(`/own-dictionaries`, dictionary);
    dispatch(addOwnDictionarySuccess(data.ownDictionary));
  } catch (error) {
    dispatch(
      addOwnDictionaryError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const deleteOwnDictionary = dictionaryId => async dispatch => {
  dispatch(deleteOwnDictionaryRequest());
  try {
    const { data } = await axios.delete(`/own-dictionaries/${dictionaryId}`);
    dispatch(deleteOwnDictionarySuccess(data.ownDictionary));
  } catch (error) {
    dispatch(
      deleteOwnDictionaryError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const fetchOwnDictionary = dictionaryId => async dispatch => {
  dispatch(fetchOwnDictionaryRequest());
  try {
    const { data } = await axios.get(`/own-dictionaries/${dictionaryId}`);
    dispatch(fetchOwnDictionarySuccess(data.ownDictionary));
  } catch (error) {
    dispatch(
      fetchOwnDictionaryError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const updateOwnDictionary =
  ({ dictionaryId, update }) =>
  async dispatch => {
    dispatch(updateOwnDictionaryRequest());
    try {
      const { data } = await axios.patch(
        `/own-dictionaries/${dictionaryId}`,
        update,
      );
      dispatch(updateOwnDictionarySuccess(data.ownDictionary));
    } catch (error) {
      dispatch(
        updateOwnDictionaryError(
          error.response ? error.response.data.message : error.message,
        ),
      );
    }
  };
