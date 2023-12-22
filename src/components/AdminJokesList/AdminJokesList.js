import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table, Spinner } from 'react-bootstrap';
import {
  changeFilter,
  changeJokeTask,
} from '../../redux/joke-tasks/joke-tasks-actions';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import { fetchJokeTasks } from '../../redux/joke-tasks/joke-tasks-operations';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EditingJokeTaskModal from '../EditingJokeTaskModal/EditingJokeTaskModal';
import styles from './AdminJokesList.module.css';

export default function JokesList() {
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
  const [modalShow, setModalShow] = useState(false);

  const filterHandleChange = ({ target: { value } }) => {
    dispatch(changeFilter(value));
  };

  const onEditBtnClick = ({ target: { name } }) => {
    const task = filtredTasks.find(e => e._id === name);
    dispatch(changeJokeTask({ ...task }));
    setModalShow(true);
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
    <div className={styles.tasksFilter}>
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

      <Table striped bordered hover className={styles.table}>
        <thead>
          <tr>
            <td className={styles.tableTd__english}>Title</td>
            <td className={styles.tableTd__languages}>Translations</td>
            <td className={styles.tableTd__button}></td>
          </tr>
        </thead>
        {!loading && (
          <tbody className={styles.table__tbody}>
            {filtredTasks.map(({ _id, task_title, languages }) => (
              <tr key={_id}>
                <td>{task_title}</td>
                <td>
                  {[...languages]
                    .sort((e, i) =>
                      e.language_name.localeCompare(i.language_name),
                    )
                    .map(({ language_name }) => (
                      <span key={language_name}>{language_name}/</span>
                    ))}
                </td>
                <td>
                  <Button name={_id} onClick={onEditBtnClick} variant="warning">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {error && <ErrorMessage message={error} />}
      {loading && <Spinner animation="border" variant="primary" />}

      <EditingJokeTaskModal
        modalShow={modalShow}
        onHandleClose={() => setModalShow(false)}
      />
    </div>
  );
}
