import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';

import { Form, Dropdown, Modal, Button, Table, Spinner } from 'react-bootstrap';

import styles from './EditingJokeTaskModal.module.css';
import './EditingJokeTaskModal.css';

const EditingJokeTaskModal = ({ modalShow, jokeTask, onHandleClose }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const languages = useSelector(jokeTasksSelectors.getJokeTasksLanguages);

  const handleClose = () => {
    setShow(false);
    onHandleClose();
  };

  console.log(jokeTask);
  useEffect(() => {
    setShow(modalShow);
  }, [modalShow]);

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
            <Modal.Title>{jokeTask.task_title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.Modal__Body}>
            <Form autoComplete="off" className={styles.Form}>
              <Form.Group className="mb-3">
                <Form.Label>Enter the name of the joke in English:</Form.Label>
                <Form.Control
                  type="text"
                  name="jokeName"
                  placeholder="Enter the name of the joke"
                  value={jokeTask.task_title}
                  // onChange={handleChange}
                />
              </Form.Group>
              {jokeTask && (
                <ul>
                  {jokeTask.translations.map(elem => (
                    <li key={elem.id}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Choose the language and enter the version of the joke
                          in the current language:
                        </Form.Label>
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
                                    title={elem.id}
                                    // onClick={onDropdownClick}
                                  >
                                    {e.language_name}
                                  </Dropdown.Item>
                                </li>
                              ))}
                            </ul>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Form.Control
                          type="text"
                          name={elem.id}
                          placeholder="Enter the name of the joke in current language"
                          value={elem.title}
                          // onChange={handleChange}
                          className={styles.JokeTitle}
                        />
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name={elem.id}
                          placeholder="joke in current language"
                          value={elem.text}
                          // onChange={handleChange}
                        />
                      </Form.Group>

                      <Button
                        variant="danger"
                        // onClick={onClickButtonDeleteTranslation}
                        className={styles.Button}
                        name={elem.id}
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default EditingJokeTaskModal;
