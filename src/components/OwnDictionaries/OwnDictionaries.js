import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Spinner } from 'react-bootstrap';
import ownDictionariesSelectors from '../../redux/own-dictionaries/own-dictionaries-selectors';
import {
  fetchOwnDictionaries,
  deleteOwnDictionary,
} from '../../redux/own-dictionaries/own-dictionaries-operaions';
import { changeCurrentDictionary } from '../../redux/own-dictionaries/own-dictionaries-actions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './OwnDictionaries.module.css';

export default function OwnDictionaries({ advancedMode = false }) {
  const dispatch = useDispatch();
  const ownDictionaries = useSelector(
    ownDictionariesSelectors.getOwnDictionaries,
  );
  const loading = useSelector(ownDictionariesSelectors.getLoading);
  const error = useSelector(ownDictionariesSelectors.getError);

  useEffect(() => {
    dispatch(fetchOwnDictionaries());
  }, [dispatch]);

  const onGoTrainingBtn = ({ target: { name } }) => {
    const currentDictionary = ownDictionaries.find(e => e._id === name);
    dispatch(changeCurrentDictionary(currentDictionary));
  };

  // const onEditBtn = ({ target: { name } }) => {
  // };

  const onDeleteBtn = ({ target: { name } }) => {
    dispatch(deleteOwnDictionary(name));
  };
  return (
    <div>
      <>
        {ownDictionaries.length === 0 && !advancedMode && (
          <Link to="/user/">
            <Button variant="primary" className={styles.Button__noDictionaries}>
              You don't have your own dictionaries yet. Go to the user page to
              create a dictionary.
            </Button>
          </Link>
        )}
        <ul className={styles.Card__list}>
          {ownDictionaries.map(
            ({ _id, ownDictionaryName, ownDictionaryTasks }) => (
              <li key={_id} className={styles.Card__item}>
                <Card border="primary">
                  <Card.Body>
                    <Card.Title className={styles.Card__Title}>
                      {ownDictionaryName}
                    </Card.Title>
                    <Card.Text>words: {ownDictionaryTasks.length}</Card.Text>
                    <ul className={styles.Battons__list}>
                      {!advancedMode && (
                        <li>
                          <Button
                            name={_id}
                            onClick={onGoTrainingBtn}
                            variant="primary"
                          >
                            Go training
                          </Button>
                        </li>
                      )}
                      {advancedMode && (
                        <>
                          {/* <li>
                          <Button
                            name={_id}
                            onClick={onEditBtn}
                            variant="warning"
                          >
                            Edit
                          </Button>
                        </li> */}
                          <li>
                            <Button
                              name={_id}
                              onClick={onDeleteBtn}
                              variant="danger"
                            >
                              Delete
                            </Button>
                          </li>
                        </>
                      )}
                    </ul>
                  </Card.Body>
                </Card>
              </li>
            ),
          )}
        </ul>
      </>

      {error && <ErrorMessage message={error} />}
      {loading && <Spinner animation="border" variant="primary" />}
    </div>
  );
}
