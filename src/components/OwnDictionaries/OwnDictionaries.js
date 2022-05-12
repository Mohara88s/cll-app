import { useState, useEffect } from 'react';
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
import SelectedDictionaryModal from '../SelectedDictionaryModal/SelectedDictionaryModal';
import styles from './OwnDictionaries.module.css';

export default function OwnDictionaries({ advancedMode = false }) {
  const [modalShow, setModalShow] = useState(false);
  const [selectedDictionaryId, setSelectedDictionaryId] = useState('');

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

  const onSelectBtn = ({ target: { name } }) => {
    setSelectedDictionaryId(name);
    setModalShow(true);
  };
  const onCloseModal = () => {
    setModalShow(false);
  };

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
                    {advancedMode && <Card.Text>id: {_id}</Card.Text>}
                    <ul className={styles.Card__buttonsList}>
                      {!advancedMode && (
                        <>
                          <li>
                            <Button
                              name={_id}
                              onClick={onSelectBtn}
                              variant="success"
                              className={styles.Card__button}
                            >
                              View
                            </Button>
                          </li>
                          <li>
                            <Button
                              name={_id}
                              onClick={onGoTrainingBtn}
                              variant="primary"
                              className={styles.Card__button}
                            >
                              Go training
                            </Button>
                          </li>
                        </>
                      )}
                      {advancedMode && (
                        <>
                          <li>
                            <Button
                              name={_id}
                              onClick={onSelectBtn}
                              variant="warning"
                              className={styles.Card__button}
                            >
                              Edit
                            </Button>
                          </li>
                          <li>
                            <Button
                              name={_id}
                              onClick={onDeleteBtn}
                              variant="danger"
                              className={styles.Card__button}
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

      <SelectedDictionaryModal
        modalShow={modalShow}
        selectedDictionaryId={selectedDictionaryId}
        advancedMode={advancedMode}
        onHandleClose={onCloseModal}
      />
    </div>
  );
}
