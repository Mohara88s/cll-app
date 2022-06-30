import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table, Spinner, Dropdown } from 'react-bootstrap';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import { fetchTranscriptionTasks } from '../../redux/transcription-tasks/transcription-tasks-operaions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TasksFilter.module.css';

const fields = ['Translation', 'U-transcription', 'Q-transcription'];

export default function TasksFilter({ passUpTask }) {
  const dispatch = useDispatch();
  const [dropdownValue, setDropdownValue] = useState(fields[0]);
  const [filter, setFilter] = useState('');
  const [filtredTasks, setFiltredTasks] = useState([]);

  const tasks = useSelector(transcriptionTasksSelectors.getTranscriptionTasks);
  const error = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksError,
  );
  const loading = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksLoading,
  );

  const filterHandleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const onDropdownClick = ({ target: { name } }) => {
    setDropdownValue(name);
  };

  const onAddBtnClick = ({ target: { name } }) => {
    const task = filtredTasks.find(e => e._id === name);
    passUpTask(task);
  };

  useEffect(() => {
    if (filter) {
      dispatch(fetchTranscriptionTasks(filter));
      setFiltredTasks(tasks);
    }
    // eslint-disable-next-line
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
                      <li key={field}>
                        <Dropdown.Item name={field} onClick={onDropdownClick}>
                          {field}
                        </Dropdown.Item>
                      </li>
                    ))}
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </td>
            <td className={styles.Table__td__Button}></td>
          </tr>
        </thead>
        {!loading && filter && (
          <tbody className={styles.Table__tbody}>
            {filtredTasks.map(({ _id, eng, utrn, qtrn, rus }) => (
              <tr key={_id}>
                <td>{eng}</td>
                {dropdownValue === fields[0] && <td>{rus.split('/')[0]}</td>}
                {dropdownValue === fields[1] && <td>{utrn}</td>}
                {dropdownValue === fields[2] && <td>{qtrn}</td>}
                <td>
                  <Button name={_id} onClick={onAddBtnClick}>
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
