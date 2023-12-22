import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import { signup } from '../../redux/auth/auth-operations';
import { Button, Form, Spinner } from 'react-bootstrap';
import styles from './RegistrationForm.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function RegistrationForm() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const regError = useSelector(authSelectors.getRegError);
  const loading = useSelector(authSelectors.getLoading);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
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
    await dispatch(signup({ name, email, password }));
    // window.location.reload();
  };

  return (
    <div>
      <h2>Registration page</h2>

      <Form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email and password with anyone else.
          </Form.Text>
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
          {!loading && <span>Registration</span>}
          {loading && <Spinner animation="border" as="span" size="sm" />}
        </Button>
      </Form>

      {regError && <ErrorMessage message={regError} />}
    </div>
  );
}
