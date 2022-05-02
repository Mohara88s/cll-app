const getUserError = state => state.user.userError;
const getUserLoading = state => state.user.userLoading;
const getUserOwnDictionarys = state => state.user.ownDictionarys;
const getCurrentDictionary = state => state.user.currentDictionary;

const userSelectors = {
  getUserError,
  getUserLoading,
  getUserOwnDictionarys,
  getCurrentDictionary,
};
export default userSelectors;
