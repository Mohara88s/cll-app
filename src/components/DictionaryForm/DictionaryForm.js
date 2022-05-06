import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table, Spinner } from 'react-bootstrap';
import { updateTasksSet } from '../../redux/transcription-tasks/transcription-tasks-actions';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import ownDictionarysSelectors from '../../redux/own-dictionarys/own-dictionarys-selectors';
import { addOwnDictionary } from '../../redux/own-dictionarys/own-dictionarys-operaions';
import TasksFilter from '../TasksFilter/TasksFilter';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './DictionaryForm.module.css';

export default function DictionaryForm() {
  const dispatch = useDispatch();
  const [dictionaryName, setDictionaryName] = useState('');
  const tasksSet = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasksSet,
  );
  const addDictionaryLoading = useSelector(
    ownDictionarysSelectors.getAddDictionaryLoading,
  );
  const addDictionaryError = useSelector(
    ownDictionarysSelectors.getAddDictionaryError,
  );
  const addDictionarySuccess = useSelector(
    ownDictionarysSelectors.getAddDictionarySuccess,
  );

  const dictionaryNameHandleChange = ({ target: { value } }) => {
    setDictionaryName(value);
  };
  const deleteTask = ({ target: { name } }) => {
    const newTasksSet = tasksSet.filter(e => e._id !== name);
    dispatch(updateTasksSet(newTasksSet));
  };

  const onAddSetToOwnDictionarysClick = () => {
    dispatch(
      addOwnDictionary({
        ownDictionaryName: dictionaryName,
        ownDictionaryTasks: tasksSet,
      }),
    );
  };

  useEffect(() => {
    if (addDictionarySuccess) {
      dispatch(updateTasksSet([]));
      setDictionaryName('');
    }
  }, [dispatch, addDictionarySuccess]);

  return (
    <div className={styles.DictionaryForm}>
      <h3>Let's gather words for new dictionary</h3>
      <div className={styles.DictionaryForm__box}>
        <TasksFilter />

        <div className={styles.tasksTableBox}>
          <h4>New dictionary:</h4>
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
                <td className={styles.tasksTable__td__Button}></td>
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
            onClick={onAddSetToOwnDictionarysClick}
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
