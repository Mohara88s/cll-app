const getJokeTasksFilter = state => state.jokeTasks.filter;
const getJokeTasksError = state => state.jokeTasks.error;
const getJokeTasksLoading = state => state.jokeTasks.loading;
const getJokeTasks = state => state.jokeTasks.tasks;
const getJokeTasksLanguagesError = state => state.jokeTasks.languagesError;
const getJokeTasksLanguagesLoading = state => state.jokeTasks.languagesLoading;
const getJokeTasksLanguages = state => state.jokeTasks.languages;
const getOriginalLanguage = state => state.jokeTasks.originalLanguage;
const getTranslationLanguage = state => state.jokeTasks.translationLanguage;

const jokeTasksSelectors = {
  getJokeTasksFilter,
  getJokeTasksError,
  getJokeTasksLoading,
  getJokeTasks,
  getJokeTasksLanguagesError,
  getJokeTasksLanguagesLoading,
  getJokeTasksLanguages,
  getOriginalLanguage,
  getTranslationLanguage,
};
export default jokeTasksSelectors;
