import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import trophyImg from '../../public/pictures/trophy.png';
import styles from './TrainingCongratulation.module.css';

const TrainingCongratulation = ({ modalShow, onHandleClose }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    onHandleClose();
  };

  useEffect(() => {
    setShow(modalShow);
  }, [modalShow]);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className={styles.Modal__Body}>
          <img
            src={trophyImg}
            alt="Sentences trainings"
            className={styles.Modal__trophyImg}
          />
          <p>Congratulations! You have practiced the dictionary.</p>
          <Button variant="primary" onClick={handleClose}>
            GO NEXT
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TrainingCongratulation;
