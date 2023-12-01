import { createAction } from '@reduxjs/toolkit';
export const deleteRandomTask = createAction(
  'transcription-tasks/deleteRandomTask',
);
export const addToTasksSet = createAction('transcription-tasks/addToTasksSet');
export const updateTasksSet = createAction(
  'transcription-tasks/updateTasksSet',
);

export const fetchTranscriptionTasksRequest = createAction(
  'transcription-tasks/fetchTranscriptionTasksRequest',
);
export const fetchTranscriptionTasksSuccess = createAction(
  'transcription-tasks/fetchTranscriptionTasksSuccess',
);
export const fetchTranscriptionTasksError = createAction(
  'transcription-tasks/fetchTranscriptionTasksError',
);

export const fetchRandomTranscriptionTaskRequest = createAction(
  'transcription-tasks/fetchRandomTranscriptionTaskRequest',
);
export const fetchRandomTranscriptionTaskSuccess = createAction(
  'transcription-tasks/fetchRandomTranscriptionTaskSuccess',
);
export const fetchRandomTranscriptionTaskError = createAction(
  'transcription-tasks/fetchRandomTranscriptionTaskError',
);
