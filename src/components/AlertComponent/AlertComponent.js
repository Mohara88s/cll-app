import { Alert } from 'react-bootstrap';
import styles from './AlertComponent.module.css';

export default function AlertComponent({
  message = 'message',
  messageHeading = 'Error:',
  variant = 'danger',
  alertClose,
  timeout = 3000,
}) {
  const alertTimeout = setTimeout(() => {
    alertClose();
  }, timeout);

  const handleClose = () => {
    clearTimeout(alertTimeout);
    alertClose();
  };

  return (
    <Alert
      className={styles.Alert}
      variant={variant}
      onClose={() => handleClose()}
      dismissible
    >
      <Alert.Heading>{messageHeading}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}
