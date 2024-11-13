import { useState, useEffect } from 'react';
import JokeTaskForm from '../JokeTaskForm/JokeTaskForm';
import EditingJokesTasks from '../EditingJokesTasks/EditingJokesTasks';
import { Tabs, Tab } from 'react-bootstrap';

export default function AdminPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  const [keyAdminTabs, setKeyAdminTabs] = useState('joke-task-form');
  return (
    <div>
      <h2>Administrator page</h2>
      <Tabs
        id="admin-tabs"
        activeKey={keyAdminTabs}
        onSelect={k => setKeyAdminTabs(k)}
        className="mb-3"
      >
        <Tab eventKey="joke-task-form" title="Form to adding joke task">
          <JokeTaskForm />
        </Tab>

        <Tab eventKey="editing-joke-task" title="Editing joke tasks">
          <EditingJokesTasks />
        </Tab>
      </Tabs>
    </div>
  );
}
