// import { useState, useEffect } from 'react';
import ChooseLanguages from '../ChooseLanguages/ChooseLanguages';
import JokesList from '../JokesList/JokesList';

export default function EditingJokesTasks() {
  // const [jokeTask, setJokeTask] = useState([]);
  // const trainTask = task => {
  //   setJokeTask(task);
  //   setTrainingPageOptionsIsOpen(false);
  // };

  // const onResolvedTraining = () => {
  //   setTrainingPageOptionsIsOpen(true);
  //   setJokeTask([]);
  // };

  return (
    <div>
      <ChooseLanguages />
      <JokesList adminMode={true} />
    </div>
  );
}
