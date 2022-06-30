const getSentencesTasksError = state => state.sentencesTasks.error;
const getSentencesTasksLoading = state => state.sentencesTasks.loading;
const getSentencesTasks = state => state.sentencesTasks.tasks;

const sentencesTasksSelectors = {
  getSentencesTasksError,
  getSentencesTasksLoading,
  getSentencesTasks,
};
export default sentencesTasksSelectors;
