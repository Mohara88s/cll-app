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
const UserView = lazy(() =>
  import('./views/UserView/UserView.js' /* webpackChunkName:"UserView" */),
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

              <Route exact path="/jokes-trainings">
                <JokesTrainingsView />
              </Route>

              <Route exact path="/sentences-trainings">
                <SentencesTrainingsView />
              </Route>

              <PrivateRoute exact path="/transcription-trainings">
                <TranscriptionTrainingsView />
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
