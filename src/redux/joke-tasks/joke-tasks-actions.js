import { createAction } from '@reduxjs/toolkit';

export const changeFilter = createAction('joke-tasks/changeFilter');

export const changeJokeTask = createAction('joke-tasks/changeJokeTask');

export const setOriginalLanguage = createAction(
  'joke-tasks/setOriginalLanguage',
);
export const setTranslationLanguage = createAction(
  'joke-tasks/setTranslationLanguage',
);

export const fetchJokeTasksRequest = createAction(
  'joke-tasks/fetchJokeTasksRequest',
);
export const fetchJokeTasksSuccess = createAction(
  'joke-tasks/fetchJokeTasksSuccess',
);
export const fetchJokeTasksError = createAction(
  'joke-tasks/fetchJokeTasksError',
);

export const fetchJokeTasksLanguagesRequest = createAction(
  'joke-tasks/fetchJokeTasksLanguagesRequest',
);
export const fetchJokeTasksLanguagesSuccess = createAction(
  'joke-tasks/fetchJokeTasksLanguagesSuccess',
);
export const fetchJokeTasksLanguagesError = createAction(
  'joke-tasks/fetchJokeTasksLanguagesError',
);

export const addJokeTaskRequest = createAction('contacts/addJokeTaskRequest');
export const addJokeTaskSuccess = createAction('contacts/addJokeTaskSuccess');
export const addJokeTaskError = createAction('contacts/addJokeTaskError');

export const deleteJokeTaskRequest = createAction(
  'contacts/deleteJokeTaskRequest',
);
export const deleteJokeTaskSuccess = createAction(
  'contacts/deleteJokeTaskSuccess',
);
export const deleteJokeTaskError = createAction('contacts/deleteJokeTaskError');

export const updateJokeTaskRequest = createAction(
  'contacts/updateJokeTaskRequest',
);
export const updateJokeTaskSuccess = createAction(
  'contacts/updateJokeTaskSuccess',
);
export const updateJokeTaskError = createAction('contacts/updateJokeTaskError');
