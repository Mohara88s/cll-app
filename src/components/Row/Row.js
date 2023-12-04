// import React, {useLayoutEffect} from 'react'
import Button from 'react-bootstrap/Button';

import styles from './Row.module.css';
// import { gsap } from "gsap";

export default function Row({ guess, currentGuess, solutionLength }) {
  // useLayoutEffect(() => {
  //   gsap.timeline().to(".row__button", {scale:2, duration:3} );
  // }, []);

  const emptyArr = [...Array(solutionLength)];
  if (guess) {
    return (
      <div className={styles.row}>
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
          <Button variant="dark" key={i} className={styles.row__button}>
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
