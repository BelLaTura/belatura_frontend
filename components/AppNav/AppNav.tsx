import Link from 'next/link';
import { useEffect, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AppNav.module.css';
import menu from '@/public/data/menu.json';
import AppColorBlock from '../AppColorBlock/AppColorBlock';
import OrgData from '@/public/data/organization-data.json';

export default function AppNav() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsOpenMenu(false);
  }, []);

  return (
    <AppColorBlock>
      <header className={styles.header}>
        <div className={styles.header__bar}></div>
        <div className={styles.header__logo}>
          <Link href="/" className={styles.header__logo_a}>
            {OrgData.title}
          </Link>
        </div>
        <div className={styles.header__bar}>
          <button
            className={styles.header__bar_button}
            onClick={() => setIsOpenMenu((isOpenMenu) => !isOpenMenu)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>
      <nav
        className={styles.header__nav}
        style={{
          display: isOpenMenu ? 'block' : 'none',
        }}>
        <ul>
          {menu.map((e) => {
            return (
              <li key={e.href}>
                <Link href={e.href} onClick={() => setIsOpenMenu(false)}>
                  {e.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </AppColorBlock>
  );
}
