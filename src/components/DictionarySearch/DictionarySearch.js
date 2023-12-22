import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table, Spinner } from 'react-bootstrap';
import ownDictionariesSelectors from '../../redux/own-dictionaries/own-dictionaries-selectors';
import {
  addOwnDictionary,
  fetchOwnDictionary,
} from '../../redux/own-dictionaries/own-dictionaries-operations';
import { confirm } from 'react-bootstrap-confirmation';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './DictionarySearch.module.css';

export default function DictionarySearch() {
  const dispatch = useDispatch();
  const [dictionaryId, setDictionaryId] = useState('');
  const [dictionaryName, setDictionaryName] = useState('');

  const ownDictionary = useSelector(ownDictionariesSelectors.getOwnDictionary);
  const ownDictionaryLoading = useSelector(
    ownDictionariesSelectors.getOwnDictionaryLoading,
  );
  const ownDictionaryError = useSelector(
    ownDictionariesSelectors.getOwnDictionaryError,
  );
  const addDictionaryLoading = useSelector(
    ownDictionariesSelectors.getAddDictionaryLoading,
  );
  const addDictionaryError = useSelector(
    ownDictionariesSelectors.getAddDictionaryError,
  );
  const addDictionarySuccess = useSelector(
    ownDictionariesSelectors.getAddDictionarySuccess,
  );

  const dictionaryIdHandleChange = ({ target: { value } }) => {
    setDictionaryId(value);
  };

  const dictionaryNameHandleChange = ({ target: { value } }) => {
    setDictionaryName(value);
  };

  const onSearchClick = () => {
    dispatch(fetchOwnDictionary(dictionaryId));
  };

  const onAddDictionaryToOwnDictionariesClick = async () => {
    if (await confirm('Are you sure you want to add this dictionary?')) {
      dispatch(
        addOwnDictionary({
          ownDictionaryName: dictionaryName,
          ownDictionaryTasks: ownDictionary.ownDictionaryTasks,
        }),
      );
    }
  };
  useEffect(() => {
    if (addDictionarySuccess) {
      // dispatch(updateTasksSet([]));
      setDictionaryId('');
      setDictionaryName('');
    }
  }, [dispatch, addDictionarySuccess]);

  return (
    <div className={styles.dictionarySearch}>
      <div className={styles.dictionarySearch__box}>
        <h5 className={styles.dictionarySearch__header}>DictionarySearch:</h5>
        <Form autoComplete="off" className={styles.dictionarySearchForm}>
          <Form.Group className="mb-3">
            <Form.Label>Search dictionary by id:</Form.Label>
            <Form.Control
              type="text"
              name="dictionaryId"
              placeholder="Enter dictionary id"
              value={dictionaryId}
              onChange={dictionaryIdHandleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={onSearchClick}
            className={styles.dictionarySearchForm__button}
          >
            {!ownDictionaryLoading && <span>Search</span>}
            {ownDictionaryLoading && (
              <Spinner animation="border" as="span" size="sm" />
            )}
          </Button>
        </Form>
        {ownDictionaryError && (
          <ErrorMessage
            message={`No dictionary found with id=${dictionaryId}`}
          />
        )}
      </div>
      {!ownDictionaryError && !ownDictionaryLoading && (
        <div className={styles.dictionarySpecifications__box}>
          {ownDictionary.ownDictionaryTasks && (
            <div>
              <Table
                striped
                bordered
                hover
                className={styles.dictionarySpecifications}
              >
                <thead>
                  <tr>
                    <td>Specifications:</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody className={styles.dictionarySpecifications__tbody}>
                  <tr>
                    <td>Dictionary name:</td>
                    <td>{ownDictionary.ownDictionaryName}</td>
                  </tr>
                  <tr>
                    <td>Dictionary id:</td>
                    <td>{ownDictionary._id}</td>
                  </tr>
                  <tr>
                    <td>Dictionary owner:</td>
                    <td>{ownDictionary.ownDictionaryOwner.name}</td>
                  </tr>
                  <tr>
                    <td>Words quantity:</td>
                    <td>{ownDictionary.ownDictionaryTasks.length}</td>
                  </tr>
                </tbody>
              </Table>
              <Form autoComplete="off">
                <Form.Group className="mb-3">
                  <Form.Label>Add to own dictionaries with name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="dictionaryName"
                    placeholder="Enter dictionary name"
                    value={dictionaryName}
                    onChange={dictionaryNameHandleChange}
                  />
                </Form.Group>
                <Button
                  className={styles.dictionarySpecificationsForm__button}
                  onClick={onAddDictionaryToOwnDictionariesClick}
                >
                  {!addDictionaryLoading && <span>Add new own dictionary</span>}
                  {addDictionaryLoading && (
                    <Spinner animation="border" as="span" size="sm" />
                  )}
                </Button>
              </Form>
            </div>
          )}
          {addDictionaryError && <ErrorMessage message={addDictionaryError} />}
        </div>
      )}
    </div>
  );
}
