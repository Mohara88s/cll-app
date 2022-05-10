import { useState, useEffect } from 'react';
import OwnDictionaries from '../OwnDictionaries/OwnDictionaries';
import DictionaryForm from '../DictionaryForm/DictionaryForm';
import DictionarySearch from '../DictionarySearch/DictionarySearch';
import { Tabs, Tab, Spinner } from 'react-bootstrap';

export default function UserPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  const [keyUserTabs, setKeyUserTabs] = useState('Own dictionaries');
  const [keyOwnDictionariesTabs, setKeyOwnDictionariesTabs] =
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
        <Tab eventKey="Own dictionaries" title="Own dictionaries">
          <h3>Own dictionaries:</h3>
          <OwnDictionaries advancedMode={true} />
          <Tabs
            id="own-dictionaries-tabs"
            activeKey={keyOwnDictionariesTabs}
            onSelect={k => setKeyOwnDictionariesTabs(k)}
            className="mb-3"
          >
            <Tab eventKey="Dictionary form" title="Dictionary form">
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
