import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Table, Spinner } from 'react-bootstrap';
import { updateOwnDictionary } from '../../redux/own-dictionaries/own-dictionaries-operations';
import ownDictionariesSelectors from '../../redux/own-dictionaries/own-dictionaries-selectors';
import TasksFilter from '../TasksFilter/TasksFilter';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import AlertComponent from '../AlertComponent/AlertComponent';
import CopyInterfaceSymbol from '../CopyInterfaceSymbol/CopyInterfaceSymbol';
import { confirm } from 'react-bootstrap-confirmation';
import styles from './SelectedDictionaryModal.module.css';
import './SelectedDictionaryModal.css';

const SelectedDictionaryModal = ({
  modalShow,
  selectedDictionaryId,
  advancedMode = false,
  onHandleClose,
}) => {
  const [show, setShow] = useState(false);
  const [selectedDictionary, setSelectedDictionary] = useState({});
  const [errorAlreadyIncluded, setErrorAlreadyIncluded] = useState(false);

  const dispatch = useDispatch();

  const ownDictionaries = useSelector(
    ownDictionariesSelectors.getOwnDictionaries,
  );
  const updateDictionaryError = useSelector(
    ownDictionariesSelectors.getUpdateDictionaryError,
  );
  const updateDictionaryLoading = useSelector(
    ownDictionariesSelectors.getUpdateDictionaryLoading,
  );

  useEffect(() => {
    setSelectedDictionary(
      ownDictionaries.find(e => e._id === selectedDictionaryId),
    );
  }, [ownDictionaries, selectedDictionaryId]);

  const handleClose = () => {
    setShow(false);
    onHandleClose();
  };

  useEffect(() => {
    setShow(modalShow);
  }, [modalShow]);

  const deleteTask = async ({ target: { name } }) => {
    if (await confirm('Are you sure you want to delete this word?')) {
      const newTasksSet = selectedDictionary.ownDictionaryTasks.filter(
        task => task._id !== name,
      );
      dispatch(
        updateOwnDictionary({
          dictionaryId: selectedDictionary._id,
          update: { ownDictionaryTasks: newTasksSet },
        }),
      );
    }
  };
  const addTask = task => {
    if (
      selectedDictionary.ownDictionaryTasks.findIndex(
        e => e._id === task._id,
      ) === -1
    ) {
      setErrorAlreadyIncluded(false);
      const newTasksSet = [...selectedDictionary.ownDictionaryTasks, task._id];
      dispatch(
        updateOwnDictionary({
          dictionaryId: selectedDictionary._id,
          update: { ownDictionaryTasks: newTasksSet },
        }),
      );
    } else {
      setErrorAlreadyIncluded(true);
    }
  };

  return (
    <>
      {selectedDictionary && (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          className={styles.Modal}
          dialogClassName="EditDictionaryModalDialog"
        >
          <Modal.Header closeButton className={styles.Modal__Header}>
            <Modal.Title>{selectedDictionary.ownDictionaryName}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.Modal__Body}>
            <p
              className={styles.Modal__Id}
              onClick={() => {
                navigator.clipboard.writeText(selectedDictionary._id);
              }}
            >
              Dictionary Id: {selectedDictionary._id} <CopyInterfaceSymbol />
            </p>
            <Table striped bordered hover className={styles.Table}>
              <thead>
                <tr>
                  <td className={styles.Table__td__english}>English</td>
                  <td className={styles.Table__td__translation}>Translation</td>
                  <td className={styles.Table__td__secondary}>
                    U-transcription
                  </td>
                  {advancedMode && (
                    <td className={styles.Table__td__Button}></td>
                  )}
                </tr>
              </thead>
              {selectedDictionary.ownDictionaryName && (
                <tbody className={styles.Table__tbody}>
                  {selectedDictionary.ownDictionaryTasks.map(
                    ({ _id, eng, utrn, qtrn, rus }) => (
                      <tr key={_id}>
                        <td className={styles.Table__td__english}>{eng}</td>
                        <td className={styles.Table__td__translation}>
                          {rus.split('/')[0]}
                        </td>
                        <td className={styles.Table__td__secondary}>{utrn}</td>
                        {advancedMode && (
                          <td className={styles.Table__td__Button}>
                            <Button
                              variant="danger"
                              size="sm"
                              name={_id}
                              onClick={deleteTask}
                            >
                              Delete
                            </Button>
                          </td>
                        )}
                      </tr>
                    ),
                  )}
                </tbody>
              )}
            </Table>
            {updateDictionaryLoading && (
              <Spinner animation="border" variant="primary" />
            )}
            {errorAlreadyIncluded && (
              <AlertComponent
                alertClose={() => setErrorAlreadyIncluded(false)}
                message="The word is already present in the dictionary"
              />
            )}
            {updateDictionaryError && (
              <ErrorMessage message={updateDictionaryError} />
            )}
            {advancedMode && <TasksFilter passUpTask={addTask} />}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default SelectedDictionaryModal;
