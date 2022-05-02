const getError = state => state.ownDictionarys.error;
const getLoading = state => state.ownDictionarys.loading;
const getAddDictionaryError = state => state.ownDictionarys.addDictionaryError;
const getAddDictionaryLoading = state =>
  state.ownDictionarys.addDictionaryLoading;
const getOwnDictionarys = state => state.ownDictionarys.ownDictionarys;
const getCurrentDictionary = state => state.ownDictionarys.currentDictionary;
const getAddDictionarySuccess = state =>
  state.ownDictionarys.addDictionarySuccess;

const ownDictionarysSelectors = {
  getError,
  getLoading,
  getAddDictionaryError,
  getAddDictionaryLoading,
  getOwnDictionarys,
  getCurrentDictionary,
  getAddDictionarySuccess,
};
export default ownDictionarysSelectors;
