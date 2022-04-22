import { Alert } from 'react-bootstrap';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.ErrorMessage}>
      <Alert variant="danger">
        <Alert.Heading>Error:</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </div>
  );
}
