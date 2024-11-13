import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';
import { deleteRandomTask } from '../../redux/transcription-tasks/transcription-tasks-actions';
import styles from './GameModal.module.css';
import './GameModal.css';

const GameModal = ({ modalShow, isCorrect, turn, solution }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    dispatch(deleteRandomTask());
    setShow(false);
  };
  useEffect(() => {
    setShow(modalShow);
  }, [modalShow]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className={styles.gameModal}
        dialogClassName="gameModalDialog"
      >
        <Modal.Body className={styles.gameModal__body}>
          {isCorrect && (
            <div>
              <h2>You Win!</h2>
              <p className="solution">Solution is {solution}</p>
              <p>You found the solution in {turn} guesses! :)</p>
            </div>
          )}
          {!isCorrect && (
            <div>
              <h2>Nevermind</h2>
              <p className="solution">Solution is {solution}</p>
              <p>Better luck next time! :)</p>
            </div>
          )}
          <Button autoFocus variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GameModal;
