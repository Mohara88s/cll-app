import { useState, useEffect } from 'react';
import OwnDictionarys from '../OwnDictionarys/OwnDictionarys';
import DictionaryForm from '../DictionaryForm/DictionaryForm';
import { Tabs, Tab, Spinner } from 'react-bootstrap';

export default function UserPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  const [keyUserTabs, setKeyUserTabs] = useState('Own dictionarys');
  const [keyOwnDictionarysTabs, setKeyOwnDictionarysTabs] =
    useState('Dictionary form');

  return (
    <div>
      <h2>User page</h2>
      <Tabs
        id="user-tabs"
        activeKey={keyUserTabs}
        onSelect={k => setKeyUserTabs(k)}
        className="mb-3"
      >
        <Tab eventKey="Own dictionarys" title="Own dictionarys">
          <h3>Own dictionarys:</h3>
          <OwnDictionarys advancedMode={true} />
          <Tabs
            id="own-dictionarys-tabs"
            activeKey={keyOwnDictionarysTabs}
            onSelect={k => setKeyOwnDictionarysTabs(k)}
            className="mb-3"
          >
            <Tab eventKey="Dictionary form" title="Dictionary form">
              <DictionaryForm />
            </Tab>

            <Tab eventKey="Dictionary search" title="Dictionary search">
              <h3>Dictionary search</h3>
              <Spinner animation="grow" />
              <p>under development</p>
            </Tab>
          </Tabs>
        </Tab>

        <Tab eventKey="User profile" title="User profile">
          <h3>User profile:</h3>
          <Spinner animation="grow" />
          <p>under development</p>
        </Tab>
      </Tabs>
    </div>
  );
}
