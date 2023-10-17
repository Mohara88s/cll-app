import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import { changeJokeTask } from '../../redux/joke-tasks/joke-tasks-actions';
import {
  updateJokeTask,
  deleteJokeTask,
} from '../../redux/joke-tasks/joke-tasks-operaions';
import { Form, Dropdown, Modal, Button, Spinner } from 'react-bootstrap';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './EditingJokeTaskModal.module.css';
import './EditingJokeTaskModal.css';

const EditingJokeTaskModal = ({ modalShow, onHandleClose }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const languages = useSelector(jokeTasksSelectors.getJokeTasksLanguages);
  const jokeTask = useSelector(jokeTasksSelectors.getJokeTask);
  const error = useSelector(jokeTasksSelectors.getJokeTasksError);
  const loading = useSelector(jokeTasksSelectors.getJokeTasksLoading);

  const handleClose = () => {
    setShow(false);
    onHandleClose();
  };

  useEffect(() => {
    setShow(modalShow);
  }, [modalShow]);

  useEffect(() => {
    if (!jokeTask.task_title) {
      handleClose();
    }
    // eslint-disable-next-line
  }, [jokeTask]);

  const onClickButtonAddTranslation = () => {
    const newId =
      jokeTask.translations[jokeTask.translations.length - 1]._id + 1;
    const newArr = [
      ...jokeTask.translations,
      { _id: newId, language: '', title: '', text: '' },
    ];
    dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
  };
  const onClickButtonDeleteTranslation = ({ target: { name } }) => {
    if (jokeTask.translations.length > 2) {
      const newArr = [...jokeTask.translations].filter(e => e._id !== name);
      dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
    }
  };

  const onSaveTaskButtonClick = e => {
    dispatch(updateJokeTask({ taskId: jokeTask._id, update: { ...jokeTask } }));
  };
  const onDeleteTaskButtonClick = e => {
    dispatch(deleteJokeTask(jokeTask._id));
  };

  const handleChange = ({ target: { name, value, type } }) => {
    switch (name) {
      case 'jokeName':
        return dispatch(changeJokeTask({ ...jokeTask, task_title: value }));
      case name:
        if (type === 'textarea') {
          const newArr = [...jokeTask.translations].map(e =>
            e._id === name ? { ...e, text: value } : e,
          );
          dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
        }
        if (type === 'text') {
          const newArr = [...jokeTask.translations].map(e =>
            e._id === name ? { ...e, title: value } : e,
          );
          dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
        }
        return;
      default:
        return;
    }
  };

  const onDropdownClick = ({ target: { name, title } }) => {
    const newLanguage = languages.find(e => e._id === name);
    const newArr = [...jokeTask.translations].map(e =>
      e._id === title ? { ...e, language: newLanguage } : e,
    );
    dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
  };

  return (
    <>
      {jokeTask && (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className={styles.Modal}
          dialogClassName="EditingJokeTaskModalDialog"
        >
          <Modal.Header closeButton className={styles.Modal__Header}>
            <Modal.Title>Joke task Id:{jokeTask._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.Modal__Body}>
            <Form autoComplete="off" className={styles.Form}>
              <Form.Group className="mb-3">
                <Form.Label>The name of the joke in English:</Form.Label>
                <Form.Control
                  type="text"
                  name="jokeName"
                  placeholder="Enter the name of the joke"
                  value={jokeTask.task_title}
                  onChange={handleChange}
                />
              </Form.Group>
              {jokeTask && (
                <ul>
                  {jokeTask.translations.map(elem => (
                    <li key={elem._id}>
                      <Form.Group className="mb-3">
                        <Form.Label className={styles.Form__Label}>
                          The version of the joke in the
                          <Dropdown className={styles.Dropdown}>
                            <Dropdown.Toggle
                              variant="outline-dark"
                              size="sm"
                              id="dropdown-basic"
                            >
                              {elem.language.language_name
                                ? elem.language.language_name
                                : 'Langauage'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <ul>
                                {languages.map(e => (
                                  <li key={e._id}>
                                    <Dropdown.Item
                                      name={e._id}
                                      title={elem._id}
                                      onClick={onDropdownClick}
                                    >
                                      {e.language_name}
                                    </Dropdown.Item>
                                  </li>
                                ))}
                              </ul>
                            </Dropdown.Menu>
                          </Dropdown>{' '}
                          language:
                        </Form.Label>

                        <Form.Control
                          type="text"
                          name={elem._id}
                          placeholder="Enter the name of the joke in current language"
                          value={elem.title}
                          onChange={handleChange}
                          className={styles.JokeTitle}
                        />
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name={elem._id}
                          placeholder="joke in current language"
                          value={elem.text}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Button
                        variant="danger"
                        onClick={onClickButtonDeleteTranslation}
                        className={styles.Button}
                        name={elem._id}
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </Form>
            <div className={styles.buttonsBox}>
              <Button
                variant="success"
                onClick={onClickButtonAddTranslation}
                className={styles.Button}
              >
                Add one more translation of the joke
              </Button>
              <Button
                variant="danger"
                className={styles.Button}
                onClick={onDeleteTaskButtonClick}
              >
                {!loading && <span>Delete task from the database</span>}
                {loading && <Spinner animation="border" as="span" size="sm" />}
              </Button>
              <Button
                variant="primary"
                className={styles.Button}
                onClick={onSaveTaskButtonClick}
              >
                {!loading && <span>Save changes to the database</span>}
                {loading && <Spinner animation="border" as="span" size="sm" />}
              </Button>
            </div>
            {error && <ErrorMessage message={error} />}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default EditingJokeTaskModal;
