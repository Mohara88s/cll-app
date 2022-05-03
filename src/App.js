import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';

import Container from './components/Container/Container';
import MobileAppBar from './components/MobileAppBar/MobileAppBar';
import AppBar from './components/AppBar/AppBar';

import { authOperations, authSelectors } from './redux/auth';

import 'modern-normalize/modern-normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePageView = lazy(() =>
  import(
    './views/HomePageView/HomePageView.js' /* webpackChunkName:"HomePage" */
  ),
);
const RegisterView = lazy(() => import('./views/RegisterView/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView/LoginView'));
const AnecdotesTrainingsPageView = lazy(() =>
  import(
    './views/AnecdotesTrainingsPageView/AnecdotesTrainingsPageView.js' /* webpackChunkName:"AnecdotesTrainingsPage" */
  ),
);
const SentencesTrainingsPageView = lazy(
  () =>
    import(
      './views/SentencesTrainingsPageView/SentencesTrainingsPageView.js'
    ) /* webpackChunkName:"SentencesTrainingsPage" */,
);
const QTranscriptionTrainingsPageView = lazy(
  () =>
    import(
      './views/QTranscriptionTrainingsPageView/QTranscriptionTrainingsPageView.js'
    ) /* webpackChunkName:"QTranscriptionTrainingsPage" */,
);
const UTranscriptionTrainingsPageView = lazy(
  () =>
    import(
      './views/UTranscriptionTrainingsPageView/UTranscriptionTrainingsPageView.js'
    ) /* webpackChunkName:"UTranscriptionTrainingsPage" */,
);
const UserView = lazy(
  () => import('./views/UserView/UserView.js') /* webpackChunkName:"User" */,
);
const InfoView = lazy(() => import('./views/InfoView/InfoView'));
const NotFoundView = lazy(() => import('./views/NotFoundView/NotFoundView'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  return (
    !isFetchingCurrentUser && (
      <div>
        <AppBar />
        <MobileAppBar />
        <Container>
          <Suspense fallback={<Spinner animation="border" variant="primary" />}>
            <Switch>
              <Route exact path="/">
                <HomePageView />
              </Route>

              <PublicRoute path="/register" restricted>
                <RegisterView />
              </PublicRoute>

              <PublicRoute path="/login" restricted>
                <LoginView />
              </PublicRoute>

              <Route exact path="/anecdotes-trainings">
                <AnecdotesTrainingsPageView />
              </Route>

              <Route exact path="/sentences-trainings">
                <SentencesTrainingsPageView />
              </Route>

              <Route exact path="/q-transcription-trainings">
                <QTranscriptionTrainingsPageView />
              </Route>

              <PrivateRoute exact path="/u-transcription-trainings">
                <UTranscriptionTrainingsPageView />
              </PrivateRoute>

              <PrivateRoute exact path="/user">
                <UserView />
              </PrivateRoute>

              <Route path="/info">
                <InfoView />
              </Route>

              <Route>
                <NotFoundView />
              </Route>
            </Switch>
          </Suspense>
        </Container>
      </div>
    )
  );
}

export default App;
