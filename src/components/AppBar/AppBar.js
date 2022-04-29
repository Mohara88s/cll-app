import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import { Button } from 'react-bootstrap';
import { authSelectors } from '../../redux/auth';
import styles from './AppBar.module.css';

export default function AppBar() {
  const [navigationIsOpen, setNavigationIsOpen] = useState(false);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  useEffect(() => {
    if (window.innerWidth >= 900) setNavigationIsOpen(true);
  }, []);

  const onMenuButtonClick = () => {
    setNavigationIsOpen(!navigationIsOpen);
  };

  return (
    <header className={styles.header}>
      {navigationIsOpen && (
        <>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </>
      )}
      <Button className={styles.MenuButton} onClick={onMenuButtonClick}>
        Menu
      </Button>
    </header>
  );
}
