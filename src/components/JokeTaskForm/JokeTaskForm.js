import { Button, Form, Dropdown, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { changeJokeTask } from '../../redux/joke-tasks/joke-tasks-actions';
import { addJokeTask } from '../../redux/joke-tasks/joke-tasks-operations';
import jokeTasksSelectors from '../../redux/joke-tasks/joke-tasks-selectors';
import { fetchJokeTasksLanguages } from '../../redux/joke-tasks/joke-tasks-operations';
import { confirm } from 'react-bootstrap-confirmation';
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
      jokeTask.translations[jokeTask.translations.length - 1]._id + 1;
    const newArr = [
      ...jokeTask.translations,
      { _id: newId, language: '', title: '', text: '' },
    ];
    dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
  };
  const onClickButtonDeleteTranslation = async ({ target: { name } }) => {
    if (
      await confirm('Are you sure you want to delete this translation field?')
    ) {
      if (jokeTask.translations.length > 2) {
        const newArr = [...jokeTask.translations].filter(
          e => e._id !== Number(name),
        );
        dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
      }
    }
  };

  const onAddButtonClick = async () => {
    if (await confirm('Are you sure you want to add this task?')) {
      dispatch(addJokeTask({ ...jokeTask }));
    }
  };

  const handleChange = ({ target: { name, value, type } }) => {
    switch (name) {
      case 'jokeName':
        return dispatch(changeJokeTask({ ...jokeTask, task_title: value }));
      case name:
        if (type === 'textarea') {
          const newArr = [...jokeTask.translations].map(e =>
            e._id === Number(name) ? { ...e, text: value } : e,
          );
          dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
        }
        if (type === 'text') {
          const newArr = [...jokeTask.translations].map(e =>
            e._id === Number(name) ? { ...e, title: value } : e,
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
      e._id === Number(title) ? { ...e, language: newLanguage } : e,
    );
    dispatch(changeJokeTask({ ...jokeTask, translations: newArr }));
  };

  return (
    <div>
      <Form autoComplete="off" className={styles.form}>
        <Form.Group className="mb-3">
          <Form.Label>Enter the name of the joke in English:</Form.Label>
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
                  <Form.Label>
                    Choose the language and enter the version of the joke in the
                    current language:
                  </Form.Label>
                  <Dropdown className={styles.dropdown}>
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
                  </Dropdown>
                  <Form.Control
                    type="text"
                    name={elem._id}
                    placeholder="Enter the name of the joke in current language"
                    value={elem.title}
                    onChange={handleChange}
                    className={styles.jokeTitle}
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
                  className={styles.form__deleteButton}
                  name={elem._id}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Form>

      <div className={styles.mainButtonsBox}>
        <Button
          variant="success"
          onClick={onClickButtonAddTranslation}
          className={styles.mainButtonsBox__button}
        >
          Add one more translation of the joke
        </Button>

        <Button
          variant="primary"
          className={styles.mainButtonsBox__button}
          onClick={onAddButtonClick}
        >
          {!loading && <span>Add this joke to the database</span>}
          {loading && <Spinner animation="border" as="span" size="sm" />}
        </Button>
      </div>
      {error && <ErrorMessage message={error} />}
      {languagesError && <ErrorMessage message={languagesError} />}
      {languagesLoading && <Spinner animation="border" as="span" size="sm" />}
    </div>
  );
}
