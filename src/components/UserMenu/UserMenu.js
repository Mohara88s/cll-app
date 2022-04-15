import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import { Button } from 'react-bootstrap';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);

  return (
    <div className={styles.UserMenu}>
      <p className={styles.name}>Hallo {name}</p>
      <Button type="button" onClick={() => dispatch(authOperations.signout())}>
        Logout
      </Button>
    </div>
  );
}
