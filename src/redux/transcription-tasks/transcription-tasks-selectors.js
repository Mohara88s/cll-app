const getTranscriptionTasksError = state => state.transcriptionTasks.error;
const getTranscriptionTasksLoading = state => state.transcriptionTasks.loading;
const getTranscriptionTasks = state => state.transcriptionTasks.tasks;
const getTranscriptionTasksSet = state => state.transcriptionTasks.tasksSet;

const transcriptionTasksSelectors = {
  getTranscriptionTasksError,
  getTranscriptionTasksLoading,
  getTranscriptionTasks,
  getTranscriptionTasksSet,
};
export default transcriptionTasksSelectors;
