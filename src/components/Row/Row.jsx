import { useLayoutEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { gsap } from 'gsap';
import styles from './Row.module.css';

export default function Row({ guess, currentGuess, solutionLength }) {
  let guessRef = useRef(null);
  let currentGuessRef = useRef(null);

  useLayoutEffect(() => {
    if (guessRef.current !== null) {
      gsap
        .timeline()
        .fromTo(
          guessRef.current.childNodes,
          { scale: 0.5 },
          { scale: 1, duration: 0.5 },
        );
    }
  }, [guess]);

  useLayoutEffect(() => {
    if (currentGuessRef.current !== null) {
      gsap
        .timeline()
        .fromTo(
          currentGuessRef.current,
          { scale: 0.5 },
          { scale: 1, duration: 0.5, ease: 'back.out(3)' },
        );
    }
  }, [currentGuess]);

  if (guess) {
    return (
      <div ref={guessRef} className={styles.row}>
        {guess.map((l, i) => (
          <Button variant={l.color} key={i} className={styles.row__button}>
            {l.key}
          </Button>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split('');
    return (
      <div className={styles.row}>
        {letters.map((letter, i) => (
          <Button
            ref={currentGuessRef}
            variant="dark"
            key={i}
            className={styles.row__button}
          >
            {letter}
          </Button>
        ))}
        {[...Array(solutionLength - letters.length)].map((_, i) => (
          <Button
            variant="secondary"
            key={i}
            className={styles.row__button}
          ></Button>
        ))}
      </div>
    );
  }

  const emptyArr = [...Array(solutionLength)];

  return (
    <div className={styles.row}>
      {emptyArr.map((_, i) => (
        <Button
          key={i}
          className={styles.row__button}
          variant="secondary"
        ></Button>
      ))}
    </div>
  );
}
