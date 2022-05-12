import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Table } from 'react-bootstrap';
import styles from './SelectedDictionaryModal.module.css';
import './SelectedDictionaryModal.css';

const SelectedDictionaryModal = ({
  modalShow,
  selectedDictionary,
  advancedMode = false,
  onHandleClose,
}) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    onHandleClose();
  };

  useEffect(() => {
    setShow(modalShow);
  }, [modalShow]);

  // const deleteTask = ({ target: { name } }) => {
  //   const newTasksSet = selectedDictionary.ownDictionaryTasks.filter(task => task._id !== name);
  //   // dispatch(updateOwnDictionary({selectedDictionary._id, newTasksSet}));
  // };

  return (
    <>
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
          <Table striped bordered hover className={styles.Table}>
            <thead>
              <tr>
                <td className={styles.Table__td__english}>English</td>
                <td className={styles.Table__td__translation}>Translation</td>
                <td className={styles.Table__td__secondary}>U-transcription</td>
                <td className={styles.Table__td__secondary}>Q-transcription</td>
                {advancedMode && <td className={styles.Table__td__Button}></td>}
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
                      <td className={styles.Table__td__secondary}>{qtrn}</td>
                      {advancedMode && (
                        <td className={styles.Table__td__Button}>
                          <Button
                            variant="danger"
                            size="sm"
                            name={_id}
                            // onClick={deleteTask}
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SelectedDictionaryModal;
