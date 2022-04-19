import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table } from 'react-bootstrap';
import { changeFilter } from '../../redux/transcription-tasks/transcription-tasks-actions';
import transcriptionTasksSelectors from '../../redux/transcription-tasks/transcription-tasks-selectors';
import { fetchTranscriptionTasks } from '../../redux/transcription-tasks/transcription-tasks-operaions';
import styles from './UTranscriptionTrainings.module.css';

export default function UTranscriptionTrainings({ wordsArr }) {
  const dispatch = useDispatch();
  const [wordsSet, setWordsSet] = useState([]);
  const [wordsSearch, setWordsSearch] = useState('');
  const filter = useSelector(transcriptionTasksSelectors.getFilter);
  const filtredTasks = useSelector(
    transcriptionTasksSelectors.getTranscriptionTasks,
  );

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'words-search':
        return setWordsSearch(value);
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

  const wordsSearchButtonHandleSubmit = e => {
    e.preventDefault();
    console.log(wordsSearch);

    const arr = wordsSearch.split(' ').filter(e => e.length);
    console.log(arr);
    setWordsSearch('');
  };

  useEffect(() => {
    if (filter) {
      dispatch(fetchTranscriptionTasks(filter));
    }
  }, [dispatch, filter]);

  return (
    <div className={styles.TranscriptionTrainings}>
      <h3>Let's gather a set of words for training</h3>
      <div className={styles.box}>
        <div className={styles.formsBox}>
          <Form
            onSubmit={wordsSearchButtonHandleSubmit}
            className={styles.form}
            autoComplete="off"
          >
            <Form.Group className="mb-3" controlId="words-search">
              <Form.Label>Words for search</Form.Label>
              <Form.Control
                type="text"
                name="words-search"
                placeholder="Enter words with a space"
                value={wordsSearch}
                onChange={handleChange}
              />
            </Form.Group>

            <Button className={styles.button} type="submit">
              Search
            </Button>
          </Form>

          <Form className={styles.form} autoComplete="off">
            <Form.Group className="mb-3" controlId="filter">
              <Form.Label>Word search</Form.Label>
              <Form.Control
                type="text"
                name="filter"
                placeholder="Enter letters for word search"
                value={filter}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>

          <Table striped bordered hover>
            <tbody>
              {filtredTasks.map(({ _id, eng, qtrn, rus }) => (
                <tr key={_id}>
                  <td>{eng}</td>
                  <td>{qtrn}</td>
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
          <Table striped bordered hover className={styles.wordsTable}>
            <thead>
              <tr>
                <th>Words set</th>
              </tr>
            </thead>
            <tbody>
              {wordsSet &&
                wordsSet.map(({ _id, eng }) => (
                  <tr key={_id}>
                    <td>{eng}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button className={styles.wordsTable__button}>Let's train</Button>
        </div>
      </div>
    </div>
  );
}
