const getOwnUDictionaryError = state => state.user.error;
const getOwnUDictionaryLoading = state => state.user.loading;
const getOwnUDictionary = state => state.user.ownUDictionary;

const ownUDictionarySelectors = {
  getOwnUDictionaryError,
  getOwnUDictionaryLoading,
  getOwnUDictionary,
};
export default ownUDictionarySelectors;
