import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { gsap } from 'gsap';
import styles from './Keypad.module.css';

const lettersSet = [
  { key: 'a' },
  { key: 'b' },
  { key: 'c' },
  { key: 'd' },
  { key: 'e' },
  { key: 'f' },
  { key: 'g' },
  { key: 'h' },
  { key: 'i' },
  { key: 'j' },
  { key: 'k' },
  { key: 'l' },
  { key: 'm' },
  { key: 'n' },
  { key: 'o' },
  { key: 'p' },
  { key: 'q' },
  { key: 'r' },
  { key: 's' },
  { key: 't' },
  { key: 'u' },
  { key: 'v' },
  { key: 'w' },
  { key: 'x' },
  { key: 'y' },
  { key: 'z' },
  { key: '-' },
  { key: "'" },
];
const lettersSetUp = [
  { key: 'A' },
  { key: 'B' },
  { key: 'C' },
  { key: 'D' },
  { key: 'E' },
  { key: 'F' },
  { key: 'G' },
  { key: 'H' },
  { key: 'I' },
  { key: 'J' },
  { key: 'K' },
  { key: 'L' },
  { key: 'M' },
  { key: 'N' },
  { key: 'O' },
  { key: 'P' },
  { key: 'Q' },
  { key: 'R' },
  { key: 'S' },
  { key: 'T' },
  { key: 'U' },
  { key: 'V' },
  { key: 'W' },
  { key: 'X' },
  { key: 'Y' },
  { key: 'Z' },
  { key: '-' },
  { key: "'" },
];

export default function Keypad({ usedKeys, handleKeyup, isCorrect }) {
  const [shift, setShift] = useState(false);

  const onClickButton = e => {
    const { value } = e.currentTarget;
    if (value === 'Shift') {
      setShift(!shift);
    }
    if (!isCorrect) {
      handleKeyup({ key: value });
      gsap
        .timeline()
        .to(e.currentTarget, { scale: 0.8, duration: 0.2 })
        .to(e.currentTarget, { scale: 1, duration: 0.2 });
    }
  };
  return (
    <div className={styles.keypad}>
      {!shift &&
        lettersSet.map(l => {
          const color = usedKeys[l.key];
          return (
            <Button
              key={l.key}
              className={styles.keypad__button}
              variant={color ? color : 'secondary'}
              onClick={onClickButton}
              value={l.key}
            >
              {l.key}
            </Button>
          );
        })}
      {shift &&
        lettersSetUp.map(l => {
          const color = usedKeys[l.key];
          return (
            <Button
              key={l.key}
              className={styles.keypad__button}
              variant={color ? color : 'secondary'}
              onClick={onClickButton}
              value={l.key}
            >
              {l.key}
            </Button>
          );
        })}
      <Button
        className={styles.keypad__buttonShift}
        variant="secondary"
        onClick={onClickButton}
        value="Shift"
      >
        Shift
      </Button>
      <Button
        key="Enter"
        className={styles.keypad__buttonEnter}
        variant="secondary"
        onClick={onClickButton}
        value="Enter"
      >
        Enter
      </Button>
      <Button
        key="Backspace"
        className={styles.keypad__buttonBackspace}
        variant="secondary"
        onClick={onClickButton}
        value="Backspace"
      >
        Backspace
      </Button>
    </div>
  );
}
