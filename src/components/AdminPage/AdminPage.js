import { useEffect } from 'react';
import JokeTaskForm from '../JokeTaskForm/JokeTaskForm';

export default function AdminPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  return (
    <div>
      <h2>Administrator page</h2>
      <JokeTaskForm />
    </div>
  );
}
