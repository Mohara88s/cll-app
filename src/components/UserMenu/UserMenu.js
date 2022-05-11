import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import { Button } from 'react-bootstrap';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const onLogoutClick = async () => {
    await dispatch(authOperations.signout());
    window.location.reload();
  };

  return (
    <div className={styles.UserMenu}>
      <p className={styles.greating}>
        Hello
        <Link
          to={{
            pathname: `/user/`,
          }}
        >
          <span className={styles.userName}>{name}</span>
        </Link>
      </p>
      <Button className={styles.Button} type="button" onClick={onLogoutClick}>
        Logout
      </Button>
    </div>
  );
}
