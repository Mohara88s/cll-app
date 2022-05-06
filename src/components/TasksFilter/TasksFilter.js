import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table, Spinner } from 'react-bootstrap';
import {
  changeFilter,
  addToTasksSet,
} from '../../redux/transcription-tasks/transcription-tasks-actions';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import { fetchTranscriptionTasks } from '../../redux/transcription-tasks/transcription-tasks-operaions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TasksFilter.module.css';

export default function TasksFilter() {
  const dispatch = useDispatch();
  const filter = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksFilter,
  );
  const tasksSet = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksSet,
  );
  const filtredTasks = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasks,
  );
  const error = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksError,
  );
  const loading = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksLoading,
  );

  const filterHandleChange = ({ target: { value } }) => {
    dispatch(changeFilter(value));
  };

  const addTaskToSet = ({ target: { name } }) => {
    if (tasksSet.findIndex(e => e._id === name) === -1) {
      const task = filtredTasks.find(e => e._id === name);
      dispatch(addToTasksSet(task));
    }
  };

  useEffect(() => {
    if (filter) {
      dispatch(fetchTranscriptionTasks(filter));
    }
  }, [dispatch, filter]);

  return (
    <div className={styles.TasksFilter}>
      <Form autoComplete="off">
        <Form.Group className="mb-3" controlId="filter">
          <Form.Label>Words search:</Form.Label>
          <Form.Control
            type="text"
            name="filter"
            placeholder="Enter letters for word search"
            value={filter}
            onChange={filterHandleChange}
          />
        </Form.Group>
      </Form>

      {error && <ErrorMessage message={error} />}
      {loading && <Spinner animation="border" variant="primary" />}
      <Table striped bordered hover>
        <tbody>
          {filtredTasks.map(({ _id, eng, utrn, rus }) => (
            <tr key={_id}>
              <td>{eng}</td>
              {/* <td>{utrn}</td> */}
              <td>{rus.split('/')[0]}</td>
              <td className={styles.Table__td__Button}>
                <Button name={_id} onClick={addTaskToSet}>
                  Add
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
