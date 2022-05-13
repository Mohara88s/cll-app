import { createAction } from '@reduxjs/toolkit';

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
