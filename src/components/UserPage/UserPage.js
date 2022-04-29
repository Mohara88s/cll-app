import { useEffect } from 'react';
import OwnDictionarys from '../OwnDictionarys/OwnDictionarys';
import DictionaryForm from '../DictionaryForm/DictionaryForm';

export default function UserPage() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);
  return (
    <div>
      <h2>User page</h2>
      <h3>Own dictionarys:</h3>
      <OwnDictionarys advancedMode={true} />
      <DictionaryForm />
    </div>
  );
}
