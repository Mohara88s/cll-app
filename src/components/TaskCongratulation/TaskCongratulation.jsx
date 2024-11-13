import { Button } from 'react-bootstrap';
import styles from './TaskCongratulation.module.css';

const TaskCongratulation = ({ attempts, losts, onClickButtonNext }) => {
  return (
    <div className={styles.TaskCongratulation}>
      <h3>Well done!</h3>
      <Button
        className={styles.TaskCongratulation__button}
        variant="warning"
        onClick={onClickButtonNext}
      >
        Go to next tusk
      </Button>
      <ul className={styles.TaskCongratulation__statistic}>
        <li>
          <h5>Task statistic:</h5>
        </li>
        <li>
          <p>Attempts: {attempts}</p>
        </li>
        <li>
          <p>Losts: {losts}</p>
        </li>
      </ul>
    </div>
  );
};

export default TaskCongratulation;
