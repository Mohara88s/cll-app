import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';

import Container from './components/Container/Container';
import MobileAppBar from './components/MobileAppBar/MobileAppBar';
import AppBar from './components/AppBar/AppBar';

import authSelectors from './redux/auth/auth-selectors';
import { fetchCurrentUser } from './redux/auth/auth-operations';

import 'modern-normalize/modern-normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.css';

import HomePageView from './views/HomePageView/HomePageView.js';
// const HomePageView = lazy(() =>
//   import(
//     './views/HomePageView/HomePageView.js' /* webpackChunkName:"HomePageView" */
//   ),
// );
const RegisterView = lazy(() =>
  import(
    './views/RegisterView/RegisterView' /* webpackChunkName:"RegisterView" */
  ),
);
const LoginView = lazy(() =>
  import('./views/LoginView/LoginView' /* webpackChunkName:"LoginView" */),
);
const PasswordResetView = lazy(() =>
  import(
    './views/PasswordResetView/PasswordResetView' /* webpackChunkName:"PasswordReset" */
  ),
);
const JokesTrainingsView = lazy(() =>
  import(
    './views/JokesTrainingsView/JokesTrainingsView' /* webpackChunkName:"JokesTrainingsView" */
  ),
);
const SentencesTrainingsView = lazy(() =>
  import(
    './views/SentencesTrainingsView/SentencesTrainingsView' /* webpackChunkName:"SentencesTrainingsView" */
  ),
);
const TranscriptionTrainingsView = lazy(() =>
  import(
    './views/TranscriptionTrainingsView/TranscriptionTrainingsView.js' /* webpackChunkName:"TranscriptionTrainingsView" */
  ),
);
const TextTranscriptionView = lazy(() =>
  import(
    './views/TextTranscriptionView/TextTranscriptionView.js' /* webpackChunkName:"TextTranscriptionView" */
  ),
);
const TranscriptionGameView = lazy(() =>
  import(
    './views/TranscriptionGameView/TranscriptionGameView.js' /* webpackChunkName:"TranscriptionGameView" */
  ),
);
const UserView = lazy(() =>
  import('./views/UserView/UserView.js' /* webpackChunkName:"UserView" */),
);
const AdminView = lazy(() =>
  import('./views/AdminView/AdminView.js' /* webpackChunkName:"AdminView" */),
);
const InfoView = lazy(() =>
  import('./views/InfoView/InfoView' /* webpackChunkName:"InfoView" */),
);
const NotFoundView = lazy(() =>
  import(
    './views/NotFoundView/NotFoundView' /* webpackChunkName:"NotFoundView" */
  ),
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  const userSubscription = useSelector(authSelectors.getUserSubscription);
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

              <PublicRoute path="/password-reset" restricted>
                <PasswordResetView />
              </PublicRoute>

              <Route exact path="/jokes-trainings">
                <JokesTrainingsView />
              </Route>

              <Route exact path="/sentences-trainings">
                <SentencesTrainingsView />
              </Route>

              <PrivateRoute exact path="/transcription-trainings">
                <TranscriptionTrainingsView />
              </PrivateRoute>

              <PrivateRoute exact path="/text-transcription">
                <TextTranscriptionView />
              </PrivateRoute>

              <PrivateRoute exact path="/transcription-game">
                <TranscriptionGameView />
              </PrivateRoute>

              <PrivateRoute exact path="/user">
                <UserView />
              </PrivateRoute>

              {userSubscription === 'admin' && (
                <PrivateRoute exact path="/admin">
                  <AdminView />
                </PrivateRoute>
              )}

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
