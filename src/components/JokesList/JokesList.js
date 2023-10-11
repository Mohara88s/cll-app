import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table, Spinner } from 'react-bootstrap';
import { changeFilter } from '../../redux/joke-tasks/joke-tasks-actions';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import { fetchJokeTasks } from '../../redux/joke-tasks/joke-tasks-operaions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './JokesList.module.css';

export default function JokesList({ passUpTask }) {
  const dispatch = useDispatch();
  const originalLanguage = useSelector(jokeTasksSelectors.getOriginalLanguage);
  const translationLanguage = useSelector(
    jokeTasksSelectors.getTranslationLanguage,
  );
  const tasks = useSelector(jokeTasksSelectors.getJokeTasks);
  const error = useSelector(jokeTasksSelectors.getJokeTasksError);
  const loading = useSelector(jokeTasksSelectors.getJokeTasksLoading);
  const filter = useSelector(jokeTasksSelectors.getJokeTasksFilter);
  const [filtredTasks, setFiltredTasks] = useState([]);

  const filterHandleChange = ({ target: { value } }) => {
    dispatch(changeFilter(value));
  };

  const onTrainBtnClick = ({ target: { name } }) => {
    const task = filtredTasks.find(e => e._id === name);
    passUpTask(task);
  };

  useEffect(() => {
    if (originalLanguage !== null && translationLanguage !== null) {
      dispatch(
        fetchJokeTasks(
          filter,
          originalLanguage.language_name,
          translationLanguage.language_name,
        ),
      );
    }
  }, [dispatch, filter, originalLanguage, translationLanguage]);

  useEffect(() => {
    setFiltredTasks(tasks);
  }, [tasks]);

  return (
    <div className={styles.TasksFilter}>
      <Form autoComplete="off">
        <Form.Group className="mb-3" controlId="filter">
          <Form.Label>Jokes search:</Form.Label>
          <Form.Control
            type="text"
            name="filter"
            placeholder="Enter letters for joke search"
            value={filter}
            onChange={filterHandleChange}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover className={styles.Table}>
        <thead>
          <tr>
            <td className={styles.Table__td__english}>Title</td>
            <td className={styles.Table__td__languages}>Translations</td>
            <td className={styles.Table__td__Button}></td>
          </tr>
        </thead>
        {!loading && (
          <tbody className={styles.Table__tbody}>
            {filtredTasks.map(({ _id, task_title, languages }) => (
              <tr key={_id}>
                <td>{task_title}</td>
                <td>
                  {languages.map(({ language_name }) => (
                    <span key={language_name}>{language_name} </span>
                  ))}
                </td>
                <td>
                  <Button name={_id} onClick={onTrainBtnClick}>
                    Train
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {error && <ErrorMessage message={error} />}
      {loading && <Spinner animation="border" variant="primary" />}
    </div>
  );
}
