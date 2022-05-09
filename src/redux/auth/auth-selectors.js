const getIsLoggedIn = state => state.auth.isLoggedIn;

const getAuthError = state => state.auth.authError;

const getRegError = state => state.auth.regError;

const getUserEmail = state => state.auth.user.email;

const getUserName = state => state.auth.user.name;

const getIsFetchingCurrent = state => state.auth.isFetchingCurrentUser;

const getLoading = state => state.auth.loading;

const authSelectors = {
  getIsLoggedIn,
  getAuthError,
  getRegError,
  getUserEmail,
  getUserName,
  getIsFetchingCurrent,
  getLoading,
};
export default authSelectors;
