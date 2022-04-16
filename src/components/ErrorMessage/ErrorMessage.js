import { Card } from 'react-bootstrap';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.ErrorMessage}>
      <Card bg="warning" text="light" className="mb-2">
        <Card.Body>
          <Card.Title> Error </Card.Title>
          <Card.Text>{message}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
