import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { Button, Form } from 'react-bootstrap';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authError = useSelector(authSelectors.getAuthError);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.signin({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login page</h2>

      <Form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className={styles.button} type="submit">
          Login
        </Button>
      </Form>

      {authError && <ErrorMessage message={authError} />}
    </div>
  );
}
