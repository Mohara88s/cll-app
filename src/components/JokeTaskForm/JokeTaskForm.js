import { Button, Form, Dropdown, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { changeJokeTask } from '../../redux/joke-tasks/joke-tasks-actions';
import { addJokeTask } from '../../redux/joke-tasks/joke-tasks-operaions';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import { fetchJokeTasksLanguages } from '../../redux/joke-tasks/joke-tasks-operaions';
import styles from './JokeTaskForm.module.css';

export default function JokeTaskForm() {
  const dispatch = useDispatch();

  const languages = useSelector(jokeTasksSelectors.getJokeTasksLanguages);
  const languagesError = useSelector(
    jokeTasksSelectors.getJokeTasksLanguagesError,
  );
  const languagesLoading = useSelector(
    jokeTasksSelectors.getJokeTasksLanguagesLoading,
  );
  const error = useSelector(jokeTasksSelectors.getJokeTasksError);
  const loading = useSelector(jokeTasksSelectors.getJokeTasksLoading);

  useEffect(() => {
    dispatch(fetchJokeTasksLanguages());
  }, [dispatch]);

  const jokeTask = useSelector(jokeTasksSelectors.getJokeTask);
  const onClickButtonAddTranslation = () => {
    const newId =
      jokeTask.translations[jokeTask.translations.length - 1].id + 1;
    const newArr = [
      ...jokeTask.translations,
      { id: newId, language: '', title: '', text: '' },
    ];
    dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
  };
  const onClickButtonDeleteTranslation = ({ target: { name } }) => {
    if (jokeTask.translations.length > 2) {
      const newArr = [...jokeTask.translations].filter(
        e => e.id !== Number(name),
      );
      dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
    }
  };

  const onAddButtonClick = e => {
    dispatch(addJokeTask({ ...jokeTask }));
    console.log(jokeTask);
  };

  const handleChange = ({ target: { name, value, type } }) => {
    switch (name) {
      case 'jokeName':
        return dispatch(changeJokeTask({ ...jokeTask, task_title: value }));
      case name:
        if (type === 'textarea') {
          const newArr = [...jokeTask.translations].map(e =>
            e.id === Number(name) ? { ...e, text: value } : e,
          );
          dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
        }
        if (type === 'text') {
          const newArr = [...jokeTask.translations].map(e =>
            e.id === Number(name) ? { ...e, title: value } : e,
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
    const newArr = [...jokeTask.translations].map((e, id) =>
      id === Number(title) ? { ...e, language: newLanguage } : e,
    );
    dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
  };

  return (
    <div>
      {languagesLoading && <Spinner animation="border" as="span" size="sm" />}

      <Form autoComplete="off" className={styles.Form}>
        <Form.Group className="mb-3">
          <Form.Label>Enter the name of the joke in English:</Form.Label>
          <Form.Control
            type="text"
            name="jokeName"
            placeholder="Enter the name of the joke"
            value={jokeTask.joke_title}
            onChange={handleChange}
          />
        </Form.Group>
        {jokeTask && (
          <ul>
            {jokeTask.translations.map(elem => (
              <li key={elem.id}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Choose the language and enter the version of the joke in the
                    current language:
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
                              onClick={onDropdownClick}
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
                    onChange={handleChange}
                    className={styles.JokeTitle}
                  />
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name={elem.id}
                    placeholder="joke in current language"
                    value={elem.text}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="danger"
                  onClick={onClickButtonDeleteTranslation}
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

      <div className={styles.buttonsBox}>
        <Button
          variant="success"
          onClick={onClickButtonAddTranslation}
          className={styles.Button}
        >
          Add one more translation of the joke
        </Button>

        <Button
          variant="primary"
          className={styles.Button}
          onClick={onAddButtonClick}
        >
          {!loading && <span>Add this joke to the database</span>}
          {loading && <Spinner animation="border" as="span" size="sm" />}
        </Button>
      </div>
      {error && <ErrorMessage message={error} />}
      {languagesError && <ErrorMessage message={languagesError} />}
    </div>
  );
}
