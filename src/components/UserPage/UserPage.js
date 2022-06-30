import { useState, useEffect } from 'react';
import OwnDictionaries from '../OwnDictionaries/OwnDictionaries';
import DictionaryForm from '../DictionaryForm/DictionaryForm';
import DictionarySearch from '../DictionarySearch/DictionarySearch';
import { Tabs, Tab, Spinner } from 'react-bootstrap';

export default function UserPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  const [keyUserTabs, setKeyUserTabs] = useState('User profile');
  const [keyOwnDictionariesTabs, setKeyOwnDictionariesTabs] =
    useState('Dictionaries list');
  return (
    <div>
      <h2>User page</h2>
      <Tabs
        id="user-tabs"
        activeKey={keyUserTabs}
        onSelect={k => setKeyUserTabs(k)}
        className="mb-3"
      >
        <Tab
          eventKey="own-dictionaries"
          id="own-dictionaries"
          title="Own dictionaries"
        >
          <h3>Own dictionaries:</h3>

          <Tabs
            id="own-dictionaries"
            activeKey={keyOwnDictionariesTabs}
            onSelect={k => setKeyOwnDictionariesTabs(k)}
            className="mb-3"
          >
            <Tab eventKey="Dictionaries list" title="Dictionaries list">
              <OwnDictionaries advancedMode={true} />
            </Tab>

            <Tab eventKey="dictionary-form" title="Dictionary form">
              <DictionaryForm />
            </Tab>

            <Tab eventKey="Dictionary search" title="Dictionary search">
              <DictionarySearch />
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
