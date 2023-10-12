import ChooseLanguages from '../ChooseLanguages/ChooseLanguages';
import JokesList from '../JokesList/JokesList';

export default function EditingJokesTasks() {
  return (
    <div>
      <ChooseLanguages />
      <JokesList adminMode={true} />
    </div>
  );
}
