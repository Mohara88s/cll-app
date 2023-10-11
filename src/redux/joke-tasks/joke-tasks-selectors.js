const getJokeTasksFilter = state => state.jokeTasks.filter;
const getJokeTask = state => state.jokeTasks.jokeTask;
const getJokeTasks = state => state.jokeTasks.tasks;
const getJokeTasksLoading = state => state.jokeTasks.loading;
const getJokeTasksError = state => state.jokeTasks.error;
const getJokeTasksLanguagesError = state => state.jokeTasks.languagesError;
const getJokeTasksLanguagesLoading = state => state.jokeTasks.languagesLoading;
const getJokeTasksLanguages = state => state.jokeTasks.languages;
const getOriginalLanguage = state => state.jokeTasks.originalLanguage;
const getTranslationLanguage = state => state.jokeTasks.translationLanguage;

const jokeTasksSelectors = {
  getJokeTasksFilter,
  getJokeTask,
  getJokeTasks,
  getJokeTasksLoading,
  getJokeTasksError,
  getJokeTasksLanguagesError,
  getJokeTasksLanguagesLoading,
  getJokeTasksLanguages,
  getOriginalLanguage,
  getTranslationLanguage,
};
export default jokeTasksSelectors;
