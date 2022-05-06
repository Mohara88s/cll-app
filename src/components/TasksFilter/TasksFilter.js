import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table, Spinner, Dropdown } from 'react-bootstrap';
import {
  changeFilter,
  addToTasksSet,
} from '../../redux/transcription-tasks/transcription-tasks-actions';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import { fetchTranscriptionTasks } from '../../redux/transcription-tasks/transcription-tasks-operaions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TasksFilter.module.css';

const fields = ['Translation', 'U-transcription', 'Q-transcription'];

export default function TasksFilter() {
  const [dropdownValue, setDropdownValue] = useState(fields[0]);
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

  const onDropdownClick = ({ target: { name } }) => {
    setDropdownValue(name);
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

      <Table striped bordered hover className={styles.Table}>
        <thead>
          <tr>
            <td className={styles.Table__td__english}>English</td>
            <td className={styles.Table__td__secondary}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-dark"
                  size="sm"
                  id="dropdown-basic"
                >
                  {dropdownValue}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <ul>
                    {fields.map(field => (
                      <li>
                        <Dropdown.Item name={field} onClick={onDropdownClick}>
                          {field}
                        </Dropdown.Item>
                      </li>
                    ))}
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </td>
            <td className={styles.Table__td__Button}>Add</td>
          </tr>
        </thead>
        {!loading && (
          <tbody className={styles.Table__tbody}>
            {filtredTasks.map(({ _id, eng, utrn, qtrn, rus }) => (
              <tr key={_id}>
                <td>{eng}</td>
                {dropdownValue === fields[0] && <td>{rus.split('/')[0]}</td>}
                {dropdownValue === fields[1] && <td>{utrn}</td>}
                {dropdownValue === fields[2] && <td>{qtrn}</td>}
                <td>
                  <Button name={_id} onClick={addTaskToSet}>
                    Add
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
