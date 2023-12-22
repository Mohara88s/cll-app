import { useState } from 'react';
import { useSelector } from 'react-redux';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import { Button } from 'react-bootstrap';
import authSelectors from '../../redux/auth/auth-selectors';
import styles from './MobileAppBar.module.css';

export default function AppBar() {
  const [mobileAppBarIsOpen, setMobileAppBarIsOpen] = useState(false);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const onMenuClick = ({ target: { nodeName } }) => {
    // console.dir(nodeName);
    if (nodeName === 'BUTTON' || nodeName === 'SPAN' || nodeName === 'A') {
      setMobileAppBarIsOpen(!mobileAppBarIsOpen);
    }
  };

  return (
    <div className={styles.headerBox}>
      <header className={styles.header} onClick={onMenuClick}>
        {mobileAppBarIsOpen && (
          <>
            <MobileNavigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
            <Button className={styles.MenuButton}>Close Menu</Button>
          </>
        )}

        {!mobileAppBarIsOpen && (
          <Button className={styles.MenuButton}>Menu</Button>
        )}
      </header>
    </div>
  );
}
