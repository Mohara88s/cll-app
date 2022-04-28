import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table } from 'react-bootstrap';
import { changeFilter } from '../../redux/u-transcription-tasks/u-transcription-tasks-actions';
import uTranscriptionTasksSelectors from '../../redux/u-transcription-tasks/u-transcription-tasks-selectors';
import { fetchUTranscriptionTasks } from '../../redux/u-transcription-tasks/u-transcription-tasks-operaions';
import { addOwnDictionary } from '../../redux/user/user-operaions';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './DictionaryForm.module.css';

export default function DictionaryForm() {
  const dispatch = useDispatch();
  const [wordsSet, setWordsSet] = useState([]);
  const [dictionaryName, setDictionaryName] = useState('');
  const filter = useSelector(
    uTranscriptionTasksSelectors.getUTranscriptionTasksFilter,
  );
  const filtredTasks = useSelector(
    uTranscriptionTasksSelectors.getUTranscriptionTasks,
  );
  const error = useSelector(
    uTranscriptionTasksSelectors.getUTranscriptionTasksError,
  );

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'dictionaryName':
        return setDictionaryName(value);
      case 'filter':
        return dispatch(changeFilter(value));
      default:
        return;
    }
  };

  const addWordToSet = ({ target: { name } }) => {
    if (wordsSet.findIndex(e => e._id === name) === -1) {
      const task = filtredTasks.find(e => e._id === name);
      setWordsSet(prevState => [...prevState, task]);
    }
  };

  const onAddSetToOwnDictionarysClick = () => {
    dispatch(
      addOwnDictionary({
        ownDictionaryName: dictionaryName,
        ownDictionaryTasks: wordsSet,
      }),
    );
    setWordsSet([]);
    setDictionaryName('');
  };

  useEffect(() => {
    if (filter) {
      dispatch(fetchUTranscriptionTasks(filter));
    }
  }, [dispatch, filter]);

  return (
    <div className={styles.DictionaryForm}>
      <h3>Let's gather words for new dictionary</h3>
      <div className={styles.box}>
        <div className={styles.formsBox}>
          <Form className={styles.form} autoComplete="off">
            <Form.Group className="mb-3" controlId="filter">
              <Form.Label>Words search:</Form.Label>
              <Form.Control
                type="text"
                name="filter"
                placeholder="Enter letters for word search"
                value={filter}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>

          {error && <ErrorMessage message={error} />}

          <Table striped bordered hover>
            <tbody>
              {filtredTasks.map(({ _id, eng, utrn, rus }) => (
                <tr key={_id}>
                  <td>{eng}</td>
                  <td>{utrn}</td>
                  <td>{rus}</td>
                  <td>
                    <Button
                      className={styles.button}
                      name={_id}
                      onClick={addWordToSet}
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className={styles.wordsTableBox}>
          <h4>New dictionary:</h4>
          <Form className={styles.form} autoComplete="off">
            <Form.Group className="mb-3">
              <Form.Label>Dictionary name:</Form.Label>
              <Form.Control
                type="text"
                name="dictionaryName"
                placeholder="Enter dictionary name"
                value={dictionaryName}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          <Table striped bordered hover className={styles.wordsTable}>
            <tbody>
              {wordsSet &&
                wordsSet.map(({ _id, eng, utrn }) => (
                  <tr key={_id}>
                    <td>{eng}</td>
                    <td>{utrn}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button
            className={styles.wordsTable__button}
            onClick={onAddSetToOwnDictionarysClick}
          >
            Add new own dictionary
          </Button>
        </div>
      </div>
    </div>
  );
}
