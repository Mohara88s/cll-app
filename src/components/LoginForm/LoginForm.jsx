import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import authSelectors from '../../redux/auth/auth-selectors';
import { signin } from '../../redux/auth/auth-operations';
import { Button, Form, Spinner } from 'react-bootstrap';
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
    await dispatch(signin({ email, password }));
    // window.location.reload();
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
          {!loading && <span>Login</span>}
          {loading && <Spinner animation="border" as="span" size="sm" />}
        </Button>
        <NavLink to="/password-reset" className={styles.form__link}>
          I have forgotten the password
        </NavLink>
      </Form>
      {authError && <ErrorMessage message={authError} />}
    </div>
  );
}
