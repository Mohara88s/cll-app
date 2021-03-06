import { createAction } from '@reduxjs/toolkit';

export const changeFilter = createAction('joke-tasks/changeFilter');

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
