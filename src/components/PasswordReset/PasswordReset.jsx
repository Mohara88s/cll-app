import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  passwordResetApplication,
  passwordChange,
} from '../../redux/auth/auth-operations';
import authSelectors from '../../redux/auth/auth-selectors';
import { Button, Form, Spinner } from 'react-bootstrap';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './PasswordReset.module.css';

export default function PasswordReset() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  const dispatch = useDispatch();
  const url = window.location.href;
  const winLocSearch = window.location.search;
  const token = window.location.search.split('&')[1];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordResetResult = useSelector(
    authSelectors.getPasswordResetApplication,
  );
  const passwordChangeResult = useSelector(authSelectors.getPasswordChange);
  const error = useSelector(authSelectors.getPasswordChangeError);
  const loading = useSelector(authSelectors.getLoading);

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!winLocSearch && email.length) {
      await dispatch(passwordResetApplication({ email, url }));
    }
    if (winLocSearch && password.length) {
      await dispatch(passwordChange(token, { password: password }));
    }
  };

  return (
    <div className={styles.passwordReset}>
      <h2>Password reset</h2>

      <Form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        {!winLocSearch && (
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
        )}
        {winLocSearch && (
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
        )}
        <Button className={styles.button} type="submit">
          {!loading && (
            <span>
              {winLocSearch
                ? 'Change the password'
                : 'Apply for the password change'}
            </span>
          )}
          {loading && <Spinner animation="border" as="span" size="sm" />}
        </Button>
      </Form>
      {passwordResetResult && <p>{passwordResetResult}</p>}
      {passwordChangeResult && <p>{passwordChangeResult}</p>}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
