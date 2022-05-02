import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Spinner } from 'react-bootstrap';
import ownDictionarysSelectors from '../../redux/own-dictionarys/own-dictionarys-selectors';
import {
  fetchOwnDictionarys,
  fetchOwnDictionary,
  deleteOwnDictionary,
} from '../../redux/own-dictionarys/own-dictionarys-operaions';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './OwnDictionarys.module.css';

export default function OwnDictionarys({ advancedMode = false }) {
  const dispatch = useDispatch();
  const ownDictionarys = useSelector(ownDictionarysSelectors.getOwnDictionarys);
  const loading = useSelector(ownDictionarysSelectors.getLoading);
  const error = useSelector(ownDictionarysSelectors.getError);

  useEffect(() => {
    dispatch(fetchOwnDictionarys());
  }, [dispatch]);

  const onGoTrainingBtn = ({ target: { name } }) => {
    dispatch(fetchOwnDictionary(name));
  };

  // const onEditBtn = ({ target: { name } }) => {
  // };

  const onDeleteBtn = ({ target: { name } }) => {
    dispatch(deleteOwnDictionary(name));
  };
  return (
    <div>
      {error && <ErrorMessage message={error} />}
      {loading && <Spinner animation="border" variant="primary" />}
      {!loading && (
        <>
          {ownDictionarys.length === 0 && !advancedMode && (
            <Link to="/user/">
              <Button
                variant="primary"
                className={styles.Button__noDictionarys}
              >
                You don't have your own dictionaries yet. Go to the user page to
                create a dictionary.
              </Button>
            </Link>
          )}
          <ul className={styles.Card__list}>
            {ownDictionarys.map(
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
      )}
    </div>
  );
}
