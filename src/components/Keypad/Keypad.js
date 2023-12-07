import Button from 'react-bootstrap/Button';
import { gsap } from 'gsap';
import styles from './Keypad.module.css';

const letters = [
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
var throttle = false;

export default function Keypad({ usedKeys, handleKeyup, isCorrect }) {
  const onClickButton = e => {
    if (throttle) return;
    throttle = true;
    setTimeout(function () {
      throttle = false;
    }, 500);

    const { value } = e.currentTarget;
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
      {letters &&
        letters.map(l => {
          const color = usedKeys[l.key];
          return (
            <Button
              key={l.key}
              className={styles.keypad__Button}
              variant={color ? color : 'secondary'}
              onClick={onClickButton}
              value={l.key}
            >
              {l.key}
            </Button>
          );
        })}
      <Button
        key="Enter"
        className={styles.keypad__ButtonEnter}
        variant="secondary"
        onClick={onClickButton}
        value="Enter"
      >
        Enter
      </Button>
      <Button
        key="Backspace"
        className={styles.keypad__ButtonBackspace}
        variant="secondary"
        onClick={onClickButton}
        value="Backspace"
      >
        Backspace
      </Button>
    </div>
  );
}
