import { useEffect } from 'react';

import styles from './Info.module.css';

export default function Info() {
  useEffect(() => {
    window.scrollBy(0, -1000);
  }, []);

  return (
    <div className={styles.Info}>
      <h2>Developed by</h2>
      <ul>
        <li>
          <h3>Vitalii Vasylets</h3>
          <p>mohara88@ukr.net</p>
        </li>
        <li>
          <h3>Kontsevoi Serhii</h3>
          <p>serkon157@ukr.net</p>
        </li>
      </ul>
    </div>
  );
}
