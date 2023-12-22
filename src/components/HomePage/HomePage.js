import { useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import styles from './HomePage.module.css';
import jokesTrainingsImg from '../../public/pictures/jokes_trainings.jpg';
import sentencesTrainingsImg from '../../public/pictures/sentences_trainings.jpg';
import transcription__trainingsImg from '../../public/pictures/transcription__trainings.jpg';
import text__transcriptionImg from '../../public/pictures/text__transcription.jpg';
import plug__trainingsImg from '../../public/pictures/plug__trainings.jpg';
import transcription__gameImg from '../../public/pictures/transcription__game.jpg';

export default function HomePage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <div>
      <h2>Choose trainings:</h2>
      <ul className={styles.LinksList}>
        <li className={styles.LinksList__item}>
          <Link
            to={{
              pathname: `${url}jokes-trainings/`,
              state: { from: location },
            }}
          >
            <h3 className={styles.LinksList__name}>Jokes trainings</h3>
            <img
              src={jokesTrainingsImg}
              alt="Jokes trainings"
              className={styles.LinksList__picture}
            />
          </Link>
        </li>
        <li className={styles.LinksList__item}>
          <Link
            to={{
              pathname: `${url}sentences-trainings/`,
              state: { from: location },
            }}
          >
            <h3 className={styles.LinksList__name}>Sentences trainings</h3>
            <img
              src={sentencesTrainingsImg}
              alt="Sentences trainings"
              className={styles.LinksList__picture}
            />
          </Link>
        </li>

        {isLoggedIn && (
          <li className={styles.LinksList__item}>
            <Link
              to={{
                pathname: `${url}transcription-trainings/`,
                state: { from: location },
              }}
            >
              <h3 className={styles.LinksList__name}>
                Transcription trainings
              </h3>
              <img
                src={transcription__trainingsImg}
                alt="Transcription trainings"
                className={styles.LinksList__picture}
              />
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li className={styles.LinksList__item}>
            <Link
              to={{
                pathname: `${url}text-transcription/`,
                state: { from: location },
              }}
            >
              <h3 className={styles.LinksList__name}>Text transcription</h3>
              <img
                src={text__transcriptionImg}
                alt="Text transcription"
                className={styles.LinksList__picture}
              />
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li className={styles.LinksList__item}>
            <Link
              to={{
                pathname: `${url}transcription-game/`,
                state: { from: location },
              }}
            >
              <h3 className={styles.LinksList__name}>Transcription game</h3>
              <img
                src={transcription__gameImg}
                alt="Transcription game"
                className={styles.LinksList__picture}
              />
            </Link>
          </li>
        )}

        {!isLoggedIn && (
          <li className={styles.LinksList__item}>
            <Link
              to={{
                pathname: `${url}login/`,
                state: { from: location },
              }}
            >
              <h3 className={styles.LinksList__name}>
                Login for more trainings
              </h3>
              <img
                src={plug__trainingsImg}
                alt="Login for more trainings"
                className={styles.LinksList__picture}
              />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
