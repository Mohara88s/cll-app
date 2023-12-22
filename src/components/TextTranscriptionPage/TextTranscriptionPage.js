import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Spinner, Dropdown } from 'react-bootstrap';
import { changeEnglishText } from '../../redux/text-transcription/text-transcription-actions';
import textTranscriptionSelectors from '../../redux/text-transcription/text-transcription-selectors';
import { fetchTextTranscription } from '../../redux/text-transcription/text-transcription-operations';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TextTranscriptionPage.module.css';

const fields = ['U-transcription'];

export default function TextTranscriptionPage() {
  const [taranscriptedArray, setTaranscriptedArray] = useState([]);
  const [dropdownValue, setDropdownValue] = useState(fields[0]);

  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  const dispatch = useDispatch();
  const englishText = useSelector(textTranscriptionSelectors.getEnglishText);
  const transcriptedText = useSelector(
    textTranscriptionSelectors.getTranscriptedText,
  );
  const loading = useSelector(textTranscriptionSelectors.getLoading);
  const error = useSelector(textTranscriptionSelectors.getError);
  const englishTextHandleChange = ({ target: { value } }) => {
    dispatch(changeEnglishText(value));
  };

  const onTranscriptTextButtonClick = () => {
    dispatch(
      fetchTextTranscription({ englishText, transcriptionType: dropdownValue }),
    );
  };
  const onDropdownClick = ({ target: { name } }) => {
    setDropdownValue(name);
    if (englishText) {
      dispatch(
        fetchTextTranscription({
          englishText,
          transcriptionType: name,
        }),
      );
    }
  };

  useEffect(() => {
    setTaranscriptedArray(transcriptedText.split(' '));
  }, [transcriptedText]);

  return (
    <div className={styles.TextTranscriptionPageBox}>
      <h2>Text transcription</h2>

      <Dropdown>
        <Dropdown.Toggle variant="outline-dark" size="sm" id="dropdown-basic">
          {dropdownValue}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <ul>
            {fields.map(field => (
              <li key={field}>
                <Dropdown.Item name={field} onClick={onDropdownClick}>
                  {field}
                </Dropdown.Item>
              </li>
            ))}
          </ul>
        </Dropdown.Menu>
      </Dropdown>
      <Form autoComplete="off" className={styles.Form}>
        <Form.Group className="mb-3">
          <Form.Label>Enter the text to be transcripted in English:</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            name="englishText"
            placeholder="Enter text in English"
            value={englishText}
            onChange={englishTextHandleChange}
          />
        </Form.Group>
      </Form>
      <Button
        variant="primary"
        className={styles.transcriptTextButton}
        onClick={onTranscriptTextButtonClick}
      >
        {!loading && <span>Let’s transcript text</span>}
        {loading && <Spinner animation="border" as="span" size="sm" />}
      </Button>
      <Form autoComplete="off" className={styles.Form}>
        <Form.Group className="mb-3">
          <Form.Label>Transcripted text:</Form.Label>
          <div>
            {taranscriptedArray[0] &&
              taranscriptedArray.map(e =>
                e[0] === '#' ? (
                  <span style={{ backgroundColor: 'yellow' }}>
                    {e.slice(1) + ' '}
                  </span>
                ) : (
                  <span>{e + ' '}</span>
                ),
              )}
          </div>
        </Form.Group>
      </Form>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
