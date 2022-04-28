import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import userSelectors from '../../redux/user/user-selectors';
import {
  fetchOwnDictionarys,
  fetchOwnDictionary,
} from '../../redux/user/user-operaions';
import styles from './OwnDictionarys.module.css';

export default function OwnDictionarys() {
  const dispatch = useDispatch();
  const ownDictionarys = useSelector(userSelectors.getUserOwnDictionarys);

  useEffect(() => {
    dispatch(fetchOwnDictionarys());
  }, [dispatch]);

  const onGoTrainingBtn = ({ target: { name } }) => {
    dispatch(fetchOwnDictionary(name));
  };

  return (
    <div>
      <ul className={styles.Card__list}>
        {ownDictionarys.map(
          ({ _id, ownDictionaryName, ownDictionaryTasks }) => (
            <li key={_id} className={styles.Card__item}>
              <Card border="primary">
                <Card.Body>
                  <Card.Title>{ownDictionaryName}</Card.Title>
                  <Card.Text>words: {ownDictionaryTasks.length}</Card.Text>
                  <ul className={styles.Battons__list}>
                    <li>
                      <Button
                        name={_id}
                        onClick={onGoTrainingBtn}
                        variant="primary"
                      >
                        Go training
                      </Button>
                    </li>
                    <li>
                      <Button variant="warning">Edit</Button>
                    </li>
                    <li>
                      <Button variant="danger">Delete</Button>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
