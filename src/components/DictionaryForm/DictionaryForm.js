import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table, Spinner } from 'react-bootstrap';
import {
  updateTasksSet,
  addToTasksSet,
} from '../../redux/transcription-tasks/transcription-tasks-actions';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import ownDictionariesSelectors from '../../redux/own-dictionaries/own-dictionaries-selectors';
import { addOwnDictionary } from '../../redux/own-dictionaries/own-dictionaries-operations';
import TasksFilter from '../TasksFilter/TasksFilter';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { confirm } from 'react-bootstrap-confirmation';
import styles from './DictionaryForm.module.css';

export default function DictionaryForm() {
  const dispatch = useDispatch();
  const [dictionaryName, setDictionaryName] = useState('');
  const tasksSet = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksSet,
  );
  const addDictionaryLoading = useSelector(
    ownDictionariesSelectors.getAddDictionaryLoading,
  );
  const addDictionaryError = useSelector(
    ownDictionariesSelectors.getAddDictionaryError,
  );
  const addDictionarySuccess = useSelector(
    ownDictionariesSelectors.getAddDictionarySuccess,
  );

  const dictionaryNameHandleChange = ({ target: { value } }) => {
    setDictionaryName(value);
  };
  const deleteTask = ({ target: { name } }) => {
    const newTasksSet = tasksSet.filter(e => e._id !== name);
    dispatch(updateTasksSet(newTasksSet));
  };

  const onAddSetToOwnDictionariesClick = async () => {
    if (await confirm('Are you sure you want to add this dictionary?')) {
      dispatch(
        addOwnDictionary({
          ownDictionaryName: dictionaryName,
          ownDictionaryTasks: tasksSet,
        }),
      );
    }
  };

  const addTaskToSet = task => {
    if (tasksSet.findIndex(e => e._id === task._id) === -1) {
      dispatch(addToTasksSet(task));
    }
  };

  useEffect(() => {
    if (addDictionarySuccess) {
      dispatch(updateTasksSet([]));
      setDictionaryName('');
    }
  }, [dispatch, addDictionarySuccess]);

  return (
    <div className={styles.dictionaryForm}>
      <h3>Let's gather words for new dictionary</h3>
      <div className={styles.dictionaryForm__box}>
        <div className={styles.dictionaryForm__tasksFilterBox}>
          <TasksFilter passUpTask={addTaskToSet} />
        </div>

        <div className={styles.tasksTableBox}>
          <h5 className={styles.tasksTableBox__header}>New dictionary:</h5>
          <Form autoComplete="off">
            <Form.Group className="mb-3">
              <Form.Label>Dictionary name:</Form.Label>
              <Form.Control
                type="text"
                name="dictionaryName"
                placeholder="Enter dictionary name"
                value={dictionaryName}
                onChange={dictionaryNameHandleChange}
              />
            </Form.Group>
          </Form>
          <Table striped bordered hover className={styles.tasksTable}>
            <thead>
              <tr>
                <td>Dictionary words:</td>
                <td className={styles.tasksTable__tdButton}></td>
              </tr>
            </thead>
            <tbody className={styles.tasksTable__tbody}>
              {tasksSet &&
                tasksSet.map(({ _id, eng, utrn }) => (
                  <tr key={_id}>
                    <td>{eng}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        name={_id}
                        onClick={deleteTask}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button
            className={styles.tasksTable__button}
            onClick={onAddSetToOwnDictionariesClick}
          >
            {!addDictionaryLoading && <span>Add new own dictionary</span>}
            {addDictionaryLoading && (
              <Spinner animation="border" as="span" size="sm" />
            )}
          </Button>

          {addDictionaryError && <ErrorMessage message={addDictionaryError} />}
        </div>
      </div>
    </div>
  );
}
