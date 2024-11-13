import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.jsx";
import { RestrictedRoute } from "./components/RestrictedRoute/RestrictedRoute.jsx";

import Container from "./components/Container/Container.jsx";
import MobileAppBar from "./components/MobileAppBar/MobileAppBar.jsx";
import AppBar from "./components/AppBar/AppBar.jsx";

import authSelectors from "./redux/auth/auth-selectors.js";
import { fetchCurrentUser } from "./redux/auth/auth-operations.js";

import "modern-normalize/modern-normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.module.css";

import HomePageView from "./views/HomePageView/HomePageView.jsx";
// const HomePageView = lazy(() =>
//   import(
//     './views/HomePageView/HomePageView.jsx' /* webpackChunkName:"HomePageView" */
//   ),
// );
const RegisterView = lazy(() =>
	import(
		"./views/RegisterView/RegisterView.jsx" /* webpackChunkName:"RegisterView" */
	)
);
const LoginView = lazy(() =>
	import("./views/LoginView/LoginView.jsx" /* webpackChunkName:"LoginView" */)
);
const PasswordResetView = lazy(() =>
	import(
		"./views/PasswordResetView/PasswordResetView.jsx" /* webpackChunkName:"PasswordReset" */
	)
);
const JokesTrainingsView = lazy(() =>
	import(
		"./views/JokesTrainingsView/JokesTrainingsView.jsx" /* webpackChunkName:"JokesTrainingsView" */
	)
);
const SentencesTrainingsView = lazy(() =>
	import(
		"./views/SentencesTrainingsView/SentencesTrainingsView.jsx" /* webpackChunkName:"SentencesTrainingsView" */
	)
);
const TranscriptionTrainingsView = lazy(() =>
	import(
		"./views/TranscriptionTrainingsView/TranscriptionTrainingsView.jsx" /* webpackChunkName:"TranscriptionTrainingsView" */
	)
);
const TextTranscriptionView = lazy(() =>
	import(
		"./views/TextTranscriptionView/TextTranscriptionView.jsx" /* webpackChunkName:"TextTranscriptionView" */
	)
);
const TranscriptionGameView = lazy(() =>
	import(
		"./views/TranscriptionGameView/TranscriptionGameView.jsx" /* webpackChunkName:"TranscriptionGameView" */
	)
);
const UserView = lazy(() =>
	import("./views/UserView/UserView.jsx" /* webpackChunkName:"UserView" */)
);
const AdminView = lazy(() =>
	import("./views/AdminView/AdminView.jsx" /* webpackChunkName:"AdminView" */)
);
const InfoView = lazy(() =>
	import("./views/InfoView/InfoView.jsx" /* webpackChunkName:"InfoView" */)
);
const NotFoundView = lazy(() =>
	import(
		"./views/NotFoundView/NotFoundView.jsx" /* webpackChunkName:"NotFoundView" */
	)
);

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
	const userSubscription = useSelector(authSelectors.getUserSubscription);
	return (
		<div>
			{!isFetchingCurrentUser && (
				<div>
					<AppBar />
					<MobileAppBar />
					<Container>
						<Suspense
							fallback={<Spinner animation="border" variant="primary" />}
						>
							<Routes>
								<Route path="/" element={<HomePageView />} />

								<Route
									path="/login"
									element={
										<RestrictedRoute redirectTo="/" component={<LoginView />} />
									}
								/>

								<Route
									path="/register"
									element={
										<RestrictedRoute
											redirectTo="/"
											component={<RegisterView />}
										/>
									}
								/>

								<Route
									path="/password-reset"
									element={
										<RestrictedRoute
											redirectTo="/"
											component={<PasswordResetView />}
										/>
									}
								/>

								<Route
									path="/jokes-trainings"
									element={<JokesTrainingsView />}
								/>

								<Route
									path="/sentences-trainings"
									element={<SentencesTrainingsView />}
								/>

								<Route
									path="/transcription-trainings"
									element={
										<PrivateRoute
											redirectTo="/login"
											component={<TranscriptionTrainingsView />}
										/>
									}
								/>

								<Route
									path="/text-transcription"
									element={
										<PrivateRoute
											redirectTo="/login"
											component={<TextTranscriptionView />}
										/>
									}
								/>

								<Route
									path="/transcription-game"
									element={
										<PrivateRoute
											redirectTo="/transcription-game"
											component={<TranscriptionGameView />}
										/>
									}
								/>

								<Route
									path="/user"
									element={
										<PrivateRoute
											redirectTo="/login"
											component={<UserView />}
										/>
									}
								/>

								{userSubscription === "admin" && (
									<Route
										path="/admin"
										element={
											<PrivateRoute
												redirectTo="/login"
												component={<AdminView />}
											/>
										}
									/>
								)}

								<Route path="/info" element={<InfoView />} />

								<Route path="*" element={<NotFoundView />} />
							</Routes>
						</Suspense>
					</Container>
				</div>
			)}
		</div>
	);
}

export default App;
