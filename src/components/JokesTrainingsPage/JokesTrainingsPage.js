import { useState, useEffect } from 'react';
import ChooseLanguages from '../ChooseLanguages/ChooseLanguages';
import JokesList from '../JokesList/JokesList';
import JokeTraining from '../JokeTraining/JokeTraining';

export default function JokesTrainingsPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  const [trainingPageOptionsIsOpen, setTrainingPageOptionsIsOpen] =
    useState(true);
  const [jokeTask, setJokeTask] = useState([]);
  const trainTask = task => {
    setJokeTask(task);
    setTrainingPageOptionsIsOpen(false);
  };

  const onResolvedTraining = () => {
    setTrainingPageOptionsIsOpen(true);
    setJokeTask([]);
  };

  return (
    <div>
      <h2>Jokes trainings</h2>
      {trainingPageOptionsIsOpen && <ChooseLanguages />}
      {trainingPageOptionsIsOpen && <JokesList passUpTask={trainTask} />}
      {!trainingPageOptionsIsOpen && (
        <JokeTraining
          jokeTask={jokeTask}
          onResolvedTraining={onResolvedTraining}
        />
      )}
    </div>
  );
}
