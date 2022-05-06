const getTranscriptionTasksError = state => state.transcriptionTasks.error;
const getTranscriptionTasksLoading = state => state.transcriptionTasks.loading;
const getTranscriptionTasks = state => state.transcriptionTasks.tasks;
const getTranscriptionTasksFilter = state => state.transcriptionTasks.filter;
const getTranscriptionTasksSet = state => state.transcriptionTasks.tasksSet;

const transcriptionTasksSelectors = {
  getTranscriptionTasksError,
  getTranscriptionTasksLoading,
  getTranscriptionTasks,
  getTranscriptionTasksFilter,
  getTranscriptionTasksSet,
};
export default transcriptionTasksSelectors;
